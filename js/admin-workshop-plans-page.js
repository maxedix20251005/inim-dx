(() => {
    if (document.body?.dataset.pageKey !== "appPagesWorkshopPlans") return;

    let mountedHost = null;
    const mount = () => {
        const host = document.querySelector('[data-admin-page-host="workshop-plans"]');
        if (!host || host === mountedHost) return;
        mountedHost = host;

        host.innerHTML = `
        <section class="wp-grid">
            <article class="wp-panel">
                <h2>Plans</h2>
                <p class="wp-note" id="wp-summary">Loading...</p>
                <div class="wp-table-wrap">
                    <table class="wp-table" id="wp-table">
                        <thead>
                            <tr>
                                <th><button type="button" class="wp-sort" data-sort-key="plan_code">Code</button></th>
                                <th><button type="button" class="wp-sort" data-sort-key="plan_name">Name</button></th>
                                <th><button type="button" class="wp-sort" data-sort-key="status">Status</button></th>
                                <th><button type="button" class="wp-sort" data-sort-key="sort_order">Sort</button></th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
                <div class="wp-pager" id="wp-pager">
                    <button type="button" id="wp-prev">Prev</button>
                    <span id="wp-page-info">Page 1 / 1</span>
                    <button type="button" id="wp-next">Next</button>
                    <label for="wp-page-size">Rows</label>
                    <select id="wp-page-size">
                        <option value="10">10</option>
                        <option value="20" selected>20</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
                </div>
            </article>

            <aside class="wp-subgrid">
                <section class="wp-panel">
                    <div class="wp-actions">
                        <button type="button" class="wp-btn-secondary" id="wp-new">New Plan</button>
                    </div>
                    <form class="wp-form" id="wp-plan-form">
                        <input type="hidden" name="id">
                        <div class="wp-form-grid">
                            <input name="plan_code" placeholder="plan_code (unique)" required>
                            <input name="plan_name" placeholder="plan_name" required>
                            <textarea class="wp-wide" name="plan_summary" rows="2" placeholder="plan_summary" required></textarea>
                            <textarea class="wp-wide" name="plan_description" rows="3" placeholder="plan_description" required></textarea>
                            <input class="wp-wide" name="plan_image_url" placeholder="plan_image_url (e.g. ../images/Workshop/xxx.png)">
                            <input name="duration_min_minutes" type="number" min="1" placeholder="duration_min_minutes" required>
                            <input name="duration_max_minutes" type="number" min="1" placeholder="duration_max_minutes">
                            <input name="base_price_jpy" type="number" min="0" placeholder="base_price_jpy" required>
                            <input name="pair_price_jpy" type="number" min="0" placeholder="pair_price_jpy">
                            <input name="min_party_size" type="number" min="1" placeholder="min_party_size" required>
                            <input name="max_party_size" type="number" min="1" placeholder="max_party_size" required>
                            <select name="status">
                                <option value="draft">draft</option>
                                <option value="active">active</option>
                                <option value="inactive">inactive</option>
                            </select>
                            <input name="sort_order" type="number" min="1" placeholder="sort_order" required>
                            <input class="wp-wide" name="booking_label" placeholder="booking_label">
                        </div>
                        <div class="wp-actions">
                            <button class="wp-btn-primary" type="submit">Save Plan</button>
                            <button class="wp-btn-danger" type="button" id="wp-delete">Delete Plan</button>
                        </div>
                    </form>
                    <p class="wp-note" id="wp-plan-msg"></p>
                </section>

                <section class="wp-panel">
                    <h3>Plan Inclusions</h3>
                    <p class="wp-note">選択中プランの workshop_plan_inclusions を管理します。</p>
                    <form class="wp-form" id="wp-inc-form">
                        <div class="wp-inline">
                            <input name="inclusion_text" placeholder="inclusion_text" required>
                            <input name="display_order" type="number" min="1" placeholder="order">
                            <button class="wp-btn-primary" type="submit">Add</button>
                        </div>
                    </form>
                    <ul class="wp-list" id="wp-inc-list"></ul>
                    <p class="wp-note" id="wp-inc-msg"></p>
                </section>
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

        const tableBody = document.querySelector("#wp-table tbody");
        const summary = document.getElementById("wp-summary");
        const form = document.getElementById("wp-plan-form");
        const msg = document.getElementById("wp-plan-msg");
        const btnNew = document.getElementById("wp-new");
        const btnDelete = document.getElementById("wp-delete");
        const incForm = document.getElementById("wp-inc-form");
        const incList = document.getElementById("wp-inc-list");
        const incMsg = document.getElementById("wp-inc-msg");
        const prevBtn = document.getElementById("wp-prev");
        const nextBtn = document.getElementById("wp-next");
        const pageInfo = document.getElementById("wp-page-info");
        const pageSizeSelect = document.getElementById("wp-page-size");
        if (!tableBody || !summary || !form || !msg || !btnNew || !btnDelete || !incForm || !incList || !incMsg || !prevBtn || !nextBtn || !pageInfo || !pageSizeSelect) return;

        const PREFERENCE_KEY = "admin_workshop_plans_preferences_v1";
        const state = {
            plans: [],
            selectedId: "",
            inclusions: [],
            sortKey: "sort_order",
            sortDir: "asc",
            page: 1,
            pageSize: 20,
            loadError: ""
        };
        const esc = (v) => String(v ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#39;");
        const n = (v, d = null) => {
            const x = String(v ?? "").trim();
            if (!x) return d;
            const y = Number(x);
            return Number.isFinite(y) ? y : d;
        };
        const getSelected = () => state.plans.find((x) => String(x.id) === String(state.selectedId));
        const getSortValue = (row, key) => {
            if (key === "sort_order") return Number(row?.sort_order ?? 0);
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
        const getMaxPage = () => Math.max(1, Math.ceil(state.plans.length / Math.max(1, state.pageSize)));
        const getPageRows = () => {
            const start = (state.page - 1) * state.pageSize;
            return state.plans.slice(start, start + state.pageSize);
        };
        const syncSortButtons = () => {
            const map = { plan_code: "Code", plan_name: "Name", status: "Status", sort_order: "Sort" };
            host.querySelectorAll(".wp-sort").forEach((btn) => {
                const key = String(btn.getAttribute("data-sort-key") || "");
                const isActive = key === state.sortKey;
                const arrow = isActive ? (state.sortDir === "asc" ? " ▲" : " ▼") : "";
                btn.classList.toggle("is-active", isActive);
                btn.textContent = `${map[key] || key}${arrow}`;
            });
        };
        const savePreferences = () => {
            try {
                window.localStorage.setItem(PREFERENCE_KEY, JSON.stringify({
                    sortKey: state.sortKey,
                    sortDir: state.sortDir,
                    pageSize: state.pageSize
                }));
            } catch { }
        };
        const applySavedPreferences = () => {
            try {
                const raw = window.localStorage.getItem(PREFERENCE_KEY);
                if (!raw) return;
                const pref = JSON.parse(raw);
                if (["plan_code", "plan_name", "status", "sort_order"].includes(String(pref.sortKey || ""))) state.sortKey = String(pref.sortKey);
                if (["asc", "desc"].includes(String(pref.sortDir || ""))) state.sortDir = String(pref.sortDir);
                const size = Number(pref.pageSize);
                if ([10, 20, 50, 100].includes(size)) state.pageSize = size;
            } catch { }
        };

        const renderTable = () => {
            if (state.loadError) {
                tableBody.innerHTML = `<tr><td colspan="4">Load failed: ${esc(state.loadError)}</td></tr>`;
                pageInfo.textContent = "Page 1 / 1";
                prevBtn.disabled = true;
                nextBtn.disabled = true;
                return;
            }
            const rows = getPageRows();
            if (!rows.length) {
                tableBody.innerHTML = `<tr><td colspan="4">No plans found.</td></tr>`;
                pageInfo.textContent = "Page 1 / 1";
                prevBtn.disabled = true;
                nextBtn.disabled = true;
                return;
            }
            tableBody.innerHTML = rows.map((p) => `
                <tr data-id="${esc(p.id)}" class="${state.selectedId === p.id ? "is-selected" : ""}">
                    <td>${esc(p.plan_code || "")}</td>
                    <td>${esc(p.plan_name || "")}</td>
                    <td>${esc(p.status || "")}</td>
                    <td>${esc(String(p.sort_order ?? ""))}</td>
                </tr>
            `).join("");
            tableBody.querySelectorAll("tr[data-id]").forEach((tr) => tr.addEventListener("click", async () => {
                state.selectedId = tr.dataset.id || "";
                fillForm(getSelected());
                renderTable();
                await loadInclusions();
            }));

            const maxPage = getMaxPage();
            pageInfo.textContent = `Page ${state.page} / ${maxPage}`;
            prevBtn.disabled = state.page <= 1;
            nextBtn.disabled = state.page >= maxPage;
        };

        const fillForm = (row) => {
            form.elements.id.value = row?.id || "";
            form.elements.plan_code.value = row?.plan_code || "";
            form.elements.plan_name.value = row?.plan_name || "";
            form.elements.plan_summary.value = row?.plan_summary || "";
            form.elements.plan_description.value = row?.plan_description || "";
            form.elements.plan_image_url.value = row?.plan_image_url || "";
            form.elements.duration_min_minutes.value = row?.duration_min_minutes ?? "";
            form.elements.duration_max_minutes.value = row?.duration_max_minutes ?? "";
            form.elements.base_price_jpy.value = row?.base_price_jpy ?? "";
            form.elements.pair_price_jpy.value = row?.pair_price_jpy ?? "";
            form.elements.min_party_size.value = row?.min_party_size ?? 1;
            form.elements.max_party_size.value = row?.max_party_size ?? 1;
            form.elements.status.value = row?.status || "draft";
            form.elements.sort_order.value = row?.sort_order ?? 1;
            form.elements.booking_label.value = row?.booking_label || "";
            msg.textContent = row ? `Editing: ${row.plan_code}` : "New plan mode";
        };

        const renderInclusions = () => {
            incList.innerHTML = state.inclusions.map((x) => `
                <li>
                    <span>${esc(String(x.display_order ?? 0))}. ${esc(x.inclusion_text || "")}</span>
                    <button class="wp-btn-danger" type="button" data-inc-id="${esc(x.id)}">Delete</button>
                </li>
            `).join("");
            incList.querySelectorAll("[data-inc-id]").forEach((btn) => btn.addEventListener("click", async () => {
                const id = btn.getAttribute("data-inc-id") || "";
                const { error } = await supabase.from("workshop_plan_inclusions").delete().eq("id", id);
                if (error) {
                    incMsg.textContent = `Delete failed: ${error.message}`;
                    return;
                }
                incMsg.textContent = "Deleted.";
                await loadInclusions();
            }));
        };

        const loadInclusions = async () => {
            const row = getSelected();
            state.inclusions = [];
            incMsg.textContent = "";
            if (!row?.id) {
                renderInclusions();
                return;
            }
            const { data, error } = await supabase
                .from("workshop_plan_inclusions")
                .select("id, plan_id, inclusion_text, display_order")
                .eq("plan_id", row.id)
                .order("display_order", { ascending: true });
            if (error) {
                incMsg.textContent = `Load failed: ${error.message}`;
                renderInclusions();
                return;
            }
            state.inclusions = data || [];
            renderInclusions();
        };

        const loadPlans = async () => {
            summary.textContent = "Loading...";
            state.loadError = "";
            const { data, error } = await supabase
                .from("workshop_plans")
                .select("id, plan_code, plan_name, plan_summary, plan_description, plan_image_url, booking_label, duration_min_minutes, duration_max_minutes, base_price_jpy, pair_price_jpy, min_party_size, max_party_size, status, sort_order")
                .order("sort_order", { ascending: true });
            if (error) {
                state.loadError = error.message || "Unknown error";
                summary.textContent = `Load failed: ${state.loadError}`;
                state.plans = [];
                state.page = 1;
                renderTable();
                return;
            }
            state.plans = data || [];
            sortRows(state.plans);
            const maxPage = getMaxPage();
            if (state.page > maxPage) state.page = maxPage;
            if (!state.selectedId && state.plans.length) state.selectedId = state.plans[0].id;
            fillForm(getSelected() || null);
            summary.textContent = `${state.plans.length} plans loaded (sort: ${state.sortKey} ${state.sortDir})`;
            savePreferences();
            syncSortButtons();
            renderTable();
            await loadInclusions();
        };

        const payloadFromForm = () => ({
            plan_code: String(form.elements.plan_code.value || "").trim(),
            plan_name: String(form.elements.plan_name.value || "").trim(),
            plan_summary: String(form.elements.plan_summary.value || "").trim(),
            plan_description: String(form.elements.plan_description.value || "").trim(),
            plan_image_url: String(form.elements.plan_image_url.value || "").trim() || null,
            booking_label: String(form.elements.booking_label.value || "").trim() || null,
            duration_min_minutes: n(form.elements.duration_min_minutes.value, 60),
            duration_max_minutes: n(form.elements.duration_max_minutes.value, null),
            base_price_jpy: n(form.elements.base_price_jpy.value, 0),
            pair_price_jpy: n(form.elements.pair_price_jpy.value, null),
            min_party_size: n(form.elements.min_party_size.value, 1),
            max_party_size: n(form.elements.max_party_size.value, 1),
            status: String(form.elements.status.value || "draft").trim(),
            sort_order: n(form.elements.sort_order.value, 1)
        });

        const validate = (p) => {
            if (!p.plan_code || !p.plan_name || !p.plan_summary || !p.plan_description) return "Required fields are missing.";
            if (p.duration_min_minutes < 1) return "duration_min_minutes must be >= 1.";
            if (p.duration_max_minutes !== null && p.duration_max_minutes < p.duration_min_minutes) return "duration_max_minutes must be >= duration_min_minutes.";
            if (p.max_party_size < p.min_party_size) return "max_party_size must be >= min_party_size.";
            if (!["draft", "active", "inactive"].includes(p.status)) return "status must be draft/active/inactive.";
            return "";
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
            await loadPlans();

            btnNew.addEventListener("click", async () => {
                state.selectedId = "";
                fillForm(null);
                renderTable();
                await loadInclusions();
            });

            form.addEventListener("submit", async (e) => {
                e.preventDefault();
                const id = String(form.elements.id.value || "").trim();
                const payload = payloadFromForm();
                const errMsg = validate(payload);
                if (errMsg) {
                    msg.textContent = errMsg;
                    return;
                }
                msg.textContent = "Saving...";
                if (id) {
                    const { error } = await supabase.from("workshop_plans").update(payload).eq("id", id);
                    if (error) {
                        msg.textContent = `Save failed: ${error.message}`;
                        return;
                    }
                    msg.textContent = "Updated.";
                    state.selectedId = id;
                } else {
                    const { data, error } = await supabase.from("workshop_plans").insert(payload).select("id").limit(1);
                    if (error) {
                        msg.textContent = `Create failed: ${error.message}`;
                        return;
                    }
                    msg.textContent = "Created.";
                    state.selectedId = data?.[0]?.id || "";
                }
                await loadPlans();
            });

            btnDelete.addEventListener("click", async () => {
                const row = getSelected();
                if (!row?.id) {
                    msg.textContent = "Delete target is not selected.";
                    return;
                }
                if (!window.confirm(`Delete plan "${row.plan_code}"? Related sessions/inclusions may be deleted by FK cascade.`)) return;
                msg.textContent = "Deleting...";
                const { error } = await supabase.from("workshop_plans").delete().eq("id", row.id);
                if (error) {
                    msg.textContent = `Delete failed: ${error.message}`;
                    return;
                }
                msg.textContent = "Deleted.";
                state.selectedId = "";
                await loadPlans();
            });

            incForm.addEventListener("submit", async (e) => {
                e.preventDefault();
                const row = getSelected();
                if (!row?.id) {
                    incMsg.textContent = "Select a plan first.";
                    return;
                }
                const fd = new FormData(incForm);
                const inclusionText = String(fd.get("inclusion_text") || "").trim();
                const displayOrder = n(fd.get("display_order"), state.inclusions.length + 1);
                if (!inclusionText) {
                    incMsg.textContent = "inclusion_text is required.";
                    return;
                }
                incMsg.textContent = "Adding...";
                const { error } = await supabase.from("workshop_plan_inclusions").insert({
                    plan_id: row.id,
                    inclusion_text: inclusionText,
                    display_order: displayOrder
                });
                if (error) {
                    incMsg.textContent = `Add failed: ${error.message}`;
                    return;
                }
                incMsg.textContent = "Added.";
                incForm.reset();
                await loadInclusions();
            });

            host.querySelectorAll(".wp-sort").forEach((button) => {
                button.addEventListener("click", async () => {
                    const nextKey = String(button.getAttribute("data-sort-key") || "sort_order");
                    if (state.sortKey === nextKey) state.sortDir = state.sortDir === "asc" ? "desc" : "asc";
                    else {
                        state.sortKey = nextKey;
                        state.sortDir = nextKey === "sort_order" ? "asc" : "asc";
                    }
                    state.page = 1;
                    await loadPlans();
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
                savePreferences();
                renderTable();
            });
        };

        init();
    };

    window.addEventListener("admin:render", (event) => {
        if (event?.detail?.pageKey === "appPagesWorkshopPlans") mount();
    });
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", mount, { once: true });
    } else {
        mount();
    }
})();
