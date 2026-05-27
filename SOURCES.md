# SOURCES.md

## Source Research and Assumptions

This prototype supports three ESG data ingestion source types:

* SAP
* Utility
* Travel

The implementation was designed after researching how enterprise ESG data is commonly handled.

---

# 1. SAP Source

## Research

SAP systems commonly expose procurement and fuel data through:

* Flat file exports
* IDocs
* OData services
* BAPI integrations

For this prototype, I chose simplified flat-file style ingestion.

Reason:
Flat-file exports are commonly used for reporting and are easier to simulate realistically within assignment constraints.

---

## Sample Data Design

The sample SAP records contain:

* Company name
* Industry
* Source type
* Simplified procurement/fuel style information

The sample structure was intentionally normalized for easier dashboard ingestion.

---

## Real Deployment Challenges

Real SAP integrations would require:

* Authentication handling
* ERP mapping
* Plant code normalization
* Unit conversion
* Multi-language support

---

# 2. Utility Source

## Research

Facilities teams commonly export electricity usage data through:

* Utility portals
* CSV exports
* PDF bills

For this prototype, I selected CSV-style ingestion.

Reason:
CSV exports are common and practical for rapid ingestion workflows.

---

## Sample Data Design

The utility records simulate:

* Electricity usage records
* Utility ingestion workflows
* Simplified energy tracking

---

## Real Deployment Challenges

Real utility ingestion would involve:

* Meter normalization
* Tariff handling
* Billing period mismatches
* PDF parsing
* OCR processing

---

# 3. Travel Source

## Research

Corporate travel platforms such as:

* Concur
* Navan

typically expose:

* Flight data
* Hotel data
* Ground transport information

through APIs or export files.

For this prototype, I used simplified travel ingestion entries.

---

## Sample Data Design

Travel source entries represent:

* Business travel records
* ESG travel categorization
* Simplified analyst review workflows

---

## Real Deployment Challenges

Real travel integrations would require:

* Airport distance calculation
* Emission factor mapping
* External API authentication
* Travel category normalization

---

# Overall Design Philosophy

The prototype prioritizes:

* understandable architecture
* realistic workflows
* analyst usability
* defendable implementation decisions

instead of overengineering enterprise integrations within limited assignment time.

