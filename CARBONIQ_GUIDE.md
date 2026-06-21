# CarbonIQ - Carbon Footprint Tracking Platform

## Overview

CarbonIQ is a professional full-stack carbon footprint tracking application built with Next.js 16, React 19, TypeScript, FastAPI, and PostgreSQL. It provides users with comprehensive emission tracking, AI-powered insights, blockchain-verified carbon credits, and community benchmarking.

## Project Structure

```
carboniq/
├── app/                          # Next.js App Router
│   ├── page.tsx                 # Landing page
│   ├── layout.tsx               # Root layout with auth provider
│   ├── auth/
│   │   ├── login/page.tsx       # Login page
│   │   └── register/page.tsx    # Registration page
│   ├── dashboard/
│   │   ├── page.tsx             # Main dashboard
│   │   └── settings/page.tsx    # User settings
│   ├── api/                     # Next.js API routes
│   │   ├── activities/          # Activity CRUD
│   │   ├── insights/            # AI insights
│   │   └── dashboard/           # Dashboard stats
│   └── globals.css              # Design system tokens
├── components/
│   ├── sidebar.tsx              # Navigation sidebar
│   ├── header.tsx               # Dashboard header
│   ├── stats-cards.tsx          # KPI cards
│   ├── emissions-chart.tsx      # Charts and visualizations
│   ├── activity-logger.tsx      # Activity form
│   └── insights-panel.tsx       # Insights display
├── lib/
│   ├── auth-context.tsx         # Auth state management
│   └── utils.ts                 # Utility functions
├── api/
│   ├── main.py                  # FastAPI server
│   ├── requirements.txt         # Python dependencies
│   ├── ocr_service.py           # Phase 2: OCR integration
│   ├── ledger_service.py        # Phase 3: Blockchain ledger
│   └── analytics_service.py     # Phase 3: BigQuery analytics
├── public/                      # Static assets
├── .env.example                 # Environment template
└── package.json                 # Node dependencies
```

## Features

### Phase 1: Core Functionality (Complete)
- ✅ User authentication (register/login)
- ✅ Activity logging across 4+ categories
- ✅ Emission calculation engine with real factors
- ✅ Dashboard with stats and charts
- ✅ Real-time insights and recommendations
- ✅ Responsive dark-themed UI
- ✅ Mobile-first design

### Phase 2: AI & Document Processing
- 🔧 Vertex AI integration for personalized insights
- 🔧 Document AI for utility bill OCR
- 🔧 Automated activity creation from bills
- 🔧 Security hardening and validation
- 🔧 Email notifications

### Phase 3: Advanced Features
- 🔧 BigQuery benchmarking and analytics
- 🔧 Blockchain-verified carbon credits
- 🔧 Carbon credit marketplace
- 🔧 Routes API for transportation optimization
- 🔧 Gamification and achievements
- 🔧 Community leaderboards

## Getting Started

### Prerequisites
- Node.js 18+
- Python 3.9+
- PostgreSQL (or use Supabase)
- pnpm package manager

### Installation

1. **Install dependencies:**
```bash
pnpm install
pip install -r api/requirements.txt
```

2. **Set up environment:**
```bash
cp .env.example .env.local
# Edit .env.local with your settings
```

3. **Run development servers:**

**Frontend (Terminal 1):**
```bash
pnpm dev
```

**Backend (Terminal 2):**
```bash
cd api
python -m uvicorn main:app --reload --port 8000
```

4. **Access the app:**
- Frontend: http://localhost:3000
- API Docs: http://localhost:8000/docs

### Demo Credentials
```
Email: demo@carboniq.com
Password: demo123
```

## Technology Stack

### Frontend
- **Framework:** Next.js 16 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 with custom dark theme
- **Components:** shadcn/ui + custom components
- **State:** React Context + SWR
- **Charts:** Recharts
- **HTTP Client:** Axios

### Backend
- **Framework:** FastAPI (Python)
- **Database:** PostgreSQL with SQLAlchemy
- **Auth:** JWT with HTTP-only cookies
- **Validation:** Pydantic
- **Optional Integrations:** Google Cloud APIs

### Design System

