'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/DashboardLayout';
import { Calendar, Clock, CheckCircle, XCircle, Package, Users, TrendingUp, Star, ChevronRight } from 'lucide-react';
import { SPECIALISTS } from '@/lib/data';
import Link from 'next/link';

export default function SpecialistDashboard() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [appointments, setAppointments] = useState<any[]>([]);

  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'specialist')) router.push('/auth/login');
  }, [user, isLoading, router]);

  useEffect(() => {
    if (!user) return;
    const specData = SPECIALISTS.find(s => s.email === user.email);
    if (specData) setAppointments(specData.appointments || []);
  }, [user]);

  const [apptStates, setApptStates] = useState<Record<number, 'pending' | 'confirmed' | 'rejected'>>({});

  const handleAppt = (idx: number, action: 'confirmed' | 'rejected') => {
    setApptStates(p => ({ ...p, [idx]: action }));
  };

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center gradient-hero">
        <div className="w-10 h-10 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  const specData = SPECIALISTS.find(s => s.email === user.email) || user;
  const pendingCount = appointments.filter((_, i) => !apptStates[i]).length;

  const stats = [
    { icon: Calendar, label: 'جلسات هذا الشهر', val: specData.sessionsCount || 0, color: '#4A8BB5' },
    { icon: Users, label: 'المرضى الحاليين', val: appointments.length, color: '#7FB285' },
    { icon: Star, label: 'التقييم', val: specData.rating || '—', color: '#E8A87C' },
    { icon: Clock, label: 'مواعيد بانتظار التأكيد', val: pendingCount, color: '#2D5F7E' },
  ];

  return (
    <DashboardLayout role="specialist">
      <div className="space-y-6">
        {/* Welcome */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl p-6 sm:p-8 relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #1a3d55, #2D5F7E)' }}
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -top-10 -left-10 w-48 h-48 rounded-full bg-white" style={{ filter: 'blur(50px)' }} />
          </div>
          <div className="relative z-10">
            <p className="text-white/60 text-sm mb-1">مرحباً بعودتك 👨‍⚕️</p>
            <h1 className="text-2xl sm:text-3xl font-black text-white">{user.name}</h1>
            <p className="text-white/60 text-sm mt-1">{specData.title || 'أخصائي نفسي'} · {specData.city || ''}</p>
            {pendingCount > 0 && (
              <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold"
                style={{ background: 'rgba(232,168,124,0.2)', color: '#f5c99a', border: '1px solid rgba(232,168,124,0.3)' }}>
                <div className="notif-dot" />
                {pendingCount} موعد ينتظر تأكيدك
              </div>
            )}
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm"
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: `${s.color}15` }}>
                <s.icon size={18} style={{ color: s.color }} />
              </div>
              <div className="text-2xl font-black" style={{ color: s.color }}>{s.val}</div>
              <div className="text-xs text-slate-400 font-semibold mt-0.5">{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Appointments management */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl border border-slate-100 shadow-sm"
        >
          <div className="flex items-center justify-between p-6 border-b border-slate-100">
            <h2 className="font-black text-slate-800 flex items-center gap-2">
              <Calendar size={18} style={{ color: '#4A8BB5' }} />
              المواعيد الواردة
            </h2>
            <Link href="/dashboard/specialist/appointments">
              <span className="text-xs font-bold flex items-center gap-1" style={{ color: '#4A8BB5' }}>
                الكل <ChevronRight size={12} />
              </span>
            </Link>
          </div>

          <div className="divide-y divide-slate-50">
            {appointments.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-4xl mb-3">📅</div>
                <p className="text-slate-400 font-semibold text-sm">لا توجد مواعيد حالياً</p>
              </div>
            ) : (
              appointments.map((apt, i) => {
                const state = apptStates[i] || apt.status;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="flex items-center gap-4 p-5 hover:bg-slate-50/50 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm text-white flex-shrink-0"
                      style={{ background: 'linear-gradient(135deg, #2D5F7E, #4A8BB5)' }}>
                      {apt.patientName?.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-black text-slate-700">{apt.patientName}</p>
                      <div className="flex items-center gap-3 mt-0.5">
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <Calendar size={10} /> {apt.date}
                        </span>
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <Clock size={10} /> {apt.time}
                        </span>
                      </div>
                    </div>

                    <AnimatePresence mode="wait">
                      {state === 'pending' ? (
                        <motion.div key="actions" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                          className="flex gap-2">
                          <button onClick={() => handleAppt(i, 'confirmed')}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all"
                            style={{ background: 'rgba(127,178,133,0.15)', color: '#4a7d50' }}
                            onMouseEnter={e => { (e.target as HTMLElement).style.background = '#7FB285'; (e.target as HTMLElement).style.color = 'white'; }}
                            onMouseLeave={e => { (e.target as HTMLElement).style.background = 'rgba(127,178,133,0.15)'; (e.target as HTMLElement).style.color = '#4a7d50'; }}>
                            <CheckCircle size={12} /> قبول
                          </button>
                          <button onClick={() => handleAppt(i, 'rejected')}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all"
                            style={{ background: 'rgba(239,68,68,0.08)', color: '#dc2626' }}
                            onMouseEnter={e => { (e.target as HTMLElement).style.background = '#ef4444'; (e.target as HTMLElement).style.color = 'white'; }}
                            onMouseLeave={e => { (e.target as HTMLElement).style.background = 'rgba(239,68,68,0.08)'; (e.target as HTMLElement).style.color = '#dc2626'; }}>
                            <XCircle size={12} /> رفض
                          </button>
                        </motion.div>
                      ) : (
                        <motion.span
                          key="status"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="px-3 py-1.5 rounded-xl text-xs font-bold"
                          style={{
                            background: state === 'confirmed' ? 'rgba(127,178,133,0.15)' : 'rgba(239,68,68,0.08)',
                            color: state === 'confirmed' ? '#4a7d50' : '#dc2626'
                          }}
                        >
                          {state === 'confirmed' ? '✓ مؤكد' : '✗ مرفوض'}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })
            )}
          </div>
        </motion.div>

        {/* Quick links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link href="/dashboard/specialist/boxes">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="card-hover bg-white rounded-2xl p-5 border border-slate-100 shadow-sm cursor-pointer flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'rgba(232,168,124,0.12)' }}>
                <Package size={22} style={{ color: '#E8A87C' }} />
              </div>
              <div>
                <h3 className="font-black text-slate-800">الصناديق المهنية</h3>
                <p className="text-slate-400 text-sm">أدوات التقييم وبروتوكولات العلاج</p>
              </div>
              <ChevronRight size={16} className="text-slate-300 mr-auto" />
            </motion.div>
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'rgba(127,178,133,0.12)' }}>
              <TrendingUp size={22} style={{ color: '#7FB285' }} />
            </div>
            <div>
              <h3 className="font-black text-slate-800">ملفي الشخصي</h3>
              <p className="text-slate-400 text-sm">تحديث معلوماتك وأوقات العمل</p>
            </div>
            <ChevronRight size={16} className="text-slate-300 mr-auto" />
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}
