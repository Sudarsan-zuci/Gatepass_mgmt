// =====================================================
// 1. APPLICATION INITIALIZATION
// =====================================================

(function () {

    console.log("=================================");
    console.log("GATE PASS MANAGEMENT SYSTEM");
    console.log("=================================");

    const systemName = "Gate Pass Management";

    console.log("System Started:", systemName);

})();


// =====================================================
// 2. INITIAL VISITOR DATA
// =====================================================

const visitor1 = {
    id: 1,
    visitorName: "John",
    phone: "9876543210",
    email: "john@gmail.com",
    company: "ABC Technologies",
    personToMeet: "Manager",
    purpose: "Business Meeting",
    visitDate: "2026-11-25",
    checkInTime: "09:30 AM",
    checkOutTime: null,
    status: "Inside",

    photo: {
        fileName: "john.jpg",
        mimeType: "image/jpeg",
        base64: null
    }
};


const visitor2 = {
    id: 2,
    visitorName: "David",
    phone: "9876543211",
    email: "david@gmail.com",
    company: "XYZ Solutions",
    personToMeet: "HR",
    purpose: "Interview",
    visitDate: "2026-11-25",
    checkInTime: "10:00 AM",
    checkOutTime: "11:30 AM",
    status: "Checked Out",

    photo: {
        fileName: "david.jpg",
        mimeType: "image/jpeg",
        base64: null
    }
};


const visitor3 = {
    id: 3,
    visitorName: "Susan",
    phone: "7448440471",
    email: "susan@gmail.com",
    company: "ABC Solutions",
    personToMeet: "HR",
    purpose: "Interview",
    visitDate: "2026-11-25",
    checkInTime: "10:00 AM",
    checkOutTime: null,
    status: "Inside",

    photo: {
        fileName: "susan.jpg",
        mimeType: "image/jpeg",
        base64: null
    }
};


const visitor4 = {
    id: 4,
    visitorName: "Michael",
    phone: "9876543214",
    email: "michael@gmail.com",
    company: "Tech Solutions",
    personToMeet: "Developer",
    purpose: "Project Discussion",
    visitDate: "2026-11-24",
    checkInTime: "02:00 PM",
    checkOutTime: "03:30 PM",
    status: "Checked Out",

    photo: {
        fileName: "michael.jpg",
        mimeType: "image/jpeg",
        base64: null
    }
};


// Main visitor collection
let visitors = [
    visitor1,
    visitor2,
    visitor3,
    visitor4
];


// =====================================================
// 3. DISPLAY VISITORS
// =====================================================

function displayVisitors(visitorList) {

    console.log("========== ALL VISITORS ==========");

    for (const visitor of visitorList) {

        console.log("ID:", visitor.id);
        console.log("Name:", visitor.visitorName);
        console.log("Phone:", visitor.phone);
        console.log("Purpose:", visitor.purpose);
        console.log("Status:", visitor.status);

        console.log("-------------------------------");

    }

}


// =====================================================
// 4. ADVANCED VISITOR SEARCH
// =====================================================


// Find one visitor using ID
function findVisitorById(visitorList, id) {
    return visitorList.find(visitor => visitor.id === id);
}


// Search visitors using partial or complete name
function searchVisitorsByName(visitorList, name) {
    return visitorList.filter(visitor =>
        visitor.visitorName
            .toLowerCase()
            .includes(name.toLowerCase())
    );
}


// Find visitors using phone number
function findVisitorsByPhone(visitorList, phone) {
    return visitorList.filter(visitor =>
        visitor.phone === phone
    );
}


// Find visitors by status
function getVisitorsByStatus(visitorList, status) {
    return visitorList.filter(visitor =>
        visitor.status === status
    );
}


// Find visitors by purpose
function getVisitorsByPurpose(visitorList, purpose) {
    return visitorList.filter(visitor =>
        visitor.purpose === purpose
    );
}


// Find visitors by date
function getVisitorsByDate(visitorList, date) {
    return visitorList.filter(visitor =>
        visitor.visitDate === date
    );
}


// Find visitors who uploaded photographs
function getVisitorsWithPhotos(visitorList) {
    return visitorList.filter(visitor =>
        Boolean(visitor.photo?.base64)
    );
}


// Find visitors who have not uploaded photographs
function getVisitorsWithoutPhotos(visitorList) {
    return visitorList.filter(visitor =>
        !visitor.photo?.base64
    );
}


// =====================================================
// 5. VISITOR STATISTICS ENGINE
// =====================================================

