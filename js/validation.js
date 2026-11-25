export function validateVisitor(visitor) {
    const errors = {};

    if (!visitor.visitorName?.trim()) {
        errors.visitorName = "Visitor name is required.";
    } else if (visitor.visitorName.trim().length < 3) {
        errors.visitorName = "Name must contain at least 3 characters.";
    }

    if (!/^[6-9]\d{9}$/.test(visitor.phone || "")) {
        errors.phone = "Enter a valid 10-digit Indian mobile number.";
    }

    if (visitor.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(visitor.email)) {
        errors.email = "Enter a valid email address.";
    }

    if (!visitor.personToMeet?.trim()) {
        errors.personToMeet = "Person to meet is required.";
    }

    if (!visitor.purpose?.trim()) {
        errors.purpose = "Visit purpose is required.";
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
}