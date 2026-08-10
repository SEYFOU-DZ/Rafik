'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/DashboardLayout';
import { SPECIALISTS } from '@/lib/data';
import { Search, MapPin, Star, Clock, Filter, CheckCircle, X, Calendar, Phone, Award, ChevronDown } from 'lucide-react';

const SPECIALTIES_FILTER = ['الكل', 'قلق', 'اكتئاب', 'وسواس قهري', 'إرشاد أسري', 'أطفال'];
const CITIES_FILTER = ['الكل', 'الجزائر العاصمة', 'وهران', 'قسنطينة', 'عنابة', 'البليدة'];

function BookingModal({ specialist, onClose, onBook }: { specialist: any; onClose: () => void; onBook: (data: any) => void }) {
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [note, setNote] = useState('');
  const [step, setStep] = useState<'select' | 'confirm' | 'done'>('select');

  const times = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'];

  const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 14; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const dayName = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'][d.getDay()];
      if (specialist.availableDays.includes(dayName)) {
        dates.push({
          date: d.toISOString().split('T')[0],
          display: `${dayName} ${d.getDate()}/${d.getMonth() + 1}`
        });
      }
    }
    return dates.slice(0, 6);
  };

  const availableDates = generateDates();

  const handleBook = () => {
    onBook({ specialistId: specialist.id, specialistName: specialist.name, date: selectedDay, time: selectedTime, status: 'pending', note });
    setStep('done');
  };

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="bg-white rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl"
      >
        {step === 'done' ? (
          <div className="p-8 text-center">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }} className="text-6xl mb-4">🎉</motion.div>
            <h3 className="text-xl font-black text-slate-800 mb-2">تم الحجز بنجاح!</h3>
            <p className="text-slate-500 text-sm mb-6">
              طلب حجزك مع <strong>{specialist.name}</strong> في {selectedDay} الساعة {selectedTime} قيد المراجعة.
              ستصلك رسالة تأكيد قريباً.
            </p>
            <button onClick={onClose} className="btn-primary px-8 py-3 rounded-xl w-full">حسناً</button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-black text-slate-800">حجز موعد</h3>
                <p className="text-sm text-slate-400">{specialist.name}</p>
              </div>
              <button onClick={onClose} className="p-2 rounded-xl hover:bg-slate-100 transition-colors">
                <X size={18} className="text-slate-500" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              {/* Specialist mini card */}
              <div className="flex items-center gap-3 p-3 rounded-xl" style={{ background: '#F8FBFF' }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-white" style={{ background: '#4A8BB5' }}>
                  {specialist.initials}
                </div>
                <div>
                  <p className="font-black text-slate-700">{specialist.name}</p>
                  <p className="text-slate-400 text-xs">{specialist.title}</p>
                  <p className="text-sm font-bold mt-0.5" style={{ color: '#4A8BB5' }}>{specialist.price} {specialist.currency} / جلسة</p>
                </div>
              </div>

              {/* Date selection */}
              <div>
                <label className="block text-sm font-black text-slate-700 mb-2">اختر التاريخ</label>
                <div className="grid grid-cols-3 gap-2">
                  {availableDates.map(d => (
                    <button key={d.date} onClick={() => setSelectedDay(d.date)}
                      className={`p-2.5 rounded-xl text-xs font-bold text-center border-2 transition-all ${
                        selectedDay === d.date
                          ? 'border-[#4A8BB5] bg-[#4A8BB5] text-white'
                          : 'border-slate-200 text-slate-600 hover:border-[#4A8BB5]'
                      }`}>
                      {d.display}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time selection */}
              {selectedDay && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <label className="block text-sm font-black text-slate-700 mb-2">اختر الوقت</label>
                  <div className="grid grid-cols-4 gap-2">
                    {times.map(t => (
                      <button key={t} onClick={() => setSelectedTime(t)}
                        className={`p-2 rounded-xl text-xs font-bold border-2 transition-all ${
                          selectedTime === t
                            ? 'border-[#7FB285] bg-[#7FB285] text-white'
                            : 'border-slate-200 text-slate-600 hover:border-[#7FB285]'
                        }`}>
                        {t}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Note */}
              {selectedTime && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <label className="block text-sm font-black text-slate-700 mb-2">ملاحظة (اختياري)</label>
                  <textarea value={note} onChange={e => setNote(e.target.value)}
                    placeholder="اكتب ملاحظتك أو سبب الزيارة..."
                    className="input-styled resize-none" rows={3} />
                </motion.div>
              )}

              <motion.button
                onClick={handleBook}
                disabled={!selectedDay || !selectedTime}
                className={`btn-primary w-full py-3.5 rounded-xl flex items-center justify-center gap-2 ${
                  !selectedDay || !selectedTime ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                whileHover={selectedDay && selectedTime ? { scale: 1.02 } : {}}
                whileTap={selectedDay && selectedTime ? { scale: 0.98 } : {}}
              >
                <Calendar size={16} /> تأكيد الحجز
              </motion.button>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}

function SpecialistModal({ specialist, onClose, onBook }: { specialist: any; onClose: () => void; onBook: () => void }) {
  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
      >
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h3 className="text-lg font-black text-slate-800">ملف الأخصائي</h3>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-slate-100 transition-colors">
            <X size={18} className="text-slate-500" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center font-black text-xl text-white flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #2D5F7E, #4A8BB5)' }}>
              {specialist.initials}
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-black text-slate-800">{specialist.name}</h2>
              <p className="text-slate-500 text-sm">{specialist.title}</p>
              <div className="flex items-center flex-wrap gap-2 mt-2">
                <div className="flex items-center gap-1">
                  <Star size={13} className="text-amber-400 fill-amber-400" />
                  <span className="text-sm font-bold text-slate-700">{specialist.rating}</span>
                  <span className="text-slate-400 text-xs">({specialist.reviewsCount} تقييم)</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-slate-400">
                  <MapPin size={11} /> {specialist.city}
                </div>
                <div className={`w-2 h-2 rounded-full ${specialist.isOnline ? 'bg-green-400' : 'bg-slate-300'}`} />
                <span className="text-xs text-slate-400">{specialist.isOnline ? 'متاح الآن' : 'غير متاح'}</span>
              </div>
            </div>
            <div className="text-left">
              <p className="text-xs text-slate-400">سعر الجلسة</p>
              <p className="text-xl font-black" style={{ color: '#4A8BB5' }}>{specialist.price}</p>
              <p className="text-xs text-slate-400">{specialist.currency}</p>
            </div>
          </div>

          {/* Bio */}
          <div>
            <h4 className="font-black text-slate-700 mb-2 text-sm">نبذة عن الأخصائي</h4>
            <p className="text-slate-500 text-sm leading-relaxed">{specialist.bio}</p>
          </div>

          {/* Education */}
          <div className="flex items-start gap-2">
            <Award size={16} style={{ color: '#4A8BB5' }} className="mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-bold text-slate-700 text-sm">المؤهل العلمي</p>
              <p className="text-slate-400 text-xs">{specialist.education}</p>
            </div>
          </div>

          {/* Specialties */}
          <div>
            <h4 className="font-black text-slate-700 mb-2 text-sm">التخصصات</h4>
            <div className="flex flex-wrap gap-2">
              {specialist.specialty.map((s: string) => (
                <span key={s} className="badge badge-primary">{s}</span>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'سنوات الخبرة', val: `${specialist.experience}+`, icon: Award },
              { label: 'جلسة أُجريت', val: specialist.sessionsCount, icon: CheckCircle },
              { label: 'أقرب موعد', val: specialist.nextAvailable, icon: Clock },
            ].map(s => (
              <div key={s.label} className="text-center p-3 rounded-xl" style={{ background: '#F8FBFF' }}>
                <div className="text-lg font-black text-[#2D5F7E]">{s.val}</div>
                <div className="text-xs text-slate-400 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Availability */}
          <div>
            <h4 className="font-black text-slate-700 mb-2 text-sm flex items-center gap-1">
              <Clock size={14} style={{ color: '#7FB285' }} /> أوقات العمل
            </h4>
            <div className="flex flex-wrap gap-2">
              {specialist.availableDays.map((d: string) => (
                <span key={d} className="badge badge-sage">{d}</span>
              ))}
            </div>
            <p className="text-slate-400 text-xs mt-2">{specialist.availableHours}</p>
          </div>

          {/* Languages */}
          <div>
            <h4 className="font-black text-slate-700 mb-2 text-sm">اللغات</h4>
            <div className="flex gap-2">
              {specialist.languages.map((l: string) => (
                <span key={l} className="badge badge-primary">{l}</span>
              ))}
            </div>
          </div>

          <button onClick={onBook} className="btn-primary w-full py-4 rounded-2xl text-base flex items-center justify-center gap-2">
            <Calendar size={18} /> احجز موعداً
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default function SpecialistsPage() {
  const { user, isLoading, updateUser } = useAuth();
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [filterSpecialty, setFilterSpecialty] = useState('الكل');
  const [filterCity, setFilterCity] = useState('الكل');
  const [selectedSpec, setSelectedSpec] = useState<any>(null);
  const [bookingSpec, setBookingSpec] = useState<any>(null);

  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'patient')) router.push('/auth/login');
  }, [user, isLoading, router]);

  const filtered = SPECIALISTS.filter(s => {
    const matchSearch = !search || s.name.includes(search) || s.city.includes(search) || s.specialty.some(sp => sp.includes(search));
    const matchSpecialty = filterSpecialty === 'الكل' || s.specialty.some(sp => sp.includes(filterSpecialty));
    const matchCity = filterCity === 'الكل' || s.city === filterCity;
    return matchSearch && matchSpecialty && matchCity;
  });

  const handleBook = (data: any) => {
    const appointments = [...(user?.bookedAppointments || []), data];
    updateUser({ bookedAppointments: appointments });
    setBookingSpec(null);
    setSelectedSpec(null);
  };

  if (isLoading || !user) return null;

  return (
    <DashboardLayout role="patient">
      <div className="space-y-5">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-black text-slate-800">الأخصائيون النفسيون</h1>
          <p className="text-slate-400 text-sm mt-1">تصفح وابحث عن الأخصائي المناسب لك</p>
        </div>

        {/* Search & filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute top-3.5 right-3.5 text-slate-400" />
            <input
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="ابحث بالاسم أو التخصص أو المدينة..."
              className="input-styled pr-9 w-full" id="spec-search"
            />
          </div>
          <select value={filterSpecialty} onChange={e => setFilterSpecialty(e.target.value)}
            className="input-styled sm:w-40" id="filter-specialty">
            {SPECIALTIES_FILTER.map(f => <option key={f}>{f}</option>)}
          </select>
          <select value={filterCity} onChange={e => setFilterCity(e.target.value)}
            className="input-styled sm:w-48" id="filter-city">
            {CITIES_FILTER.map(f => <option key={f}>{f}</option>)}
          </select>
        </div>

        <p className="text-xs text-slate-400 font-semibold">عُثر على {filtered.length} أخصائي</p>

        {/* Specialists grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((spec, i) => (
            <motion.div
              key={spec.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden card-hover"
            >
              {/* Card header */}
              <div className="p-5">
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl text-white flex-shrink-0"
                      style={{ background: 'linear-gradient(135deg, #2D5F7E, #4A8BB5)' }}>
                      {spec.initials}
                    </div>
                    <div className={`absolute -bottom-1 -left-1 w-3.5 h-3.5 rounded-full border-2 border-white ${
                      spec.isOnline ? 'bg-green-400' : 'bg-slate-300'
                    }`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-black text-slate-800 text-base truncate">{spec.name}</h3>
                    <p className="text-slate-400 text-xs truncate">{spec.title}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star size={12} className="text-amber-400 fill-amber-400" />
                      <span className="text-sm font-bold text-slate-700">{spec.rating}</span>
                      <span className="text-slate-400 text-xs">({spec.reviewsCount})</span>
                    </div>
                  </div>
                  <div className="text-left flex-shrink-0">
                    <p className="text-lg font-black" style={{ color: '#4A8BB5' }}>{spec.price}</p>
                    <p className="text-xs text-slate-400">{spec.currency}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 mt-3 text-xs text-slate-400">
                  <MapPin size={11} /> {spec.city} · {spec.experience} سنوات خبرة
                </div>

                <div className="flex flex-wrap gap-1.5 mt-3">
                  {spec.specialty.slice(0, 2).map(s => (
                    <span key={s} className="badge badge-primary text-xs">{s}</span>
                  ))}
                  {spec.specialty.length > 2 && (
                    <span className="badge badge-primary text-xs">+{spec.specialty.length - 2}</span>
                  )}
                </div>

                <div className="flex items-center gap-1.5 mt-3 text-xs" style={{ color: '#7FB285' }}>
                  <Clock size={11} /> أقرب موعد: {spec.nextAvailable}
                </div>
              </div>

              {/* Card footer */}
              <div className="px-5 pb-5 flex gap-2">
                <button onClick={() => setSelectedSpec(spec)}
                  className="flex-1 py-2 rounded-xl text-sm font-bold border-2 transition-all"
                  style={{ borderColor: '#4A8BB5', color: '#4A8BB5' }}
                  onMouseEnter={e => { (e.target as HTMLElement).style.background = '#4A8BB5'; (e.target as HTMLElement).style.color = 'white'; }}
                  onMouseLeave={e => { (e.target as HTMLElement).style.background = 'transparent'; (e.target as HTMLElement).style.color = '#4A8BB5'; }}>
                  عرض الملف
                </button>
                <button onClick={() => setBookingSpec(spec)}
                  className="btn-primary flex-1 py-2 rounded-xl text-sm flex items-center justify-center gap-1.5">
                  <Calendar size={13} /> احجز
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <div className="text-4xl mb-3">🔍</div>
            <p className="text-slate-400 font-semibold">لا توجد نتائج لبحثك</p>
            <button onClick={() => { setSearch(''); setFilterSpecialty('الكل'); setFilterCity('الكل'); }}
              className="mt-3 text-sm font-bold" style={{ color: '#4A8BB5' }}>
              إعادة تعيين الفلاتر
            </button>
          </div>
        )}
      </div>

      {/* Modals */}
      <AnimatePresence>
        {selectedSpec && !bookingSpec && (
          <SpecialistModal
            specialist={selectedSpec}
            onClose={() => setSelectedSpec(null)}
            onBook={() => { setBookingSpec(selectedSpec); setSelectedSpec(null); }}
          />
        )}
        {bookingSpec && (
          <BookingModal
            specialist={bookingSpec}
            onClose={() => setBookingSpec(null)}
            onBook={handleBook}
          />
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
}
