
const API_URL = "https://jsonblob.com/api/jsonBlob";
const BLOB_ID = "01a2122b-ea45-7c3a-8423-e5bf15ec3cb9";

function getBlobURL() {
    if (!BLOB_ID || BLOB_ID === "https://jsonblob.com/01a2122b-ea45-7c3a-8423-e5bf15ec3cb9") {
        throw new Error("Please configure your JSONBlob ID in api.js.");
    }

    return `${API_URL}/${BLOB_ID}`;
}

async function handleResponse(response) {
    if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response;
}

// GET: Retrieve all visitor records
export async function fetchVisitors() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(
                `Server error: ${response.status} ${response.statusText}`
            );
        }

        const data = await response.json();

        if (!Array.isArray(data.visitors)) {
            throw new Error("Invalid data received from JSONBlob.");
        }

        return data.visitors;
    } catch (error) {
        console.error("JSONBlob API error:", error);

        throw new Error(
            error.message || "Unable to retrieve visitor data."
        );
    }
}

