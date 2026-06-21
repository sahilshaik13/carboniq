import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '')

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Generate mock dashboard data
    const stats = {
      total_emissions_month: 125.4,
      total_emissions_year: 1205.3,
      daily_average: 4.2,
      trend: 'down',
      trend_percentage: 8.2,
      regional_comparison: {
        user_emissions: 125.4,
        regional_average: 184.2,
        percentile: 32,
      },
      monthly_data: [
        { month: 'Jan', emissions: 142 },
        { month: 'Feb', emissions: 138 },
        { month: 'Mar', emissions: 151 },
        { month: 'Apr', emissions: 145 },
        { month: 'May', emissions: 138 },
        { month: 'Jun', emissions: 132 },
        { month: 'Jul', emissions: 128 },
        { month: 'Aug', emissions: 125.4 },
      ],
      breakdown_by_category: [
        { category: 'transport', emissions: 65.2, percentage: 52 },
        { category: 'energy', emissions: 35.1, percentage: 28 },
        { category: 'food', emissions: 18.2, percentage: 14 },
        { category: 'other', emissions: 6.9, percentage: 6 },
      ],
    }

    return NextResponse.json(stats)
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
