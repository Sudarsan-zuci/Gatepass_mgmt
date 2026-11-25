const VISITORS_STORAGE_KEY = "gatepass.visitors";

export function loadLocalVisitors() {
    const storedVisitors = localStorage.getItem(VISITORS_STORAGE_KEY);

    if (storedVisitors === null) {
        return null;
    }

    const visitors = JSON.parse(storedVisitors);

    if (!Array.isArray(visitors)) {
        throw new Error("Saved visitor data in local storage is invalid.");
    }

    return visitors;
}

export function saveLocalVisitors(visitors) {
    localStorage.setItem(VISITORS_STORAGE_KEY, JSON.stringify(visitors));
}
