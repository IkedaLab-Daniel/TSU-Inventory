import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react'

interface StatCardProps {
  title: string
  value: number
  icon: LucideIcon
  color?: 'blue' | 'green' | 'yellow' | 'gray' | 'purple' | 'red'
  trend?: {
    value: number
    isPositive: boolean
  }
  progress?: number
  description?: string
}

const colorClasses = {
  blue: {
    bg: 'bg-blue-50',
    text: 'text-blue-600',
    border: 'border-blue-100',
    gradient: 'from-blue-500 to-blue-600',
  },
  green: {
    bg: 'bg-green-50',
    text: 'text-green-600',
    border: 'border-green-100',
    gradient: 'from-green-500 to-green-600',
  },
  yellow: {
    bg: 'bg-yellow-50',
    text: 'text-yellow-600',
    border: 'border-yellow-100',
    gradient: 'from-yellow-500 to-yellow-600',
  },
  gray: {
    bg: 'bg-gray-50',
    text: 'text-gray-600',
    border: 'border-gray-100',
    gradient: 'from-gray-500 to-gray-600',
  },
  purple: {
    bg: 'bg-purple-50',
    text: 'text-purple-600',
    border: 'border-purple-100',
    gradient: 'from-purple-500 to-purple-600',
  },
  red: {
    bg: 'bg-red-50',
    text: 'text-red-600',
    border: 'border-red-100',
    gradient: 'from-red-500 to-red-600',
  },
}

export function StatCard({
  title,
  value,
  icon: Icon,
  color = 'blue',
  trend,
  progress,
  description,
}: StatCardProps) {
  const colors = colorClasses[color]

  return (
    <div className="bg-white rounded-xl border border-border p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:border-gray-300 group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-bold text-foreground">{value}</p>
            {trend && (
              <div
                className={`flex items-center gap-1 text-xs font-medium ${
                  trend.isPositive ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {trend.isPositive ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                <span>{trend.value}%</span>
              </div>
            )}
          </div>
        </div>
        <div
          className={`p-3 rounded-xl ${colors.bg} ${colors.text} group-hover:scale-110 transition-transform duration-300`}
        >
          <Icon className="w-6 h-6" />
        </div>
      </div>

      {progress !== undefined && (
        <div className="mb-3">
          <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r ${colors.gradient} rounded-full transition-all duration-500`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
    </div>
  )
}

// Made with Bob
