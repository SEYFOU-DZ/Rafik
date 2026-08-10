'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/DashboardLayout';
import { SPECIALISTS } from '@/lib/data';
import {
  Calendar, Clock, CheckCircle, XCircle, User,
  MessageSquare, Phone, MapPin, ChevronDown, ChevronUp, Filter
} from 'lucide-react';

type ApptStatus = 'pending' | 'confirmed' | 'rejected';

export default function SpecialistAppointmentsPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [appointments, setAppointments] = useState<any[]>([]);
  const [apptStates, setApptStates] = useState<Record<number, ApptStatus>>({});
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'confirmed' | 'rejected'>('all');
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'specialist')) router.push('/auth/login');
  }, [user, isLoading, router]);

  useEffect(() => {
    if (!user) return;
    const specData = SPECIALISTS.find(s => s.email === user.email);
    if (specData) setAppointments(specData.appointments || []);
  }, [user]);

  const handleAppt = (idx: number, action: ApptStatus) => {
    setApptStates(p => ({ ...p, [idx]: action }));
  };

  const filtered = appointments.filter((_, i) => {
    const state = apptStates[i] || 'pending';
    return filterStatus === 'all' || state === filterStatus;
  });

  const counts = {
    all: appointments.length,
    pending: appointments.filter((_, i) => !apptStates[i]).length,
    confirmed: appointments.filter((_, i) => apptStates[i] === 'confirmed').length,
    rejected: appointments.filter((_, i) => apptStates[i] === 'rejected').length,
  };

  if (isLoading || !user) return null;

  return (
    <DashboardLayout role="specialist">
      <div className="space-y-5 max-w-4xl">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-black text-slate-800" style={{ fontFamily: 'Cairo' }}>إدارة المواعيد</h1>
          <p className="text-slate-400 text-sm mt-1">راجع وأدر جميع طلبات الحجز الواردة</p>
        </div>

        {/* Status tabs */}
        <div className="flex gap-2 flex-wrap">
          {[
            { key: 'all', label: 'الكل', color: '#4A8BB5' },
            { key: 'pending', label: 'بانتظار الرد', color: '#E8A87C' },
            { key: 'confirmed', label: 'مؤكدة', color: '#7FB285' },
            { key: 'rejected', label: 'مرفوضة', color: '#e05a5a' },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setFilterStatus(tab.key as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all border-2 ${
                filterStatus === tab.key
                  ? 'text-white border-transparent'
                  : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
              }`}
              style={filterStatus === tab.key ? { background: tab.color, borderColor: tab.color } : {}}
            >
              {tab.label}
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                filterStatus === tab.key ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-400'
              }`}>
                {counts[tab.key as keyof typeof counts]}
              </span>
            </button>
          ))}
        </div>

        {/* Appointments list */}
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-slate-100">
              <div className="text-4xl mb-3">📅</div>
              <p className="text-slate-400 font-semibold">لا توجد مواعيد في هذه الفئة</p>
            </div>
          ) : (
            filtered.map((apt, rawIdx) => {
              const idx = appointments.indexOf(apt);
              const state: ApptStatus = apptStates[idx] || 'pending';
              const isExpanded = expandedIdx === idx;

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: rawIdx * 0.07 }}
                  className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden"
                >
                  {/* Header row */}
                  <div className="flex items-center gap-4 p-5">
                    {/* Avatar */}
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-sm text-white flex-shrink-0"
                      style={{ background: 'linear-gradient(135deg, #2D5F7E, #4A8BB5)' }}>
                      {apt.patientName?.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-black text-slate-700 text-sm" style={{ fontFamily: 'Cairo' }}>{apt.patientName}</p>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-xs text-slate-400 flex items-center gap-1">
                              <Calendar size={10} /> {apt.date}
                            </span>
                            <span className="text-xs text-slate-400 flex items-center gap-1">
                              <Clock size={10} /> {apt.time}
                            </span>
                          </div>
                        </div>
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-lg flex-shrink-0 ${
                          state === 'confirmed' ? 'bg-green-50 text-green-700' :
                          state === 'rejected' ? 'bg-red-50 text-red-600' :
                          'bg-amber-50 text-amber-700'
                        }`}>
                          {state === 'confirmed' ? '✓ مؤكد' : state === 'rejected' ? '✗ مرفوض' : '⏳ انتظار'}
                        </span>
                      </div>
                    </div>

                    {/* Expand toggle */}
                    <button onClick={() => setExpandedIdx(isExpanded ? null : idx)}
                      className="p-2 rounded-lg hover:bg-slate-100 transition-colors flex-shrink-0">
                      {isExpanded ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
                    </button>
                  </div>

                  {/* Expanded details */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 border-t border-slate-50 pt-4 space-y-4">
                          {apt.note && (
                            <div className="p-3 rounded-xl text-sm text-slate-600 flex items-start gap-2"
                              style={{ background: 'rgba(74,139,181,0.06)' }}>
                              <MessageSquare size={14} style={{ color: '#4A8BB5' }} className="mt-0.5 flex-shrink-0" />
                              <div>
                                <p className="font-bold text-xs text-slate-400 mb-0.5">ملاحظة المريض:</p>
                                {apt.note}
                              </div>
                            </div>
                          )}

                          {state === 'pending' && (
                            <div className="flex gap-3">
                              <button
                                onClick={() => handleAppt(idx, 'confirmed')}
                                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-sm transition-all"
                                style={{ background: 'rgba(127,178,133,0.12)', color: '#3d6b43' }}
                                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#7FB285'; (e.currentTarget as HTMLElement).style.color = 'white'; }}
                                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(127,178,133,0.12)'; (e.currentTarget as HTMLElement).style.color = '#3d6b43'; }}
                              >
                                <CheckCircle size={15} /> قبول الموعد
                              </button>
                              <button
                                onClick={() => handleAppt(idx, 'rejected')}
                                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-sm transition-all"
                                style={{ background: 'rgba(239,68,68,0.08)', color: '#dc2626' }}
                                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#ef4444'; (e.currentTarget as HTMLElement).style.color = 'white'; }}
                                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(239,68,68,0.08)'; (e.currentTarget as HTMLElement).style.color = '#dc2626'; }}
                              >
                                <XCircle size={15} /> رفض الموعد
                              </button>
                            </div>
                          )}

                          {state === 'confirmed' && (
                            <div className="p-3 rounded-xl text-sm font-semibold flex items-center gap-2"
                              style={{ background: 'rgba(127,178,133,0.1)', color: '#3d6b43' }}>
                              <CheckCircle size={14} />
                              تم تأكيد هذا الموعد. تأكد من التحضير الجيد للجلسة.
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })
          )}
        </div>

        {/* Empty state if no appointments at all */}
        {appointments.length === 0 && (
          <div className="bg-white rounded-2xl p-14 text-center border border-slate-100">
            <div className="text-5xl mb-4">📋</div>
            <h3 className="font-black text-slate-700 mb-2" style={{ fontFamily: 'Cairo' }}>لا توجد مواعيد بعد</h3>
            <p className="text-slate-400 text-sm">ستظهر هنا طلبات الحجز من المرضى عند تفعيل حسابك</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
