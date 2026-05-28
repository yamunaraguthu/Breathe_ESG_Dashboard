# SOURCES.md

## Source Research and Real-World Basis

---

## 1. SAP — Fuel & Procurement Data

### What I Researched
SAP exposes data through 4 main mechanisms:
- **IDoc** — intermediate documents for EDI, requires SAP PI/XI middleware
- **OData** — REST-style API via SAP Gateway, requires Fiori setup
- **BAPI** — function modules, requires RFC connection + credentials
- **Flat-file export** — SE16/SE16N transaction, direct table dump to CSV

### What I Chose & Why
Flat-file CSV export from SE16N transaction.

**Reason:** IDoc/BAPI/OData all require enterprise SAP infrastructure
(SAP Basis team, RFC credentials, middleware). Flat-file is what
actual sustainability teams use when IT won't give API access —
they ask SAP admin for a table dump. Most realistic for a
4-day prototype without SAP instance access.

### What Real SAP Exports Look Like
- Date format: YYYYMMDD (e.g., 20240315)
- Plant codes: 4-character codes (e.g., IN01, DE02) — meaningless without T001W lookup table
- Units: inconsistent — some in KG, some in TO (tonnes), some in L
- Column headers: sometimes German (MENGE = quantity, WERKS = plant, MATNR = material)
- Material numbers: 18-character padded strings (e.g., 000000000000100023)

### My Sample Data
Fields: material_number, plant_code, quantity, unit, posting_date, activity_type
Values use realistic SAP conventions — YYYYMMDD dates, plant codes, KG/L units.

### What Would Break in Production
- Plant code → cost center mapping requires T001W master data table
- German headers need column mapping layer
- Unit normalization (KG vs TO vs L → CO2e) needs emission factor lookup
- Real exports have 50+ columns — need column selection/filtering

---

## 2. Utility — Electricity Data

### What I Researched
Facilities teams get electricity data through:
- **Utility portal CSV** — PG&E, Tata Power, BESCOM all offer portal downloads
- **PDF bills** — most common in India, requires OCR
- **Green Button API** — US standard, not common in India
- **Smart meter APIs** — still rare, utility-dependent

### What I Chose & Why
Portal CSV export.

**Reason:** PDF parsing requires OCR pipeline (Tesseract/AWS Textract)
— unreliable and scope-heavy. Green Button/smart meter APIs are
US-centric and not realistic for Indian enterprise clients.
Portal CSV is what facilities managers actually download monthly.

### What Real Utility CSVs Look Like
- Fields: meter_id, billing_period_start, billing_period_end,
  consumption_kwh, demand_kw, tariff_code, amount_inr
- Billing periods: 18th of month → 17th of next month (not calendar aligned)
- Multiple meters per facility — need meter → location → cost center mapping
- Units: kWh for consumption, kVAh for some industrial tariffs

### My Sample Data
Fields: meter_id, billing_start, billing_end, consumption_kwh, tariff_type
Billing periods intentionally non-calendar-aligned to reflect reality.

### What Would Break in Production
- Billing period → calendar month proration needed for monthly Scope 2 reporting
- Multi-tariff structures (peak/off-peak/demand charges) not handled
- PDF bills (most Indian SMEs only get PDFs) need OCR pipeline
- India grid emission factor: CEA 2023 = 0.716 kgCO2e/kWh — needs annual update

---

## 3. Travel — Flights, Hotels, Ground Transport

### What I Researched
Corporate travel platforms expose data via:
- **Concur Travel** — SAP Concur API, OAuth2, trip segments per booking
- **Navan (TripActions)** — REST API, similar structure
- **Export CSV** — both platforms support CSV export from admin portal

Concur trip record structure:
- Each booking = multiple segments (outbound flight + return flight + hotel)
- Flight segment: origin_airport, destination_airport, departure_datetime,
  cabin_class, carrier_code
- Hotel segment: property_name, city, check_in, check_out, room_nights
- Ground: vendor_type (taxi/rental), distance_km or duration

### What I Chose & Why
Simplified CSV upload with travel_category, origin, destination, date.

**Reason:** Concur/Navan APIs require OAuth2 client credentials
from corporate travel admin — no access without enterprise account.
CSV export from admin portal is realistic alternative that travel
managers actually use for sustainability reporting.

### What Real Travel Data Looks Like
- Airport codes (DEL, BOM, LHR) — distance not given, must calculate
  using Haversine formula on lat/lon coordinates
- Cabin class matters — Business class = 2.5x economy emission factor (BEIS 2023)
- Hotel emission intensity varies by star rating and country
- Ground transport: rental car needs fuel type + distance

### My Sample Data
Fields: travel_category (flight/hotel/ground), origin, destination,
travel_date, traveler_name
Airport codes used for flights, city names for hotels.

### What Would Break in Production
- Airport code → distance requires coordinate lookup table (OurAirports dataset)
- Cabin class not captured — all flights treated as economy (underestimates Business travel)
- Hotel emission factors need property-level data (not available without direct integration)
- Concur OAuth2 token refresh logic needed for live API pull