**Colors:**
- Primary (Green): `oklch(0.55 0.15 142)` - Sustainability
- Background: `oklch(0.12 0 0)` - Deep dark
- Foreground: `oklch(0.95 0.01 0)` - Off-white text
- Cards: `oklch(0.18 0 0)` - Slightly lighter
- Borders: `1px solid oklch(1 0 0 / 12%)`

**Typography:**
- Sans: Geist (body text)
- Mono: Geist Mono (code)
- Headings: Bold weights of sans

## API Endpoints

### Authentication
- `POST /auth/register` - Create account
- `POST /auth/login` - Login
- `POST /auth/verify` - Verify JWT token

### Activities
- `GET /activities/{user_id}` - Get user's activities
- `POST /activities` - Create new activity
- `DELETE /activities/{id}` - Remove activity

### Insights
- `GET /insights/{user_id}` - Get AI insights
- `GET /emissions-factors` - Get calculation factors

### Dashboard
- `GET /dashboard/{user_id}` - Get dashboard stats
- `GET /health` - Health check

## Emission Calculation Factors

### Transport (kg CO₂e)
- Car: 0.120 per km
- Electric car: 0.025 per km
- Public transport: 0.041 per km
- Flight domestic: 0.255 per km
- Flight international: 0.195 per km

### Energy (kg CO₂e)
- Electricity: 0.415 per kWh
- Natural gas: 2.04 per m³
- Heating oil: 3.15 per liter

### Food (kg CO₂e per kg)
- Beef: 27.0
- Pork: 12.1
- Chicken: 6.9
- Dairy: 1.23
- Vegetables: 0.22

### Consumption (kg CO₂e per item)
- Clothing: 7.0
- Electronics: 85.0
- Furniture: 30.0

## Database Schema

### users
```sql
- id: UUID
- email: String (unique)
- password_hash: String
- full_name: String
- created_at: Timestamp
```

### activities
```sql
- id: UUID
- user_id: UUID (FK)
- category: String
- subcategory: String
- value: Float
- unit: String
- date: Date
- emissions_kg_co2e: Float
- notes: String
- created_at: Timestamp
```

### insights
```sql
- id: UUID
- user_id: UUID (FK)
- title: String
- description: String
- recommendation: String
- potential_savings: Float
- priority: String (high/medium/low)
- generated_at: Timestamp
```

## Authentication Flow

1. User registers/logs in
2. Backend validates credentials
3. JWT token generated and stored in httpOnly cookie
4. Frontend stores token for API requests
5. Protected routes verify token on each request
6. Token expires after 30 days

## Development Workflow

### Adding a new feature:
1. Create component in `/components`
2. Add API route if needed in `/app/api`
3. Update dashboard page to use component
4. Test with mock data
5. Connect to backend when ready

### Deployment:
1. Build: `pnpm build`
2. Deploy frontend to Vercel
3. Deploy backend to services (AWS, Railway, etc.)
4. Set production environment variables
5. Configure database and integrations

## Environment Variables

**Frontend (.env.local):**
```
NEXT_PUBLIC_API_URL=your-api-url
```

**Backend (.env):**
```
JWT_SECRET=your-secret-key
DATABASE_URL=postgresql://user:pass@host/db
GOOGLE_PROJECT_ID=your-project-id
GOOGLE_APPLICATION_CREDENTIALS=path/to/creds.json
```

## Performance Optimization

- Charts use Recharts for efficient rendering
- API responses cached with SWR
- Lazy loading for dashboard components
- CSS-in-JS with Tailwind for minimal bundle
- Image optimization with Next.js Image component

## Security Best Practices

- JWT tokens in httpOnly cookies
- CORS properly configured
- Input validation on all endpoints
- SQL injection prevention via ORM
- Password hashing with bcrypt
- Rate limiting (can be added)
- HTTPS enforced in production

## Testing

(To be implemented in Phase 3)
- Unit tests for calculation engine
- Integration tests for API
- Component tests for React
- E2E tests with Cypress

## Future Enhancements

1. **Mobile App** - React Native
2. **Real-time Collaboration** - WebSockets
3. **Export Reports** - PDF generation
4. **API Keys** - For third-party integrations
5. **Multi-language Support** - i18n
6. **Dark/Light Mode Toggle**
7. **Custom Emission Factors** - Per-user customization

## Support & Feedback

For issues or feature requests, please open an issue in the repository.

## License

MIT License - See LICENSE file for details

---

**Built with ❤️ for a sustainable future**
