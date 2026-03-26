(() => {
    if (document.body?.dataset.pageKey !== "appPagesWorkshop") return;

    let mountedHost = null;
    const mount = () => {
        const host = document.querySelector('[data-admin-page-host="workshop"]');
        if (!host || host === mountedHost) return;
        mountedHost = host;

        host.innerHTML = `
        <section class="wb-panel">
            <div class="wb-quick" id="wb-quick">
                <button type="button" data-quick="all" class="is-active">All</button>
                <button type="button" data-quick="today">Today</button>
                <button type="button" data-quick="tomorrow">Tomorrow</button>
                <button type="button" data-quick="pending">Pending</button>
                <button type="button" data-quick="stale_pending">Stale &gt;24h</button>
            </div>
            <form class="wb-filters" id="wb-filters">
                <input type="search" name="q" placeholder="検索: ID / 名前 / メール / 電話 / メモ">
                <select name="status">
                    <option value="">全ステータス</option>
                    <option value="pending">pending</option>
                    <option value="requested">requested</option>
                    <option value="in_progress">in_progress</option>
                    <option value="confirmed">confirmed</option>
                    <option value="completed">completed</option>
                    <option value="cancelled">cancelled</option>
                </select>
                <select name="method">
                    <option value="">全方式</option>
                    <option value="instant">instant</option>
                    <option value="request">request</option>
                </select>
                <input type="date" name="from">
                <input type="date" name="to">
                <button type="submit">検索</button>
            </form>
            <p class="wb-note" id="wb-summary">Loading...</p>
        </section>

        <section class="wb-grid">
            <article class="wb-panel">
                <div class="wb-table-wrap">
                    <table class="wb-table" id="wb-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Booked At</th>
                                <th>Status</th>
                                <th>Contact</th>
                                <th>Store</th>
                                <th>Party</th>
                                <th>SLA</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            </article>

            <aside class="wb-panel" id="wb-detail">
                <h2>Booking Detail</h2>
                <p class="wb-note">行を選択してください。</p>
            </aside>
        </section>
    `;

    const cfg = window.INIM_SITE_CONFIG || {};
    const sbApi = window.supabase;
    const supabase = cfg.supabaseUrl && cfg.supabasePublishableKey && sbApi?.createClient
        ? sbApi.createClient(cfg.supabaseUrl, cfg.supabasePublishableKey)
        : null;

    const tableBody = document.querySelector("#wb-table tbody");
    const detailHost = document.getElementById("wb-detail");
    const summary = document.getElementById("wb-summary");
    const filterForm = document.getElementById("wb-filters");
    const quickHost = document.getElementById("wb-quick");
    if (!tableBody || !detailHost || !summary || !filterForm || !quickHost) return;

    const state = {
        rows: [],
        filtered: [],
        selectedId: "",
        profileMap: {},
        storeMap: {},
        quickKey: "all"
    };

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
    const getRelativeDateKey = (offset = 0) => {
        const d = new Date();
        d.setDate(d.getDate() + offset);
        return toDateKey(d);
    };
    const isPendingLike = (status) => ["pending", "requested", "in_progress"].includes(String(status || "").toLowerCase());
    const getSlaText = (row) => {
        const status = String(row.status || "").toLowerCase();
        if (!isPendingLike(status)) return "-";
        const bookedAt = new Date(pick(row, ["booked_at", "created_at"]) || "");
        if (Number.isNaN(bookedAt.getTime())) return "-";
        const hours = Math.floor((Date.now() - bookedAt.getTime()) / (1000 * 60 * 60));
        return hours >= 24 ? `Overdue ${hours}h` : `${hours}h`;
    };

    const renderTable = () => {
        tableBody.innerHTML = state.filtered.map((row) => {
            const id = row.id || "";
            const storeName = state.storeMap[row.store_id] || row.store_id || "-";
            const party = pick(row, ["party_size", "participant_count"]) || "-";
            const contactName = pick(row, ["contact_name"]) || state.profileMap[row.customer_profile_id]?.display_name || "-";
            const sla = getSlaText(row);
            const slaClass = sla.startsWith("Overdue") ? "is-overdue" : (sla === "-" ? "" : "is-warn");
            return `<tr data-id="${esc(id)}" class="${state.selectedId === id ? "is-selected" : ""}"><td>${esc(id.slice(0, 8))}</td><td>${esc(fmtDate(pick(row, ["booked_at", "created_at"])))}</td><td>${esc(row.status || "-")}</td><td>${esc(contactName)}</td><td>${esc(storeName)}</td><td>${esc(String(party))}</td><td><span class="wb-sla ${slaClass}">${esc(sla)}</span></td></tr>`;
        }).join("");

        tableBody.querySelectorAll("tr[data-id]").forEach((tr) => {
            tr.addEventListener("click", () => {
                state.selectedId = tr.dataset.id || "";
                renderTable();
                renderDetail();
            });
        });
    };

    const renderDetail = () => {
        const row = state.rows.find((x) => String(x.id) === String(state.selectedId));
        if (!row) {
            detailHost.innerHTML = `<h2>Booking Detail</h2><p class="wb-note">行を選択してください。</p>`;
            return;
        }
        const profile = state.profileMap[row.customer_profile_id] || {};
        const contactName = pick(row, ["contact_name", "customer_name", "name"]) || profile.display_name || profile.full_name || "-";
        const contactEmail = pick(row, ["contact_email", "email"]) || profile.email || "-";
        const contactPhone = pick(row, ["contact_phone", "phone"]) || "-";
        const bookedAt = fmtDate(pick(row, ["booked_at", "created_at"]));
        const party = pick(row, ["party_size", "participant_count"]) || "-";
        const note = pick(row, ["internal_note", "note", "special_requests"]);
        const storeName = state.storeMap[row.store_id] || row.store_id || "-";

        detailHost.innerHTML = `
            <h2>Booking Detail</h2>
            <div class="wb-kv"><strong>ID</strong><span>${esc(row.id || "-")}</span></div>
            <div class="wb-kv"><strong>Status</strong><span>${esc(row.status || "-")}</span></div>
            <div class="wb-kv"><strong>Booked At</strong><span>${esc(bookedAt)}</span></div>
            <div class="wb-kv"><strong>Store</strong><span>${esc(storeName)}</span></div>
            <div class="wb-kv"><strong>Party Size</strong><span>${esc(String(party))}</span></div>
            <div class="wb-kv"><strong>Name</strong><span>${esc(contactName)}</span></div>
            <div class="wb-kv"><strong>Email</strong><span>${esc(contactEmail)}</span></div>
            <div class="wb-kv"><strong>Phone</strong><span>${esc(contactPhone)}</span></div>
            <form id="wb-update-form" class="wb-update">
                <input type="hidden" name="id" value="${esc(row.id || "")}">
                <label>Status</label>
                <select name="status">
                    ${["pending", "requested", "in_progress", "confirmed", "completed", "cancelled"].map((s) => `<option value="${esc(s)}" ${String(row.status || "") === s ? "selected" : ""}>${esc(s)}</option>`).join("")}
                </select>
                <label>Internal Note</label>
                <textarea name="internal_note" rows="4" maxlength="1000">${esc(note)}</textarea>
                <div class="wb-note-chips">
                    <button type="button" data-note-template="電話確認済み。折返し連絡待ち。">電話確認済み</button>
                    <button type="button" data-note-template="メールで日程調整中。">メール調整中</button>
                    <button type="button" data-note-template="当日案内送付済み。">当日案内済み</button>
                </div>
                <div class="wb-quick-actions">
                    <button type="button" data-quick-status="in_progress">Mark In Progress</button>
                    <button type="button" data-quick-status="confirmed">Mark Confirmed</button>
                    <button type="button" data-quick-status="cancelled">Mark Cancelled</button>
                </div>
                <button type="submit">Update Booking</button>
            </form>
            <p class="wb-note" id="wb-update-message"></p>
        `;

        const form = document.getElementById("wb-update-form");
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
        form?.addEventListener("submit", async (e) => {
            e.preventDefault();
            const fd = new FormData(form);
            const bookingId = String(fd.get("id") || "");
            const nextStatus = String(fd.get("status") || "").trim();
            const internalNote = String(fd.get("internal_note") || "").trim();
            const msg = document.getElementById("wb-update-message");
            if (!msg) return;
            msg.textContent = "Updating...";

            const payload = { status: nextStatus, internal_note: internalNote || null };
            if (nextStatus === "confirmed") payload.confirmed_at = new Date().toISOString();

            const { error } = await supabase.from("bookings").update(payload).eq("id", bookingId);
            if (error) {
                msg.textContent = `Update failed: ${error.message}`;
                return;
            }
            msg.textContent = "Updated.";
            await loadData();
            state.selectedId = bookingId;
            applyFilters();
            renderTable();
            renderDetail();
        });
    };

    const applyFilters = () => {
        const fd = new FormData(filterForm);
        const q = String(fd.get("q") || "").trim().toLowerCase();
        const status = String(fd.get("status") || "").trim();
        const method = String(fd.get("method") || "").trim();
        const from = String(fd.get("from") || "").trim();
        const to = String(fd.get("to") || "").trim();
        const todayKey = getRelativeDateKey(0);
        const tomorrowKey = getRelativeDateKey(1);

        state.filtered = state.rows.filter((row) => {
            const rowStatus = String(row.status || "");
            const rowMethod = String(row.booking_method || "");
            const bookedAt = String(pick(row, ["booked_at", "created_at"]) || "").slice(0, 10);
            const bookedKey = toDateKey(pick(row, ["booked_at", "created_at"]));
            const storeName = String(state.storeMap[row.store_id] || "");
            const profile = state.profileMap[row.customer_profile_id] || {};
            const searchable = [
                row.id,
                row.note,
                row.internal_note,
                row.special_requests,
                row.contact_name,
                row.contact_email,
                row.contact_phone,
                storeName,
                profile.display_name,
                profile.full_name,
                profile.email
            ].map((v) => String(v || "").toLowerCase()).join(" ");

            if (status && rowStatus !== status) return false;
            if (method && rowMethod !== method) return false;
            if (from && bookedAt && bookedAt < from) return false;
            if (to && bookedAt && bookedAt > to) return false;
            if (q && !searchable.includes(q)) return false;
            if (state.quickKey === "today" && bookedKey !== todayKey) return false;
            if (state.quickKey === "tomorrow" && bookedKey !== tomorrowKey) return false;
            if (state.quickKey === "pending" && !isPendingLike(rowStatus)) return false;
            if (state.quickKey === "stale_pending" && !getSlaText(row).startsWith("Overdue")) return false;
            return true;
        });

        summary.textContent = `${state.filtered.length} / ${state.rows.length} bookings (quick: ${state.quickKey})`;
    };

    const loadMaps = async (rows) => {
        const storeIds = [...new Set(rows.map((r) => r.store_id).filter(Boolean))];
        const profileIds = [...new Set(rows.map((r) => r.customer_profile_id).filter(Boolean))];
        state.storeMap = {};
        state.profileMap = {};

        if (storeIds.length) {
            const { data } = await supabase.from("stores").select("id, store_name").in("id", storeIds);
            (data || []).forEach((row) => { state.storeMap[row.id] = row.store_name || row.id; });
        }
        if (profileIds.length) {
            const { data } = await supabase.from("user_profiles").select("id, display_name, full_name, email").in("id", profileIds);
            (data || []).forEach((row) => { state.profileMap[row.id] = row; });
        }
    };

    const syncQuickButtons = () => {
        quickHost.querySelectorAll("[data-quick]").forEach((button) => {
            button.classList.toggle("is-active", button.getAttribute("data-quick") === state.quickKey);
        });
    };
    const applyQuickFromUrl = () => {
        const params = new URLSearchParams(window.location.search);
        const quick = String(params.get("quick") || "all").trim().toLowerCase();
        const allowed = new Set(["all", "today", "tomorrow", "pending", "stale_pending"]);
        state.quickKey = allowed.has(quick) ? quick : "all";
    };

    const loadData = async () => {
        summary.textContent = "Loading...";
        const { data, error } = await supabase
            .from("bookings")
            .select("*")
            .order("booked_at", { ascending: false })
            .limit(400);

        if (error) {
            summary.textContent = `Load failed: ${error.message}`;
            state.rows = [];
            state.filtered = [];
            renderTable();
            renderDetail();
            return;
        }

        state.rows = data || [];
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
        const user = sessionData?.session?.user || null;
        if (!user) {
            window.location.href = "../login.html";
            return;
        }
        applyQuickFromUrl();
        await loadData();
        syncQuickButtons();

        filterForm.addEventListener("submit", (e) => {
            e.preventDefault();
            applyFilters();
            renderTable();
            renderDetail();
        });
        quickHost.querySelectorAll("[data-quick]").forEach((button) => {
            button.addEventListener("click", () => {
                state.quickKey = String(button.getAttribute("data-quick") || "all");
                syncQuickButtons();
                applyFilters();
                renderTable();
                renderDetail();
            });
        });
    };

        init();
    };

    window.addEventListener("admin:render", (event) => {
        if (event?.detail?.pageKey === "appPagesWorkshop") mount();
    });
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", mount, { once: true });
    } else {
        mount();
    }
})();