function getVisitorStatistics(visitorList) {
    const statistics = visitorList.reduce((result, visitor) => {
        // Total visitors
        result.total++;
        // Currently inside
        if (visitor.status === "Inside") {
            result.inside++;
        }
        // Checked-out visitors
        if (visitor.status === "Checked Out") {
            result.checkedOut++;
        }
        // Photo statistics
        if (visitor.photo?.base64) {
            result.withPhotos++;
        } else {
            result.withoutPhotos++;
        }
        // Purpose-based statistics
        result.byPurpose[visitor.purpose] =
            (result.byPurpose[visitor.purpose] || 0) + 1;
        return result;
    },{
        total: 0,
        inside: 0,
        checkedOut: 0,
        withPhotos: 0,
        withoutPhotos: 0,
        byPurpose: {}
    });
    return statistics;
}


// =====================================================
// 6. IMMUTABLE CRUD OPERATIONS
// =====================================================


// Register a new visitor
function registerVisitor(visitorList, visitorDetails) {
    // Generate a unique sequential ID
    const lastId = visitorList.reduce((maxId, visitor) => {
        return Math.max(maxId, visitor.id);
    }, 0);

    const newVisitor = {
        id: lastId + 1,
        visitorName: visitorDetails.visitorName,
        phone: visitorDetails.phone,
        email: visitorDetails.email ?? "",
        company: visitorDetails.company ?? "",
        personToMeet: visitorDetails.personToMeet ?? "",
        purpose: visitorDetails.purpose ?? "General Visit",
        visitDate: visitorDetails.visitDate,
        checkInTime: visitorDetails.checkInTime,
        checkOutTime: null,
        status: "Inside",
        photo: {
            fileName: null,
            mimeType: null,
            base64: null,
            ...(visitorDetails.photo ?? {})
        }
    };
    // Return a new array instead of modifying the old array
    return [...visitorList, newVisitor];

}

// Update an existing visitor
function updateVisitor(visitorList, visitorId, updatedDetails) {
    return visitorList.map(visitor => {
        if (visitor.id === visitorId) {
            return {
                ...visitor,
                ...updatedDetails,
                photo: {
                    ...visitor.photo,
                    ...(updatedDetails.photo ?? {})
                }
            };
        }
        return visitor;
    });
}

// Delete a visitor
function deleteVisitor(visitorList, visitorId) {
    return visitorList.filter(visitor =>
        visitor.id !== visitorId
    );
}

// =====================================================
// 7. VISITOR SORTING AND RECENT VISITORS
// =====================================================

// Sort visitors from newest to oldest
function sortVisitorsNewestFirst(visitorList) {
    return [...visitorList].sort((a, b) => {
        return new Date(b.visitDate) - new Date(a.visitDate);
    });
}

// Sort visitors from oldest to newest
function sortVisitorsOldestFirst(visitorList) {
    return [...visitorList].sort((a, b) => {
        return new Date(a.visitDate) - new Date(b.visitDate);
    });
}

// Get the latest three visitors
function getLatestVisitors(visitorList) {
    const sortedVisitors = sortVisitorsNewestFirst(visitorList);
    return sortedVisitors.slice(0, 3);
}

// =====================================================
// 8. VISITOR DATA TRANSFORMATION
// =====================================================

// Prepare visitor data for reports or API responses
function prepareVisitorData(visitor) {
    const {
        id,
        visitorName,
        phone,
        purpose,
        status,
        visitDate,
        photo
    } = visitor;

    return {
        id,
        visitorName,
        phone,
        purpose,
        status,
        visitDate,
        photo
    };
}

// =====================================================
// 9. TESTING - SEARCH FEATURES
// =====================================================

// console.log("\n========== VISITOR DISPLAY ==========");

// displayVisitors(visitors);

// console.log("\n========== SEARCH TESTS ==========");

// console.log(
//     "Find Visitor ID 1:",
//     findVisitorById(visitors, 1)
// );

// console.log(
//     "Search John:",
//     searchVisitorsByName(visitors, "John")
// );

// console.log(
//     "Search by Phone:",
//     findVisitorsByPhone(visitors, "9876543210")
// );

// console.log(
//     "Visitors Inside:",
//     getVisitorsByStatus(visitors, "Inside")
// );

// console.log(
//     "Checked Out Visitors:",
//     getVisitorsByStatus(visitors, "Checked Out")
// );

// console.log(
//     "Interview Visitors:",
//     getVisitorsByPurpose(visitors, "Interview")
// );

