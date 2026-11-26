# GatePass Management System

GatePass is a browser-based visitor management application for registering visitors, monitoring check-ins and check-outs, maintaining visitor records, and generating visit reports.

The application is built with HTML, CSS, and vanilla JavaScript. It runs entirely in the browser and uses local storage as the primary persistent data source.

## Features

- Dashboard with total, currently inside, checked-out, and today's visitor counts
- Visitor registration with name, phone, email, company, host, purpose, and photo
- Visitor photo validation and preview
- Search and status filtering for visitor records
- Edit, delete, check-in, and check-out actions
- Daily, monthly, and yearly visitor reports
- Purpose-wise report statistics
- Responsive management dashboard layout
- Automatic loading of saved records from browser local storage
- Optional initial visitor loading from a JSONBlob API

## Visit Purposes

The application supports the following visit purposes:

- Business Meeting
- Interview
- Project Discussion
- General Visit

## Data Storage

Visitor records are stored in the browser under the local storage key `gatepass.visitors`. Changes made through registration, editing, check-in, check-out, and deletion are saved automatically.

On first use, when no local records exist, the application attempts to load data from the JSONBlob endpoint configured in `js/api.js`. If local data is available, it takes priority.

> Local storage is browser-specific. Clearing browser data may remove saved visitor records.

## Validation and Photo Rules

Visitor registration validates:

- Visitor name: required and at least 3 characters
- Phone number: required 10-digit Indian mobile number beginning with 6, 7, 8, or 9
- Email: valid format when supplied
- Person to meet: required
- Visit purpose: required

Visitor photos support JPG, PNG, and WEBP files up to 5 MB.

## Project Structure

```text
Gatepass_mgmt/
|-- index.html              # Main application interface
|-- style.css               # Application layout and responsive styles
|-- js/
|   |-- main.js             # Application entry point
|   |-- ui.js               # UI events, rendering, and report logic
|   |-- visitor.js          # Person and visitor domain models
|   |-- visitorRegistry.js  # Visitor record management
|   |-- validation.js       # Form validation
|   |-- image.js            # Image type, size, and preview handling
|   |-- localStorage.js     # Browser local-storage persistence
|   |-- api.js              # JSONBlob data loading
|   `-- config.js           # Shared statuses and visit purposes
|-- phase.js                # Standalone JavaScript visitor examples
`-- README.md
```

## Getting Started

### Prerequisites

- A modern web browser
- A local web server

ES modules are used by the application, so opening `index.html` directly with a `file://` URL may not load the JavaScript correctly.

### Run Locally

From the project directory, start a simple local server:

```bash
python -m http.server 5500
```

Then open:

```text
http://localhost:5500
```

You can also run the project with the Live Server extension in VS Code.

## Usage

1. Open the Dashboard to view visitor statistics.
2. Use **Register Visitor** to enter visitor and host information.
3. Submit the form to register a visitor as **Inside**.
4. Open **Visitor Records** to search, filter, edit, check in, check out, or delete entries.
5. Open **Reports** and select a day, month, or year to generate a visitor report.

## Technologies

- HTML5
- CSS3
- JavaScript ES Modules
- Browser Local Storage
- JSONBlob API