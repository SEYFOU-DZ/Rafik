'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Brain, LayoutDashboard, ClipboardList, Users, Package,
  Lightbulb, LogOut, Menu, X, Bell, ChevronDown, Calendar,
  Award, Settings, User
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const patientLinks = [
  { href: '/dashboard/patient', icon: LayoutDashboard, label: 'الرئيسية' },
  { href: '/dashboard/patient/assessment', icon: ClipboardList, label: 'الاستبيان النفسي' },
  { href: '/dashboard/patient/specialists', icon: Users, label: 'الأخصائيون' },
  { href: '/dashboard/patient/boxes', icon: Package, label: 'الصناديق النفسية' },
  { href: '/dashboard/patient/tips', icon: Lightbulb, label: 'النصائح والإرشادات' },
];

const specialistLinks = [
  { href: '/dashboard/specialist', icon: LayoutDashboard, label: 'الرئيسية' },
  { href: '/dashboard/specialist/appointments', icon: Calendar, label: 'المواعيد' },
  { href: '/dashboard/specialist/boxes', icon: Package, label: 'الصناديق المهنية' },
  { href: '/dashboard/specialist/profile', icon: User, label: 'ملفي الشخصي' },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: 'patient' | 'specialist';
}

export default function DashboardLayout({ children, role }: DashboardLayoutProps) {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const links = role === 'patient' ? patientLinks : specialistLinks;

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const initials = user?.name
    ? user.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2)
    : '؟';

  const Sidebar = ({ mobile = false }: { mobile?: boolean }) => (
    <div className={`flex flex-col h-full ${mobile ? 'p-4' : 'p-4'}`}>
      {/* Logo */}
      <div className="flex items-center gap-3 px-2 mb-8">
        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
          <Brain size={22} className="text-white" />
        </div>
        <div>
          <p className="font-black text-white text-sm leading-none">رفيقك الذكي</p>
          <p className="text-white/50 text-xs">{role === 'patient' ? 'لوحة الزائر' : 'لوحة الأخصائي'}</p>
        </div>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 space-y-1">
        {links.map(link => {
          const active = pathname === link.href;
          return (
            <Link key={link.href} href={link.href} onClick={() => setSidebarOpen(false)}>
              <div className={`sidebar-link ${active ? 'active' : ''}`}>
                <link.icon size={18} className="flex-shrink-0" />
                <span>{link.label}</span>
                {active && (
                  <div className="mr-auto w-1.5 h-1.5 rounded-full bg-[#7FB285]" />
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* User card */}
      <div className="mt-6 p-3 rounded-2xl bg-white/10 border border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm flex-shrink-0"
            style={{ background: role === 'patient' ? '#7FB285' : '#E8A87C', color: 'white' }}>
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white font-bold text-sm truncate">{user?.name || 'المستخدم'}</p>
            <p className="text-white/50 text-xs truncate">{user?.email || ''}</p>
          </div>
        </div>
        <button onClick={handleLogout}
          className="mt-3 w-full flex items-center gap-2 px-3 py-2 rounded-xl text-red-300 hover:bg-red-500/10 transition-colors text-sm font-semibold">
          <LogOut size={14} />
          <span>تسجيل الخروج</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex" style={{ background: '#F0F7FF' }}>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex w-64 flex-shrink-0 flex-col fixed right-0 top-0 bottom-0 z-40"
        style={{ background: 'linear-gradient(180deg, #1a3d55 0%, #2D5F7E 60%, #1a3d55 100%)' }}>
        <Sidebar />
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black/50 z-40"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 20 }}
              className="lg:hidden fixed right-0 top-0 bottom-0 w-72 z-50 flex flex-col"
              style={{ background: 'linear-gradient(180deg, #1a3d55 0%, #2D5F7E 100%)' }}
            >
              <button onClick={() => setSidebarOpen(false)}
                className="absolute top-4 left-4 text-white/60 hover:text-white">
                <X size={20} />
              </button>
              <Sidebar mobile />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 lg:mr-64 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-100 px-4 sm:px-6 py-4 flex items-center justify-between shadow-sm">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-xl hover:bg-slate-100 transition-colors">
            <Menu size={22} className="text-slate-600" />
          </button>

          {/* Page title area */}
          <div className="hidden lg:block">
            <p className="text-xs text-slate-400 font-semibold">
              {role === 'patient' ? 'لوحة الزائر' : 'لوحة الأخصائي'}
            </p>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3 mr-auto lg:mr-0">
            <button className="relative p-2 rounded-xl hover:bg-slate-100 transition-colors">
              <Bell size={20} className="text-slate-600" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#E8A87C] rounded-full" />
            </button>
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-black text-xs"
                style={{ background: role === 'patient' ? '#7FB285' : '#4A8BB5' }}>
                {initials}
              </div>
              <span className="hidden sm:block text-sm font-bold text-slate-700 max-w-[100px] truncate">
                {user?.name?.split(' ')[0] || 'المستخدم'}
              </span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