// console.log(
//     "Visitors on November 25:",
//     getVisitorsByDate(visitors, "2026-11-25")
// );

// console.log(
//     "Visitors With Photos:",
//     getVisitorsWithPhotos(visitors)
// );

// console.log(
//     "Visitors Without Photos:",
//     getVisitorsWithoutPhotos(visitors)
// );

// // =====================================================
// // 10. TESTING - STATISTICS
// // =====================================================

// console.log("\n========== VISITOR STATISTICS ==========");
// console.log(getVisitorStatistics(visitors));

// // =====================================================
// // 11. TESTING - IMMUTABLE CRUD
// // =====================================================

// console.log("\n========== IMMUTABLE CRUD ==========");

// // Register a new visitor
// visitors = registerVisitor(visitors, {

//     visitorName: "Alex",
//     phone: "9876543212",
//     email: "alex@gmail.com",
//     company: "Digital Solutions",
//     personToMeet: "Team Lead",
//     purpose: "Business Meeting",
//     visitDate: "2026-11-25",
//     checkInTime: "11:00 AM"

// });

// console.log("After Registration:");
// displayVisitors(visitors);

// // Update visitor
// visitors = updateVisitor(visitors, 1, {
//     phone: "9999999999",
//     purpose: "Project Discussion"
// });

// console.log("After Update:");
// console.log(findVisitorById(visitors, 1));

// // Delete visitor
// visitors = deleteVisitor(visitors, 2);
// console.log("After Deletion:");
// displayVisitors(visitors);

// // =====================================================
// // 12. TESTING - SORTING
// // =====================================================

// console.log("\n========== Newest First VISITORS ==========");
// console.log(sortVisitorsNewestFirst(visitors));
// console.log("\n========== Oldest First VISITORS ==========");
// console.log(sortVisitorsOldestFirst(visitors));
// console.log("\n========== LATEST THREE VISITORS ==========");
// console.log(getLatestVisitors(visitors));

// // =====================================================
// // 13. TESTING - PREPARED VISITOR DATA
// // =====================================================

// console.log("\n========== PREPARED VISITOR DATA ==========");
// const reportData = visitors.map(visitor =>
//     prepareVisitorData(visitor)
// );
// console.log(reportData);

// // =====================================================
// // 14. FINAL DASHBOARD STATISTICS
// // =====================================================

// console.log("\n========== FINAL DASHBOARD ==========");
// const dashboard = getVisitorStatistics(visitors);
// console.log("Total Visitors:", dashboard.total);
// console.log("Currently Inside:", dashboard.inside);
// console.log("Checked Out:", dashboard.checkedOut);
// console.log("Visitors With Photos:", dashboard.withPhotos);
// console.log("Visitors Without Photos:", dashboard.withoutPhotos);
// console.log("Visitors By Purpose:", dashboard.byPurpose);
// console.log("\n========== SYSTEM EXECUTION COMPLETED ==========");

// =====================================================
// 1. CENTRALIZED SYSTEM CONFIGURATION
// =====================================================

const VISITOR_STATUS = Object.freeze({
    INSIDE: "Inside",
    CHECKED_OUT: "Checked Out"
});

const VISITOR_PURPOSES = Object.freeze({
    MEETING: "Business Meeting",
    INTERVIEW: "Interview",
    PROJECT: "Project Discussion",
    GENERAL: "General Visit"
});

// =====================================================
// 2. DYNAMIC VISITOR OBJECT CREATION
// =====================================================

function createVisitorObject(details) {
    const {
        visitorName,
        phone,
        email = "",
        company = "",
        personToMeet = "",
        purpose = VISITOR_PURPOSES.GENERAL,
        visitDate,
        checkInTime,
        photo = {}
    } = details;

    const newVisitor = {
        visitorName,
        phone,
        email,
        company,
        personToMeet,
        purpose,
        visitDate,
        checkInTime,
        checkOutTime: null,
        status: VISITOR_STATUS.INSIDE,
        photo: {
            fileName: photo.fileName ?? null,
            mimeType: photo.mimeType ?? null,
            base64: photo.base64 ?? null
        }
    };

    return newVisitor;
}

// =====================================================
// 3. NESTED OBJECT MANAGEMENT
// =====================================================

function updateVisitorPhoto(visitorList, visitorId, photoDetails) {
    return visitorList.map(visitor => {
        if (visitor.id === visitorId) {
            return {
                ...visitor,
                photo: {
                    ...visitor.photo,
                    ...photoDetails
                }
            };
        }

        return visitor;
    });
}

