import { LucideIcon, ArrowUpRight } from 'lucide-react'

interface QuickActionCardProps {
  title: string
  description: string
  icon: LucideIcon
  color?: 'blue' | 'green' | 'yellow' | 'purple' | 'red'
  onClick?: () => void
}

const colorClasses = {
  blue: {
    bg: 'bg-blue-50',
    text: 'text-blue-600',
    hover: 'hover:bg-blue-100',
    border: 'border-blue-200',
  },
  green: {
    bg: 'bg-green-50',
    text: 'text-green-600',
    hover: 'hover:bg-green-100',
    border: 'border-green-200',
  },
  yellow: {
    bg: 'bg-yellow-50',
    text: 'text-yellow-600',
    hover: 'hover:bg-yellow-100',
    border: 'border-yellow-200',
  },
  purple: {
    bg: 'bg-purple-50',
    text: 'text-purple-600',
    hover: 'hover:bg-purple-100',
    border: 'border-purple-200',
  },
  red: {
    bg: 'bg-red-50',
    text: 'text-red-600',
    hover: 'hover:bg-red-100',
    border: 'border-red-200',
  },
}

export function QuickActionCard({
  title,
  description,
  icon: Icon,
  color = 'blue',
  onClick,
}: QuickActionCardProps) {
  const colors = colorClasses[color]

  return (
    <button
      onClick={onClick}
      className={`w-full bg-white border border-border rounded-xl p-5 text-left transition-all duration-300 hover:shadow-lg hover:border-gray-300 hover:-translate-y-1 group`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className={`p-3 rounded-lg ${colors.bg} ${colors.text} group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-5 h-5" />
        </div>
        <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
      </div>
      <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </button>
  )
}

// Made with Bob
