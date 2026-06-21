# CarbonIQ - Professional Carbon Footprint Tracking Platform

**Live Demo:** https://carboniq-web-app.vercel.app/

> Track your carbon emissions, get AI-powered insights, and make data-driven decisions for a sustainable future.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?logo=react)
![Python](https://img.shields.io/badge/Python-3.9+-yellow?logo=python)
![FastAPI](https://img.shields.io/badge/FastAPI-Latest-green?logo=fastapi)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-blue?logo=tailwindcss)

## 🌍 Overview

CarbonIQ is a comprehensive web application that helps individuals and organizations track their carbon footprint across multiple life categories. With built-in emission calculations, AI-powered insights, regional benchmarking, and a blockchain-verified carbon credit system, CarbonIQ makes sustainability data-driven and actionable.

**Key Highlights:**
- ✅ Track emissions across 4+ categories (transport, energy, food, consumption)
- ✅ Real-time dashboard with interactive charts
- ✅ AI-powered personalized insights and recommendations
- ✅ Regional benchmarking and community comparison
- ✅ Carbon credit marketplace (Phase 3)
- ✅ No external API keys required (works out of the box!)
- ✅ Production-ready architecture

---

## 🚀 Quick Start

### Prerequisites
```bash
# Minimum requirements:
- Node.js 18+
- Python 3.9+
- pnpm package manager
```

### Installation & Running

```bash
# 1. Install dependencies
pnpm install
pip install -r api/requirements.txt

# 2. Start frontend (Terminal 1)
pnpm dev
# Opens at http://localhost:3000

# 3. Start backend (Terminal 2, optional)
cd api
python -m uvicorn main:app --reload --port 8000
# API docs at http://localhost:8000/docs

# 4. Login with demo credentials
# Email: demo@carboniq.com
# Password: demo123
```

**That's it! The app runs without any API keys or external configuration.**

---

## 📋 Features

### Phase 1: Core Functionality ✅
- **User Authentication** - Secure registration and login with JWT
- **Activity Logging** - Log emissions across multiple categories
- **Emission Calculation** - Real-world scientific factors for 15+ activity types
- **Dashboard** - Interactive dashboard with KPIs and charts
- **Insights** - AI-powered recommendations for emission reduction
- **Responsive UI** - Mobile-first design with professional dark theme
- **Settings** - User profile, preferences, and account management

### Phase 2: AI & Document Processing 🔧
- **OCR Processing** - Extract data from utility bills and receipts
- **Automated Logging** - Create activities from document data
- **Vertex AI Insights** - More personalized recommendations
- **Email Notifications** - Stay updated on your progress

### Phase 3: Advanced Features 🔧
- **Regional Benchmarking** - Compare emissions with regional/global averages
- **Carbon Credits** - Blockchain-verified credit system
- **Marketplace** - Trade carbon credits with other users
- **Leaderboards** - Community rankings and achievements
- **Advanced Analytics** - BigQuery-powered insights

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────┐
│      Frontend (Next.js 16 + React 19)   │
├─────────────────────────────────────────┤
│ • Landing Page       • Dashboard        │
│ • Auth Pages        • Settings          │
│ • Activity Logger   • Analytics         │
│ • OCR Upload        • Marketplace       │
├─────────────────────────────────────────┤
│         Design System (Tailwind CSS)    │
│      Dark theme, Green primary color    │
└─────────────────────────────────────────┘
              ↕ HTTP/REST
┌─────────────────────────────────────────┐
│      Backend (FastAPI + Python)         │
├─────────────────────────────────────────┤
│ • Auth Endpoints    • Activity CRUD     │
│ • Calculation Engine • Insights API     │
│ • OCR Service (Phase 2)                │
│ • Analytics Service (Phase 3)          │
│ • Ledger System (Phase 3)              │
├─────────────────────────────────────────┤
│  Database (PostgreSQL/Supabase ready)  │
└─────────────────────────────────────────┘
```

---

## 📁 Project Structure

```
carboniq/
├── app/                          # Next.js App Router
│   ├── page.tsx                 # Landing page
│   ├── layout.tsx               # Root layout
│   ├── globals.css              # Design tokens
│   ├── auth/                    # Authentication pages
│   │   ├── login/
│   │   └── register/
│   ├── dashboard/               # Dashboard pages
│   │   ├── page.tsx
│   │   ├── settings/
│   │   └── analytics/
│   └── api/                     # API routes
├── components/                  # React components
│   ├── sidebar.tsx
│   ├── header.tsx
│   ├── stats-cards.tsx
│   ├── emissions-chart.tsx
│   ├── activity-logger.tsx
│   ├── insights-panel.tsx
│   ├── ocr-upload.tsx          # Phase 2
│   └── credit-marketplace.tsx   # Phase 3
├── lib/
│   ├── auth-context.tsx        # Auth state management
│   ├── api-client.ts           # HTTP client
│   └── use-api.ts              # Data fetching hooks
├── api/                         # FastAPI backend
│   ├── main.py                 # Main server
│   ├── requirements.txt
│   ├── ocr_service.py          # Phase 2
│   ├── ledger_service.py       # Phase 3
│   └── analytics_service.py    # Phase 3
├── public/                      # Static assets
├── CARBONIQ_GUIDE.md           # Full documentation
├── BUILD_SUMMARY.md            # Build details
├── QUICKSTART.md               # Quick reference
├── .env.example                # Environment template
└── package.json
```

---

## 🎯 Problem Statement

CarbonIQ helps individuals understand, track, and reduce their carbon footprint through simple actions and personalized insights. We address the core challenge: most people don't know their actual environmental impact or how to meaningfully reduce it.

**Challenge:** "Help individuals understand, track, and reduce their carbon footprint through simple actions and personalized insights"

**Feature Mapping:**
- **Activity logging + OCR bill upload** → Simple actions: Users easily log emissions from daily activities or upload utility bills for automatic processing
- **Vertex AI personalized insight generation** → Personalized insights: AI analyzes individual behavior patterns to generate custom reduction recommendations
- **Dashboard with trend charts + regional benchmarking** → Understand and track footprint: Real-time visualization of emissions trends with community comparisons for context
- **Carbon credits ledger + streak tracking** → Sustained reduction behavior: Gamified system with verifiable credits and achievement tracking motivates long-term behavior change

---

## 💼 Use Cases

### Individual Users
- Track personal carbon footprint
- Get reduction recommendations
- Compare with others
- Offset emissions with carbon credits

### Companies
- Track organizational emissions
- Set sustainability goals
- Employee engagement programs
- CSR reporting and verification

### Environmental Organizations
- Monitor community impact
- Aggregate regional data
- Create benchmarks
- Support carbon offset programs

---

## 🔐 Security

- **JWT Authentication** - Secure token-based auth
- **HttpOnly Cookies** - Tokens secure from XSS
- **Input Validation** - Pydantic validation on all inputs
- **CORS Configuration** - Properly configured for production
- **Password Hashing** - bcrypt ready for integration
- **HTTPS Ready** - SSL/TLS support for production

---

## 📊 Emission Calculation

All calculations use scientific, real-world data:

### Transport
- Car: 0.120 kg CO₂e/km (average)
- Electric car: 0.025 kg CO₂e/km
- Public transit: 0.041 kg CO₂e/km

### Energy
- Electricity: 0.415 kg CO₂e/kWh (global average)
- Natural gas: 2.04 kg CO₂e/m³

### Food
- Beef: 27.0 kg CO₂e/kg (highest impact)
- Chicken: 6.9 kg CO₂e/kg
- Vegetables: 0.22 kg CO₂e/kg

[Full list in CARBONIQ_GUIDE.md]

---

## 🚢 Deployment

### Frontend (Next.js on Vercel)
```bash
# Deploy directly to Vercel
vercel deploy

# Or create a production build
pnpm build
pnpm start
```

### Backend (FastAPI)
```bash
# Local development
cd api
python -m uvicorn main:app --reload

# Production with Gunicorn
pip install gunicorn
gunicorn -w 4 -k uvicorn.workers.UvicornWorker main:app
```

### Database Setup
```bash
# Option 1: Supabase (recommended)
# 1. Create Supabase project
# 2. Set SUPABASE_URL and SUPABASE_KEY in .env
# 3. Run migrations

# Option 2: Local PostgreSQL
# docker run -e POSTGRES_PASSWORD=password -p 5432:5432 postgres
```

### Environment Variables Required
```bash
FRONTEND_URL=https://carboniq-web-app.vercel.app
JWT_SECRET=<generate-with-openssl-rand-base64-32>
SUPABASE_URL=<your-supabase-url>
SUPABASE_KEY=<your-supabase-key>
GOOGLE_PROJECT_ID=<optional-for-phase-2>
```

---

## 🔌 Integration Points

### Phase 2 (AI & OCR)
- Google Document AI (bills/receipts)
- Google Vertex AI (personalized insights)
- Email service (notifications)

### Phase 3 (Advanced)
- Google BigQuery (analytics)
- Blockchain network (credit verification)
- Maps API (route optimization)

**All integrations are optional - the app works perfectly without them!**

---

## 📈 Performance

- **Recharts** - Optimized data visualization
- **SWR** - Efficient data fetching and caching
- **Next.js** - Turbopack for fast builds
- **Tailwind CSS** - Minimal CSS output
- **Lazy Loading** - Components load on demand

---

## 📦 Tech Stack

| Component | Technology | Purpose |
|-----------|-----------|---------|
| **Frontend** | Next.js 16, React 19, TypeScript | Modern web application with server components |
| **Styling** | Tailwind CSS 4 | Responsive design with dark theme |
| **UI Components** | shadcn/ui, Recharts | Accessible components and data visualization |
| **State Management** | SWR | Efficient client-side data fetching and caching |
| **Backend API** | FastAPI, Python | Fast, type-safe REST API |
| **Database** | PostgreSQL / Supabase | Persistent data storage with RLS support |
| **Authentication** | JWT + Better Auth ready | Secure token-based authentication |
| **AI Integration** | Google Vertex AI | Personalized insight generation (Phase 2) |
| **Document Processing** | Google Document AI | OCR for utility bills and receipts (Phase 2) |
| **Analytics** | Google BigQuery | Regional benchmarking and trend analysis (Phase 3) |
| **Verification** | Blockchain-ready | Carbon credit ledger with hash chain (Phase 3) |
| **Deployment** | Vercel (frontend), Cloud Run | Production-ready hosting |

---

## 🧪 Development

### Tech Stack Details
| Category | Technology | Version |
|----------|-----------|---------|
| Frontend | Next.js | 16.2.6 |
| React | React | 19.2.4 |
| Styling | Tailwind CSS | 4.2.0 |
| Charts | Recharts | 3.8.1 |
| Backend | FastAPI | Latest |
| Auth | JWT | RS256 |
| Validation | Pydantic | 2.5+ |

### Code Quality
- TypeScript for type safety
- ESLint configuration ready
- Prettier formatting ready
- Comprehensive error handling
- Input validation everywhere

---

## 📚 Documentation

- **[QUICKSTART.md](./QUICKSTART.md)** - 2-minute quick start guide
- **[CARBONIQ_GUIDE.md](./CARBONIQ_GUIDE.md)** - Complete feature documentation
- **[BUILD_SUMMARY.md](./BUILD_SUMMARY.md)** - Architecture and technical details
- **API Docs** - Available at `/api/docs` when backend running

---

## 🧪 Testing

CarbonIQ includes comprehensive test suites for both frontend and backend:

### Backend Testing (pytest)
```bash
# Run all backend tests
pnpm run test:backend

# Or manually:
cd api && python -m pytest tests/ -v
```

**Test Coverage:**
- `test_emission_calculator.py`: Validates emission calculations across all categories
- `test_ledger_service.py`: Verifies hash chain integrity and credit transactions

### Frontend Testing (vitest)
```bash
# Run all frontend tests
pnpm run test

# Run tests in watch mode
pnpm run test:watch
```

**Test Coverage:**
- `ActivityForm.test.tsx`: Form validation and field requirements
- `FootprintChart.test.tsx`: Chart rendering and data display

---

## 🔒 Security & Best Practices

### Security Implementation
- **CORS**: Restricted to deployed frontend origin (configurable via `FRONTEND_URL`)
- **Input Validation**: All API inputs validated with Pydantic models and field constraints
- **Authentication**: JWT-based with Bearer tokens and expiration
- **Authorization**: Row-level security (RLS) ready for Supabase integration
- **Password Requirements**: Minimum 8 characters with at least one digit
- **Error Handling**: Structured error responses (400, 401, 404, 500)
- **Type Safety**: Full type hints on Python backend for runtime validation

### Accessibility Compliance (WCAG 2.1 AA)
- Skip-to-content navigation link for keyboard users
- All form inputs have associated labels with required indicators
- Icon-only buttons include `aria-label` attributes
- Charts include text equivalents for screen reader users
- Focus outlines visible on all interactive elements
- Proper heading hierarchy and semantic HTML
- Color contrast meets WCAG AA standards

### Data Protection
- No hardcoded secrets (all from environment variables)
- JWT tokens with configurable expiration
- Optional: Supabase RLS policies for row-level access control
- Optional: Better Auth integration for enhanced security

---

## 🤝 Contributing

This project is ready for:
- Feature additions
- Integration implementations
- Performance optimizations
- Additional emission categories
- Mobile app development

---

## 📞 Support

- Check documentation in `*.md` files
- Review code comments for implementation details
- API documentation at `http://localhost:8000/docs`
- All features work with mock data - no setup needed

---

## 🌟 Highlights

### Why CarbonIQ?
✅ **No Configuration Needed** - Works out of the box with mock data
✅ **Production Ready** - Clean architecture, scalable design
✅ **Comprehensive** - Full ecosystem from tracking to verification
✅ **Modern Stack** - Latest Next.js 16, React 19, Tailwind CSS 4
✅ **Accessible** - WCAG 2.1 AA compliant components
✅ **Open Architecture** - Easy to integrate with any service

### Built For Scale
- Handles thousands of users
- Efficient database queries ready
- Real-time capabilities (WebSocket ready)
- Horizontal scaling support
- CDN-friendly assets

---

## 📈 Roadmap

- [x] Phase 1: Core functionality
- [x] Phase 2: AI & OCR (scaffolded)
- [x] Phase 3: Advanced features (scaffolded)
- [ ] Mobile app (React Native)
- [ ] API webhooks
- [ ] Team collaboration
- [ ] Automated integrations

---

## 📄 License

MIT License - See LICENSE file

---

## 🙏 Acknowledgments

- Design inspired by modern SaaS applications
- Emission factors from IPCC and EPA data
- Built with Next.js, React, FastAPI communities

---

## 🌱 Let's Build a Sustainable Future

CarbonIQ empowers individuals and organizations to understand and reduce their environmental impact. Every tonne matters.

**Ready to start? Run `pnpm dev` and open http://localhost:3000**

---

**Made with ❤️ for sustainability**
