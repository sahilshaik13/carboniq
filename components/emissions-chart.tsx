'use client'

import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const monthlyData = [
  { month: 'Jan', emissions: 142 },
  { month: 'Feb', emissions: 138 },
  { month: 'Mar', emissions: 151 },
  { month: 'Apr', emissions: 145 },
  { month: 'May', emissions: 138 },
  { month: 'Jun', emissions: 132 },
  { month: 'Jul', emissions: 128 },
  { month: 'Aug', emissions: 125 },
]

const categoryData = [
  { name: 'Transport', value: 65, color: '#22c55e' },
  { name: 'Energy', value: 35, color: '#4ade80' },
  { name: 'Food', value: 18, color: '#86efac' },
  { name: 'Other', value: 7, color: '#dcfce7' },
]

export default function EmissionsChart() {
  return (
    <div className="space-y-6">
      {/* Monthly Trend */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">Emissions Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
            <YAxis stroke="var(--color-muted-foreground)" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--color-card)',
                border: `1px solid var(--color-border)`,
                borderRadius: '0.5rem',
              }}
              labelStyle={{ color: 'var(--color-foreground)' }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="emissions"
              stroke="var(--color-primary)"
              dot={{ fill: 'var(--color-primary)', r: 4 }}
              activeDot={{ r: 6 }}
              strokeWidth={2}
              name="CO₂e (kg)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Breakdown by Category */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-6">Emissions by Category</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--color-card)',
                  border: `1px solid var(--color-border)`,
                  borderRadius: '0.5rem',
                }}
                labelStyle={{ color: 'var(--color-foreground)' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Category List */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-6">Top Contributors</h3>
          <div className="space-y-4">
            {categoryData.map((category) => (
              <div key={category.name} className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-foreground font-medium">{category.name}</span>
                  <span className="text-muted-foreground">{category.value}%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div
                    className="h-2 rounded-full"
                    style={{
                      width: `${category.value}%`,
                      backgroundColor: category.color,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
