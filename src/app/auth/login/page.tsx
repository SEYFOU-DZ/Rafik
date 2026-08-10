'use client';

import { useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Brain, Eye, EyeOff, Mail, Lock, ArrowLeft, AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
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
      {/* Decorative side */}
      <div className="hidden lg:flex w-1/2 flex-col items-center justify-center p-12 relative">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-white" style={{ filter: 'blur(80px)' }} />
          <div className="absolute bottom-20 left-20 w-48 h-48 rounded-full bg-[#7FB285]" style={{ filter: 'blur(60px)' }} />
        </div>
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center"
        >
          <div className="w-24 h-24 gradient-primary rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl float">
            <Brain size={48} className="text-white" />
          </div>
          <h1 className="text-4xl font-black text-white mb-4">رفيقك الذكي</h1>
          <p className="text-white/70 text-lg max-w-sm leading-relaxed">
            منصتك الموثوقة للحصول على أفضل خدمات الصحة النفسية في الجزائر
          </p>
          <div className="mt-10 space-y-4">
            {['أخصائيون نفسيون معتمدون', 'صناديق علاجية حصرية', 'سرية تامة وأمان'].map(f => (
              <div key={f} className="flex items-center gap-3 text-white/80">
                <div className="w-5 h-5 rounded-full bg-[#7FB285] flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span className="font-semibold">{f}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Form side */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8 bg-[#F0F7FF]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
            <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center">
              <Brain size={28} className="text-white" />
            </div>
            <h1 className="text-2xl font-black text-slate-800">رفيقك الذكي</h1>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-100">
            <h2 className="text-2xl font-black text-slate-800 mb-2">مرحباً بعودتك 👋</h2>
            <p className="text-slate-500 mb-6 text-sm">سجّل الدخول للوصول إلى حسابك</p>

            {/* Demo buttons */}
            <div className="flex gap-2 mb-6">
              <button onClick={() => fillDemo('patient')}
                className="flex-1 text-xs py-2 px-3 rounded-xl font-bold transition-all border-2"
                style={{ borderColor: '#7FB285', color: '#4a7d50', background: 'rgba(127,178,133,0.08)' }}>
                💚 تجربة كزائر
              </button>
              <button onClick={() => fillDemo('specialist')}
                className="flex-1 text-xs py-2 px-3 rounded-xl font-bold transition-all border-2"
                style={{ borderColor: '#4A8BB5', color: '#2D5F7E', background: 'rgba(74,139,181,0.08)' }}>
                💙 تجربة كأخصائي
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">البريد الإلكتروني</label>
                <div className="relative">
                  <Mail size={16} className="absolute top-3.5 right-3.5 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="example@email.com"
                    className="input-styled pr-10"
                    id="login-email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">كلمة المرور</label>
                <div className="relative">
                  <Lock size={16} className="absolute top-3.5 right-3.5 text-slate-400" />
                  <input
                    type={showPass ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="input-styled pr-10 pl-10"
                    id="login-password"
                  />
                  <button type="button" onClick={() => setShowPass(!showPass)}
                    className="absolute top-3 left-3 text-slate-400 hover:text-slate-600">
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-center gap-2 p-3 rounded-xl text-sm font-semibold"
                    style={{ background: 'rgba(239,68,68,0.08)', color: '#dc2626' }}
                  >
                    <AlertCircle size={14} />
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button
                type="submit"
                disabled={loading}
                className="btn-primary w-full py-3.5 flex items-center justify-center gap-2 rounded-xl"
                whileHover={!loading ? { scale: 1.02 } : {}}
                whileTap={!loading ? { scale: 0.98 } : {}}
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>تسجيل الدخول <ArrowLeft size={16} /></>
                )}
              </motion.button>
            </form>

            <p className="text-center mt-6 text-sm text-slate-500">
              ليس لديك حساب؟{' '}
              <Link href="/auth/register" className="font-bold" style={{ color: '#4A8BB5' }}>
                سجّل الآن
              </Link>
            </p>
          </div>

          <div className="text-center mt-6">
            <Link href="/" className="text-sm text-slate-400 hover:text-slate-600 flex items-center justify-center gap-1">
              <ArrowLeft size={14} /> العودة للصفحة الرئيسية
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
