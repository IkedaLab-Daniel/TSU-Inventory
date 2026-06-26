import { LogOut, LogIn, Wrench, AlertCircle, LucideIcon } from 'lucide-react'

interface ActivityItem {
  id: number
  type: string
  message: string
  timestamp: string
}

interface ActivityFeedProps {
  activities: ActivityItem[]
}

const typeIcons: Record<string, LucideIcon> = {
  checkout: LogOut,
  checkin: LogIn,
  maintenance: Wrench,
  alert: AlertCircle,
}

const typeColors: Record<string, string> = {
  checkout: 'text-blue-600 bg-blue-50',
  checkin: 'text-green-600 bg-green-50',
  maintenance: 'text-yellow-600 bg-yellow-50',
  alert: 'text-red-600 bg-red-50',
}

export function ActivityFeed({ activities }: ActivityFeedProps) {
  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-sm hover:shadow-md transition-shadow">
      <h3 className="text-lg font-semibold text-foreground mb-5">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map(activity => {
          const Icon = typeIcons[activity.type] || AlertCircle
          const colorClass = typeColors[activity.type] || 'text-gray-600 bg-gray-50'

          return (
            <div key={activity.id} className="flex gap-4 pb-4 border-b border-border last:border-0 last:pb-0 group">
              <div className={`p-2.5 rounded-lg ${colorClass} flex-shrink-0 group-hover:scale-110 transition-transform`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground font-medium">{activity.message}</p>
                <p className="text-xs text-muted-foreground mt-1">{activity.timestamp}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
