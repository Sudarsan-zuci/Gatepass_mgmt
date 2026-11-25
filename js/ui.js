
import { VISITOR_STATUS } from "./config.js";
import { readImageFile } from "./image.js";
import { validateVisitor } from "./validation.js";
import { fetchVisitors } from "./api.js";
import { loadLocalVisitors, saveLocalVisitors } from "./localStorage.js";

export async function initializeUI(visitorRegistry) {
    const visitorForm = document.getElementById("visitorForm");
    const nameInput = document.getElementById("visitorName");
    const phoneInput = document.getElementById("visitorPhone");
    const emailInput = document.getElementById("visitorEmail");
    const companyInput = document.getElementById("visitorCompany");
    const personInput = document.getElementById("personToMeet");
    const purposeInput = document.getElementById("visitorPurpose");
    const photoInput = document.getElementById("visitorPhoto");
    const photoPreview = document.getElementById("photoPreview");
    const searchInput = document.getElementById("visitorSearch");
    const statusFilter = document.getElementById("statusFilter");
    const tableBody = document.getElementById("visitorTableBody");
    const totalElement = document.getElementById("totalVisitors");
    const insideElement = document.getElementById("insideVisitors");
    const checkedOutElement = document.getElementById("checkedOutVisitors");
    const todayVisitorsElement = document.getElementById("todayVisitors");
    const emptyMessage = document.getElementById("emptyMessage");
    const dailyReportDate = document.getElementById("dailyReportDate");
    const monthlyReportDate = document.getElementById("monthlyReportDate");
    const yearlyReportDate = document.getElementById("yearlyReportDate");
    const dailyReportButton = document.getElementById("dailyReportButton");
    const monthlyReportButton = document.getElementById("monthlyReportButton");
    const yearlyReportButton = document.getElementById("yearlyReportButton");
    const reportResults = document.getElementById("reportResults");
    const reportTitle = document.getElementById("reportTitle");
    const reportTotalVisitors = document.getElementById("reportTotalVisitors");
    const reportInsideVisitors = document.getElementById("reportInsideVisitors");
    const reportCheckedOutVisitors = document.getElementById("reportCheckedOutVisitors");
    const purposeReportBody = document.getElementById("purposeReportBody");
    const reportVisitorTableBody = document.getElementById("reportVisitorTableBody");
    const reportEmptyMessage = document.getElementById("reportEmptyMessage");
    const editVisitorSection = document.getElementById("editVisitorSection");
    const editVisitorForm = document.getElementById("editVisitorForm");
    const editVisitorId = document.getElementById("editVisitorId");
    const editVisitorName = document.getElementById("editVisitorName");
    const editVisitorPhone = document.getElementById("editVisitorPhone");
    const editVisitorEmail = document.getElementById("editVisitorEmail");
    const editVisitorCompany = document.getElementById("editVisitorCompany");
    const editPersonToMeet = document.getElementById("editPersonToMeet");
    const editVisitorPurpose = document.getElementById("editVisitorPurpose");
    const editVisitorPhoto = document.getElementById("editVisitorPhoto");
    const editPhotoPreview = document.getElementById("editPhotoPreview");
    const updateVisitorButton = document.getElementById("updateVisitorButton");
    const cancelEditButton = document.getElementById("cancelEditButton");
    const submitButton = visitorForm.querySelector('button[type="submit"]');
    const navLinks = document.querySelectorAll(".sidebar-nav .nav-link");

    let selectedPhoto = null;

    function escapeHTML(value) {
        return String(value ?? "").replace(/[&<>"']/g, character => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        })[character]);
    }

    function getLocalDateString() {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
    }

    dailyReportDate.value = getLocalDateString();
    monthlyReportDate.value = dailyReportDate.value.slice(0, 7);
    yearlyReportDate.value = String(new Date().getFullYear());

    // 1. IMAGE PREVIEW
    async function handleImageSelection(event) {
        const file = event.target.files[0];

        if (!file) {
            selectedPhoto = null;
            photoPreview.src = "";
            photoPreview.hidden = true;
            return;
        }

        try {
            selectedPhoto = await readImageFile(file);
            photoPreview.src = selectedPhoto.base64;
            photoPreview.hidden = false;
        } catch (error) {
            selectedPhoto = null;
            photoInput.value = "";
            photoPreview.src = "";
            photoPreview.hidden = true;
            alert(error.message);
        }
    }

    // 2. SAVE CURRENT REGISTRY DATA LOCALLY
    function persistVisitors() {
        saveLocalVisitors(visitorRegistry.getAll());
    }

    function updateDashboard(visitors) {
        totalElement.textContent = visitors.length;
        insideElement.textContent = visitors.filter(
            visitor => visitor.status === VISITOR_STATUS.INSIDE
        ).length;
        checkedOutElement.textContent = visitors.filter(
            visitor => visitor.status === VISITOR_STATUS.CHECKED_OUT
        ).length;
        todayVisitorsElement.textContent = visitors.filter(
            visitor => visitor.visitDate === getLocalDateString()
        ).length;
    }

    // 3. RENDER VISITORS
    function renderVisitors() {
        const allVisitors = visitorRegistry.getAll();
        const searchValue = searchInput.value.trim().toLowerCase();
        const selectedStatus = statusFilter.value;

        const filteredVisitors = allVisitors.filter(visitor => {
            const matchesSearch = [
                visitor.visitorName,
                visitor.phone,
                visitor.company,
                visitor.personToMeet
            ].some(value => String(value ?? "").toLowerCase().includes(searchValue));

            const matchesStatus =
                selectedStatus === "all" || visitor.status === selectedStatus;

            return matchesSearch && matchesStatus;
        });

        tableBody.innerHTML = filteredVisitors.map(visitor => `
                <tr>
                    <td>${escapeHTML(visitor.id)}</td>
                    <td>${escapeHTML(visitor.visitorName)}</td>
                    <td>${escapeHTML(visitor.phone)}</td>
                    <td>${escapeHTML(visitor.personToMeet)}</td>
                    <td>${escapeHTML(visitor.purpose)}</td>
                    <td>${escapeHTML(visitor.visitDate || "-")}</td>
                    <td>${escapeHTML(visitor.checkInTime || "-")}</td>
                    <td>${escapeHTML(visitor.checkOutTime || "-")}</td>
                    <td>${escapeHTML(visitor.status)}</td>
                    <td>
                        <button type="button" data-action="edit" data-id="${visitor.id}">Edit</button>
                        ${visitor.status === VISITOR_STATUS.INSIDE
                            ? `<button type="button" data-action="checkout" data-id="${visitor.id}">Check Out</button>`
                            : `<button type="button" data-action="checkin" data-id="${visitor.id}">Check In</button>`
                        }
                        <button type="button" data-action="delete" data-id="${visitor.id}">Delete</button>
                    </td>
                </tr>
            `).join("");

        updateDashboard(allVisitors);
        emptyMessage.hidden = filteredVisitors.length > 0;
    }

    function generateReport(type, period) {
        const visitors = visitorRegistry.getAll();

        if (!period) {
            alert("Please select a valid reporting period.");
            return;
        }

        let filteredVisitors;

        if (type === "daily") {
            filteredVisitors = visitors.filter(visitor => visitor.visitDate === period);
        } else if (type === "monthly") {
            filteredVisitors = visitors.filter(visitor => visitor.visitDate?.startsWith(period));
        } else if (type === "yearly") {
            filteredVisitors = visitors.filter(visitor => visitor.visitDate?.startsWith(`${period}-`));
        } else {
            alert("Invalid report type.");
            return;
        }

        const totalVisitors = filteredVisitors.length;
        const insideVisitors = filteredVisitors.filter(
            visitor => visitor.status === VISITOR_STATUS.INSIDE
        ).length;
        const checkedOutVisitors = filteredVisitors.filter(
            visitor => visitor.status === VISITOR_STATUS.CHECKED_OUT
        ).length;
        const purposeStatistics = filteredVisitors.reduce((result, visitor) => {
            const purpose = visitor.purpose || "Unknown";
            result[purpose] = (result[purpose] || 0) + 1;
            return result;
        }, {});

        reportTitle.textContent =
            `${type.charAt(0).toUpperCase() + type.slice(1)} Visitor Report - ${period}`;
        reportTotalVisitors.textContent = totalVisitors;
        reportInsideVisitors.textContent = insideVisitors;
        reportCheckedOutVisitors.textContent = checkedOutVisitors;
        purposeReportBody.innerHTML = Object.entries(purposeStatistics)
            .map(([purpose, count]) => `
                <tr>
                    <td>${escapeHTML(purpose)}</td>
                    <td>${count}</td>
                </tr>
            `).join("");
        reportVisitorTableBody.innerHTML = filteredVisitors
            .map(visitor => `
                <tr>
                    <td>${escapeHTML(visitor.id)}</td>
                    <td>${escapeHTML(visitor.visitorName)}</td>
                    <td>${escapeHTML(visitor.company || "-")}</td>
                    <td>${escapeHTML(visitor.purpose || "Unknown")}</td>
                    <td>${escapeHTML(visitor.visitDate || "-")}</td>
                    <td>${escapeHTML(visitor.status)}</td>
                </tr>
            `).join("");

        reportEmptyMessage.hidden = totalVisitors > 0;
        reportResults.hidden = false;
    }

    // 4. REGISTER VISITOR AND SAVE LOCALLY
    async function handleVisitorRegistration(event) {
        event.preventDefault();

        if (submitButton.disabled) return;

        submitButton.disabled = true;
        submitButton.textContent = "Registering...";

        try {
            const details = {
                visitorName: nameInput.value.trim(),
                phone: phoneInput.value.trim(),
                email: emailInput.value.trim(),
                company: companyInput.value.trim(),
                personToMeet: personInput.value.trim(),
                purpose: purposeInput.value,
                visitDate: getLocalDateString(),
                checkInTime: new Date().toLocaleTimeString(),
                checkOutTime: null,
                status: VISITOR_STATUS.INSIDE,
                photo: null
            };

            const validation = validateVisitor(details);

            if (!validation.isValid) {
                throw new Error(validation.errors.join("\n"));
            }

            const imageFile = photoInput.files[0];

            if (imageFile) {
                details.photo = await readImageFile(imageFile);
            }

            visitorRegistry.register(details);
            await persistVisitors();

            visitorForm.reset();
            selectedPhoto = null;
            photoPreview.src = "";
            photoPreview.hidden = true;

            renderVisitors();
            alert("Visitor registered and saved locally!");
        } catch (error) {
            console.error("Registration error:", error);
            alert(error.message || "Unable to register visitor.");
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = "Register Visitor";
        }
    }

    // 5. SEARCH AND FILTER
    searchInput.addEventListener("input", renderVisitors);
    statusFilter.addEventListener("change", renderVisitors);
    dailyReportButton.addEventListener("click", () => {
        generateReport("daily", dailyReportDate.value);
    });
    monthlyReportButton.addEventListener("click", () => {
        generateReport("monthly", monthlyReportDate.value);
    });
    yearlyReportButton.addEventListener("click", () => {
        const year = yearlyReportDate.value.trim();

        if (!/^\d{4}$/.test(year) || Number(year) < 2000 || Number(year) > 2100) {
            alert("Please enter a valid year between 2000 and 2100.");
            return;
        }

        generateReport("yearly", year);
    });

    // 6. CHECK-IN, CHECK-OUT AND DELETE
    tableBody.addEventListener("click", async function (event) {
        const button = event.target.closest("button[data-action]");

        if (!button) return;

        const id = Number(button.dataset.id);
        const action = button.dataset.action;

        if (action === "edit") {
            editVisitor(id);
            return;
        }

        button.disabled = true;

        try {
            if (action === "checkin") {
                const success = visitorRegistry.checkIn(id);

                if (!success) {
                    throw new Error("Unable to check in this visitor.");
                }

                await persistVisitors();
            }

            if (action === "checkout") {
                const success = visitorRegistry.checkOut(id);

                if (!success) {
                    throw new Error("Unable to check out this visitor.");
                }

                await persistVisitors();
            }

            if (action === "delete") {
                const confirmed = confirm("Are you sure you want to delete this visitor?");

                if (!confirmed) return;

                const success = visitorRegistry.remove(id);

                if (!success) {
                    throw new Error("Unable to delete this visitor.");
                }

                await persistVisitors();
            }

            renderVisitors();
        } catch (error) {
            console.error("Visitor update error:", error);
            alert("The operation could not be saved locally: " + error.message);
        } finally {
            renderVisitors();
        }
    });

    // 7. LOAD VISITORS FROM LOCAL STORAGE OR JSONBLOB
    try {
        const localVisitors = loadLocalVisitors();

        if (localVisitors !== null) {
            visitorRegistry.replaceAll(localVisitors);
            console.log("Visitors loaded from local storage:", localVisitors.length);
        } else {
            const visitors = await fetchVisitors();
            visitorRegistry.replaceAll(visitors);
            persistVisitors();
            console.log("Visitors loaded from JSONBlob:", visitors.length);
        }
    } catch (error) {
        console.error("Unable to load visitor records:", error);
        alert("Unable to load visitor records. Check local storage or the JSONBlob connection.");
    }

    // 8. REGISTER EVENTS AND DISPLAY DATA
    photoInput.addEventListener("change", handleImageSelection);
    visitorForm.addEventListener("submit", handleVisitorRegistration);

    renderVisitors();

    function editVisitor(id) {
        const visitor = visitorRegistry.findById(id);
        if (!visitor) {
            alert("Visitor not found.");
            return;
        }

        editVisitorId.value = visitor.id;
        editVisitorName.value = visitor.visitorName;
        editVisitorPhone.value = visitor.phone;
        editVisitorEmail.value = visitor.email || "";
        editVisitorCompany.value = visitor.company || "";
        editPersonToMeet.value = visitor.personToMeet;
        editVisitorPurpose.value = visitor.purpose;

        editVisitorPhoto.value = "";

        if (visitor.photo?.base64) {
            editPhotoPreview.src = visitor.photo.base64;
            editPhotoPreview.hidden = false;
        } else {
            editPhotoPreview.removeAttribute("src");
            editPhotoPreview.hidden = true;
        }

        editVisitorSection.hidden = false;
        editVisitorSection.scrollIntoView({ behavior: "smooth" });
    }


    editVisitorForm.addEventListener("submit", async event => {
        event.preventDefault();

        if (updateVisitorButton.disabled) return;

        const id = Number(editVisitorId.value);
        const existingVisitor = visitorRegistry.findById(id);

        if (!existingVisitor) {
            alert("Visitor not found.");
            return;
        }

        const details = {
            visitorName: editVisitorName.value.trim(),
            phone: editVisitorPhone.value.trim(),
            email: editVisitorEmail.value.trim(),
            company: editVisitorCompany.value.trim(),
            personToMeet: editPersonToMeet.value.trim(),
            purpose: editVisitorPurpose.value
        };

        const validation = validateVisitor(details);

        if (!validation.isValid) {
            alert(validation.errors.join("\n"));
            return;
        }

        updateVisitorButton.disabled = true;

        try {
            if (editVisitorPhoto.files[0]) {
                details.photo = await readImageFile(editVisitorPhoto.files[0]);
            }

            const updated = visitorRegistry.updateVisitor(id, details);

            if (!updated) {
                throw new Error("Unable to update visitor.");
            }

            persistVisitors();

            renderVisitors();
            editVisitorForm.reset();
            editPhotoPreview.removeAttribute("src");
            editPhotoPreview.hidden = true;
            editVisitorSection.hidden = true;

            alert("Visitor details updated successfully.");
        } catch (error) {
            console.error("Visitor update error:", error);
            alert(error.message || "Unable to update visitor.");
        } finally {
            updateVisitorButton.disabled = false;
        }
    });

    cancelEditButton.addEventListener("click", () => {
        editVisitorForm.reset();
        editPhotoPreview.removeAttribute("src");
        editPhotoPreview.hidden = true;
        editVisitorSection.hidden = true;
    });

    function setActiveNavLink(hash = window.location.hash || "#dashboard") {
        navLinks.forEach(link => {
            link.classList.toggle("active", link.getAttribute("href") === hash);
        });
    }

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            setActiveNavLink(link.getAttribute("href"));
        });
    });

    window.addEventListener("hashchange", () => setActiveNavLink());
    setActiveNavLink();
}
