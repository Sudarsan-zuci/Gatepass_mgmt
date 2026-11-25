
import { VisitorRegistry } from "./visitorRegistry.js";
import { initializeUI } from "./ui.js";

const visitorRegistry = new VisitorRegistry();

initializeUI(visitorRegistry).catch(error => {
    console.error("Application initialization failed:", error);
});
