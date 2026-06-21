import { NextRequest, NextResponse } from 'next/server'

// Mock database for demo
const activities: any[] = []

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '')

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Return mock activities
    return NextResponse.json(activities)
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '')

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()

    // Calculate emissions based on category and value
    const emissionFactors: any = {
      transport: {
        car: 0.12,
        electric_car: 0.025,
        public_transport: 0.041,
        flight_domestic: 0.255,
        bike: 0,
      },
      energy: {
        electricity: 0.415,
        natural_gas: 2.04,
        heating_oil: 3.15,
      },
      food: {
        meat_beef: 27.0,
        meat_chicken: 6.9,
        dairy: 1.23,
        vegetables: 0.22,
      },
    }

    const factor = emissionFactors[body.category]?.[body.subcategory] || 0
    const emissions = body.value * factor

    const activity = {
      id: Math.random().toString(36).substr(2, 9),
      ...body,
      emissions_kg_co2e: emissions,
      created_at: new Date().toISOString(),
    }

    activities.push(activity)

    return NextResponse.json(activity, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
