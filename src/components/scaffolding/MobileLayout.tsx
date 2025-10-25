'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Home,
  Calendar,
  Users,
  BookOpen,
  Settings,
  Menu,
  Zap,
  ClipboardList,
  MessageSquare,
  Download,
  LayoutDashboard,
  GraduationCap,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'
import { useAuthStore } from '@/store/authStore'
import ClassSwitcher from '../ClassSwitcher'
import { useNextRouterNavigate } from '@/lib/navigation'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

interface NavItemProps {
  to: string
  icon: React.ReactNode
  label: string
  isActive: boolean
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label, isActive }) => (
  <Link
    href={to}
    className={cn(
      'flex flex-col items-center p-2 transition-colors',
      isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
    )}
  >
    <div className="h-5 w-5 mb-1">{icon}</div>
    <span className="text-xs font-medium">{label}</span>
  </Link>
)

const TeacherNavItems = [
  {
    to: '/teacher/dashboard',
    label: 'Dashboard',
    icon: <Home />,
    group: 'Core Tools',
  },
  {
    to: '/teacher/planner',
    label: 'Planner',
    icon: <Calendar />,
    group: 'Core Tools',
  },
  {
    to: '/teacher/attendance',
    label: 'Attendance',
    icon: <ClipboardList />,
    group: 'Core Tools',
  },
  {
    to: '/teacher/randomizer',
    label: 'Randomizer',
    icon: <Zap />,
    group: 'Core Tools',
  },

  {
    to: '/teacher/classes',
    label: 'Classes',
    icon: <Users />,
    group: 'Management & Data',
  },
  {
    to: '/teacher/assessments',
    label: 'Assessments',
    icon: <BookOpen />,
    group: 'Management & Data',
  },
  {
    to: '/teacher/suggestions',
    label: 'Suggestions',
    icon: <MessageSquare />,
    group: 'Management & Data',
  },
  {
    to: '/teacher/export',
    label: 'Export Data',
    icon: <Download />,
    group: 'Management & Data',
  },
]

const groupItems = (items: typeof TeacherNavItems) => {
  const groups: Record<string, typeof TeacherNavItems> = {}
  items.forEach((item) => {
    if (!groups[item.group]) {
      groups[item.group] = []
    }
    groups[item.group].push(item)
  })
  return groups
}

interface MobileLayoutProps {
  children: React.ReactNode
}

const MobileLayout: React.FC<MobileLayoutProps> = ({ children }) => {
  const pathname = usePathname()
  const navigate = useNextRouterNavigate()
  const { isAuthenticated, logout, user } = useAuthStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    )
  }

  if (!isAuthenticated) {
    return <div className="min-h-screen bg-background">{children}</div>
  }

  const handleLogout = () => {
    logout(navigate)
  }

  const groupedNavItems = groupItems(TeacherNavItems)

  // Filter items for the bottom bar (max 5 items)
  const bottomNavItems = TeacherNavItems.filter((item) =>
    [
      '/teacher/dashboard',
      '/teacher/planner',
      '/teacher/classes',
      '/teacher/assessments',
      '/teacher/attendance',
    ].includes(item.to)
  ).slice(0, 5)

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header for Mobile */}
      <header className="sticky top-0 z-40 w-full border-b bg-card p-4 flex justify-between items-center md:hidden">
        <ClassSwitcher />
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[250px] sm:w-[300px]">
            <nav className="flex flex-col space-y-4 pt-8">
              <div className="flex items-center space-x-2 px-2 mb-4">
                <GraduationCap className="h-6 w-6 text-primary" />
                <span className="font-bold text-lg">ClassFlow</span>
              </div>
              <p className="font-semibold px-2">
                Welcome, {user?.name || 'Teacher'}!
              </p>
              <Separator />

              <Accordion
                type="multiple"
                defaultValue={['Core Tools', 'Management & Data']}
                className="w-full"
              >
                {Object.entries(groupedNavItems).map(([groupName, items]) => (
                  <AccordionItem
                    key={groupName}
                    value={groupName}
                    className="border-b-0"
                  >
                    <AccordionTrigger className="py-2 px-2 text-sm font-semibold hover:no-underline text-muted-foreground hover:text-foreground">
                      {groupName}
                    </AccordionTrigger>
                    <AccordionContent className="pb-0">
                      <div className="flex flex-col space-y-1 pl-2">
                        {items.map((item) => (
                          <Link
                            key={item.to}
                            href={item.to}
                            className={cn(
                              'flex items-center space-x-3 p-2 rounded-md transition-colors text-sm',
                              pathname === item.to
                                ? 'bg-accent text-accent-foreground'
                                : 'hover:bg-muted'
                            )}
                          >
                            {item.icon}
                            <span>{item.label}</span>
                          </Link>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              <Separator />
              <Link
                href="/teacher/settings"
                className="flex items-center space-x-3 p-2 rounded-md hover:bg-muted"
              >
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </Link>
              <Button variant="destructive" onClick={handleLogout}>
                Log Out
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow overflow-y-auto pb-20 md:pb-0">
        {children}
      </main>

      {/* Bottom Navigation Bar (Mobile Only) */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t shadow-lg md:hidden">
        <div className="flex justify-around h-16">
          {bottomNavItems.map((item) => (
            <NavItem
              key={item.to}
              to={item.to}
              icon={item.icon}
              label={item.label}
              isActive={pathname === item.to}
            />
          ))}
        </div>
      </nav>

      {/* Desktop Sidebar Placeholder (Hidden on Mobile) */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        {/* This is where a full sidebar would go, but for now, we focus on mobile-first */}
      </div>
    </div>
  )
}

export default MobileLayout
