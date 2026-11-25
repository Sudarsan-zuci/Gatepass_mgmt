
import { VISITOR_STATUS } from "./config.js";

export class Person {
    constructor({ name, phone, email = "" }) {
        this.name = name;
        this.phone = phone;
        this.email = email;
    }

    getContactDetails() {
        return {
            name: this.name,
            phone: this.phone,
            email: this.email
        };
    }
}

export class Visitor extends Person {
    constructor(details) {
        super({
            name: details.visitorName,
            phone: details.phone,
            email: details.email
        });

        this.id = details.id;
        this.visitorName = details.visitorName;
        this.company = details.company ?? "";
        this.personToMeet = details.personToMeet;
        this.purpose = details.purpose;
        this.visitDate = details.visitDate;
        this.checkInTime = details.checkInTime;
        this.checkOutTime = details.checkOutTime ?? null;
        this.status = details.status ?? VISITOR_STATUS.INSIDE;
        this.photo = details.photo ?? null;
    }

    getSummary() {
        return `${this.visitorName} - ${this.purpose} - ${this.status}`;
    }

    
    checkIn() {
        if (this.status === VISITOR_STATUS.INSIDE) return false;

        const now = new Date();
        this.status = VISITOR_STATUS.INSIDE;
        this.checkInTime = now.toLocaleTimeString();
        this.checkOutTime = null;
        this.visitDate = [
            now.getFullYear(),
            String(now.getMonth() + 1).padStart(2, "0"),
            String(now.getDate()).padStart(2, "0")
        ].join("-");

        return true;
    }

    checkOut() {
        if (this.status === VISITOR_STATUS.CHECKED_OUT) return false;

        if (this.status !== VISITOR_STATUS.INSIDE) return false;

        this.status = VISITOR_STATUS.CHECKED_OUT;
        this.checkOutTime = new Date().toLocaleTimeString();

        return true;
    }


    updateContact({ phone, email }) {
        if (phone !== undefined) this.phone = phone;
        if (email !== undefined) this.email = email;
    }


    updateDetails(details) {
        if (details.visitorName !== undefined) this.visitorName = details.visitorName;
        if (details.phone !== undefined) this.phone = details.phone;
        if (details.email !== undefined) this.email = details.email;
        if (details.company !== undefined) this.company = details.company;
        if (details.personToMeet !== undefined) this.personToMeet = details.personToMeet;
        if (details.purpose !== undefined) this.purpose = details.purpose;
        if (details.photo !== undefined) this.photo = details.photo;
    }


    get hasPhoto() {
        return Boolean(this.photo?.base64);
    }

    toJSON() {
        return {
            id: this.id,
            visitorName: this.visitorName,
            phone: this.phone,
            email: this.email,
            company: this.company,
            personToMeet: this.personToMeet,
            purpose: this.purpose,
            visitDate: this.visitDate,
            checkInTime: this.checkInTime,
            checkOutTime: this.checkOutTime,
            status: this.status,
            photo: this.photo
        };
    }
}

export class InterviewVisitor extends Visitor {
    constructor(details) {
        super(details);
        this.interviewRound = details.interviewRound ?? 1;
    }

    getSummary() {
        return `${super.getSummary()} - Round ${this.interviewRound}`;
    }

    toJSON() {
        return {
            ...super.toJSON(),
            interviewRound: this.interviewRound
        };
    }
}
