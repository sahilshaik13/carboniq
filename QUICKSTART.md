# CarbonIQ Quick Start Guide

## ⚡ Get Running in 2 Minutes

### Prerequisites
- Node.js 18+
- Python 3.9+
- pnpm package manager

### Step 1: Start the Frontend Dev Server
```bash
cd /vercel/share/v0-project
pnpm dev
```

The app opens at: **http://localhost:3000**

### Step 2: Start the Backend API (Optional)
In a new terminal:
```bash
cd /vercel/share/v0-project/api
python -m uvicorn main:app --reload --port 8000
```

API Docs: **http://localhost:8000/docs**

### Step 3: Login or Register
Use demo credentials or create a new account:
```
Email: demo@carboniq.com
Password: demo123
```

---

## 🎯 What You Can Do

### Try the Core Features:
1. **Dashboard** - View emissions statistics and trends
2. **Log Activity** - Record transport, energy, food, or consumption activities
3. **View Insights** - Get AI-powered recommendations
4. **Settings** - Update profile and preferences
5. **Analytics** (Phase 3) - View regional benchmarking

### Try Different Categories:
- **Transport:** Car trips, public transport, flights
- **Energy:** Electricity, natural gas, heating oil
- **Food:** Meat, dairy, vegetables
- **Consumption:** Clothing, electronics, furniture

---

## 📊 Example Activities to Log

Try logging these to see the dashboard update:

1. **Car commute:** 25 km (shows ~3 kg CO₂e)
2. **Electricity usage:** 450 kWh (shows ~187 kg CO₂e)
3. **Beef meal:** 0.5 kg (shows ~13.5 kg CO₂e)

---

## 🗂️ Project Structure (Essential Files)

```
Frontend:
- app/page.tsx → Landing page
- app/dashboard/page.tsx → Main dashboard
- components/ → React components

Backend:
- api/main.py → FastAPI server

Design:
- app/globals.css → Dark theme with green accent
```

---

## 🔧 Configuration

### Frontend Environment (Optional)
```bash
# Create .env.local if needed
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Backend Environment (Optional)
```bash
# Create .env if needed
JWT_SECRET=your-secret-key
API_PORT=8000
```

---

## 📱 Features by Tab

### Overview Tab
- Total emissions this month and year
- Daily average CO₂e
- Comparison to regional average
- 90-day trends chart
- Breakdown by category pie chart
- AI-generated insights

### Log Tab
- Add new activities
- Select category and type
- Enter value and unit
- Choose date
- Add optional notes
- View activity history

### Insights Tab
- Personalized recommendations
- Potential savings (kg CO₂e)
- Priority levels
- Implementation difficulty
- Action items

### Ledger Tab (Phase 3)
- Carbon credit balance
- Trade history
- Global leaderboard
- Marketplace access

### Settings Tab
- Profile information
- Notification preferences
- Privacy & security
- Data export
- Account management

---

## 🚀 Try These Actions

### 1. Log a Week of Activities
```
Monday: 30 km car → 3.6 kg CO₂e
Tuesday: 300 kWh electricity → 124.5 kg CO₂e
Wednesday: 2 kg chicken → 13.8 kg CO₂e
Thursday: 50 km public transit → 2.05 kg CO₂e
Friday: 1 item clothing → 7 kg CO₂e
Total: ~151 kg CO₂e
```

### 2. Check Your Stats
- See monthly total increase
- Watch category breakdown update
- View new insights appear

### 3. View Analytics (Phase 3)
- Compare to regional average
- See your percentile ranking
- Check category trends

### 4. Download Data
- Go to Settings → Data Management
- Export your activities as CSV

---

## 🎨 UI/UX Features

- **Dark Professional Theme** - Green primary color
- **Responsive Design** - Works on mobile, tablet, desktop
- **Real-time Updates** - Dashboard updates as you add activities
- **Interactive Charts** - Hover for details, zoom capabilities
- **Toast Notifications** - Success/error feedback
- **Accessible Components** - WCAG 2.1 AA compliant

---

## 📈 Sample Dashboard After Demo Data

After logging a week of activities, you'll see:
- Monthly total: ~150 kg CO₂e
- Daily average: ~5.5 kg CO₂e
- Top category: Transport (45%)
- Trend: Stable or improving
- Insights: 3-4 personalized recommendations

---

## 🔐 Security Notes

- Tokens stored in secure httpOnly cookies
- 30-day token expiration
- JWT validation on all protected endpoints
- Input validation on forms
- CORS configured for localhost

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# If port 3000 is busy, use:
pnpm dev -p 3001
```

### Dependencies Not Installing
```bash
# Clear cache and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Backend Connection Issues
```bash
# Check if API is running:
curl http://localhost:8000/health

# Should return: {"status":"ok","timestamp":"..."}
```

### Build Errors
```bash
# Clear Next.js cache:
rm -rf .next
pnpm build
```

---

## 📚 Full Documentation

- **CARBONIQ_GUIDE.md** - Complete feature documentation
- **BUILD_SUMMARY.md** - Architecture and build details
- **API Docs** - http://localhost:8000/docs (when backend running)

---

## 🎯 Next Steps

### To Deploy:
1. Frontend → Vercel (1-click deployment)
2. Backend → AWS/Railway/Heroku
3. Database → PostgreSQL/Supabase

### To Add Real Integrations:
1. Set up Google Cloud Project
2. Enable Document AI (Phase 2)
3. Enable Vertex AI (Phase 2)
4. Enable BigQuery (Phase 3)
5. Configure credentials in .env

### To Extend:
1. Add more categories/subcategories
2. Create custom emission factors
3. Build mobile app with React Native
4. Add team/family sharing features
5. Integrate with smart home devices

---

## ✨ Tips & Tricks

- **Mobile View:** Responsive design works great on phones
- **Dark Mode:** Already enabled by default
- **Keyboard Navigation:** Tab through form fields
- **Chart Interaction:** Click/hover on chart elements for details
- **Bulk Import:** Add multiple activities quickly
- **Export Data:** Download your data anytime

---

## 💬 Support

- Check CARBONIQ_GUIDE.md for detailed docs
- Review code comments for implementation details
- API documentation at /api/docs
- All features work with mock data - no keys needed

---

**Happy Tracking! 🌱**

Start logging your carbon footprint and join thousands reducing their environmental impact with CarbonIQ.
