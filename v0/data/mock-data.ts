// Mock data for ICT-IMS System

export interface Asset {
  id: string
  name: string
  category: 'Laptop' | 'Desktop' | 'Printer' | 'Projector' | 'Networking' | 'Peripheral'
  serialNumber: string
  location: string
  status: 'Available' | 'In Use' | 'Under Maintenance' | 'Retired'
  condition: 'Good' | 'Fair' | 'Poor' | 'Damaged'
  assignedTo: string
  acquisitionDate: string
  cost: number
  warrantyExpiry: string
}

export interface CheckoutRecord {
  id: string
  assetId: string
  assetName: string
  borrowerName: string
  designation: string
  department: string
  contactNumber: string
  purpose: string
  checkoutDate: string
  expectedReturnDate: string
  actualReturnDate?: string
  status: 'Active' | 'Returned'
}

export interface MaintenanceRecord {
  id: string
  assetId: string
  assetName: string
  date: string
  type: 'Preventive' | 'Corrective'
  technicianAssigned: string
  workPerformed: string
  partsReplaced: string
  cost: number
  status: 'Open' | 'Resolved'
}

export interface User {
  id: string
  name: string
  email: string
  role: 'System Administrator' | 'ICT Staff' | 'Department Viewer'
  status: 'Active' | 'Inactive'
  lastLogin: string
}

export interface AuditLog {
  id: string
  timestamp: string
  user: string
  action: 'Check-Out' | 'Check-In' | 'Edit' | 'Disposal' | 'Maintenance'
  assetId: string
  assetName: string
  details: string
}

export const assets: Asset[] = [
  {
    id: 'AST-001',
    name: 'Dell Inspiron 15',
    category: 'Laptop',
    serialNumber: 'D123456789',
    location: 'College of Agriculture',
    status: 'In Use',
    condition: 'Good',
    assignedTo: 'Maria Santos',
    acquisitionDate: '2023-01-15',
    cost: 45000,
    warrantyExpiry: '2025-01-15',
  },
  {
    id: 'AST-002',
    name: 'HP ProBook 14',
    category: 'Laptop',
    serialNumber: 'HP987654321',
    location: 'IT Laboratory',
    status: 'Available',
    condition: 'Good',
    assignedTo: '',
    acquisitionDate: '2023-03-20',
    cost: 52000,
    warrantyExpiry: '2025-03-20',
  },
  {
    id: 'AST-003',
    name: 'Canon Pixma MX490',
    category: 'Printer',
    serialNumber: 'CANON111',
    location: 'Admin Building',
    status: 'In Use',
    condition: 'Fair',
    assignedTo: 'Juan Cruz',
    acquisitionDate: '2021-06-10',
    cost: 15000,
    warrantyExpiry: '2024-06-10',
  },
  {
    id: 'AST-004',
    name: 'Epson EB-X500',
    category: 'Projector',
    serialNumber: 'EPSON222',
    location: 'Student Center',
    status: 'Under Maintenance',
    condition: 'Poor',
    assignedTo: 'Pending Repair',
    acquisitionDate: '2022-02-28',
    cost: 35000,
    warrantyExpiry: '2025-02-28',
  },
  {
    id: 'AST-005',
    name: 'Lenovo ThinkCentre M93',
    category: 'Desktop',
    serialNumber: 'LENOVO333',
    location: 'IT Laboratory',
    status: 'Available',
    condition: 'Good',
    assignedTo: '',
    acquisitionDate: '2020-11-05',
    cost: 38000,
    warrantyExpiry: '2023-11-05',
  },
  {
    id: 'AST-006',
    name: 'Cisco Catalyst 2960',
    category: 'Networking',
    serialNumber: 'CISCO444',
    location: 'Server Room',
    status: 'In Use',
    condition: 'Good',
    assignedTo: 'Technical Team',
    acquisitionDate: '2021-09-12',
    cost: 28000,
    warrantyExpiry: '2026-09-12',
  },
  {
    id: 'AST-007',
    name: 'Logitech MK470',
    category: 'Peripheral',
    serialNumber: 'LOGI555',
    location: 'Admin Building',
    status: 'In Use',
    condition: 'Good',
    assignedTo: 'Rosa Garcia',
    acquisitionDate: '2023-05-18',
    cost: 2500,
    warrantyExpiry: '2025-05-18',
  },
  {
    id: 'AST-008',
    name: 'ASUS VivoBook 15',
    category: 'Laptop',
    serialNumber: 'ASUS666',
    location: 'College of Veterinary',
    status: 'Retired',
    condition: 'Poor',
    assignedTo: 'N/A',
    acquisitionDate: '2019-01-22',
    cost: 42000,
    warrantyExpiry: '2022-01-22',
  },
]

