import { NextRequest, NextResponse } from 'next/server'

// Mock AI insights generation
export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '')

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Generate mock insights based on user patterns
    const insights = [
      {
        id: '1',
        title: 'Switch to Public Transport',
        description: 'Your car commute accounts for 45% of your weekly emissions.',
        recommendation: 'Try public transportation for your daily 25km commute.',
        potential_savings_kg_co2e: 12.5,
        category: 'transport',
        priority: 'high',
        implementation_difficulty: 'medium',
      },
      {
        id: '2',
        title: 'Reduce Energy Consumption',
        description: 'Your electricity usage is 15% above the regional average.',
        recommendation: 'Install LED bulbs and use a smart thermostat to optimize heating.',
        potential_savings_kg_co2e: 8.3,
        category: 'energy',
        priority: 'high',
        implementation_difficulty: 'low',
      },
      {
        id: '3',
        title: 'Sustainable Diet',
        description: 'Meat consumption contributes 22% of your monthly footprint.',
        recommendation: 'Try "Meatless Mondays" to reduce beef consumption.',
        potential_savings_kg_co2e: 6.8,
        category: 'food',
        priority: 'medium',
        implementation_difficulty: 'medium',
      },
      {
        id: '4',
        title: 'Compare Your Footprint',
        description: `You're already 32% below the regional average - Great job!`,
        recommendation: 'Continue monitoring and share your sustainable habits with friends.',
        potential_savings_kg_co2e: 0,
        category: 'community',
        priority: 'low',
        implementation_difficulty: 'low',
      },
    ]

    return NextResponse.json(insights)
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST endpoint for generating new insights (Phase 2 - with AI)
export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '')

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()

    // In Phase 2, this would call Vertex AI to generate personalized insights
    // For now, return mock insight
    const insight = {
      id: Math.random().toString(36).substr(2, 9),
      title: 'AI-Generated Insight',
      description: body.description || 'Based on your activity patterns',
      recommendation: body.recommendation || 'Keep tracking your carbon footprint',
      potential_savings_kg_co2e: Math.random() * 20,
      category: body.category,
      priority: 'medium',
      implementation_difficulty: 'medium',
      generated_at: new Date().toISOString(),
    }

    return NextResponse.json(insight, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
