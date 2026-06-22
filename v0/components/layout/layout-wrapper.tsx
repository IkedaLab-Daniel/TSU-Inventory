'use client'

import { Sidebar } from './sidebar'
import { Header } from './header'
import { PageTransition } from './page-transition'

interface LayoutWrapperProps {
  children: React.ReactNode
  title: string
}

export function LayoutWrapper({ children, title }: LayoutWrapperProps) {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={title} />
        <div className="flex-1 overflow-auto bg-gray-50 p-8">
          <PageTransition>
            {children}
          </PageTransition>
        </div>
      </div>
    </div>
  )
}
