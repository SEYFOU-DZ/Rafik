'use client';

import { useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { 
  Brain, Eye, EyeOff, Mail, Lock, User, Phone, MapPin, 
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
    // Specialist only
    title: '', specialty: [] as string[], experience: '', bio: '', price: ''
  });

  const update = (k: string, v: any) => setForm(p => ({ ...p, [k]: v }));

  const totalSteps = role === 'specialist' ? 3 : 2;

  const validateStep = () => {
    if (step === 1) {
      if (!form.name || !form.email || !form.password || !form.confirmPassword) return 'يرجى ملء جميع الحقول';
      if (form.password.length < 6) return 'كلمة المرور يجب أن تكون 6 أحرف على الأقل';
      if (form.password !== form.confirmPassword) return 'كلمتا المرور غير متطابقتين';
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.email)) return 'البريد الإلكتروني غير صحيح';
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
      {/* Left decorative panel */}
      <div className="hidden lg:flex w-5/12 flex-col items-center justify-center p-12 relative">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-white" style={{ filter: 'blur(80px)' }} />
        </div>
        <motion.div className="relative z-10 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
          <div className="w-20 h-20 gradient-primary rounded-3xl flex items-center justify-center mx-auto mb-6 float shadow-2xl">
            <Brain size={40} className="text-white" />
          </div>
          <h1 className="text-3xl font-black text-white mb-3">انضم لعائلتنا</h1>
          <p className="text-white/70 text-base max-w-xs leading-relaxed">
            سجّل الآن وابدأ رحلتك نحو صحة نفسية أفضل مع رفيقك الذكي
          </p>

          {/* Role toggle */}
          <div className="mt-10 flex gap-3 justify-center">
            {(['patient', 'specialist'] as const).map(r => (
              <button
                key={r}
                onClick={() => { setRole(r); setStep(1); setError(''); }}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-sm transition-all ${
                  role === r ? 'bg-white text-[#2D5F7E] shadow-lg scale-105' : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                {r === 'patient' ? <><Heart size={14} /> زائر (مريض)</> : <><Award size={14} /> أخصائي</>}
              </button>
            ))}
          </div>

          {/* Progress indicator */}
          <div className="mt-10">
            <div className="flex items-center justify-center gap-3">
              {Array.from({ length: totalSteps }, (_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    step > i + 1 ? 'bg-[#7FB285] text-white' : step === i + 1 ? 'bg-white text-[#2D5F7E]' : 'bg-white/20 text-white/50'
                  }`}>
                    {step > i + 1 ? '✓' : i + 1}
                  </div>
                  {i < totalSteps - 1 && (
                    <div className={`w-8 h-0.5 ${step > i + 1 ? 'bg-[#7FB285]' : 'bg-white/20'}`} />
                  )}
                </div>
              ))}
            </div>
            <p className="text-white/60 text-xs mt-3">الخطوة {step} من {totalSteps}</p>
          </div>
        </motion.div>
      </div>

      {/* Form panel */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8 bg-[#F0F7FF] overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          {/* Mobile role selector */}
          <div className="lg:hidden flex gap-2 mb-6">
            {(['patient', 'specialist'] as const).map(r => (
              <button key={r} onClick={() => { setRole(r); setStep(1); setError(''); }}
                className={`flex-1 py-2.5 rounded-xl font-bold text-sm border-2 transition-all ${
                  role === r ? 'bg-[#4A8BB5] text-white border-[#4A8BB5]' : 'bg-white text-slate-500 border-slate-200'
                }`}>
                {r === 'patient' ? 'زائر' : 'أخصائي'}
              </button>
            ))}
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-100">
            <AnimatePresence mode="wait">
              {/* ── Step 1: Basic Info ── */}
              {step === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h2 className="text-2xl font-black text-slate-800 mb-1">إنشاء حساب جديد</h2>
                  <p className="text-slate-500 text-sm mb-6">
                    {role === 'patient' ? 'سجّل كزائر للوصول للخدمات النفسية' : 'سجّل كأخصائي نفسي وابدأ تقديم خدماتك'}
                  </p>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1.5">الاسم الكامل</label>
                      <div className="relative">
                        <User size={15} className="absolute top-3.5 right-3.5 text-slate-400" />
                        <input value={form.name} onChange={e => update('name', e.target.value)}
                          placeholder="أدخل اسمك الكامل" className="input-styled pr-9" id="reg-name" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1.5">البريد الإلكتروني</label>
                      <div className="relative">
                        <Mail size={15} className="absolute top-3.5 right-3.5 text-slate-400" />
                        <input type="email" value={form.email} onChange={e => update('email', e.target.value)}
                          placeholder="example@email.com" className="input-styled pr-9" id="reg-email" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1.5">رقم الهاتف</label>
                      <div className="relative">
                        <Phone size={15} className="absolute top-3.5 right-3.5 text-slate-400" />
                        <input value={form.phone} onChange={e => update('phone', e.target.value)}
                          placeholder="05XX XXX XXX" className="input-styled pr-9" id="reg-phone" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1.5">كلمة المرور</label>
                      <div className="relative">
                        <Lock size={15} className="absolute top-3.5 right-3.5 text-slate-400" />
                        <input type={showPass ? 'text' : 'password'} value={form.password}
                          onChange={e => update('password', e.target.value)}
                          placeholder="6 أحرف على الأقل" className="input-styled pr-9 pl-9" id="reg-pass" />
                        <button type="button" onClick={() => setShowPass(!showPass)}
                          className="absolute top-3 left-3 text-slate-400 hover:text-slate-600">
                          {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1.5">تأكيد كلمة المرور</label>
                      <div className="relative">
                        <Lock size={15} className="absolute top-3.5 right-3.5 text-slate-400" />
                        <input type="password" value={form.confirmPassword}
                          onChange={e => update('confirmPassword', e.target.value)}
                          placeholder="أعد كتابة كلمة المرور" className="input-styled pr-9" id="reg-confirm" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ── Step 2 for Patient: Personal Info ── */}
              {step === 2 && role === 'patient' && (
                <motion.div key="step2p" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h2 className="text-2xl font-black text-slate-800 mb-1">معلوماتك الشخصية</h2>
                  <p className="text-slate-500 text-sm mb-6">تساعدنا هذه المعلومات على تقديم خدمة أفضل لك</p>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1.5">العمر</label>
                        <input type="number" value={form.age} onChange={e => update('age', e.target.value)}
                          placeholder="عمرك" className="input-styled" id="reg-age" min="10" max="100" />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1.5">الجنس</label>
                        <select value={form.gender} onChange={e => update('gender', e.target.value)}
                          className="input-styled" id="reg-gender">
                          <option value="">اختر</option>
                          <option value="ذكر">ذكر</option>
                          <option value="أنثى">أنثى</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1.5">الولاية</label>
                      <div className="relative">
                        <MapPin size={15} className="absolute top-3.5 right-3.5 text-slate-400" />
                        <select value={form.wilaya} onChange={e => update('wilaya', e.target.value)}
                          className="input-styled pr-9" id="reg-wilaya">
                          <option value="">اختر ولايتك</option>
                          {WILAYAS.map(w => <option key={w} value={w}>{w}</option>)}
                        </select>
                      </div>
                    </div>
                    <div className="p-4 rounded-2xl" style={{ background: 'rgba(74,139,181,0.06)', border: '1px solid rgba(74,139,181,0.15)' }}>
                      <p className="text-xs text-[#2D5F7E] font-semibold leading-relaxed">
                        🔒 بياناتك محمية بالكامل ولن تُشارك مع أي طرف ثالث. سيتم استخدامها فقط لتحسين خدمتك.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ── Step 2 for Specialist: Professional Info ── */}
              {step === 2 && role === 'specialist' && (
                <motion.div key="step2s" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h2 className="text-2xl font-black text-slate-800 mb-1">معلوماتك المهنية</h2>
                  <p className="text-slate-500 text-sm mb-6">أخبرنا عن خبرتك ومجال تخصصك</p>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1.5">اللقب المهني</label>
                      <input value={form.title} onChange={e => update('title', e.target.value)}
                        placeholder="مثال: أخصائي نفسي إكلينيكي" className="input-styled" id="reg-title" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1.5">سنوات الخبرة</label>
                      <input type="number" value={form.experience} onChange={e => update('experience', e.target.value)}
                        placeholder="عدد سنوات الخبرة" className="input-styled" id="reg-exp" min="0" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1.5">تخصصاتك (اختر واحداً أو أكثر)</label>
                      <div className="grid grid-cols-1 gap-2 max-h-40 overflow-y-auto pr-1">
                        {SPECIALTIES.map(sp => (
                          <label key={sp} className={`radio-option cursor-pointer ${form.specialty.includes(sp) ? 'selected' : ''}`}>
                            <input type="checkbox" className="hidden"
                              checked={form.specialty.includes(sp)}
                              onChange={e => {
                                if (e.target.checked) update('specialty', [...form.specialty, sp]);
                                else update('specialty', form.specialty.filter(s => s !== sp));
                              }} />
                            <span className="flex-1 text-sm font-semibold text-slate-700">{sp}</span>
                            {form.specialty.includes(sp) && <CheckCircle size={16} style={{ color: '#4A8BB5' }} />}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ── Step 3 for Specialist: Location & Pricing ── */}
              {step === 3 && role === 'specialist' && (
                <motion.div key="step3s" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h2 className="text-2xl font-black text-slate-800 mb-1">الموقع والأسعار</h2>
                  <p className="text-slate-500 text-sm mb-6">آخر خطوة قبل إنشاء حسابك</p>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1.5">الولاية</label>
                      <select value={form.wilaya} onChange={e => update('wilaya', e.target.value)}
                        className="input-styled" id="reg-spec-wilaya">
                        <option value="">اختر ولايتك</option>
                        {WILAYAS.map(w => <option key={w} value={w}>{w}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1.5">سعر الجلسة (دج)</label>
                      <input type="number" value={form.price} onChange={e => update('price', e.target.value)}
                        placeholder="مثال: 3000" className="input-styled" id="reg-price" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1.5">نبذة عنك</label>
                      <textarea value={form.bio} onChange={e => update('bio', e.target.value)}
                        placeholder="اكتب نبذة قصيرة عن خبرتك وأسلوبك العلاجي..."
                        className="input-styled resize-none" rows={4} id="reg-bio" />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center gap-2 p-3 rounded-xl text-sm font-semibold mt-4"
                  style={{ background: 'rgba(239,68,68,0.08)', color: '#dc2626' }}>
                  <AlertCircle size={14} />{error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation buttons */}
            <div className="flex gap-3 mt-6">
              {step > 1 && (
                <button onClick={() => { setStep(s => s - 1); setError(''); }}
                  className="btn-secondary flex-1 py-3 rounded-xl flex items-center justify-center gap-2">
                  <ArrowRight size={16} /> السابق
                </button>
              )}
              {step < totalSteps ? (
                <button onClick={nextStep}
                  className="btn-primary flex-1 py-3 rounded-xl flex items-center justify-center gap-2">
                  التالي <ArrowLeft size={16} />
                </button>
              ) : (
                <motion.button onClick={handleSubmit} disabled={loading}
                  className="btn-primary flex-1 py-3 rounded-xl flex items-center justify-center gap-2"
                  whileHover={!loading ? { scale: 1.02 } : {}} whileTap={!loading ? { scale: 0.98 } : {}}>
                  {loading
                    ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    : <><CheckCircle size={16} /> إنشاء الحساب</>}
                </motion.button>
              )}
            </div>

            <p className="text-center mt-4 text-sm text-slate-500">
              لديك حساب بالفعل؟{' '}
              <Link href="/auth/login" className="font-bold" style={{ color: '#4A8BB5' }}>سجّل الدخول</Link>
            </p>
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
