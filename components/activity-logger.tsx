'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Plus, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'

interface Activity {
  id: string
  category: string
  subcategory: string
  value: number
  unit: string
  date: string
  emissions: number
}

export default function ActivityLogger() {
  const [activities, setActivities] = useState<Activity[]>([
    {
      id: '1',
      category: 'transport',
      subcategory: 'car',
      value: 25,
      unit: 'km',
      date: '2024-06-20',
      emissions: 3.0,
    },
    {
      id: '2',
      category: 'energy',
      subcategory: 'electricity',
      value: 12,
      unit: 'kWh',
      date: '2024-06-19',
      emissions: 4.98,
    },
  ])

  const [formData, setFormData] = useState({
    category: 'transport',
    subcategory: 'car',
    value: '',
    unit: 'km',
    date: new Date().toISOString().split('T')[0],
    notes: '',
  })

  const categories = {
    transport: ['car', 'electric_car', 'public_transport', 'flight_domestic', 'bike'],
    energy: ['electricity', 'natural_gas', 'heating_oil'],
    food: ['meat_beef', 'meat_chicken', 'dairy', 'vegetables'],
    consumption: ['clothing', 'electronics', 'furniture'],
  }

  const handleAddActivity = async () => {
    if (!formData.value) {
      toast.error('Please enter a value')
      return
    }

    const newActivity: Activity = {
      id: Math.random().toString(36).substr(2, 9),
      category: formData.category,
      subcategory: formData.subcategory,
      value: parseFloat(formData.value),
      unit: formData.unit,
      date: formData.date,
      emissions: Math.random() * 10 + 1, // Mock calculation
    }

    setActivities([newActivity, ...activities])
    setFormData({
      ...formData,
      value: '',
      date: new Date().toISOString().split('T')[0],
      notes: '',
    })
    toast.success('Activity logged successfully!')
  }

  const handleDeleteActivity = (id: string) => {
    setActivities(activities.filter((a) => a.id !== id))
    toast.success('Activity removed')
  }

  return (
    <div className="space-y-6">
      {/* Add Activity Form */}
      <div className="bg-card border border-border rounded-lg p-6 space-y-6">
        <h3 className="text-lg font-semibold text-foreground">Log New Activity</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label htmlFor="category-select" className="block text-sm font-medium text-foreground mb-2">Category <span className="text-red-500" aria-label="required">*</span></label>
            <select
              id="category-select"
              value={formData.category}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  category: e.target.value as any,
                  subcategory: Object.values(categories)[0][0],
                })
              }
              className="w-full px-3 py-2 rounded-lg bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              aria-required="true"
            >
              {Object.keys(categories).map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="subcategory-select" className="block text-sm font-medium text-foreground mb-2">Type <span className="text-red-500" aria-label="required">*</span></label>
            <select
              id="subcategory-select"
              value={formData.subcategory}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  subcategory: e.target.value,
                })
              }
              className="w-full px-3 py-2 rounded-lg bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              aria-required="true"
            >
              {(categories[formData.category as keyof typeof categories] || []).map((sub) => (
                <option key={sub} value={sub}>
                  {sub.replace(/_/g, ' ').charAt(0).toUpperCase() + sub.slice(1).replace(/_/g, ' ')}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="value-input" className="block text-sm font-medium text-foreground mb-2">Value <span className="text-red-500" aria-label="required">*</span></label>
            <input
              id="value-input"
              type="number"
              placeholder="25"
              value={formData.value}
              onChange={(e) => setFormData({ ...formData, value: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-secondary border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              aria-required="true"
              aria-describedby="value-error"
            />
          </div>

          <div>
            <label htmlFor="unit-input" className="block text-sm font-medium text-foreground mb-2">Unit</label>
            <input
              id="unit-input"
              type="text"
              placeholder="km"
              value={formData.unit}
              onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-secondary border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="date-input" className="block text-sm font-medium text-foreground mb-2">Date <span className="text-red-500" aria-label="required">*</span></label>
            <input
              id="date-input"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              aria-required="true"
            />
          </div>

          <div>
            <label htmlFor="notes-input" className="block text-sm font-medium text-foreground mb-2">Notes (optional)</label>
            <input
              id="notes-input"
              type="text"
              placeholder="Add notes..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-secondary border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <Button onClick={handleAddActivity} className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Log Activity
        </Button>
      </div>

      {/* Activity List */}
      <div className="bg-card border border-border rounded-lg p-6 space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Recent Activities</h3>

        {activities.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">No activities logged yet</p>
        ) : (
          <div className="space-y-3">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-4 bg-secondary rounded-lg border border-border/50">
                <div>
                  <p className="font-medium text-foreground capitalize">
                    {activity.subcategory.replace(/_/g, ' ')}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {activity.value} {activity.unit} • {activity.date}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-semibold text-primary">{activity.emissions.toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground">kg CO₂e</p>
                  </div>
                  <button
                    onClick={() => handleDeleteActivity(activity.id)}
                    className="text-muted-foreground hover:text-destructive transition-colors focus:outline-none focus:ring-2 focus:ring-destructive rounded px-1"
                    aria-label={`Delete activity: ${activity.subcategory.replace(/_/g, ' ')}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
