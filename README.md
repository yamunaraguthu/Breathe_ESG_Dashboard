# Breathe ESG Dashboard

A Django REST + React prototype for ingesting ESG emissions data
from enterprise sources, normalizing it, and surfacing an analyst
review dashboard before audit sign-off.

**Live Demo:** [https://breathe-esg-dashboard-assignment.onrender.com](https://breathe-esg-dashboard-assignment.onrender.com)

**Backend API:** [https://breathe-esg-dashboard-1-q6p1.onrender.com](https://breathe-esg-dashboard-1-q6p1.onrender.com)

---

## What This Does

Enterprise clients have ESG data sitting in three places:
- SAP (fuel & procurement)
- Utility portals (electricity)
- Corporate travel platforms (flights, hotels, ground)

This app ingests all three, normalizes records into a common
EmissionRecord format, flags suspicious values, and lets analysts
approve records before they're locked for audit.

---

## Tech Stack

**Frontend:** React, Tailwind CSS, Recharts
**Backend:** Django, Django REST Framework
**Database:** SQLite (prototype), PostgreSQL-ready
**Deployment:** Render

---

## Data Model

4 core models:
- `Company` — enterprise client (tenant isolation)
- `DataSource` — ingestion event (which file, which source, when)
- `EmissionRecord` — normalized emission row (Scope 1/2/3)
- `AuditLog` — change history for every edited record

See [MODEL.md](./MODEL.md) for full data model documentation.

---

## Source Types

| Source | Format | Scope |
|--------|--------|-------|
| SAP | Flat-file CSV (SE16N export) | Scope 1 |
| Utility | Portal CSV (kWh, billing period) | Scope 2 |
| Travel | Concur-style CSV (flight/hotel/ground) | Scope 3 |

See [SOURCES.md](./SOURCES.md) for real-world research and sample data rationale.

---

## Run Locally

### Backend
```bash
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

---

## Documentation

- [MODEL.md](./MODEL.md) — Data model and design decisions
- [DECISIONS.md](./DECISIONS.md) — Every ambiguity resolved and why
- [TRADEOFFS.md](./TRADEOFFS.md) — What was deliberately not built
- [SOURCES.md](./SOURCES.md) — Real-world source research

---

## Author

Yamuna Raguthu
