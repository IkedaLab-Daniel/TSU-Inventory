import { LucideIcon } from 'lucide-react'

interface StatCardProps {
  title: string
  value: number
  icon: LucideIcon
  color?: 'blue' | 'green' | 'yellow' | 'gray' | 'purple'
  change?: string
}

const colorClasses = {
  blue: 'bg-blue-50 text-blue-600',
  green: 'bg-green-50 text-green-600',
  yellow: 'bg-yellow-50 text-yellow-600',
  gray: 'bg-gray-50 text-gray-600',
  purple: 'bg-purple-50 text-purple-600',
}

export function StatCard({
  title,
  value,
  icon: Icon,
  color = 'blue',
  change,
}: StatCardProps) {
  return (
    <div className="bg-white rounded-lg border border-border p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold text-foreground mt-2">{value}</p>
          {change && (
            <p className="text-xs text-green-600 mt-1">{change}</p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  )
}
