import { LogOut, LogIn, Wrench, AlertCircle } from 'lucide-react'

interface ActivityItem {
  id: number
  type: 'checkout' | 'checkin' | 'maintenance' | 'alert'
  message: string
  timestamp: string
}

interface ActivityFeedProps {
  activities: ActivityItem[]
}

const typeIcons = {
  checkout: LogOut,
  checkin: LogIn,
  maintenance: Wrench,
  alert: AlertCircle,
}

const typeColors = {
  checkout: 'text-blue-600 bg-blue-50',
  checkin: 'text-green-600 bg-green-50',
  maintenance: 'text-yellow-600 bg-yellow-50',
  alert: 'text-red-600 bg-red-50',
}

export function ActivityFeed({ activities }: ActivityFeedProps) {
  return (
    <div className="bg-white rounded-lg border border-border p-6 shadow-sm">
      <h3 className="text-sm font-semibold text-foreground mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map(activity => {
          const Icon = typeIcons[activity.type]
          const colorClass = typeColors[activity.type]

          return (
            <div key={activity.id} className="flex gap-4 pb-4 border-b border-border last:border-0">
              <div className={`p-2 rounded-lg ${colorClass} flex-shrink-0`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground">{activity.message}</p>
                <p className="text-xs text-muted-foreground mt-1">{activity.timestamp}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