// =====================================================
// 4. DYNAMIC OBJECT PROPERTY UPDATE
// =====================================================

function updateVisitorProperty(visitorList, visitorId, propertyName, propertyValue) {
    const allowedProperties = [
        "visitorName",
        "phone",
        "email",
        "company",
        "personToMeet",
        "purpose",
        "visitDate"
    ];

    if (!allowedProperties.includes(propertyName)) {
        throw new Error("Invalid visitor property");
    }

    return visitorList.map(visitor => {
        if (visitor.id === visitorId) {
            return {
                ...visitor,
                [propertyName]: propertyValue
            };
        }

        return visitor;
    });
}

// =====================================================
// 5. OBJECT PROPERTY INSPECTION
// =====================================================

function getVisitorPropertyNames(visitor) {
    return Object.keys(visitor);
}

function getVisitorPropertyValues(visitor) {
    return Object.values(visitor);
}

function getVisitorPropertyEntries(visitor) {
    return Object.entries(visitor);
}

// =====================================================
// 6. NESTED OBJECT DESTRUCTURING
// =====================================================

function extractVisitorInformation(visitor) {
    const {
        id,
        visitorName,
        phone,
        purpose,
        status,
        photo: {
            fileName,
            mimeType,
            base64
        } = {}
    } = visitor;

    return {
        id,
        visitorName,
        phone,
        purpose,
        status,
        photoFileName: fileName ?? null,
        photoMimeType: mimeType ?? null,
        hasPhoto: Boolean(base64)
    };
}

// =====================================================
// 7. TRANSFORM OBJECT DATA
// =====================================================

function prepareVisitorReport(visitor) {
    const report = {
        ID: visitor.id,
        Name: visitor.visitorName,
        Contact: visitor.phone,
        Purpose: visitor.purpose,
        Status: visitor.status,
        Date: visitor.visitDate
    };

    return report;
}

// =====================================================
// 8. OBJECT PROPERTY VALIDATION
// =====================================================

function validateVisitorObject(visitor) {
    const requiredProperties = [
        "id",
        "visitorName",
        "phone",
        "purpose",
        "visitDate",
        "status",
        "photo"
    ];

    const missingProperties = requiredProperties.filter(property => {
        return !Object.hasOwn(visitor, property);
    });

    return {
        isValid: missingProperties.length === 0,
        missingProperties
    };
}

// =====================================================
// 9. VISITOR VIEW MODEL WITH GETTERS
// =====================================================

function createVisitorView(visitor) {
    return {
        get displayName() {
            return visitor.visitorName;
        },

        get isInside() {
            return visitor.status === VISITOR_STATUS.INSIDE;
        },

        get hasPhoto() {
            return Boolean(visitor.photo?.base64);
        },

        get visitorSummary() {
            return `${visitor.visitorName} - ${visitor.purpose} - ${visitor.status}`;
        }
    };
}

// =====================================================
// 10. OBJECT TO ARRAY CONVERSION
// =====================================================

function getPurposeStatistics(visitorList) {
    const statistics = visitorList.reduce((result, visitor) => {
        result[visitor.purpose] = (result[visitor.purpose] || 0) + 1;
        return result;
    }, {});

    return Object.entries(statistics).map(([purpose, count]) => ({
        purpose,
        count
    }));
}

// =====================================================
// 11. PHASE 4 TESTING
// =====================================================

console.log("\n========== PHASE 4 TESTING ==========");

// Test dynamic object creation
const sampleVisitor = createVisitorObject({
    visitorName: "Robert",
    phone: "9876543215",
    email: "robert@gmail.com",
    company: "ABC Technologies",
    personToMeet: "Manager",
    purpose: VISITOR_PURPOSES.MEETING,
    visitDate: "2026-11-25",
    checkInTime: "12:00 PM"
});

console.log("Created Visitor:", sampleVisitor);

// Test nested photo update
visitors = updateVisitorPhoto(visitors, 1, {
    fileName: "john-updated.jpg",
    mimeType: "image/jpeg",
    base64: "sample-base64-data"
});

console.log("Updated Visitor Photo:", findVisitorById(visitors, 1).photo);

// Test dynamic property update
visitors = updateVisitorProperty(visitors, 1, "company", "Updated Technologies");

console.log("Updated Company:", findVisitorById(visitors, 1).company);

// Test object inspection
const firstVisitor = visitors[0];

console.log("Object Keys:", getVisitorPropertyNames(firstVisitor));
console.log("Object Values:", getVisitorPropertyValues(firstVisitor));
console.log("Object Entries:", getVisitorPropertyEntries(firstVisitor));

