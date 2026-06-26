'use client'

import { useState, useMemo } from 'react'
import { Search, Edit2, Trash2 } from 'lucide-react'
import { StatusBadge } from '@/components/common/status-badge'
import { User } from '@/data/mock-data'
import { useAuth } from '@/context/auth-context'

interface UserTableProps {
  users: User[]
}

export function UserTable({ users }: UserTableProps) {
  const { user: currentUser } = useAuth()
  const isAdmin = currentUser?.role === 'MIS Admin'
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRole, setSelectedRole] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

  const roles = ['all', ...new Set(users.map(u => u.role))]

  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.id.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesRole = selectedRole === 'all' || user.role === selectedRole

      return matchesSearch && matchesRole
    })
  }, [users, searchTerm, selectedRole])

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const roleColors = {
    'System Administrator': 'bg-red-100 text-red-800',
    'ICT Staff': 'bg-blue-100 text-blue-800',
    'Department Viewer': 'bg-gray-100 text-gray-800',
  }

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg border border-border p-4 space-y-4">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name, email or ID..."
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              value={searchTerm}
              onChange={e => {
                setSearchTerm(e.target.value)
                setCurrentPage(1)
              }}
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-medium text-muted-foreground block mb-2">
            Role
          </label>
          <select
            value={selectedRole}
            onChange={e => {
              setSelectedRole(e.target.value)
              setCurrentPage(1)
            }}
            className="px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {roles.map(role => (
              <option key={role} value={role}>
                {role === 'all' ? 'All Roles' : role}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary">
              <th className="px-6 py-3 text-left font-semibold text-foreground">User ID</th>
              <th className="px-6 py-3 text-left font-semibold text-foreground">Name</th>
              <th className="px-6 py-3 text-left font-semibold text-foreground">Email</th>
              <th className="px-6 py-3 text-left font-semibold text-foreground">Role</th>
              <th className="px-6 py-3 text-left font-semibold text-foreground">Last Login</th>
              <th className="px-6 py-3 text-left font-semibold text-foreground">Status</th>
              {isAdmin && <th className="px-6 py-3 text-left font-semibold text-foreground">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map(user => (
              <tr key={user.id} className="border-b border-border hover:bg-secondary/50">
                <td className="px-6 py-4 text-foreground font-medium">{user.id}</td>
                <td className="px-6 py-4 text-foreground">{user.name}</td>
                <td className="px-6 py-4 text-foreground text-xs">{user.email}</td>
                <td className="px-6 py-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${roleColors[user.role as keyof typeof roleColors]}`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 text-foreground text-xs">{user.lastLogin}</td>
                <td className="px-6 py-4">
                  <StatusBadge status={user.status as 'Active' | 'Inactive'} />
                </td>
                {isAdmin && (
                  <td className="px-6 py-4 flex gap-2">
                    <button className="p-1.5 hover:bg-secondary rounded transition-colors">
                      <Edit2 className="w-4 h-4 text-muted-foreground" />
                    </button>
                    <button className="p-1.5 hover:bg-secondary rounded transition-colors">
                      <Trash2 className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {paginatedUsers.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to{' '}
          {Math.min(currentPage * itemsPerPage, filteredUsers.length)} of {filteredUsers.length}{' '}
          users
        </p>

        <div className="flex gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => p - 1)}
            className="px-4 py-2 border border-border rounded-lg text-sm font-medium disabled:opacity-50 hover:bg-secondary transition-colors"
          >
            Previous
          </button>
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  page === currentPage
                    ? 'bg-primary text-primary-foreground'
                    : 'border border-border hover:bg-secondary'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(p => p + 1)}
            className="px-4 py-2 border border-border rounded-lg text-sm font-medium disabled:opacity-50 hover:bg-secondary transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
