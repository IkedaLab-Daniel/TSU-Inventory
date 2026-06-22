interface StatusBadgeProps {
  status: 'Available' | 'In Use' | 'Under Maintenance' | 'Retired' | 'Active' | 'Inactive' | 'Open' | 'Resolved' | 'Good' | 'Fair' | 'Poor' | 'Damaged'
  variant?: 'status' | 'role' | 'condition'
}

const statusColors = {
  'Available': 'bg-green-100 text-green-800',
  'In Use': 'bg-blue-100 text-blue-800',
  'Under Maintenance': 'bg-yellow-100 text-yellow-800',
  'Retired': 'bg-gray-100 text-gray-800',
  'Active': 'bg-green-100 text-green-800',
  'Inactive': 'bg-gray-100 text-gray-800',
  'Open': 'bg-yellow-100 text-yellow-800',
  'Resolved': 'bg-green-100 text-green-800',
  'Good': 'bg-green-100 text-green-800',
  'Fair': 'bg-yellow-100 text-yellow-800',
  'Poor': 'bg-red-100 text-red-800',
  'Damaged': 'bg-red-100 text-red-800',
}

export function StatusBadge({ status, variant = 'status' }: StatusBadgeProps) {
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}>
      {status}
    </span>
  )
}
