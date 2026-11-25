export function readImageFile(file) {
    return new Promise((resolve, reject) => {
        if (!file) {
            reject(new Error("Please select an image."));
            return;
        }

        if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
            reject(new Error("Only JPG, PNG, and WEBP images are allowed."));
            return;
        }

        const maxSize = 5 * 1024 * 1024;

        if (file.size > maxSize) {
            reject(new Error("Image size must be below 5 MB."));
            return;
        }

        const reader = new FileReader();

        reader.onload = () => {
            if (typeof reader.result !== "string") {
                reject(new Error("Unable to convert image."));
                return;
            }

            resolve({
                fileName: file.name,
                mimeType: file.type,
                base64: reader.result
            });
        };

        reader.onerror = () => {
            reject(new Error("Unable to read the image."));
        };

        reader.onabort = () => {
            reject(new Error("Image reading was cancelled."));
        };

        reader.readAsDataURL(file);
    });
}