// Test nested destructuring
console.log("Extracted Information:", extractVisitorInformation(firstVisitor));

// Test report transformation
console.log("Visitor Report:", prepareVisitorReport(firstVisitor));

// Test validation
console.log("Visitor Validation:", validateVisitorObject(firstVisitor));

// Test getters
const visitorView = createVisitorView(firstVisitor);

console.log("Display Name:", visitorView.displayName);
console.log("Is Inside:", visitorView.isInside);
console.log("Has Photo:", visitorView.hasPhoto);
console.log("Visitor Summary:", visitorView.visitorSummary);

// Test purpose statistics
console.log("Purpose Statistics:", getPurposeStatistics(visitors));



/*
=====================================================
        PHASE 5 - SCOPE AND CLOSURES
=====================================================
*/

// =====================================================
// 1. LEXICAL SCOPE
// =====================================================

const applicationName = "Gate Pass Management";

function displayApplicationInfo() {
    const moduleName = "Visitor Management";
    console.log("Application:", applicationName);
    console.log("Module:", moduleName);
}

displayApplicationInfo();

// applicationName is accessible here because it is in global scope.
// moduleName is only accessible inside displayApplicationInfo().


// =====================================================
// 2. VARIABLE SHADOWING
// =====================================================

const systemStatus = "Running";

function displaySystemStatus() {
    const systemStatus = "Maintenance";
    console.log("Local Status:", systemStatus);
}

displaySystemStatus();
console.log("Global Status:", systemStatus);


// =====================================================
// 3. CLOSURE - VISITOR ID GENERATOR
// =====================================================

function createVisitorIdGenerator(startFrom = 0) {
    let lastId = startFrom;

    return function generateId() {
        lastId++;
        return lastId;
    };
}

// Start the generator after the highest existing visitor ID.
const highestVisitorId = visitors.reduce((maxId, visitor) => {
    return Math.max(maxId, visitor.id);
}, 0);

const generateVisitorId = createVisitorIdGenerator(highestVisitorId);

console.log("Generated ID:", generateVisitorId());
console.log("Generated ID:", generateVisitorId());
console.log("Generated ID:", generateVisitorId());


// =====================================================
// 4. CLOSURE - VISITOR VISIT COUNTER
// =====================================================

function createVisitCounter() {
    let count = 0;

    return {
        increment() {
            count++;
            return count;
        },
        getCount() {
            return count;
        },
        reset() {
            count = 0;
            return count;
        }
    };
}

const dailyVisitCounter = createVisitCounter();

console.log("Visit Count:", dailyVisitCounter.increment());
console.log("Visit Count:", dailyVisitCounter.increment());
console.log("Visit Count:", dailyVisitCounter.getCount());


// =====================================================
// 5. PRIVATE VISITOR DATA - STORE
// =====================================================

function copyVisitor(visitor) {
    return {
        ...visitor,
        photo: {
            ...visitor.photo
        }
    };
}

function createVisitorStore(initialVisitors = []) {
    let records = initialVisitors.map(copyVisitor);

    const generateId = createVisitorIdGenerator(
        records.reduce((maxId, visitor) => {
            return Math.max(maxId, visitor.id);
        }, 0)
    );

    function getAll() {
        return records.map(copyVisitor);
    }

    function findById(visitorId) {
        const visitor = records.find(item => item.id === visitorId);
        return visitor ? copyVisitor(visitor) : null;
    }

    function add(visitorDetails) {
        const newVisitor = {
            id: generateId(),
            visitorName: visitorDetails.visitorName,
            phone: visitorDetails.phone,
            email: visitorDetails.email ?? "",
            company: visitorDetails.company ?? "",
            personToMeet: visitorDetails.personToMeet ?? "",
            purpose: visitorDetails.purpose ?? VISITOR_PURPOSES.GENERAL,
            visitDate: visitorDetails.visitDate,
            checkInTime: visitorDetails.checkInTime,
            checkOutTime: null,
            status: VISITOR_STATUS.INSIDE,
            photo: {
                fileName: null,
                mimeType: null,
                base64: null,
                ...(visitorDetails.photo ?? {})
            }
        };

        records = [...records, newVisitor];
        return copyVisitor(newVisitor);
    }

    function update(visitorId, updatedDetails) {
        let found = false;

        records = records.map(visitor => {
            if (visitor.id !== visitorId) {
                return visitor;
            }

            found = true;

            return {
                ...visitor,
                ...updatedDetails,
                id: visitor.id,
                photo: {
                    ...visitor.photo,
                    ...(updatedDetails.photo ?? {})
                }
            };
        });

        return found ? findById(visitorId) : null;
    }

    function remove(visitorId) {
        const originalLength = records.length;

        records = records.filter(visitor => visitor.id !== visitorId);

        return records.length < originalLength;
    }

    function getCount() {
        return records.length;
    }

    // Only these methods are exposed outside the closure.
    return {
        getAll,
        findById,
        add,
        update,
        remove,
        getCount
    };
}


