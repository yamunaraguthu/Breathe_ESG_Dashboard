# MODEL.md

## Data Model Design

### Core Design Principles
- Company-scoped tenant isolation — every record has a company FK
- Source-of-truth tracking — every EmissionRecord knows which DataSource produced it
- Analyst review workflow — PENDING → APPROVED/REJECTED state machine
- Audit trail — every change logged in AuditLog

---

## Entities

### 1. Company
Represents the enterprise client whose ESG data is being ingested.

| Field | Type | Purpose |
|-------|------|---------|
| id | AutoField | Primary key |
| name | CharField | Company name |
| industry | CharField | Industry sector |
| created_at | DateTimeField | Onboarding timestamp |

**Design note:** Every DataSource and EmissionRecord is scoped to a Company FK.
This gives us tenant-level isolation — one company cannot see another's data.

---

### 2. DataSource (ingestion app)
Tracks every ingestion event — which file came in, from which source, for which company.

| Field | Type | Purpose |
|-------|------|---------|
| id | AutoField | Primary key |
| company | FK → Company | Tenant scoping |
| source_type | CharField | SAP / UTILITY / TRAVEL |
| file_name | CharField | Original uploaded filename |
| uploaded_at | DateTimeField | Ingestion timestamp |

**Source types and their real-world basis:**
- **SAP** — Flat-file CSV export from SAP SE16/SE16N transaction. Fields: material, plant, quantity, unit, posting date. Chose flat-file over IDoc because IDoc requires SAP PI/XI middleware — not realistic in prototype scope.
- **UTILITY** — Portal CSV export (e.g., Tata Power, BESCOM portals). Fields: meter_id, billing_period_start, billing_period_end, consumption_kwh, tariff_type.
- **TRAVEL** — Simplified Concur-style records. Fields: travel_category (flight/hotel/ground), origin, destination, travel_date.

---

### 3. EmissionRecord (emissions app)
Core fact table. Every ingested data row normalizes into an EmissionRecord.

| Field | Type | Purpose |
|-------|------|---------|
| id | AutoField | Primary key |
| company | FK → Company | Tenant scoping |
| datasource | FK → DataSource | Source-of-truth tracking |
| category | CharField | Scope1 / Scope2 / Scope3 |
| activity_type | CharField | e.g. fuel_consumption, electricity, flight |
| amount | FloatField | Raw activity amount |
| unit | CharField | Original unit (kWh, liters, km) |
| emission_value | FloatField | Calculated CO2e value |
| date | DateField | Activity date |
| suspicious_flag | BooleanField | Anomaly detected flag |
| approval_status | CharField | PENDING / APPROVED / REJECTED |
| created_at | DateTimeField | Record creation timestamp |

**Scope mapping:**
- Scope 1 → SAP fuel/procurement records (direct emissions)
- Scope 2 → Utility electricity records (indirect energy emissions)
- Scope 3 → Travel records (value chain emissions)

**Suspicious flag logic:**
Records are flagged when emission_value exceeds 2x the company average for that activity_type — analyst must review before approval.

---

### 4. AuditLog (audits app)
Tracks every change made to an EmissionRecord after ingestion.

| Field | Type | Purpose |
|-------|------|---------|
| id | AutoField | Primary key |
| emission_record | FK → EmissionRecord | Which record changed |
| old_value | TextField | Value before change |
| new_value | TextField | Value after change |
| changed_by | CharField | Analyst who made the change |
| changed_at | DateTimeField | Timestamp of change |

**Purpose:** Auditors need to know not just what the final number is,
but who changed it and when. Every edit creates an AuditLog entry.

---

## Relationships
**Company → DataSource:** One enterprise client can have multiple ingestion events (SAP upload, Utility CSV, Travel data)

**DataSource → EmissionRecord:** One ingestion event produces multiple emission records (one CSV = many rows)

**EmissionRecord → AuditLog:** Every edit to a record is logged — full change history maintained for auditors
