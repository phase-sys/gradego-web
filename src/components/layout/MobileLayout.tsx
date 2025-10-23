"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Calendar, Users, BookOpen, Settings, Menu, Zap, ClipboardList, MessageSquare, Download } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { useAuthStore } from '@/store/authStore';
import ClassSwitcher from '../ClassSwitcher'; // Import the new component
import { useNextRouterNavigate } from '@/utils/navigation';

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label, isActive }) => (
  <Link href={to} className={cn(
    "flex flex-col items-center p-2 transition-colors",
    isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
  )}>
    <div className="h-5 w-5 mb-1">{icon}</div>
    <span className="text-xs font-medium">{label}</span>
  </Link>
);

const TeacherNavItems = [
  { to: "/", label: "Dashboard", icon: <Home /> },
  { to: "/planner", label: "Planner", icon: <Calendar /> },
  { to: "/classes", label: "Classes", icon: <Users /> },
  { to: "/assessments", label: "Assessments", icon: <BookOpen /> }, // Fixed definition
  { to: "/attendance", label: "Attendance", icon: <ClipboardList /> },
  { to: "/randomizer", label: "Randomizer", icon: <Zap /> },
  { to: "/suggestions", label: "Suggestions", icon: <MessageSquare /> },
  { to: "/export", label: "Export Data", icon: <Download /> },
];

interface MobileLayoutProps {
  children: React.ReactNode;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const navigate = useNextRouterNavigate();
  const { isAuthenticated, logout } = useAuthStore(); 

  if (!isAuthenticated) {
    // Simple layout for unauthenticated users (e.g., enrollment pages)
    return <div className="min-h-screen bg-background">{children}</div>;
  }
  
  const handleLogout = () => {
      logout(navigate);
  }

  // Filter items for the bottom bar (max 5 items)
  // We prioritize Dashboard, Planner, Classes, Assessments, and Attendance for the bottom bar
  const bottomNavItems = TeacherNavItems.filter(item => 
    ["/", "/planner", "/classes", "/assessments", "/attendance"].includes(item.to)
  ).slice(0, 5);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header for Mobile */}
      <header className="sticky top-0 z-40 w-full border-b bg-card p-4 flex justify-between items-center md:hidden">
        <ClassSwitcher /> {/* Class Switcher in the header */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[250px] sm:w-[300px]">
            <nav className="flex flex-col space-y-4 pt-8">
              {TeacherNavItems.map((item) => (
                <Link 
                  key={item.to} 
                  href={item.to} 
                  className={cn(
                    "flex items-center space-x-3 p-2 rounded-md transition-colors",
                    pathname === item.to ? "bg-accent text-accent-foreground" : "hover:bg-muted"
                  )}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))}
              <Separator />
              <Link href="/settings" className="flex items-center space-x-3 p-2 rounded-md hover:bg-muted">
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </Link>
              <Button variant="destructive" onClick={handleLogout}>Log Out</Button>
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
  );
};

export default MobileLayout;