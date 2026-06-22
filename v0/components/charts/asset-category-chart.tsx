'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface AssetCategoryChartProps {
  data: Array<{ category: string; count: number }>
}

export function AssetCategoryChart({ data }: AssetCategoryChartProps) {
  return (
    <div className="bg-white rounded-lg border border-border p-6 shadow-sm">
      <h3 className="text-sm font-semibold text-foreground mb-4">Asset Distribution by Category</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#1E3A5F" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
