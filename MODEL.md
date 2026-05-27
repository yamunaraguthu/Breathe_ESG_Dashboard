# MODEL.md

## Data Model Overview

The project uses a simple ESG dashboard data model built for handling company ingestion and analyst review workflows.

### Main Entities

## Company

Stores company information uploaded manually or through CSV ingestion.

Fields:

* id
* name
* industry
* source_type
* created_at

Purpose:
Represents the organization whose ESG data is being tracked.

---

## Data Sources

The system supports three ingestion source types:

* SAP
* Utility
* Travel

Purpose:
Represents different real-world ESG data origins.

---

## Analyst Review Workflow

Each uploaded company record starts in a Pending state.

Analysts can:

* Review uploaded data
* Approve records
* Delete invalid entries

Purpose:
Supports audit preparation workflows before records are finalized.

---

## Scope Categorization

The prototype focuses mainly on ingestion and review workflows.
Scope 1, Scope 2, and Scope 3 categorization can be extended in future versions.

Example:

* Scope 1 → Fuel emissions
* Scope 2 → Electricity usage
* Scope 3 → Travel emissions

---

## Source of Truth Tracking

The source selection dropdown tracks which ingestion source produced the data:

* SAP
* Utility
* Travel

This helps analysts understand the origin of uploaded records.

---

## Unit Normalization

The current prototype uses simplified normalized inputs through CSV ingestion and manual entry.

Future improvements:

* Unit conversion
* Automatic normalization
* Validation pipelines

---

## Audit Trail

The approval workflow simulates analyst review before audit sign-off.

Pending → Approved workflow represents audit preparation stages.

---

## Multi-Tenancy

The current prototype supports multiple company records within the same dashboard.

Future production systems would include:

* Tenant isolation
* User roles
* Organization-level permissions

