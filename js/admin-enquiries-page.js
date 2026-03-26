(() => {
    if (document.body?.dataset.pageKey !== "appPagesEnquiries") return;

    let mountedHost = null;
    const mount = () => {
        const host = document.querySelector('[data-admin-page-host="enquiries"]');
        if (!host || host === mountedHost) return;
        mountedHost = host;

        host.innerHTML = `
        <section class="eq-panel">
            <div class="eq-quick" id="eq-quick">
                <button type="button" data-quick="all" class="is-active">All</button>
                <button type="button" data-quick="unassigned">Unassigned</button>
                <button type="button" data-quick="open">Open</button>
                <button type="button" data-quick="stale_open">Stale &gt;24h</button>
            </div>
            <form class="eq-filters" id="eq-filters">
                <input type="search" name="q" placeholder="検索: ID / 件名 / カテゴリ / 顧客名 / メモ">
                <select name="status" id="eq-status-filter">
                    <option value="">全ステータス</option>
                </select>
                <input type="search" name="category" placeholder="カテゴリ">
                <select name="assigned">
                    <option value="">担当（全て）</option>
                    <option value="assigned">担当あり</option>
                    <option value="unassigned">未割当</option>
                </select>
                <input type="date" name="from">
                <input type="date" name="to">
                <button type="submit">検索</button>
            </form>
            <p class="eq-note" id="eq-summary">Loading...</p>
        </section>

        <section class="eq-grid">
            <article class="eq-panel">
                <div class="eq-table-wrap">
                    <table class="eq-table" id="eq-table">
                        <thead>
                            <tr>
                                <th><button type="button" class="eq-sort" data-sort-key="id">ID</button></th>
                                <th><button type="button" class="eq-sort" data-sort-key="created_at">Created</button></th>
                                <th><button type="button" class="eq-sort" data-sort-key="status">Status</button></th>
                                <th><button type="button" class="eq-sort" data-sort-key="category">Category</button></th>
                                <th><button type="button" class="eq-sort" data-sort-key="subject">Subject</button></th>
                                <th><button type="button" class="eq-sort" data-sort-key="assigned_to">Assigned</button></th>
                                <th><button type="button" class="eq-sort" data-sort-key="sla_hours">SLA</button></th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
                <div class="eq-pager" id="eq-pager">
                    <button type="button" id="eq-prev">Prev</button>
                    <span id="eq-page-info">Page 1 / 1</span>
                    <button type="button" id="eq-next">Next</button>
                    <label for="eq-page-size">Rows</label>
                    <select id="eq-page-size">
                        <option value="10">10</option>
                        <option value="20" selected>20</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
                </div>
            </article>

            <aside class="eq-panel" id="eq-detail">
                <h2>Enquiry Detail</h2>
                <p class="eq-note">行を選択してください。</p>
            </aside>
        </section>
    `;

    const cfg = window.INIM_SITE_CONFIG || {};
    const adminAccessMode = String(cfg.adminAccessMode || "admin_only").trim().toLowerCase();
    const isOpenDemoMode = adminAccessMode === "open_demo";
    const sbApi = window.supabase;
    const supabase = cfg.supabaseUrl && cfg.supabasePublishableKey && sbApi?.createClient
        ? sbApi.createClient(cfg.supabaseUrl, cfg.supabasePublishableKey)
        : null;

    const tableBody = document.querySelector("#eq-table tbody");
    const detailHost = document.getElementById("eq-detail");
    const summary = document.getElementById("eq-summary");
    const filterForm = document.getElementById("eq-filters");
    const quickHost = document.getElementById("eq-quick");
    const statusFilter = document.getElementById("eq-status-filter");
    const pager = document.getElementById("eq-pager");
    const prevBtn = document.getElementById("eq-prev");
    const nextBtn = document.getElementById("eq-next");
    const pageInfo = document.getElementById("eq-page-info");
    const pageSizeSelect = document.getElementById("eq-page-size");
    if (!tableBody || !detailHost || !summary || !filterForm || !quickHost || !statusFilter || !pager || !prevBtn || !nextBtn || !pageInfo || !pageSizeSelect) return;

    const state = {
        rows: [],
        filtered: [],
        selectedId: "",
        profileMap: {},
        assigneeOptions: [],
        quickKey: "all",
        sortKey: "created_at",
        sortDir: "desc",
        page: 1,
        pageSize: 20,
        loadError: ""
    };
    const PREFERENCE_KEY = "admin_enquiries_preferences_v1";

    const esc = (v) => String(v ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#39;");
    const pick = (row, keys) => keys.map((k) => row?.[k]).find((x) => x !== undefined && x !== null && String(x).trim() !== "") ?? "";
    const fmtDate = (v) => {
        if (!v) return "-";
        const d = new Date(v);
        return Number.isNaN(d.getTime()) ? String(v) : d.toLocaleString("ja-JP", { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" });
    };
    const toDateKey = (v) => {
        if (!v) return "";
        const d = new Date(v);
        if (Number.isNaN(d.getTime())) return "";
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        return `${y}-${m}-${day}`;
    };
    const isOpenStatus = (status) => !["closed", "completed", "resolved", "cancelled"].includes(String(status || "").toLowerCase());
    const getSlaText = (row) => {
        const status = String(row.status || "").toLowerCase();
        if (!isOpenStatus(status)) return "-";
        const createdAt = new Date(pick(row, ["created_at", "updated_at"]) || "");
        if (Number.isNaN(createdAt.getTime())) return "-";
        const hours = Math.floor((Date.now() - createdAt.getTime()) / (1000 * 60 * 60));
        return hours >= 24 ? `Overdue ${hours}h` : `${hours}h`;
    };
    const getNoteKey = (row) => {
        if (row && Object.prototype.hasOwnProperty.call(row, "internal_note")) return "internal_note";
        if (row && Object.prototype.hasOwnProperty.call(row, "note")) return "note";
        return "";
    };
    const assigneeLabel = (id) => {
        if (!id) return "未割当";
        const p = state.profileMap[id];
        return p ? (p.display_name || p.full_name || p.email || id) : id;
    };
    const getSlaHours = (row) => {
        const status = String(row?.status || "").toLowerCase();
        if (!isOpenStatus(status)) return -1;
        const createdAt = new Date(pick(row, ["created_at", "updated_at"]) || "");
        if (Number.isNaN(createdAt.getTime())) return -1;
        return Math.floor((Date.now() - createdAt.getTime()) / (1000 * 60 * 60));
    };
    const getSortValue = (row, key) => {
        if (key === "created_at") return String(pick(row, ["created_at", "updated_at"]) || "");
        if (key === "assigned_to") return assigneeLabel(row.assigned_to || "").toLowerCase();
        if (key === "sla_hours") return getSlaHours(row);
        return String(row?.[key] || "").toLowerCase();
    };
    const sortRows = (rows) => {
        const dir = state.sortDir === "asc" ? 1 : -1;
        rows.sort((a, b) => {
            const va = getSortValue(a, state.sortKey);
            const vb = getSortValue(b, state.sortKey);
            if (typeof va === "number" || typeof vb === "number") return (Number(va) - Number(vb)) * dir;
            return String(va).localeCompare(String(vb), "ja") * dir;
        });
    };
    const getMaxPage = () => Math.max(1, Math.ceil(state.filtered.length / Math.max(1, state.pageSize)));
    const getPageRows = () => {
        const start = (state.page - 1) * state.pageSize;
        return state.filtered.slice(start, start + state.pageSize);
    };
    const savePreferences = () => {
        const fd = new FormData(filterForm);
        const payload = {
            quickKey: state.quickKey,
            sortKey: state.sortKey,
            sortDir: state.sortDir,
            pageSize: state.pageSize,
            q: String(fd.get("q") || ""),
            status: String(fd.get("status") || ""),
            category: String(fd.get("category") || ""),
            assigned: String(fd.get("assigned") || ""),
            from: String(fd.get("from") || ""),
            to: String(fd.get("to") || "")
        };
        try { window.localStorage.setItem(PREFERENCE_KEY, JSON.stringify(payload)); } catch { /* noop */ }
    };
    const applySavedPreferences = () => {
        try {
            const raw = window.localStorage.getItem(PREFERENCE_KEY);
            if (!raw) return;
            const pref = JSON.parse(raw);
            const setValue = (name, value) => {
                const el = filterForm.elements.namedItem(name);
                if (el instanceof HTMLInputElement || el instanceof HTMLSelectElement) el.value = String(value || "");
            };
            setValue("q", pref.q);
            setValue("status", pref.status);
            setValue("category", pref.category);
            setValue("assigned", pref.assigned);
            setValue("from", pref.from);
            setValue("to", pref.to);
            if (["all", "unassigned", "open", "stale_open"].includes(String(pref.quickKey || ""))) state.quickKey = String(pref.quickKey);
            if (["id", "created_at", "status", "category", "subject", "assigned_to", "sla_hours"].includes(String(pref.sortKey || ""))) state.sortKey = String(pref.sortKey);
            if (["asc", "desc"].includes(String(pref.sortDir || ""))) state.sortDir = String(pref.sortDir);
            const size = Number(pref.pageSize);
            if ([10, 20, 50, 100].includes(size)) state.pageSize = size;
        } catch { /* noop */ }
    };
    const syncQuickParam = () => {
        const url = new URL(window.location.href);
        url.searchParams.set("quick", state.quickKey);
        window.history.replaceState({}, "", url.toString());
    };
    const syncSortButtons = () => {
        const map = {
            id: "ID",
            created_at: "Created",
            status: "Status",
            category: "Category",
            subject: "Subject",
            assigned_to: "Assigned",
            sla_hours: "SLA"
        };
        host.querySelectorAll(".eq-sort").forEach((btn) => {
            const key = String(btn.getAttribute("data-sort-key") || "");
            const isActive = key === state.sortKey;
            const arrow = isActive ? (state.sortDir === "asc" ? " ▲" : " ▼") : "";
            btn.classList.toggle("is-active", isActive);
            btn.textContent = `${map[key] || key}${arrow}`;
        });
    };

    const populateStatusFilter = () => {
        const current = String(statusFilter.value || "");
        const statuses = [...new Set(state.rows.map((row) => String(row.status || "").trim()).filter(Boolean))];
        statuses.sort((a, b) => a.localeCompare(b, "ja"));
        statusFilter.innerHTML = `<option value="">全ステータス</option>${statuses.map((s) => `<option value="${esc(s)}">${esc(s)}</option>`).join("")}`;
        if (statuses.includes(current)) statusFilter.value = current;
    };
    const syncQuickButtons = () => {
        quickHost.querySelectorAll("[data-quick]").forEach((button) => {
            button.classList.toggle("is-active", button.getAttribute("data-quick") === state.quickKey);
        });
    };
    const applyQuickFromUrl = () => {
        const params = new URLSearchParams(window.location.search);
        if (!params.has("quick")) return;
        const quick = String(params.get("quick") || "all").trim().toLowerCase();
        const allowed = new Set(["all", "unassigned", "open", "stale_open"]);
        state.quickKey = allowed.has(quick) ? quick : "all";
    };

    const renderTable = () => {
        const rows = getPageRows();
        if (state.loadError) {
            tableBody.innerHTML = `<tr><td colspan="7">Load failed: ${esc(state.loadError)}</td></tr>`;
            pageInfo.textContent = "Page 1 / 1";
            prevBtn.disabled = true;
            nextBtn.disabled = true;
            return;
        }
        if (!rows.length) {
            tableBody.innerHTML = `<tr><td colspan="7">No enquiries matched your filter.</td></tr>`;
            pageInfo.textContent = "Page 1 / 1";
            prevBtn.disabled = true;
            nextBtn.disabled = true;
            return;
        }

        tableBody.innerHTML = rows.map((row) => {
            const id = row.id || "";
            const sla = getSlaText(row);
            const slaClass = sla.startsWith("Overdue") ? "is-overdue" : (sla === "-" ? "" : "is-warn");
            return `<tr data-id="${esc(id)}" class="${state.selectedId === id ? "is-selected" : ""}">
                <td>${esc(id.slice(0, 8))}</td>
                <td>${esc(fmtDate(pick(row, ["created_at", "updated_at"])))}</td>
                <td>${esc(row.status || "-")}</td>
                <td>${esc(row.category || "-")}</td>
                <td>${esc(row.subject || "-")}</td>
                <td>${esc(assigneeLabel(row.assigned_to || ""))}</td>
                <td><span class="eq-sla ${slaClass}">${esc(sla)}</span></td>
            </tr>`;
        }).join("");

        tableBody.querySelectorAll("tr[data-id]").forEach((tr) => {
            tr.addEventListener("click", () => {
                state.selectedId = tr.dataset.id || "";
                renderTable();
                renderDetail();
            });
        });

        const maxPage = getMaxPage();
        pageInfo.textContent = `Page ${state.page} / ${maxPage}`;
        prevBtn.disabled = state.page <= 1;
        nextBtn.disabled = state.page >= maxPage;
    };

    const renderDetail = () => {
        const row = state.rows.find((x) => String(x.id) === String(state.selectedId));
        if (!row) {
            detailHost.innerHTML = `<h2>Enquiry Detail</h2><p class="eq-note">行を選択してください。</p>`;
            return;
        }
        const noteKey = getNoteKey(row);
        const noteValue = noteKey ? String(row[noteKey] || "") : "";
        const statusOptions = [...new Set([
            String(row.status || "").trim(),
            "open", "in_progress", "responded", "resolved", "closed", "cancelled"
        ].filter(Boolean))];
        const customerProfile = state.profileMap[row.customer_profile_id] || {};

        detailHost.innerHTML = `
            <h2>Enquiry Detail</h2>
            <div class="eq-kv"><strong>ID</strong><span>${esc(row.id || "-")}</span></div>
            <div class="eq-kv"><strong>Status</strong><span>${esc(row.status || "-")}</span></div>
            <div class="eq-kv"><strong>Category</strong><span>${esc(row.category || "-")}</span></div>
            <div class="eq-kv"><strong>Subject</strong><span>${esc(row.subject || "-")}</span></div>
            <div class="eq-kv"><strong>Created</strong><span>${esc(fmtDate(row.created_at || row.updated_at || ""))}</span></div>
            <div class="eq-kv"><strong>Customer</strong><span>${esc(customerProfile.display_name || customerProfile.full_name || customerProfile.email || row.customer_profile_id || "-")}</span></div>
            <div class="eq-kv"><strong>Assigned</strong><span>${esc(assigneeLabel(row.assigned_to || ""))}</span></div>
            <form id="eq-update-form" class="eq-update">
                <input type="hidden" name="id" value="${esc(row.id || "")}">
                <label>Status</label>
                <select name="status">
                    ${statusOptions.map((s) => `<option value="${esc(s)}" ${String(row.status || "") === s ? "selected" : ""}>${esc(s)}</option>`).join("")}
                </select>
                <label>Assigned To</label>
                <select name="assigned_to">
                    <option value="">未割当</option>
                    ${state.assigneeOptions.map((p) => `<option value="${esc(p.id)}" ${String(row.assigned_to || "") === String(p.id) ? "selected" : ""}>${esc(p.display_name || p.full_name || p.email || p.id)}</option>`).join("")}
                </select>
                <label>Internal Note</label>
                <textarea name="internal_note" rows="4" maxlength="1000">${esc(noteValue)}</textarea>
                <div class="eq-note-chips">
                    <button type="button" data-note-template="一次返信済み。追加情報待ち。">一次返信済み</button>
                    <button type="button" data-note-template="担当アサイン済み。対応中。">担当アサイン済み</button>
                    <button type="button" data-note-template="解決済み。クローズ予定。">解決済み</button>
                </div>
                <div class="eq-quick-actions">
                    <button type="button" data-quick-status="in_progress">Mark In Progress</button>
                    <button type="button" data-quick-status="responded">Mark Responded</button>
                    <button type="button" data-quick-status="closed">Mark Closed</button>
                </div>
                <button type="submit">Update Enquiry</button>
            </form>
            <p class="eq-note" id="eq-update-message"></p>
        `;

        const form = document.getElementById("eq-update-form");
        const noteInput = form?.querySelector('textarea[name="internal_note"]');
        form?.querySelectorAll("[data-note-template]").forEach((button) => {
            button.addEventListener("click", () => {
                if (!noteInput) return;
                noteInput.value = String(button.getAttribute("data-note-template") || "");
                noteInput.focus();
            });
        });
        form?.querySelectorAll("[data-quick-status]").forEach((button) => {
            button.addEventListener("click", () => {
                const statusSelect = form.elements.namedItem("status");
                if (statusSelect instanceof HTMLSelectElement) {
                    statusSelect.value = String(button.getAttribute("data-quick-status") || statusSelect.value);
                }
            });
        });
        form?.addEventListener("submit", async (event) => {
            event.preventDefault();
            const fd = new FormData(form);
            const enquiryId = String(fd.get("id") || "");
            const nextStatus = String(fd.get("status") || "").trim();
            const assignedTo = String(fd.get("assigned_to") || "").trim();
            const internalNote = String(fd.get("internal_note") || "").trim();
            const msg = document.getElementById("eq-update-message");
            if (!msg) return;
            msg.textContent = "Updating...";

            const payload = { status: nextStatus, assigned_to: assignedTo || null };
            if (noteKey) payload[noteKey] = internalNote || null;

            const { error } = await supabase.from("enquiries").update(payload).eq("id", enquiryId);
            if (error) {
                msg.textContent = `Update failed: ${error.message}`;
                return;
            }
            msg.textContent = "Updated.";
            await loadData();
            state.selectedId = enquiryId;
            applyFilters();
            renderTable();
            renderDetail();
        });
    };

    const applyFilters = () => {
        const fd = new FormData(filterForm);
        const q = String(fd.get("q") || "").trim().toLowerCase();
        const status = String(fd.get("status") || "").trim();
        const category = String(fd.get("category") || "").trim().toLowerCase();
        const assigned = String(fd.get("assigned") || "").trim();
        const from = String(fd.get("from") || "").trim();
        const to = String(fd.get("to") || "").trim();

        state.filtered = state.rows.filter((row) => {
            const rowStatus = String(row.status || "");
            const rowCategory = String(row.category || "").toLowerCase();
            const createdAt = String(pick(row, ["created_at", "updated_at"]) || "").slice(0, 10);
            const createdKey = toDateKey(pick(row, ["created_at", "updated_at"]));
            const assignedTo = String(row.assigned_to || "").trim();
            const customer = state.profileMap[row.customer_profile_id] || {};
            const searchable = [
                row.id,
                row.subject,
                row.category,
                row.note,
                row.internal_note,
                row.message,
                customer.display_name,
                customer.full_name,
                customer.email,
                assigneeLabel(row.assigned_to || "")
            ].map((v) => String(v || "").toLowerCase()).join(" ");

            if (status && rowStatus !== status) return false;
            if (category && !rowCategory.includes(category)) return false;
            if (assigned === "assigned" && !assignedTo) return false;
            if (assigned === "unassigned" && assignedTo) return false;
            if (from && createdAt && createdAt < from) return false;
            if (to && createdAt && createdAt > to) return false;
            if (q && !searchable.includes(q)) return false;
            if (state.quickKey === "unassigned" && assignedTo) return false;
            if (state.quickKey === "open" && !isOpenStatus(rowStatus)) return false;
            if (state.quickKey === "stale_open") {
                if (!isOpenStatus(rowStatus)) return false;
                if (!getSlaText(row).startsWith("Overdue")) return false;
            }
            if (state.quickKey === "all" && !createdKey && (from || to)) return false;
            return true;
        });

        sortRows(state.filtered);
        const maxPage = getMaxPage();
        if (state.page > maxPage) state.page = maxPage;
        if (state.page < 1) state.page = 1;
        summary.textContent = `${state.filtered.length} / ${state.rows.length} enquiries (quick: ${state.quickKey}, sort: ${state.sortKey} ${state.sortDir})`;
        savePreferences();
        syncSortButtons();
    };

    const loadMaps = async (rows) => {
        const customerIds = [...new Set(rows.map((r) => r.customer_profile_id).filter(Boolean))];
        const assigneeIds = [...new Set(rows.map((r) => r.assigned_to).filter(Boolean))];
        const allIds = [...new Set([...customerIds, ...assigneeIds])];
        state.profileMap = {};
        state.assigneeOptions = [];

        if (allIds.length) {
            const { data } = await supabase.from("user_profiles").select("id, display_name, full_name, email, account_status").in("id", allIds);
            (data || []).forEach((row) => { state.profileMap[row.id] = row; });
        }
        const { data: assignees } = await supabase
            .from("user_profiles")
            .select("id, display_name, full_name, email, account_status")
            .eq("account_status", "active")
            .limit(300);
        state.assigneeOptions = assignees || [];
    };

    const loadData = async () => {
        summary.textContent = "Loading...";
        state.loadError = "";
        const { data, error } = await supabase
            .from("enquiries")
            .select("*")
            .order("created_at", { ascending: false })
            .limit(500);

        if (error) {
            state.loadError = error.message || "Unknown error";
            summary.textContent = `Load failed: ${state.loadError}`;
            state.rows = [];
            state.filtered = [];
            state.page = 1;
            renderTable();
            renderDetail();
            return;
        }
        state.rows = data || [];
        populateStatusFilter();
        await loadMaps(state.rows);
        applyFilters();
        renderTable();
        renderDetail();
    };

    const init = async () => {
        if (!supabase) {
            summary.textContent = "Supabase config missing in js/site-config.js";
            return;
        }

        const { data: sessionData } = await supabase.auth.getSession();
        let user = sessionData?.session?.user || null;
        if (!user && isOpenDemoMode && supabase.auth?.signInAnonymously) {
            try {
                const { data: anonData, error: anonError } = await supabase.auth.signInAnonymously();
                if (!anonError) {
                    user = anonData?.user || null;
                }
            } catch {
                // Continue in open demo mode even when anonymous auth is unavailable.
            }
        }
        if (!user && !isOpenDemoMode) {
            window.location.href = "../login.html";
            return;
        }

        applySavedPreferences();
        pageSizeSelect.value = String(state.pageSize);
        applyQuickFromUrl();
        await loadData();
        syncQuickButtons();

        filterForm.addEventListener("submit", (e) => {
            e.preventDefault();
            state.page = 1;
            applyFilters();
            renderTable();
            renderDetail();
        });
        quickHost.querySelectorAll("[data-quick]").forEach((button) => {
            button.addEventListener("click", () => {
                state.quickKey = String(button.getAttribute("data-quick") || "all");
                state.page = 1;
                syncQuickButtons();
                syncQuickParam();
                applyFilters();
                renderTable();
                renderDetail();
            });
        });
        host.querySelectorAll(".eq-sort").forEach((button) => {
            button.addEventListener("click", () => {
                const nextKey = String(button.getAttribute("data-sort-key") || "created_at");
                if (state.sortKey === nextKey) state.sortDir = state.sortDir === "asc" ? "desc" : "asc";
                else {
                    state.sortKey = nextKey;
                    state.sortDir = nextKey === "created_at" || nextKey === "sla_hours" ? "desc" : "asc";
                }
                state.page = 1;
                applyFilters();
                renderTable();
            });
        });
        prevBtn.addEventListener("click", () => {
            if (state.page <= 1) return;
            state.page -= 1;
            renderTable();
        });
        nextBtn.addEventListener("click", () => {
            const maxPage = getMaxPage();
            if (state.page >= maxPage) return;
            state.page += 1;
            renderTable();
        });
        pageSizeSelect.addEventListener("change", () => {
            const size = Number(pageSizeSelect.value);
            state.pageSize = [10, 20, 50, 100].includes(size) ? size : 20;
            state.page = 1;
            applyFilters();
            renderTable();
        });
    };

        init();
    };

    window.addEventListener("admin:render", (event) => {
        if (event?.detail?.pageKey === "appPagesEnquiries") mount();
    });
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", mount, { once: true });
    } else {
        mount();
    }
})();