// =====================================================
// 6. APPLICATION VISITOR STORE
// =====================================================

const visitorStores = createVisitorStore(visitors);


// =====================================================
// 7. PHASE 5 TESTING
// =====================================================

console.log("\n========== PHASE 5 TESTING ==========");

// Add a visitor through the private store.
const storedVisitors = visitorStores.add({
    visitorName: "Robert",
    phone: "9876543215",
    email: "robert@gmail.com",
    company: "ABC Technologies",
    personToMeet: "Manager",
    purpose: VISITOR_PURPOSES.MEETING,
    visitDate: "2026-11-25",
    checkInTime: "12:00 PM"
});

console.log("New Visitor:", storedVisitors);

// Read all visitors.
console.log("All Stored Visitors:", visitorStores.getAll());

// Find one visitor.
console.log("Find Visitor:", visitorStores.findById(storedVisitors.id));

// Update visitor details.
console.log(
    "Updated Visitor:",
    visitorStores.update(storedVisitors.id, {
        phone: "9999999999",
        company: "Updated Technologies"
    })
);

// Delete a visitor.
console.log(
    "Visitor Removed:",
    visitorStores.remove(storedVisitors.id)
);

// Check total records.
console.log("Store Count:", visitorStores.getCount());

// Try accessing private data directly.
console.log("Private Records:", visitorStores.records);

// The result above is undefined because records is private
// to the createVisitorStore function.


/*
=====================================================
        PHASE 5 - SCOPE AND CLOSURES
=====================================================
*/

// applicationName is accessible here because it is in global scope.
// moduleName is only accessible inside displayApplicationInfo().



// =====================================================
// 3. CLOSURE - VISITOR ID GENERATOR
// =====================================================

function createVisitorIdGenerator(startFrom = 0) {
    let lastId = startFrom;

    return function generateId() {
        lastId++;
        return lastId;
    };
}

// Start the generator after the highest existing visitor ID.
const highestVisitorIds = visitors.reduce((maxId, visitor) => {
    return Math.max(maxId, visitor.id);
}, 0);

const generateVisitorIds = createVisitorIdGenerator(highestVisitorId);

console.log("Generated ID:", generateVisitorId());
console.log("Generated ID:", generateVisitorId());
console.log("Generated ID:", generateVisitorId());


// =====================================================
// 4. CLOSURE - VISITOR VISIT COUNTER
// =====================================================

function createVisitCounter() {
    let count = 0;

    return {
        increment() {
            count++;
            return count;
        },
        getCount() {
            return count;
        },
        reset() {
            count = 0;
            return count;
        }
    };
}

const dailyVisitCounters = createVisitCounter();

console.log("Visit Count:", dailyVisitCounters.increment());
console.log("Visit Count:", dailyVisitCounters.increment());
console.log("Visit Count:", dailyVisitCounters.getCount());


// =====================================================
// 5. PRIVATE VISITOR DATA - STORE
// =====================================================

function copyVisitor(visitor) {
    return {
        ...visitor,
        photo: {
            ...visitor.photo
        }
    };
}

