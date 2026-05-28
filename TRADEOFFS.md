# TRADEOFFS.md

## Three Things I Deliberately Did Not Build

### 1. User Authentication & Role-Based Access
**What I skipped:** Django auth, analyst login, role separation
(analyst vs auditor vs admin), per-user audit trail.

**Why:** Building auth properly — JWT tokens, permission classes,
role-based API filtering — would have taken 30-40% of available time.
The core value of this assignment is the data model and ingestion
pipeline, not login screens.

**What breaks without it:** changed_by in AuditLog is a plain string,
not a FK to User. In production, any analyst can approve any record
with no accountability trail.

**Production fix:** Add Django allauth + DRF TokenAuthentication +
UserProfile model with role field. 2-3 days of focused work.

---

### 2. Real-Time Unit Normalization Pipeline
**What I skipped:** Automatic kWh → MWh conversion, liters → GJ
for fuel, CO2e calculation using IPCC emission factors.

**Why:** Emission factor tables are source-specific and
region-specific — India grid emission factor (CEA 2023: 0.716
kgCO2/kWh) differs from UK (0.233 kgCO2/kWh). Building a
defensible normalization layer requires a lookup table with
versioned factors, not hardcoded math.

**What breaks without it:** emission_value is manually entered —
no automatic calculation from amount + unit + emission_factor.
Analysts must compute CO2e themselves before entering.

**Production fix:** Add EmissionFactor model (source_type,
activity_type, region, factor_value, factor_unit, valid_from,
valid_to). Wire ingestion pipeline to auto-calculate on upload.

---

### 3. Async Ingestion Pipeline
**What I skipped:** Celery + Redis task queue for CSV processing,
failed row tracking, partial ingestion recovery.

**Why:** For a prototype with small CSV files, synchronous
processing is fine. Setting up Celery + Redis on Render free tier
adds infrastructure complexity with no demo value.

**What breaks without it:** Large CSV uploads (10,000+ rows) will
timeout on Render's 30-second request limit. Failed rows are not
tracked — if row 847 fails validation, the user has no visibility.

**Production fix:** Celery worker + Redis broker. Each upload
creates an IngestionJob record. Rows processed async, failures
logged to IngestionError table with row number + reason.
