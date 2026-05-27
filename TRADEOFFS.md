# TRADEOFFS.md

## Tradeoffs and Features Not Built

### 1. Real SAP Integration

Not built:

* Live SAP API integrations
* IDoc processing
* BAPI authentication

Reason:
Enterprise SAP systems are highly complex and require production infrastructure and credentials.

Tradeoff:
I used simplified ingestion inputs to focus on analyst workflows and ESG review functionality.

---

### 2. Advanced Audit Logging

Not built:

* Full edit history
* Immutable audit records
* User-level action tracking

Reason:
The prototype focuses on ingestion and approval workflows within limited assignment time.

Tradeoff:
Approval status simulation was implemented instead of enterprise-grade audit systems.

---

### 3. Automated Unit Normalization

Not built:

* Dynamic unit conversions
* Emission factor calculations
* Automatic validation pipelines

Reason:
Different ESG data sources use highly inconsistent formats and conversion rules.

Tradeoff:
The current prototype uses simplified normalized data handling for clarity and faster implementation.

---

## Additional Limitations

* No authentication system
* No multi-user role management
* No real deployment-scale database optimization
* No external API integrations
* No OCR or PDF parsing pipeline

---

## Why These Tradeoffs Were Chosen

The assignment emphasized:

* judgment
* defendable decisions
* realistic workflows
* understanding over feature quantity

The prototype was intentionally kept focused and understandable instead of overengineering unsupported enterprise features.