function createVisitorStore(initialVisitors = []) {
    let records = initialVisitors.map(copyVisitor);

    const generateId = createVisitorIdGenerator(
        records.reduce((maxId, visitor) => {
            return Math.max(maxId, visitor.id);
        }, 0)
    );

    function getAll() {
        return records.map(copyVisitor);
    }

    function findById(visitorId) {
        const visitor = records.find(item => item.id === visitorId);
        return visitor ? copyVisitor(visitor) : null;
    }

    function add(visitorDetails) {
        const newVisitor = {
            id: generateId(),
            visitorName: visitorDetails.visitorName,
            phone: visitorDetails.phone,
            email: visitorDetails.email ?? "",
            company: visitorDetails.company ?? "",
            personToMeet: visitorDetails.personToMeet ?? "",
            purpose: visitorDetails.purpose ?? VISITOR_PURPOSES.GENERAL,
            visitDate: visitorDetails.visitDate,
            checkInTime: visitorDetails.checkInTime,
            checkOutTime: null,
            status: VISITOR_STATUS.INSIDE,
            photo: {
                fileName: null,
                mimeType: null,
                base64: null,
                ...(visitorDetails.photo ?? {})
            }
        };

        records = [...records, newVisitor];
        return copyVisitor(newVisitor);
    }

    function update(visitorId, updatedDetails) {
        let found = false;

        records = records.map(visitor => {
            if (visitor.id !== visitorId) {
                return visitor;
            }

            found = true;

            return {
                ...visitor,
                ...updatedDetails,
                id: visitor.id,
                photo: {
                    ...visitor.photo,
                    ...(updatedDetails.photo ?? {})
                }
            };
        });

        return found ? findById(visitorId) : null;
    }

    function remove(visitorId) {
        const originalLength = records.length;

        records = records.filter(visitor => visitor.id !== visitorId);

        return records.length < originalLength;
    }

    function getCount() {
        return records.length;
    }

    // Only these methods are exposed outside the closure.
    return {
        getAll,
        findById,
        add,
        update,
        remove,
        getCount
    };
}


// =====================================================
// 6. APPLICATION VISITOR STORE
// =====================================================

const visitorStore = createVisitorStore(visitors);


// =====================================================
// 7. PHASE 5 TESTING
// =====================================================

console.log("\n========== PHASE 5 TESTING ==========");

// Add a visitor through the private store.
const storedVisitor = visitorStore.add({
    visitorName: "Robert",
    phone: "9876543215",
    email: "robert@gmail.com",
    company: "ABC Technologies",
    personToMeet: "Manager",
    purpose: VISITOR_PURPOSES.MEETING,
    visitDate: "2026-11-25",
    checkInTime: "12:00 PM"
});

console.log("New Visitor:", storedVisitor);

// Read all visitors.
console.log("All Stored Visitors:", visitorStore.getAll());

// Find one visitor.
console.log("Find Visitor:", visitorStore.findById(storedVisitor.id));

// Update visitor details.
console.log(
    "Updated Visitor:",
    visitorStore.update(storedVisitor.id, {
        phone: "9999999999",
        company: "Updated Technologies"
    })
);

// Delete a visitor.
console.log(
    "Visitor Removed:",
    visitorStore.remove(storedVisitor.id)
);

// Check total records.
console.log("Store Count:", visitorStore.getCount());

// Try accessing private data directly.
console.log("Private Records:", visitorStore.records);

// The result above is undefined because records is private
// to the createVisitorStore function.


// =====================================================
// PHASE 7 - DOM MANIPULATION, EVENTS AND IMAGE UPLOAD
// =====================================================

