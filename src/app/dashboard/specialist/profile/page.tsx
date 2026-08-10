'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/DashboardLayout';
import { SPECIALISTS } from '@/lib/data';
import {
  User, MapPin, Phone, Mail, Award, Clock, Star,
  Edit3, CheckCircle, Camera, Languages, Calendar, Save
} from 'lucide-react';

const WILAYAS = ['الجزائر العاصمة', 'وهران', 'قسنطينة', 'عنابة', 'البليدة', 'سطيف', 'تلمسان', 'باتنة', 'بجاية', 'مستغانم'];
const AVAILABLE_DAYS = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];

export default function SpecialistProfilePage() {
  const { user, isLoading, updateUser } = useAuth();
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    name: '', title: '', bio: '', city: '', phone: '',
    price: '', experience: '', availableDays: [] as string[], availableHours: ''
  });

  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'specialist')) router.push('/auth/login');
  }, [user, isLoading, router]);

  useEffect(() => {
    if (!user) return;
    const specData = SPECIALISTS.find(s => s.email === user.email);
    setForm({
      name: user.name || specData?.name || '',
      title: specData?.title || user.title || '',
      bio: specData?.bio || user.bio || '',
      city: specData?.city || user.city || '',
      phone: user.phone || '',
      price: specData?.price?.toString() || '',
      experience: specData?.experience?.toString() || '',
      availableDays: specData?.availableDays || [],
      availableHours: specData?.availableHours || ''
    });
  }, [user]);

  const update = (k: string, v: any) => setForm(p => ({ ...p, [k]: v }));

  const handleSave = () => {
    updateUser({ ...form });
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const specData = SPECIALISTS.find(s => s.email === user?.email);
  const initials = form.name.split(' ').map(n => n[0]).join('').slice(0, 2);

  if (isLoading || !user) return null;

  return (
    <DashboardLayout role="specialist">
      <div className="space-y-5 max-w-3xl">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-slate-800" style={{ fontFamily: 'Cairo' }}>ملفي الشخصي</h1>
            <p className="text-slate-400 text-sm mt-1">أدر معلوماتك المهنية وأوقات العمل</p>
          </div>
          <div className="flex gap-2">
            {editing ? (
              <>
                <button onClick={() => setEditing(false)} className="btn-secondary py-2 px-4 rounded-xl text-sm">
                  إلغاء
                </button>
                <button onClick={handleSave} className="btn-primary py-2 px-4 rounded-xl text-sm flex items-center gap-2">
                  <Save size={14} /> حفظ التغييرات
                </button>
              </>
            ) : (
              <button onClick={() => setEditing(true)} className="btn-secondary py-2 px-4 rounded-xl text-sm flex items-center gap-2">
                <Edit3 size={14} /> تعديل الملف
              </button>
            )}
          </div>
        </div>

        {/* Saved notice */}
        {saved && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 p-3 rounded-xl text-sm font-semibold"
            style={{ background: 'rgba(127,178,133,0.12)', color: '#3d6b43' }}
          >
            <CheckCircle size={16} /> تم حفظ التغييرات بنجاح!
          </motion.div>
        )}

        {/* Profile card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden"
        >
          {/* Cover Banner */}
          <div className="h-32 w-full relative" style={{ background: 'linear-gradient(135deg, #1a3d55, #2D5F7E, #4A8BB5)' }}>
            <div className="absolute inset-0 opacity-15">
              <div className="absolute bottom-0 right-20 w-40 h-40 rounded-full bg-white" style={{ filter: 'blur(40px)' }} />
            </div>
          </div>

          <div className="px-6 pb-6 relative z-10">
            {/* Avatar & Profile Details: Responsive container to avoid overlaps */}
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 -mt-12 sm:-mt-10 mb-6">
              <div className="relative z-25 flex-shrink-0">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center font-black text-2xl sm:text-3xl text-white border-4 border-white shadow-lg"
                  style={{ background: 'linear-gradient(135deg, #2D5F7E, #4A8BB5)' }}>
                  {initials}
                </div>
              </div>
              <div className="text-center sm:text-right relative z-20">
                <h2 className="text-lg sm:text-xl font-black text-slate-800" style={{ fontFamily: 'Cairo' }}>{form.name}</h2>
                <p className="text-slate-400 text-xs sm:text-sm font-semibold">{form.title || 'أخصائي نفسي'}</p>
                {specData && (
                  <div className="flex items-center justify-center sm:justify-start gap-1 mt-1">
                    <Star size={11} className="text-amber-400 fill-amber-400" />
                    <span className="text-[10px] font-bold text-slate-650">{specData.rating}</span>
                    <span className="text-slate-400 text-[10px]">({specData.reviewsCount} تقييم)</span>
                  </div>
                )}
              </div>
            </div>

            {/* Stats row */}
            {specData && (
              <div className="grid grid-cols-3 gap-4 mb-6 p-4 rounded-xl" style={{ background: '#F8FBFF' }}>
                {[
                  { label: 'سنوات الخبرة', val: `${specData.experience}+`, icon: Award },
                  { label: 'الجلسات المُنجزة', val: specData.sessionsCount, icon: CheckCircle },
                  { label: 'تقييم المرضى', val: specData.rating, icon: Star },
                ].map(s => (
                  <div key={s.label} className="text-center">
                    <div className="text-xl font-black" style={{ color: '#2D5F7E', fontFamily: 'Cairo' }}>{s.val}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Form fields */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wide">الاسم الكامل</label>
                  {editing ? (
                    <input value={form.name} onChange={e => update('name', e.target.value)} className="input-styled" />
                  ) : (
                    <p className="text-slate-700 font-semibold py-2.5">{form.name}</p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wide">اللقب المهني</label>
                  {editing ? (
                    <input value={form.title} onChange={e => update('title', e.target.value)} className="input-styled" />
                  ) : (
                    <p className="text-slate-700 font-semibold py-2.5">{form.title || '—'}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wide">نبذة مهنية</label>
                {editing ? (
                  <textarea value={form.bio} onChange={e => update('bio', e.target.value)}
                    className="input-styled resize-none" rows={4} />
                ) : (
                  <p className="text-slate-600 text-sm leading-relaxed py-1">{form.bio || 'لم تُضف نبذة بعد'}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wide">
                    <MapPin size={10} className="inline ml-1" />الولاية
                  </label>
                  {editing ? (
                    <select value={form.city} onChange={e => update('city', e.target.value)} className="input-styled">
                      <option value="">اختر</option>
                      {WILAYAS.map(w => <option key={w}>{w}</option>)}
                    </select>
                  ) : (
                    <p className="text-slate-700 font-semibold py-2.5">{form.city || '—'}</p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wide">
                    <Phone size={10} className="inline ml-1" />رقم الهاتف
                  </label>
                  {editing ? (
                    <input value={form.phone} onChange={e => update('phone', e.target.value)}
                      placeholder="05XX XXX XXX" className="input-styled" />
                  ) : (
                    <p className="text-slate-700 font-semibold py-2.5">{form.phone || '—'}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wide">
                    سعر الجلسة (دج)
                  </label>
                  {editing ? (
                    <input type="number" value={form.price} onChange={e => update('price', e.target.value)} className="input-styled" />
                  ) : (
                    <p className="text-slate-700 font-semibold py-2.5">{form.price ? `${form.price} دج` : '—'}</p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wide">سنوات الخبرة</label>
                  {editing ? (
                    <input type="number" value={form.experience} onChange={e => update('experience', e.target.value)} className="input-styled" />
                  ) : (
                    <p className="text-slate-700 font-semibold py-2.5">{form.experience ? `${form.experience} سنة` : '—'}</p>
                  )}
                </div>
              </div>

              {/* Available days */}
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">
                  <Calendar size={10} className="inline ml-1" />أيام العمل
                </label>
                {editing ? (
                  <div className="flex flex-wrap gap-2">
                    {AVAILABLE_DAYS.map(day => (
                      <button
                        key={day}
                        type="button"
                        onClick={() => {
                          if (form.availableDays.includes(day)) {
                            update('availableDays', form.availableDays.filter(d => d !== day));
                          } else {
                            update('availableDays', [...form.availableDays, day]);
                          }
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold border-2 transition-all ${
                          form.availableDays.includes(day)
                            ? 'bg-[#4A8BB5] text-white border-[#4A8BB5]'
                            : 'bg-white text-slate-500 border-slate-200'
                        }`}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2 py-1">
                    {form.availableDays.length > 0
                      ? form.availableDays.map(d => (
                          <span key={d} className="badge badge-primary">{d}</span>
                        ))
                      : <span className="text-slate-400 text-sm">لم تُحدد أيام العمل</span>
                    }
                  </div>
                )}
              </div>
            </div>

            {/* Email (read-only) */}
            <div className="mt-4 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Mail size={13} />
                <span>{user.email}</span>
                <span className="badge badge-sage text-xs">موثّق</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Specialties if available */}
        {specData?.specialty && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6"
          >
            <h3 className="font-black text-slate-800 mb-3 text-sm" style={{ fontFamily: 'Cairo' }}>التخصصات</h3>
            <div className="flex flex-wrap gap-2">
              {specData.specialty.map((s: string) => (
                <span key={s} className="badge badge-primary">{s}</span>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
}