export const checkoutRecords: CheckoutRecord[] = [
  {
    id: 'CHK-001',
    assetId: 'AST-001',
    assetName: 'Dell Inspiron 15',
    borrowerName: 'Maria Santos',
    designation: 'Instructor',
    department: 'College of Agriculture',
    contactNumber: '09123456789',
    purpose: 'Training Program',
    checkoutDate: '2024-06-10',
    expectedReturnDate: '2024-06-15',
    status: 'Active',
  },
  {
    id: 'CHK-002',
    assetId: 'AST-003',
    assetName: 'Canon Pixma MX490',
    borrowerName: 'Juan Cruz',
    designation: 'Administrative Officer',
    department: 'Admin Building',
    contactNumber: '09234567890',
    purpose: 'Document Printing',
    checkoutDate: '2024-06-08',
    expectedReturnDate: '2024-06-20',
    status: 'Active',
  },
  {
    id: 'CHK-003',
    assetId: 'AST-006',
    assetName: 'Cisco Catalyst 2960',
    borrowerName: 'Technical Team',
    designation: 'IT Department',
    department: 'IT Laboratory',
    contactNumber: '09345678901',
    purpose: 'Network Operations',
    checkoutDate: '2024-01-10',
    expectedReturnDate: '2024-12-31',
    status: 'Active',
  },
  {
    id: 'CHK-004',
    assetId: 'AST-002',
    assetName: 'HP ProBook 14',
    borrowerName: 'Luis Rodriguez',
    designation: 'Researcher',
    department: 'College of Agriculture',
    contactNumber: '09456789012',
    purpose: 'Research Project',
    checkoutDate: '2024-05-15',
    expectedReturnDate: '2024-06-12',
    actualReturnDate: '2024-06-11',
    status: 'Returned',
  },
]

export const maintenanceRecords: MaintenanceRecord[] = [
  {
    id: 'MNT-001',
    assetId: 'AST-004',
    assetName: 'Epson EB-X500',
    date: '2024-06-01',
    type: 'Corrective',
    technicianAssigned: 'Carlos Reyes',
    workPerformed: 'Lamp replacement',
    partsReplaced: 'Projector lamp',
    cost: 5000,
    status: 'Open',
  },
  {
    id: 'MNT-002',
    assetId: 'AST-003',
    assetName: 'Canon Pixma MX490',
    date: '2024-05-20',
    type: 'Preventive',
    technicianAssigned: 'Pedro Santos',
    workPerformed: 'Cleaning and calibration',
    partsReplaced: 'None',
    cost: 1500,
    status: 'Resolved',
  },
  {
    id: 'MNT-003',
    assetId: 'AST-006',
    assetName: 'Cisco Catalyst 2960',
    date: '2024-06-05',
    type: 'Preventive',
    technicianAssigned: 'Technical Team',
    workPerformed: 'System update and backup',
    partsReplaced: 'None',
    cost: 0,
    status: 'Resolved',
  },
]

