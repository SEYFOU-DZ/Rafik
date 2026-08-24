'use client';

import { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/DashboardLayout';
import { GENERAL_DOCTOR } from '@/lib/data';
import { 
  Stethoscope, Calendar, Clock, Star, Phone, MapPin, 
  CheckCircle, ShieldAlert, ArrowLeft, MessageSquare
} from 'lucide-react';

const TIME_SLOTS = [
  '09:00', '10:00', '11:00', '13:00', '14:00', '15:00'
];


function DoctorContent() {
  const { user, isLoading, updateUser } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const wasRedirected = searchParams.get('redirected') === 'true';

  const [days, setDays] = useState<any[]>([
    { key: 'today', label: 'اليوم', date: 'تحميل...' },
    { key: 'tomorrow', label: 'غداً', date: 'تحميل...' },
    { key: 'after', label: 'بعد غد', date: 'تحميل...' },
  ]);
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'contact'>('profile');

  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'patient')) {
      router.push('/auth/login');
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    const getArabicDate = (daysFromNow: number) => {
      const date = new Date();
      date.setDate(date.getDate() + daysFromNow);
      const dayNames = ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];
      const monthNames = [
        "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
        "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
      ];
      return `${dayNames[date.getDay()]} ${date.getDate()} ${monthNames[date.getMonth()]}`;
    };

    const computedDays = [
      { key: 'today', label: 'اليوم', date: getArabicDate(0) },
      { key: 'tomorrow', label: 'غداً', date: getArabicDate(1) },
      { key: 'after', label: 'بعد غد', date: getArabicDate(2) },
    ];
    setDays(computedDays);
    setSelectedDay(computedDays[0].date);
  }, []);

  if (isLoading || !user) return null;

  const handleBook = () => {
    if (!selectedTime) return;

    const newApt = {
      specialistId: GENERAL_DOCTOR.id,
      specialistName: GENERAL_DOCTOR.name,
      date: selectedDay,
      time: selectedTime,
      status: 'confirmed'
    };

    const updated = [...(user.bookedAppointments || []), newApt];
    updateUser({ bookedAppointments: updated });
    setBookingSuccess(true);
  };

  return (
    <DashboardLayout role="patient">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Back Link */}
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-1.5 text-xs font-black text-slate-400 hover:text-slate-600 transition-colors"
        >
          <ArrowLeft size={14} /> العودة للخلف
        </button>

        {/* Redirect Notice Banner */}
        {wasRedirected && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-2xl border flex items-start gap-3 text-right animate-pulse"
            style={{ background: 'rgba(232, 168, 124, 0.08)', borderColor: 'rgba(232, 168, 124, 0.25)' }}
          >
            <ShieldAlert size={18} className="text-[#E8A87C] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-slate-800" style={{ fontFamily: 'Cairo' }}>لقد تم توجيهك بناءً على نتائج استبيانك</p>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                أظهر الاستبيان أعراضاً جسدية تستدعي الفحص. هنا يمكنك حجز موعد مع الطبيب العام المعتمد لدينا لاستبعاد أي أسباب عضوية أولاً.
              </p>
            </div>
          </motion.div>
        )}

        {/* Doctor Main Card */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-3 text-right">
          
          {/* Info Side */}
          <div className="md:col-span-2 p-6 sm:p-8 space-y-6 border-l border-slate-50">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#E8A87C] to-[#b5673a] flex items-center justify-center text-2xl font-black text-white shadow-md">
                {GENERAL_DOCTOR.initials}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap justify-start">
                  <h1 className="text-xl font-black text-slate-800" style={{ fontFamily: 'Cairo' }}>{GENERAL_DOCTOR.name}</h1>
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">
                    مستشار المنصة الطبي
                  </span>
                </div>
                <p className="text-sm text-[#E8A87C] font-bold mt-0.5">{GENERAL_DOCTOR.specialty}</p>
                
                <div className="flex items-center gap-3 mt-2 text-xs text-slate-400 font-semibold justify-start">
                  <div className="flex items-center gap-0.5">
                    <Star size={12} className="text-amber-400 fill-amber-400" />
                    <span className="text-slate-600">{GENERAL_DOCTOR.rating}</span>
                    <span>({GENERAL_DOCTOR.reviewsCount} تقييم)</span>
                  </div>
                  <span>•</span>
                  <span>خبرة {GENERAL_DOCTOR.experience} سنوات</span>
                </div>
              </div>
            </div>

            {/* Quick Tabs */}
            <div className="flex border-b border-slate-100">
              <button 
                onClick={() => setActiveTab('profile')}
                className={`pb-2.5 px-4 font-bold text-sm transition-all border-b-2 ${activeTab === 'profile' ? 'border-[#E8A87C] text-slate-800' : 'border-transparent text-slate-400'}`}
              >
                الملف المهني
              </button>
              <button 
                onClick={() => setActiveTab('contact')}
                className={`pb-2.5 px-4 font-bold text-sm transition-all border-b-2 ${activeTab === 'contact' ? 'border-[#E8A87C] text-slate-800' : 'border-transparent text-slate-400'}`}
              >
                طرق التواصل السريع
              </button>
            </div>

            {activeTab === 'profile' ? (
              <div className="space-y-4">
                <div>
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-1.5">نبذة عن الطبيب</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-semibold">{GENERAL_DOCTOR.bio}</p>
                </div>

                <div>
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-2">الخدمات الطبية المتاحة</h3>
                  <div className="flex flex-wrap gap-2 justify-start">
                    {GENERAL_DOCTOR.services.map(svc => (
                      <span key={svc} className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-100 text-slate-600">
                        {svc}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs font-semibold text-slate-500">
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-slate-400" />
                    <span>{GENERAL_DOCTOR.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-slate-400" />
                    <span>ساعات العمل: {GENERAL_DOCTOR.availableHours}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                  يمكنك التواصل مباشرة مع الطبيب العام عبر الوسائل التالية بعد حجز موعدك أو للحالات المستعجلة:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a href={`tel:${GENERAL_DOCTOR.phone}`} className="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 hover:border-slate-200 hover:shadow-sm transition-all bg-slate-50">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-green-50 text-green-500 flex items-center justify-center">
                        <Phone size={16} />
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-bold text-slate-700">اتصال هاتف مباشر</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">{GENERAL_DOCTOR.phone}</p>
                      </div>
                    </div>
                  </a>

                  <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 hover:border-slate-200 hover:shadow-sm transition-all bg-slate-50">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[#4A8BB5]/10 text-[#4A8BB5] flex items-center justify-center">
                        <MessageSquare size={16} />
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-bold text-slate-700">استشارة كتابية</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">دردشة آمنة وفورية</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Booking Side */}
          <div className="p-6 sm:p-8 bg-slate-50/50 flex flex-col justify-between">
            <div className="space-y-5">
              <div className="flex justify-between items-center">
                <span className="text-xs font-black text-slate-400">تكلفة الكشف</span>
                <span className="text-lg font-black text-slate-800">{GENERAL_DOCTOR.price} {GENERAL_DOCTOR.currency}</span>
              </div>

              {/* Day selection */}
              <div>
                <label className="block text-xs font-black text-slate-400 mb-2">اختر اليوم</label>
                <div className="space-y-2">
                  {days.map(day => (
                    <button
                      key={day.key}
                      onClick={() => setSelectedDay(day.date)}
                      className={`w-full p-2.5 rounded-xl text-xs font-bold border text-right flex justify-between items-center transition-all ${
                        selectedDay === day.date 
                          ? 'border-[#E8A87C] bg-white text-[#b5673a] shadow-sm' 
                          : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <span>{day.label}</span>
                      <span className="opacity-75">{day.date}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time selection */}
              <div>
                <label className="block text-xs font-black text-slate-400 mb-2">الساعات المتاحة</label>
                <div className="grid grid-cols-3 gap-2">
                  {TIME_SLOTS.map(time => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`py-2 rounded-lg text-xs font-black border transition-all ${
                        selectedTime === time 
                          ? 'border-[#E8A87C] bg-[#E8A87C] text-white shadow-sm' 
                          : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={handleBook}
              disabled={!selectedTime}
              className={`w-full mt-6 py-3 rounded-xl text-xs font-black flex items-center justify-center gap-2 transition-all ${
                selectedTime 
                  ? 'bg-[#E8A87C] text-white hover:opacity-95 shadow-lg shadow-[#E8A87C]/20' 
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
              style={{ fontFamily: 'Cairo' }}
            >
              <CheckCircle size={14} /> تأكيد حجز الموعد
            </button>
          </div>
        </div>

        {/* Success Modal */}
        <AnimatePresence>
          {bookingSuccess && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                onClick={() => router.push('/dashboard/patient')}
              />
              <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full relative z-10 text-center space-y-4 border border-slate-100"
              >
                <div className="w-14 h-14 mx-auto rounded-full bg-green-50 text-green-500 flex items-center justify-center text-2xl">
                  ✓
                </div>
                <h3 className="text-lg font-black text-slate-800" style={{ fontFamily: 'Cairo' }}>تم حجز موعدك بنجاح!</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                  تم حجز موعد مع {GENERAL_DOCTOR.name} في {selectedDay} على الساعة {selectedTime}. يمكنك متابعة موعدك مباشرة من لوحة التحكم.
                </p>
                <button
                  onClick={() => router.push('/dashboard/patient')}
                  className="w-full py-2.5 rounded-xl bg-slate-800 text-white text-xs font-bold hover:bg-slate-700 transition-colors"
                >
                  العودة للوحة التحكم
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
}

export default function DoctorPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-2 border-[#E8A87C] border-t-transparent rounded-full animate-spin" /></div>}>
      <DoctorContent />
    </Suspense>
  );
}