if (typeof document !== "undefined") document.addEventListener("DOMContentLoaded", function () {
    // 1. DOM ELEMENT SELECTION
    const visitorForm = document.getElementById("visitorForm");
    const visitorNameInput = document.getElementById("visitorName");
    const visitorPhoneInput = document.getElementById("visitorPhone");
    const visitorEmailInput = document.getElementById("visitorEmail");
    const visitorCompanyInput = document.getElementById("visitorCompany");
    const personToMeetInput = document.getElementById("personToMeet");
    const visitorPurposeInput = document.getElementById("visitorPurpose");
    const visitorPhotoInput = document.getElementById("visitorPhoto");
    const photoPreview = document.getElementById("photoPreview");
    const visitorSearch = document.getElementById("visitorSearch");
    const statusFilter = document.getElementById("statusFilter");
    const visitorTableBody = document.getElementById("visitorTableBody");
    const totalVisitorsElement = document.getElementById("totalVisitors");
    const insideVisitorsElement = document.getElementById("insideVisitors");
    const emptyMessage = document.getElementById("emptyMessage");

    let selectedPhoto = null;

    // 2. ESCAPE HTML TO PREVENT HTML INJECTION
    function escapeHTML(value) {
        return String(value ?? "").replace(/[&<>"']/g, function (character) {
            const entities = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;"
            };
            return entities[character];
        });
    }

    // 3. IMAGE PREVIEW AND BASE64 CONVERSION
    visitorPhotoInput.addEventListener("change", function (event) {
        const file = event.target.files[0];

        if (!file) {
            selectedPhoto = null;
            photoPreview.src = "";
            photoPreview.hidden = true;
            return;
        }

        if (!file.type.startsWith("image/")) {
            alert("Please select a valid image.");
            visitorPhotoInput.value = "";
            return;
        }

        const reader = new FileReader();

        reader.onload = function (loadEvent) {
            selectedPhoto = {
                fileName: file.name,
                mimeType: file.type,
                base64: loadEvent.target.result
            };

            photoPreview.src = loadEvent.target.result;
            photoPreview.hidden = false;
        };

        reader.onerror = function () {
            alert("Unable to read the selected image.");
        };

        reader.readAsDataURL(file);
    });

    // 4. REGISTER VISITOR
    visitorForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const visitorDetails = {
            visitorName: visitorNameInput.value.trim(),
            phone: visitorPhoneInput.value.trim(),
            email: visitorEmailInput.value.trim(),
            company: visitorCompanyInput.value.trim(),
            personToMeet: personToMeetInput.value.trim(),
            purpose: visitorPurposeInput.value,
            visitDate: new Date().toISOString().split("T")[0],
            checkInTime: new Date().toLocaleTimeString(),
            checkOutTime: null,
            status: VISITOR_STATUS.INSIDE,
            photo: selectedPhoto
        };

        if (!visitorDetails.visitorName || !visitorDetails.phone || !visitorDetails.personToMeet) {
            alert("Please complete all required fields.");
            return;
        }

        const registeredVisitor = visitorStore.add(visitorDetails);

        if (!registeredVisitor) {
            alert("Visitor registration failed.");
            return;
        }

        visitorForm.reset();
        selectedPhoto = null;
        photoPreview.src = "";
        photoPreview.hidden = true;

        renderVisitors();
        alert("Visitor registered successfully!");
    });

    // 5. DISPLAY VISITORS IN THE TABLE
    function renderVisitors() {
        const allVisitors = visitorStore.getAll();
        const searchValue = visitorSearch.value.trim().toLowerCase();
        const selectedStatus = statusFilter.value;

        const filteredVisitors = allVisitors.filter(function (visitor) {
            const matchesSearch =
                visitor.visitorName.toLowerCase().includes(searchValue) ||
                String(visitor.phone).toLowerCase().includes(searchValue);

            const matchesStatus =
                selectedStatus === "All" || visitor.status === selectedStatus;

            return matchesSearch && matchesStatus;
        });

        visitorTableBody.innerHTML = filteredVisitors.map(function (visitor) {
            const photoHTML = visitor.photo?.base64
                ? `<img src="${escapeHTML(visitor.photo.base64)}" alt="Visitor photo" width="45" height="45">`
                : "No Photo";

            const actionHTML = visitor.status === VISITOR_STATUS.INSIDE
                ? `<button type="button" data-action="checkout" data-id="${visitor.id}">Check Out</button>`
                : "Completed";

            return `
                <tr>
                    <td>${escapeHTML(visitor.id)}</td>
                    <td>${photoHTML}</td>
                    <td>${escapeHTML(visitor.visitorName)}</td>
                    <td>${escapeHTML(visitor.phone)}</td>
                    <td>${escapeHTML(visitor.purpose)}</td>
                    <td>${escapeHTML(visitor.status)}</td>
                    <td>
                        ${actionHTML}
                        <button type="button" data-action="delete" data-id="${visitor.id}">Delete</button>
                    </td>
                </tr>
            `;
        }).join("");

        totalVisitorsElement.textContent = allVisitors.length;

        insideVisitorsElement.textContent = allVisitors.filter(function (visitor) {
            return visitor.status === VISITOR_STATUS.INSIDE;
        }).length;

        emptyMessage.hidden = filteredVisitors.length > 0;
    }

    // 6. SEARCH AND FILTER EVENTS
    visitorSearch.addEventListener("input", renderVisitors);
    statusFilter.addEventListener("change", renderVisitors);

    // 7. EVENT DELEGATION FOR CHECKOUT AND DELETE
    visitorTableBody.addEventListener("click", function (event) {
        const button = event.target.closest("button[data-action]");

        if (!button) return;

        const visitorId = Number(button.dataset.id);
        const action = button.dataset.action;

        if (action === "checkout") {
            visitorStore.update(visitorId, {
                status: VISITOR_STATUS.CHECKED_OUT,
                checkOutTime: new Date().toLocaleTimeString()
            });
            renderVisitors();
            return;
        }

        if (action === "delete") {
            const confirmed = confirm("Are you sure you want to delete this visitor?");

            if (confirmed) {
                visitorStore.remove(visitorId);
                renderVisitors();
            }
        }
    });

    // 8. INITIAL PAGE RENDER
    renderVisitors();
});