export const users: User[] = [
  {
    id: 'USR-001',
    name: 'Dr. Jose Dela Cruz',
    email: 'j.delacruz@tau.edu.ph',
    role: 'System Administrator',
    status: 'Active',
    lastLogin: '2024-06-20 08:30 AM',
  },
  {
    id: 'USR-002',
    name: 'Maria Santos',
    email: 'm.santos@tau.edu.ph',
    role: 'ICT Staff',
    status: 'Active',
    lastLogin: '2024-06-20 07:15 AM',
  },
  {
    id: 'USR-003',
    name: 'Juan Cruz',
    email: 'j.cruz@tau.edu.ph',
    role: 'ICT Staff',
    status: 'Active',
    lastLogin: '2024-06-19 05:45 PM',
  },
  {
    id: 'USR-004',
    name: 'Rosa Garcia',
    email: 'r.garcia@tau.edu.ph',
    role: 'Department Viewer',
    status: 'Active',
    lastLogin: '2024-06-18 10:20 AM',
  },
  {
    id: 'USR-005',
    name: 'Luis Rodriguez',
    email: 'l.rodriguez@tau.edu.ph',
    role: 'Department Viewer',
    status: 'Inactive',
    lastLogin: '2024-05-15 02:30 PM',
  },
]

export const auditLogs: AuditLog[] = [
  {
    id: 'AUD-001',
    timestamp: '2024-06-20 09:15 AM',
    user: 'Maria Santos',
    action: 'Check-Out',
    assetId: 'AST-001',
    assetName: 'Dell Inspiron 15',
    details: 'Checked out to Maria Santos for Training Program',
  },
  {
    id: 'AUD-002',
    timestamp: '2024-06-20 08:45 AM',
    user: 'Juan Cruz',
    action: 'Maintenance',
    assetId: 'AST-004',
    assetName: 'Epson EB-X500',
    details: 'Maintenance logged: Corrective maintenance started',
  },
  {
    id: 'AUD-003',
    timestamp: '2024-06-19 03:20 PM',
    user: 'Dr. Jose Dela Cruz',
    action: 'Edit',
    assetId: 'AST-003',
    assetName: 'Canon Pixma MX490',
    details: 'Asset condition updated from Good to Fair',
  },
  {
    id: 'AUD-004',
    timestamp: '2024-06-19 02:00 PM',
    user: 'Luis Rodriguez',
    action: 'Check-In',
    assetId: 'AST-002',
    assetName: 'HP ProBook 14',
    details: 'Item returned in good condition',
  },
  {
    id: 'AUD-005',
    timestamp: '2024-06-18 11:30 AM',
    user: 'Maria Santos',
    action: 'Disposal',
    assetId: 'AST-008',
    assetName: 'ASUS VivoBook 15',
    details: 'Asset marked as Retired and scheduled for disposal',
  },
]

export const activityFeed = [
  {
    id: 1,
    type: 'checkout',
    message: 'Dell Inspiron 15 checked out by Maria Santos',
    timestamp: '2 hours ago',
  },
  {
    id: 2,
    type: 'maintenance',
    message: 'Epson EB-X500 maintenance scheduled',
    timestamp: '3 hours ago',
  },
  {
    id: 3,
    type: 'checkin',
    message: 'HP ProBook 14 returned in good condition',
    timestamp: '5 hours ago',
  },
  {
    id: 4,
    type: 'alert',
    message: 'Canon Pixma MX490 condition downgraded to Fair',
    timestamp: '1 day ago',
  },
]

export function getAssetStats() {
  const total = assets.length
  const available = assets.filter(a => a.status === 'Available').length
  const inUse = assets.filter(a => a.status === 'In Use').length
  const maintenance = assets.filter(a => a.status === 'Under Maintenance').length
  const retired = assets.filter(a => a.status === 'Retired').length

  return { total, available, inUse, maintenance, retired }
}

export function getAssetCategoryBreakdown() {
  const categories = ['Laptop', 'Desktop', 'Printer', 'Projector', 'Networking', 'Peripheral']
  return categories.map(cat => ({
    category: cat,
    count: assets.filter(a => a.category === cat).length,
  }))
}

export function getOverdueCheckouts() {
  const today = new Date()
  return checkoutRecords.filter(r => {
    const expectedDate = new Date(r.expectedReturnDate)
    return r.status === 'Active' && expectedDate < today
  })
}
