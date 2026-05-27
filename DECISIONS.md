# DECISIONS.md

## Major Decisions Taken

### 1. Django + React Stack

I used Django REST Framework for backend APIs and React for frontend UI because the assignment specifically requested Django and React.

Reason:

* Fast API development
* Easy frontend integration
* Good support for CRUD operations and dashboards

---

### 2. Simplified ESG Ingestion Workflow

Instead of building full enterprise-grade ingestion pipelines, I focused on a realistic prototype workflow:

* Manual company entry
* CSV upload ingestion
* Source tracking
* Analyst review

Reason:
The assignment emphasized understanding and defendable decisions over feature quantity.

---

### 3. Source Types Chosen

The application supports:

* SAP
* Utility
* Travel

Reason:
These were explicitly mentioned in the assignment requirements.

---

### 4. Utility Data Handling

I assumed facilities teams export electricity data mainly through CSV portal exports.

Reason:
CSV exports are common and easier to prototype within limited assignment time.

Ignored:

* PDF parsing
* Utility APIs
* OCR pipelines

---

### 5. SAP Data Handling

I modeled SAP ingestion as simplified flat-file style records.

Reason:
Real SAP integrations are highly complex and require enterprise infrastructure.

Ignored:

* IDoc parsing
* BAPI integration
* OData authentication flows

---

### 6. Travel Data Handling

Travel data was represented using simplified travel source entries.

Reason:
Real corporate travel APIs require authentication and external integrations.

Ignored:

* Airport distance calculations
* Emission factor APIs
* Real travel platform integrations

---

### 7. Analyst Review Design

Each company record begins in Pending status and can be approved manually.

Reason:
This simulates analyst validation before audit workflows.

---

### 8. UI Decisions

I used a dark ESG-inspired dashboard UI with charts and analytics cards.

Reason:
Improves readability and provides a professional analyst dashboard appearance.

---

## Questions I Would Ask the PM

* What scale of ingestion volume is expected?
* Should analyst approvals support role-based access?
* Are audit logs required for every edit?
* Should normalization rules differ per source?
* Which deployment environment is preferred for production?

