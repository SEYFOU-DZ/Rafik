'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardLayout from '@/components/DashboardLayout';
import Link from 'next/link';
import { 
  ClipboardList, Users, Package, Lightbulb, Calendar,
  TrendingUp, Clock, CheckCircle, AlertTriangle, ArrowLeft, Star,
  Stethoscope, Headset, Megaphone
} from 'lucide-react';
import { BOXES, SPECIALISTS, GROUP_SESSIONS } from '@/lib/data';

// Tiny inline sticker per box id
function MiniSticker({ id }: { id: string }) {
  if (id === 'box-anxiety') return (
    <svg width="32" height="32" viewBox="0 0 100 100" fill="none">
      <circle cx="50" cy="50" r="46" fill="white" stroke="#1e293b" strokeWidth="4"/>
      <path d="M38 50 C38 42,44 36,50 36 C56 36,62 42,62 50 C62 58,56 64,50 64 C44 64,38 58,38 50Z" stroke="#1e293b" strokeWidth="2.5" fill="none"/>
      <path d="M50 36 L50 64" stroke="#1e293b" strokeWidth="2" fill="none"/>
      <path d="M44 42 C46 44,48 44,48 42 M56 42 C54 44,52 44,52 42" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <path d="M46 54 Q48 57,50 57 Q52 57,54 54" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" fill="none"/>
    </svg>
  );
  if (id === 'box-ocd') return (
    <svg width="32" height="32" viewBox="0 0 100 100" fill="none">
      <circle cx="50" cy="50" r="46" fill="white" stroke="#1e293b" strokeWidth="4"/>
      <rect x="36" y="36" width="28" height="28" stroke="#1e293b" strokeWidth="2.5" rx="3" fill="none"/>
      <rect x="42" y="42" width="16" height="16" stroke="#1e293b" strokeWidth="1.5" rx="1.5" fill="none"/>
      <path d="M50 24 L50 32 M50 68 L50 76 M24 50 L32 50 M68 50 L76 50" stroke="#1e293b" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
  return (
    <svg width="32" height="32" viewBox="0 0 100 100" fill="none">
      <circle cx="50" cy="50" r="46" fill="white" stroke="#1e293b" strokeWidth="4"/>
      <path d="M35 52 C30 52,28 46,33 42 C31 36,38 30,46 33 C49 26,61 26,64 33 C70 30,74 36,72 42 C76 46,74 52,69 52Z" fill="none" stroke="#1e293b" strokeWidth="2.5" strokeLinejoin="round"/>
      <path d="M42 60 L40 66 M50 62 L48 68 M58 60 L56 66" stroke="#1e293b" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

function boxGradient(id: string) {
  if (id === 'box-anxiety') return 'linear-gradient(135deg, #4A8BB5, #2D5F7E)';
  if (id === 'box-ocd') return 'linear-gradient(135deg, #7FB285, #2D5F7E)';
  return 'linear-gradient(135deg, #E8A87C, #2D5F7E)';
}

export default function PatientDashboard() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [bookedSessions, setBookedSessions] = useState<string[]>([]);
  const [bookingSessionId, setBookingSessionId] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'patient')) router.push('/auth/login');
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center gradient-hero">
        <div className="w-10 h-10 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  const purchased = BOXES.filter(b => (user.purchasedBoxes || []).includes(b.id));
  const available = BOXES.filter(b => !(user.purchasedBoxes || []).includes(b.id));
  const appointments = user.bookedAppointments || [];
  const assessmentDone = user.assessmentDone;

  const quickActions = [
    { icon: ClipboardList, label: 'الاستبيان الطبي النفسي', desc: 'قيّم حالتك جسدياً ونفسياً', href: '/dashboard/patient/assessment', color: '#4A8BB5', done: assessmentDone },
    { icon: Stethoscope, label: 'الاستشارة الطبية', desc: 'تحدث مع طبيب عام معتمد', href: '/dashboard/patient/doctor', color: '#E8A87C', done: false },
    { icon: Users, label: 'اختر أخصائياً نفسياً', desc: 'ابحث عن أخصائيين نفسيين', href: '/dashboard/patient/specialists', color: '#7FB285', done: false },
    { icon: Package, label: 'الصناديق العلاجية', desc: 'أدوات بروتوكولات التعافي', href: '/dashboard/patient/boxes', color: '#E8A87C', done: false },
    { icon: Headset, label: 'البودكاست الصوتي', desc: 'جلسات استماع وتأمل مريحة', href: '/dashboard/patient/podcast', color: '#4A8BB5', done: false },
    { icon: Lightbulb, label: 'النصائح والإرشادات', desc: 'نصائح يومية مخصصة', href: '/dashboard/patient/tips', color: '#7FB285', done: false },
  ];

  return (
    <DashboardLayout role="patient">
      <div className="space-y-6">
        {/* Welcome banner */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl p-6 sm:p-8 relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #2D5F7E, #4A8BB5)' }}
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -top-10 -left-10 w-48 h-48 rounded-full bg-white" style={{ filter: 'blur(50px)' }} />
            <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-[#7FB285]" style={{ filter: 'blur(40px)' }} />
          </div>
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-white/70 text-sm font-semibold mb-1">مرحباً بعودتك 👋</p>
              <h1 className="text-2xl sm:text-3xl font-black text-white">{user.name}</h1>
              <p className="text-white/60 text-sm mt-1">
                {assessmentDone
                  ? `آخر تقييم: مستوى ${user.assessmentResult?.dominant === 'anxiety' ? 'قلق' : 'اكتئاب'} متوسط`
                  : 'أجرِ استبيانك النفسي للحصول على توصيات مخصصة'}
              </p>
            </div>
            {!assessmentDone && (
              <Link href="/dashboard/patient/assessment">
                <motion.button
                  className="px-5 py-2.5 rounded-xl bg-white font-bold text-sm flex items-center gap-2 flex-shrink-0"
                  style={{ color: '#2D5F7E' }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <ClipboardList size={16} />
                  ابدأ التقييم
                </motion.button>
              </Link>
            )}
          </div>

          {/* Assessment result if done */}
          {assessmentDone && user.assessmentResult && (
            <div className="mt-4 flex flex-wrap gap-3">
              <div className="px-4 py-2 rounded-xl bg-white/15 text-white text-xs font-semibold">
                القلق: {user.assessmentResult.anxiety}/21
              </div>
              <div className="px-4 py-2 rounded-xl bg-white/15 text-white text-xs font-semibold">
                الاكتئاب: {user.assessmentResult.depression}/27
              </div>
              <Link href="/dashboard/patient/assessment">
                <div className="px-4 py-2 rounded-xl bg-white/15 text-white text-xs font-semibold hover:bg-white/25 cursor-pointer transition-colors">
                  🔄 إعادة التقييم
                </div>
              </Link>
            </div>
          )}
        </motion.div>

        {/* Quick actions */}
        <div>
          <h2 className="text-lg font-black text-slate-800 mb-4">الوصول السريع</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, i) => (
              <motion.div
                key={action.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href={action.href}>
                  <div className="card-hover bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-sm cursor-pointer relative">
                    {action.done && (
                      <div className="absolute top-3 left-3">
                        <CheckCircle size={14} className="text-[#7FB285]" />
                      </div>
                    )}
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                      style={{ background: `${action.color}18` }}>
                      <action.icon size={20} style={{ color: action.color }} />
                    </div>
                    <p className="font-black text-slate-800 text-sm leading-tight">{action.label}</p>
                    <p className="text-slate-400 text-xs mt-1 leading-tight">{action.desc}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Two column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Appointments */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-black text-slate-800 flex items-center gap-2">
                <Calendar size={18} style={{ color: '#4A8BB5' }} />
                مواعيدي
              </h3>
              <Link href="/dashboard/patient/specialists">
                <span className="text-xs font-bold" style={{ color: '#4A8BB5' }}>+ حجز موعد</span>
              </Link>
            </div>
            {appointments.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-3">📅</div>
                <p className="text-slate-400 text-sm font-semibold">لا توجد مواعيد محجوزة</p>
                <Link href="/dashboard/patient/specialists">
                  <button className="mt-3 text-xs font-bold px-4 py-2 rounded-xl" style={{ background: 'rgba(74,139,181,0.1)', color: '#4A8BB5' }}>
                    احجز موعدك الأول
                  </button>
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {appointments.map((apt: any, i: number) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: '#F8FBFF' }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs text-white flex-shrink-0"
                      style={{ background: '#4A8BB5' }}>
                      {apt.specialistName?.split(' ')[1]?.[0] || 'د'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-slate-700 text-sm truncate">{apt.specialistName}</p>
                      <p className="text-slate-400 text-xs">{apt.date} — {apt.time}</p>
                    </div>
                    <span className={`text-xs font-bold px-2 py-1 rounded-lg ${
                      apt.status === 'confirmed' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-amber-100 text-amber-700'
                    }`}>
                      {apt.status === 'confirmed' ? 'مؤكد' : 'انتظار'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          {/* My boxes */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35 }}
            className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-black text-slate-800 flex items-center gap-2">
                <Package size={18} style={{ color: '#E8A87C' }} />
                صناديقي النفسية
              </h3>
              <Link href="/dashboard/patient/boxes">
                <span className="text-xs font-bold" style={{ color: '#4A8BB5' }}>استعراض الكل</span>
              </Link>
            </div>
            {purchased.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-3">📦</div>
                <p className="text-slate-400 text-sm font-semibold">لم تقتنِ أي صندوق بعد</p>
                <Link href="/dashboard/patient/boxes">
                  <button className="mt-3 text-xs font-bold px-4 py-2 rounded-xl" style={{ background: 'rgba(232,168,124,0.1)', color: '#b5673a' }}>
                    اكتشف الصناديق
                  </button>
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {purchased.map(box => (
                  <Link key={box.id} href="/dashboard/patient/boxes">
                    <div className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:border-slate-200 hover:shadow-sm transition-all cursor-pointer">
                      {/* Mini sticker icon with gradient bg */}
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 p-1"
                        style={{ background: boxGradient(box.id) }}>
                        <MiniSticker id={box.id} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-black text-slate-700 text-sm" style={{ fontFamily: 'Cairo' }}>{box.name}</p>
                        <p className="text-slate-400 text-xs mt-0.5">{box.patientContent.booklets.length} كتاب · {box.patientContent.cards.length} بطاقة</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-[10px] font-black px-2 py-0.5 rounded-lg" style={{ background: 'rgba(127,178,133,0.15)', color: '#3d6b43' }}>مفعّل</span>
                        <ArrowLeft size={14} className="text-slate-300" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* Recommended boxes */}
            {available.length > 0 && (
              <div className="mt-4 pt-4 border-t border-slate-100">
                <p className="text-xs font-bold text-slate-400 mb-3">موصى بها لك:</p>
                <div className="flex flex-wrap gap-2">
                  {available.slice(0, 2).map(box => (
                    <Link key={box.id} href="/dashboard/patient/boxes">
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer hover:opacity-80 transition-opacity border border-slate-200 text-slate-600">
                        <div className="w-4 h-4 rounded-full" style={{ background: boxGradient(box.id) }} />
                        {box.name}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Group Sessions Announcements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.38 }}
          className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm text-right"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-black text-slate-800 flex items-center gap-2" style={{ fontFamily: 'Cairo' }}>
              <Megaphone size={18} className="text-[#E8A87C]" />
              الورشات والجلسات الجماعية المجانية القادمة 📢
            </h3>
            <span className="text-[10px] font-black px-2 py-0.5 rounded-lg bg-green-50 text-green-600">
              مباشرة أونلاين
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {GROUP_SESSIONS.map(session => {
              const isBooked = bookedSessions.includes(session.id);
              const isBooking = bookingSessionId === session.id;
              const totalSeats = session.seats;
              const currentBooked = session.bookedSeats + (isBooked ? 1 : 0);
              const leftSeats = totalSeats - currentBooked;
              
              const handleBookSession = async (id: string) => {
                if (isBooked) return;
                setBookingSessionId(id);
                await new Promise(r => setTimeout(r, 800));
                setBookedSessions(prev => [...prev, id]);
                setBookingSessionId(null);
              };

              return (
                <div 
                  key={session.id}
                  className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 flex flex-col justify-between hover:border-slate-200 transition-all"
                >
                  <div className="space-y-2">
                    <span className="text-[9px] font-black px-2 py-0.5 rounded bg-white text-slate-500 border border-slate-100">
                      {session.date} — {session.time}
                    </span>
                    <h4 className="font-bold text-slate-800 text-sm mt-1" style={{ fontFamily: 'Cairo' }}>{session.title}</h4>
                    <p className="text-[11px] text-slate-400 font-semibold">{session.topic}</p>
                    <p className="text-[10px] text-slate-500">تقديم: <span className="font-bold">{session.specialist}</span></p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100/70 flex flex-col gap-2">
                    <div className="flex justify-between items-center text-[10px] font-bold text-slate-400">
                      <span>بقي {leftSeats} مقاعد</span>
                      <span>سعة الجلسة: {totalSeats}</span>
                    </div>
                    
                    <button
                      onClick={() => handleBookSession(session.id)}
                      disabled={isBooked || isBooking || leftSeats <= 0}
                      className={`w-full py-2 rounded-lg text-[11px] font-black flex items-center justify-center gap-1 transition-all ${
                        isBooked 
                          ? 'bg-green-50 text-green-600 border border-green-200/50' 
                          : leftSeats <= 0 
                            ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                            : 'bg-slate-800 text-white hover:bg-slate-700'
                      }`}
                    >
                      {isBooking ? (
                        <div className="w-4.5 h-4.5 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
                      ) : isBooked ? (
                        <>تم حجز مقعدك ✓</>
                      ) : (
                        <>حجز مقعد مجاني</>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Featured specialist */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-black text-slate-800">أخصائيون مميزون</h3>
            <Link href="/dashboard/patient/specialists">
              <span className="text-xs font-bold" style={{ color: '#4A8BB5' }}>استعراض الكل ←</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SPECIALISTS.slice(0, 3).map((spec, i) => (
              <motion.div
                key={spec.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:border-[#4A8BB5]/30 hover:shadow-sm transition-all cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs text-white flex-shrink-0"
                  style={{ background: '#4A8BB5' }}>
                  {spec.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-slate-700 text-sm truncate">{spec.name}</p>
                  <div className="flex items-center gap-1">
                    <Star size={10} className="text-amber-400 fill-amber-400" />
                    <span className="text-xs text-slate-400">{spec.rating} ({spec.reviewsCount})</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
