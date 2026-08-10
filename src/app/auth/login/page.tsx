'use client';

import { useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Brain, Eye, EyeOff, ArrowLeft, AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { setError('يرجى ملء جميع الحقول'); return; }
    setLoading(true);
    setError('');
    await new Promise(r => setTimeout(r, 800));
    const result = login(email, password);
    setLoading(false);
    if (result.success) {
      if (result.role === 'specialist') router.push('/dashboard/specialist');
      else router.push('/dashboard/patient');
    } else {
      setError(result.error || 'حدث خطأ');
    }
  };

  const fillDemo = (type: 'patient' | 'specialist') => {
    if (type === 'patient') { setEmail('ahmed@test.dz'); setPassword('patient123'); }
    else { setEmail('amal@rafiq.dz'); setPassword('specialist123'); }
  };

  return (
    <div className="min-h-screen flex gradient-hero relative overflow-hidden">
      {/* Decorative side — desktop only */}
      <div className="hidden lg:flex w-1/2 flex-col items-center justify-center p-12 relative">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-white" style={{ filter: 'blur(80px)' }} />
          <div className="absolute bottom-20 left-20 w-48 h-48 rounded-full bg-[#7FB285]" style={{ filter: 'blur(60px)' }} />
        </div>
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 text-center"
        >
          <div className="w-20 h-20 gradient-primary rounded-3xl flex items-center justify-center mx-auto mb-7 shadow-2xl float">
            <Brain size={42} className="text-white" />
          </div>
          <h1 className="text-4xl font-black text-white mb-3" style={{ fontFamily: 'Cairo' }}>رفيقك الذكي</h1>
          <p className="text-white/65 text-base max-w-xs leading-relaxed" style={{ fontFamily: 'Tajawal' }}>
            منصتك الموثوقة للحصول على أفضل خدمات الصحة النفسية في الجزائر
          </p>
          <div className="mt-8 space-y-3">
            {['أخصائيون نفسيون معتمدون', 'صناديق علاجية حصرية', 'سرية تامة وأمان'].map(f => (
              <div key={f} className="flex items-center gap-3 text-white/75">
                <div className="w-5 h-5 rounded-full bg-[#7FB285]/80 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span className="font-semibold text-sm" style={{ fontFamily: 'Tajawal' }}>{f}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Form side */}
      <div className="flex-1 flex items-center justify-center p-5 sm:p-8" style={{ background: '#F4F8FC' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-sm"
        >
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-7 justify-center">
            <div className="w-11 h-11 gradient-primary rounded-xl flex items-center justify-center shadow-lg">
              <Brain size={24} className="text-white" />
            </div>
            <span className="text-xl font-black text-slate-800" style={{ fontFamily: 'Cairo' }}>رفيقك الذكي</span>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200/70 p-7">
            <h2 className="text-xl font-black text-slate-800 mb-1" style={{ fontFamily: 'Cairo' }}>تسجيل الدخول</h2>
            <p className="text-slate-400 text-sm mb-6" style={{ fontFamily: 'Tajawal' }}>أدخل بياناتك للوصول إلى حسابك</p>

            {/* Demo quick-fill */}
            <div className="flex gap-2 mb-5">
              <button onClick={() => fillDemo('patient')}
                className="flex-1 text-xs py-2 px-3 rounded-lg font-bold transition-all"
                style={{ background: 'rgba(127,178,133,0.1)', color: '#4a7d50', border: '1px solid rgba(127,178,133,0.3)' }}>
                تجربة كمريض
              </button>
              <button onClick={() => fillDemo('specialist')}
                className="flex-1 text-xs py-2 px-3 rounded-lg font-bold transition-all"
                style={{ background: 'rgba(74,139,181,0.1)', color: '#2D5F7E', border: '1px solid rgba(74,139,181,0.3)' }}>
                تجربة كأخصائي
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wide">
                  البريد الإلكتروني
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="example@email.com"
                  id="login-email"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm placeholder:text-slate-300 outline-none transition-all focus:border-[#4A8BB5] focus:bg-white focus:ring-2 focus:ring-[#4A8BB5]/15"
                  style={{ fontFamily: 'Tajawal', direction: 'ltr', textAlign: 'left' }}
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wide">
                  كلمة المرور
                </label>
                <div className="relative">
                  <input
                    type={showPass ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    id="login-password"
                    className="w-full px-4 py-3 pl-11 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm placeholder:text-slate-300 outline-none transition-all focus:border-[#4A8BB5] focus:bg-white focus:ring-2 focus:ring-[#4A8BB5]/15"
                    style={{ fontFamily: 'Tajawal', direction: 'ltr', textAlign: 'left' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute top-1/2 -translate-y-1/2 left-3.5 text-slate-300 hover:text-slate-500 transition-colors"
                  >
                    {showPass ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
              </div>

              {/* Error */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="flex items-center gap-2 p-3 rounded-xl text-xs font-semibold"
                    style={{ background: 'rgba(239,68,68,0.07)', color: '#dc2626', border: '1px solid rgba(239,68,68,0.15)' }}
                  >
                    <AlertCircle size={13} />
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button
                type="submit"
                disabled={loading}
                className="btn-primary w-full py-3 flex items-center justify-center gap-2 rounded-xl text-sm font-bold mt-1"
                whileHover={!loading ? { scale: 1.01 } : {}}
                whileTap={!loading ? { scale: 0.99 } : {}}
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>تسجيل الدخول <ArrowLeft size={15} /></>
                )}
              </motion.button>
            </form>

            <p className="text-center mt-5 text-sm text-slate-400">
              ليس لديك حساب؟{' '}
              <Link href="/auth/register" className="font-bold" style={{ color: '#4A8BB5' }}>
                سجّل الآن
              </Link>
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

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen gradient-hero flex items-center justify-center"><div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" /></div>}>
      <LoginForm />
    </Suspense>
  );
}
