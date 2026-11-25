
import { Visitor } from "./visitor.js";

export class VisitorRegistry {
    #records = [];
    #nextId = 1;

    constructor(initialVisitors = []) {
        this.#records = initialVisitors.map(details => new Visitor(details));

        if (this.#records.length > 0) {
            this.#nextId = Math.max(...this.#records.map(visitor => visitor.id)) + 1;
        }
    }

    register(details) {
        const visitor = new Visitor({
            ...details,
            id: this.#nextId++
        });

        this.#records.push(visitor);
        return visitor.toJSON();
    }

    findById(id) {
        const visitorId = Number(id);

        if (!Number.isInteger(visitorId) || visitorId <= 0) {
            return null;
        }

        return this.#records.find(visitor => visitor.id === visitorId) || null;
    }

    getAll() {
        return this.#records.map(visitor => visitor.toJSON());
    }

    checkIn(id) {
        const visitor = this.#records.find(
            visitor => visitor.id === Number(id)
        );

        return visitor ? visitor.checkIn() : false;
    }

    checkOut(id) {
        const visitor = this.#records.find(visitor => visitor.id === Number(id));
        return visitor ? visitor.checkOut() : false;
    }

    updateContact(id, details) {
        const visitor = this.#records.find(visitor => visitor.id === Number(id));

        if (!visitor) return false;

        visitor.updateContact(details);
        return true;
    }

    updateVisitor(id, details) {
        if (!details || typeof details !== "object") return false;
        const visitor = this.findById(id);
        if (!visitor) return false;
        visitor.updateDetails(details);
        return true;
    }

    remove(id) {
        const visitorId = Number(id);
        if (!Number.isInteger(visitorId) || visitorId <= 0) {
            return false;
        }
        const initialLength = this.#records.length;
        this.#records = this.#records.filter(
            visitor => visitor.id !== visitorId
        );
        return this.#records.length < initialLength;
    }

    getCount() {
        return this.#records.length;
    }

    getInsideVisitors() {
        return this.#records
            .filter(visitor => visitor.status === "Inside")
            .map(visitor => visitor.toJSON());
    }

    replaceAll(visitors) {
        this.#records = visitors.map(details => new Visitor(details));

        this.#nextId = this.#records.length
            ? Math.max(...this.#records.map(visitor => visitor.id)) + 1
            : 1;
    }
}