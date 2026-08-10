'use client';

import { useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  Brain, Eye, EyeOff,
  ArrowLeft, ArrowRight, CheckCircle, Heart, Award, AlertCircle
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const WILAYAS = [
  'الجزائر', 'وهران', 'قسنطينة', 'عنابة', 'البليدة', 'سطيف', 'تلمسان',
  'باتنة', 'تيزي وزو', 'بجاية', 'مستغانم', 'بسكرة', 'الأغواط', 'غرداية'
];

const SPECIALTIES = [
  'علاج معرفي سلوكي (CBT)', 'وسواس قهري', 'قلق واضطرابات المزاج',
  'اكتئاب وصدمات نفسية', 'إرشاد أسري وزوجي', 'صحة نفسية للأطفال',
  'إدارة الغضب', 'اضطرابات النوم', 'إدمان ومشكلات سلوكية'
];

// Clean shared input style — no icons inside, no overlap
const INPUT = "w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm placeholder:text-slate-300 outline-none transition-all focus:border-[#4A8BB5] focus:bg-white focus:ring-2 focus:ring-[#4A8BB5]/15";
const LABEL = "block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wide";

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultRole = searchParams.get('role') === 'specialist' ? 'specialist' : 'patient';
  const { register } = useAuth();

  const [role, setRole] = useState<'patient' | 'specialist'>(defaultRole as any);
  const [step, setStep] = useState(1);
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    name: '', email: '', password: '', confirmPassword: '',
    phone: '', wilaya: '', age: '', gender: '',
    title: '', specialty: [] as string[], experience: '', bio: '', price: ''
  });

  const update = (k: string, v: any) => setForm(p => ({ ...p, [k]: v }));

  const totalSteps = role === 'specialist' ? 3 : 2;

  const validateStep = () => {
    if (step === 1) {
      if (!form.name || !form.email || !form.password || !form.confirmPassword) return 'يرجى ملء جميع الحقول';
      if (form.password.length < 6) return 'كلمة المرور يجب أن تكون 6 أحرف على الأقل';
      if (form.password !== form.confirmPassword) return 'كلمتا المرور غير متطابقتين';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return 'البريد الإلكتروني غير صحيح';
    }
    if (step === 2 && role === 'patient') {
      if (!form.wilaya || !form.age) return 'يرجى ملء جميع الحقول';
    }
    if (step === 2 && role === 'specialist') {
      if (!form.title || form.specialty.length === 0 || !form.experience) return 'يرجى ملء جميع الحقول';
    }
    return '';
  };

  const nextStep = () => {
    const err = validateStep();
    if (err) { setError(err); return; }
    setError('');
    setStep(s => s + 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validateStep();
    if (err) { setError(err); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    const result = register(form, role);
    setLoading(false);
    if (result.success) {
      if (role === 'specialist') router.push('/dashboard/specialist');
      else router.push('/dashboard/patient');
    } else {
      setError(result.error || 'حدث خطأ');
    }
  };

  return (
    <div className="min-h-screen flex gradient-hero relative overflow-hidden">
      {/* Decorative panel — desktop only */}
      <div className="hidden lg:flex w-5/12 flex-col items-center justify-center p-12 relative">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-white" style={{ filter: 'blur(80px)' }} />
        </div>
        <motion.div className="relative z-10 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }}>
          <div className="w-18 h-18 gradient-primary rounded-3xl flex items-center justify-center mx-auto mb-6 float shadow-2xl" style={{ width: 72, height: 72 }}>
            <Brain size={38} className="text-white" />
          </div>
          <h1 className="text-3xl font-black text-white mb-2" style={{ fontFamily: 'Cairo' }}>انضم لعائلتنا</h1>
          <p className="text-white/65 text-sm max-w-xs leading-relaxed" style={{ fontFamily: 'Tajawal' }}>
            سجّل الآن وابدأ رحلتك نحو صحة نفسية أفضل
          </p>

          {/* Role toggle */}
          <div className="mt-8 flex gap-3 justify-center">
            {(['patient', 'specialist'] as const).map(r => (
              <button key={r}
                onClick={() => { setRole(r); setStep(1); setError(''); }}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${role === r ? 'bg-white text-[#2D5F7E] shadow-lg scale-105' : 'bg-white/10 text-white/65 hover:bg-white/20'}`}
              >
                {r === 'patient' ? <><Heart size={13} /> زائر</> : <><Award size={13} /> أخصائي</>}
              </button>
            ))}
          </div>

          {/* Step progress */}
          <div className="mt-8">
            <div className="flex items-center justify-center gap-2">
              {Array.from({ length: totalSteps }, (_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${step > i + 1 ? 'bg-[#7FB285] text-white' : step === i + 1 ? 'bg-white text-[#2D5F7E]' : 'bg-white/20 text-white/40'}`}>
                    {step > i + 1 ? '✓' : i + 1}
                  </div>
                  {i < totalSteps - 1 && <div className={`w-6 h-0.5 ${step > i + 1 ? 'bg-[#7FB285]' : 'bg-white/20'}`} />}
                </div>
              ))}
            </div>
            <p className="text-white/50 text-xs mt-2" style={{ fontFamily: 'Tajawal' }}>الخطوة {step} من {totalSteps}</p>
          </div>
        </motion.div>
      </div>

      {/* Form panel */}
      <div className="flex-1 flex items-start lg:items-center justify-center p-5 sm:p-8 overflow-y-auto" style={{ background: '#F4F8FC' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm py-6">

          {/* Mobile: logo + role selector */}
          <div className="lg:hidden mb-6">
            <div className="flex items-center gap-3 mb-5 justify-center">
              <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center shadow-lg">
                <Brain size={22} className="text-white" />
              </div>
              <span className="text-lg font-black text-slate-800" style={{ fontFamily: 'Cairo' }}>رفيقك الذكي</span>
            </div>
            <div className="flex gap-2">
              {(['patient', 'specialist'] as const).map(r => (
                <button key={r} onClick={() => { setRole(r); setStep(1); setError(''); }}
                  className={`flex-1 py-2.5 rounded-xl font-bold text-sm border transition-all ${role === r ? 'bg-[#4A8BB5] text-white border-[#4A8BB5]' : 'bg-white text-slate-400 border-slate-200'}`}>
                  {r === 'patient' ? 'زائر (مريض)' : 'أخصائي'}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200/70 p-7">
            <AnimatePresence mode="wait">

              {/* ─── Step 1: Basic Info ─── */}
              {step === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} className="space-y-4">
                  <div className="mb-5">
                    <h2 className="text-xl font-black text-slate-800" style={{ fontFamily: 'Cairo' }}>إنشاء حساب جديد</h2>
                    <p className="text-slate-400 text-sm mt-1" style={{ fontFamily: 'Tajawal' }}>
                      {role === 'patient' ? 'سجّل للوصول للخدمات النفسية' : 'سجّل كأخصائي وابدأ تقديم خدماتك'}
                    </p>
                  </div>

                  <div>
                    <label className={LABEL}>الاسم الكامل</label>
                    <input value={form.name} onChange={e => update('name', e.target.value)}
                      placeholder="أدخل اسمك الكامل" className={INPUT} id="reg-name" />
                  </div>

                  <div>
                    <label className={LABEL}>البريد الإلكتروني</label>
                    <input type="email" value={form.email} onChange={e => update('email', e.target.value)}
                      placeholder="example@email.com" className={INPUT} id="reg-email"
                      style={{ direction: 'ltr', textAlign: 'left' }} />
                  </div>

                  <div>
                    <label className={LABEL}>رقم الهاتف</label>
                    <input value={form.phone} onChange={e => update('phone', e.target.value)}
                      placeholder="05XX XXX XXX" className={INPUT} id="reg-phone"
                      style={{ direction: 'ltr', textAlign: 'left' }} />
                  </div>

                  <div>
                    <label className={LABEL}>كلمة المرور</label>
                    <div className="relative">
                      <input type={showPass ? 'text' : 'password'} value={form.password}
                        onChange={e => update('password', e.target.value)}
                        placeholder="6 أحرف على الأقل" className={`${INPUT} pl-11`} id="reg-pass"
                        style={{ direction: 'ltr', textAlign: 'left' }} />
                      <button type="button" onClick={() => setShowPass(!showPass)}
                        className="absolute top-1/2 -translate-y-1/2 left-3.5 text-slate-300 hover:text-slate-500 transition-colors">
                        {showPass ? <EyeOff size={17} /> : <Eye size={17} />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className={LABEL}>تأكيد كلمة المرور</label>
                    <input type="password" value={form.confirmPassword}
                      onChange={e => update('confirmPassword', e.target.value)}
                      placeholder="أعد كتابة كلمة المرور" className={INPUT} id="reg-confirm"
                      style={{ direction: 'ltr', textAlign: 'left' }} />
                  </div>
                </motion.div>
              )}

              {/* ─── Step 2 Patient: Personal Info ─── */}
              {step === 2 && role === 'patient' && (
                <motion.div key="step2p" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} className="space-y-4">
                  <div className="mb-5">
                    <h2 className="text-xl font-black text-slate-800" style={{ fontFamily: 'Cairo' }}>معلوماتك الشخصية</h2>
                    <p className="text-slate-400 text-sm mt-1" style={{ fontFamily: 'Tajawal' }}>تساعدنا على تقديم خدمة مناسبة لك</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={LABEL}>العمر</label>
                      <input type="number" value={form.age} onChange={e => update('age', e.target.value)}
                        placeholder="عمرك" className={INPUT} id="reg-age" min="10" max="100" />
                    </div>
                    <div>
                      <label className={LABEL}>الجنس</label>
                      <select value={form.gender} onChange={e => update('gender', e.target.value)}
                        className={INPUT} id="reg-gender">
                        <option value="">اختر</option>
                        <option value="ذكر">ذكر</option>
                        <option value="أنثى">أنثى</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className={LABEL}>الولاية</label>
                    <select value={form.wilaya} onChange={e => update('wilaya', e.target.value)}
                      className={INPUT} id="reg-wilaya">
                      <option value="">اختر ولايتك</option>
                      {WILAYAS.map(w => <option key={w} value={w}>{w}</option>)}
                    </select>
                  </div>

                  <div className="p-3.5 rounded-xl text-xs leading-relaxed font-medium"
                    style={{ background: 'rgba(74,139,181,0.06)', border: '1px solid rgba(74,139,181,0.15)', color: '#2D5F7E' }}>
                    🔒 بياناتك محمية ولن تُشارك مع أي طرف ثالث
                  </div>
                </motion.div>
              )}

              {/* ─── Step 2 Specialist: Professional Info ─── */}
              {step === 2 && role === 'specialist' && (
                <motion.div key="step2s" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} className="space-y-4">
                  <div className="mb-5">
                    <h2 className="text-xl font-black text-slate-800" style={{ fontFamily: 'Cairo' }}>معلوماتك المهنية</h2>
                    <p className="text-slate-400 text-sm mt-1" style={{ fontFamily: 'Tajawal' }}>أخبرنا عن خبرتك ومجال تخصصك</p>
                  </div>

                  <div>
                    <label className={LABEL}>اللقب المهني</label>
                    <input value={form.title} onChange={e => update('title', e.target.value)}
                      placeholder="مثال: أخصائي نفسي إكلينيكي" className={INPUT} id="reg-title" />
                  </div>

                  <div>
                    <label className={LABEL}>سنوات الخبرة</label>
                    <input type="number" value={form.experience} onChange={e => update('experience', e.target.value)}
                      placeholder="عدد سنوات الخبرة" className={INPUT} id="reg-exp" min="0" />
                  </div>

                  <div>
                    <label className={LABEL}>التخصصات</label>
                    <div className="space-y-1.5 max-h-44 overflow-y-auto">
                      {SPECIALTIES.map(sp => (
                        <label key={sp} className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl cursor-pointer border transition-all ${form.specialty.includes(sp) ? 'border-[#4A8BB5]/40 bg-[#4A8BB5]/06' : 'border-slate-100 bg-slate-50 hover:border-slate-200'}`}>
                          <input type="checkbox" className="hidden"
                            checked={form.specialty.includes(sp)}
                            onChange={e => {
                              if (e.target.checked) update('specialty', [...form.specialty, sp]);
                              else update('specialty', form.specialty.filter(s => s !== sp));
                            }} />
                          <span className="flex-1 text-xs font-semibold text-slate-700" style={{ fontFamily: 'Tajawal' }}>{sp}</span>
                          {form.specialty.includes(sp) && <CheckCircle size={14} style={{ color: '#4A8BB5' }} />}
                        </label>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ─── Step 3 Specialist: Location & Pricing ─── */}
              {step === 3 && role === 'specialist' && (
                <motion.div key="step3s" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} className="space-y-4">
                  <div className="mb-5">
                    <h2 className="text-xl font-black text-slate-800" style={{ fontFamily: 'Cairo' }}>الموقع والأسعار</h2>
                    <p className="text-slate-400 text-sm mt-1" style={{ fontFamily: 'Tajawal' }}>آخر خطوة قبل إنشاء حسابك</p>
                  </div>

                  <div>
                    <label className={LABEL}>الولاية</label>
                    <select value={form.wilaya} onChange={e => update('wilaya', e.target.value)}
                      className={INPUT} id="reg-spec-wilaya">
                      <option value="">اختر ولايتك</option>
                      {WILAYAS.map(w => <option key={w} value={w}>{w}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className={LABEL}>سعر الجلسة (دج)</label>
                    <input type="number" value={form.price} onChange={e => update('price', e.target.value)}
                      placeholder="مثال: 3000" className={INPUT} id="reg-price" />
                  </div>

                  <div>
                    <label className={LABEL}>نبذة عنك</label>
                    <textarea value={form.bio} onChange={e => update('bio', e.target.value)}
                      placeholder="اكتب نبذة قصيرة عن خبرتك وأسلوبك العلاجي..."
                      className={`${INPUT} resize-none`} rows={4} id="reg-bio" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
                  className="flex items-center gap-2 p-3 rounded-xl text-xs font-semibold mt-4"
                  style={{ background: 'rgba(239,68,68,0.07)', color: '#dc2626', border: '1px solid rgba(239,68,68,0.15)' }}>
                  <AlertCircle size={13} /> {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex gap-3 mt-6">
              {step > 1 && (
                <button onClick={() => { setStep(s => s - 1); setError(''); }}
                  className="btn-secondary flex-1 py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-bold">
                  <ArrowRight size={15} /> السابق
                </button>
              )}
              {step < totalSteps ? (
                <button onClick={nextStep}
                  className="btn-primary flex-1 py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-bold">
                  التالي <ArrowLeft size={15} />
                </button>
              ) : (
                <motion.button onClick={handleSubmit} disabled={loading}
                  className="btn-primary flex-1 py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-bold"
                  whileHover={!loading ? { scale: 1.01 } : {}} whileTap={!loading ? { scale: 0.99 } : {}}>
                  {loading
                    ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    : <><CheckCircle size={15} /> إنشاء الحساب</>}
                </motion.button>
              )}
            </div>

            <p className="text-center mt-5 text-sm text-slate-400">
              لديك حساب بالفعل؟{' '}
              <Link href="/auth/login" className="font-bold" style={{ color: '#4A8BB5' }}>سجّل الدخول</Link>
            </p>
          </div>

          <div className="text-center mt-5">
            <Link href="/" className="text-xs text-slate-400 hover:text-slate-600 flex items-center justify-center gap-1 transition-colors">
              <ArrowLeft size={13} /> العودة للصفحة الرئيسية
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="min-h-screen gradient-hero flex items-center justify-center"><div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" /></div>}>
      <RegisterForm />
    </Suspense>
  );
}
