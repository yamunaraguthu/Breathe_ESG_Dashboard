# DECISIONS.md

## 1. Django + React Stack
Django REST Framework + React chose chesanu.
- Django ORM multi-tenant data models ki suitable
- DRF serializers source-type validation ki clean
- React recharts analyst dashboard ki fast rendering

## 2. SAP Data Handling
SAP flat-file CSV format choose chesanu (IDoc kadu).
**Why flat-file:** IDoc parsing enterprise middleware (SAP PI/XI)
require chestuundi — prototype scope lo realistic kadu.
Flat-file exports SAP transaction SE16/SE16N lo directly possible,
client IT team involvement takkuva.
**What I handled:** material number, plant code, quantity, unit,
date (YYYYMMDD format)
**What I ignored:** German column headers normalization, BAPI
authentication, OData service flows, plant code lookup tables
**Real world risk:** Production lo plant codes master data table
tho join cheyyadam mandatory — without it cost center attribution breaks.

## 3. Utility Data Handling
Portal CSV export choose chesanu (PDF/API kadu).
**Why CSV:** Facilities teams 90% cases lo utility portal lo CSV
download chestaru (e.g., PG&E, Tata Power portals). PDF parsing
OCR errors introduce chestuundi, utility APIs still rare in India.
**What I handled:** kWh consumption, billing period start/end,
meter ID, tariff type
**What I ignored:** PDF bill parsing, multi-tariff structures,
billing period → calendar month normalization
**Real world risk:** Billing periods don't align to calendar months
— aggregating to monthly Scope 2 requires proration logic not built here.

## 4. Travel Data Handling
Simplified CSV upload choose chesanu (Concur/Navan API kadu).
**Why:** Concur API OAuth2 + SAP integration require chestuundi —
assignment scope lo external auth setup realistic kadu.
Navan API docs chusanu — trip records flight segments, hotel nights,
ground transport ga separate avutaai, each tо different emission factors.
**What I handled:** travel category (flight/hotel/ground), origin,
destination, date
**What I ignored:** Airport code → great circle distance calculation,
ICAO emission factors per aircraft type, hotel star rating → energy intensity

## 5. Analyst Review Design
Pending → Approved/Rejected two-state model choose chesanu.
**Why:** Assignment asked for analyst sign-off before audit lock.
Simple status field sufficient for prototype — production lo
multi-level approval workflow + role-based access needed.

## 6. Multi-tenancy
Company-level tenant isolation implement chesanu.
Each DataSource, EmissionRecord company FK tho scoped —
cross-tenant data leakage prevent avutundi.

## Questions for PM
1. Ingestion volume per client per month? (affects async queue decision)
2. Role-based approvals needed? (analyst vs auditor vs admin)
3. Per-edit audit trail mandatory? (Django simple-history library ready)
4. Unit normalization rules source-specific or global?
5. Which utility providers are priority clients using?
