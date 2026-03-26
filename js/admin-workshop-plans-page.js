(() => {
    if (document.body?.dataset.pageKey !== "appPagesWorkshopPlans") return;

    const host = document.querySelector('[data-admin-page-host="workshop-plans"]');
    if (!host) return;

    host.innerHTML = `
        <section class="wp-grid">
            <article class="wp-panel">
                <h2>Plans</h2>
                <p class="wp-note" id="wp-summary">Loading...</p>
                <div class="wp-table-wrap">
                    <table class="wp-table" id="wp-table">
                        <thead>
                            <tr>
                                <th>Code</th>
                                <th>Name</th>
                                <th>Status</th>
                                <th>Sort</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
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
    if (!tableBody || !summary || !form || !msg || !btnNew || !btnDelete || !incForm || !incList || !incMsg) return;

    const state = { plans: [], selectedId: "", inclusions: [] };
    const esc = (v) => String(v ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#39;");
    const n = (v, d = null) => {
        const x = String(v ?? "").trim();
        if (!x) return d;
        const y = Number(x);
        return Number.isFinite(y) ? y : d;
    };
    const getSelected = () => state.plans.find((x) => String(x.id) === String(state.selectedId));

    const renderTable = () => {
        tableBody.innerHTML = state.plans.map((p) => `
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
        summary.textContent = `${state.plans.length} plans loaded`;
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
        const { data, error } = await supabase
            .from("workshop_plans")
            .select("id, plan_code, plan_name, plan_summary, plan_description, plan_image_url, booking_label, duration_min_minutes, duration_max_minutes, base_price_jpy, pair_price_jpy, min_party_size, max_party_size, status, sort_order")
            .order("sort_order", { ascending: true });
        if (error) {
            summary.textContent = `Load failed: ${error.message}`;
            state.plans = [];
            renderTable();
            return;
        }
        state.plans = data || [];
        if (!state.selectedId && state.plans.length) state.selectedId = state.plans[0].id;
        fillForm(getSelected() || null);
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
        const user = sessionData?.session?.user || null;
        if (!user) {
            window.location.href = "../login.html";
            return;
        }

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
    };

    init();
})();
