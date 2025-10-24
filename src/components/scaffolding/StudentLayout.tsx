"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, Bell, Menu, MessageSquare, Settings, GraduationCap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { useAuthStore } from '@/store/authStore'; 
import StudentClassSwitcher from '../StudentClassSwitcher';
import { useNextRouterNavigate } from '@/utils/navigation';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

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

const StudentNavItems = [
  { to: "/student/dashboard", label: "Dashboard", icon: <Home />, group: "Class Activities" },
  { to: "/student/assessments", label: "Assessments", icon: <BookOpen />, group: "Class Activities" },
  { to: "/student/announcements", label: "Announcements", icon: <Bell />, group: "Class Activities" },
  
  { to: "/student/suggestions", label: "Suggestions", icon: <MessageSquare />, group: "Personal" },
  { to: "/student/settings", label: "Settings", icon: <Settings />, group: "Personal" },
];

const groupItems = (items: typeof StudentNavItems) => {
    const groups: Record<string, typeof StudentNavItems> = {};
    items.forEach(item => {
        if (!groups[item.group]) {
            groups[item.group] = [];
        }
        groups[item.group].push(item);
    });
    return groups;
};

interface StudentLayoutProps {
  children: React.ReactNode;
}

const StudentLayout: React.FC<StudentLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const navigate = useNextRouterNavigate();
  const { logout, user, isAuthenticated } = useAuthStore(); 
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <div className="min-h-screen bg-background">{children}</div>;
  }

  const handleLogout = () => {
      logout(navigate);
  }
  
  const groupedNavItems = groupItems(StudentNavItems);

  // Filter items for the bottom bar (max 5 items)
  const bottomNavItems = StudentNavItems.filter(item => 
    ["/student/dashboard", "/student/assessments", "/student/announcements", "/student/suggestions", "/student/settings"].includes(item.to)
  ).slice(0, 5);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header for Mobile */}
      <header className="sticky top-0 z-40 w-full border-b bg-card p-4 flex justify-between items-center md:hidden">
        <StudentClassSwitcher />
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
              <p className="font-semibold px-2">Welcome, {user?.name || 'Student'}!</p>
              <Separator />
              
              <Accordion type="multiple" defaultValue={["Class Activities", "Personal"]} className="w-full">
                {Object.entries(groupedNavItems).map(([groupName, items]) => (
                    <AccordionItem key={groupName} value={groupName} className="border-b-0">
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
                                        "flex items-center space-x-3 p-2 rounded-md transition-colors text-sm",
                                        pathname === item.to ? "bg-accent text-accent-foreground" : "hover:bg-muted"
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
    </div>
  );
};

export default StudentLayout;