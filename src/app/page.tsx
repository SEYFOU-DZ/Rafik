'use client';

import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Brain, Heart, Calendar, Shield, Star, ChevronDown, 
  ArrowLeft, CheckCircle, Users, Award, Sparkles,
  MessageCircle, Clock, MapPin, Phone, Mail, 
  TrendingUp, Lock, Zap, BookOpen
} from 'lucide-react';

// ─── Monochrome Stickers (inline, re-used from boxes page) ───────────────────
function AnxiSticker() {
  return (
    <svg className="w-16 h-16" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="46" fill="white" stroke="#1e293b" strokeWidth="4"/>
      <circle cx="50" cy="50" r="40" fill="none" stroke="#1e293b" strokeWidth="1" strokeDasharray="3 3"/>
      <path d="M38 50 C38 42, 44 36, 50 36 C56 36, 62 42, 62 50 C62 58, 56 64, 50 64 C44 64, 38 58, 38 50 Z" stroke="#1e293b" strokeWidth="2.5" fill="none"/>
      <path d="M50 36 C50 42, 50 58, 50 64" stroke="#1e293b" strokeWidth="2" fill="none"/>
      <path d="M44 42 C46 44, 48 44, 48 42 M56 42 C54 44, 52 44, 52 42" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <path d="M46 54 Q48 57, 50 57 Q52 57, 54 54" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" fill="none"/>
    </svg>
  );
}
function OcdStickerLanding() {
  return (
    <svg className="w-16 h-16" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="46" fill="white" stroke="#1e293b" strokeWidth="4"/>
      <circle cx="50" cy="50" r="40" fill="none" stroke="#1e293b" strokeWidth="1" strokeDasharray="3 3"/>
      <rect x="36" y="36" width="28" height="28" stroke="#1e293b" strokeWidth="2.5" rx="3" fill="none"/>
      <rect x="42" y="42" width="16" height="16" stroke="#1e293b" strokeWidth="1.5" rx="1.5" fill="none"/>
      <path d="M50 24 L50 32 M50 68 L50 76 M24 50 L32 50 M68 50 L76 50" stroke="#1e293b" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}
function DepStickerLanding() {
  return (
    <svg className="w-16 h-16" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="46" fill="white" stroke="#1e293b" strokeWidth="4"/>
      <circle cx="50" cy="50" r="40" fill="none" stroke="#1e293b" strokeWidth="1" strokeDasharray="3 3"/>
      <path d="M35 52 C30 52, 28 46, 33 42 C31 36, 38 30, 46 33 C49 26, 61 26, 64 33 C70 30, 74 36, 72 42 C76 46, 74 52, 69 52 Z" fill="none" stroke="#1e293b" strokeWidth="2.5" strokeLinejoin="round"/>
      <path d="M42 60 L40 66 M50 62 L48 68 M58 60 L56 66" stroke="#1e293b" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}
// ──────────────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: 'الرئيسية', href: '#home' },
  { label: 'كيف يعمل', href: '#how' },
  { label: 'خدماتنا', href: '#services' },
  { label: 'آراء المستخدمين', href: '#testimonials' },
  { label: 'اتصل بنا', href: '#contact' },
];

const FEATURES = [
  { icon: Calendar, title: 'حجز مواعيد فوري', desc: 'احجز موعدك مع أي أخصائي في ثوانٍ', color: '#4A8BB5' },
  { icon: Brain, title: 'الصناديق النفسية', desc: 'أدوات علاجية حصرية للمرضى والأخصائيين', color: '#7FB285' },
  { icon: Shield, title: 'سرية تامة', desc: 'بياناتك مشفرة وخصوصيتك محمية بالكامل', color: '#E8A87C' },
  { icon: Heart, title: 'دعم متواصل', desc: 'نصائح وإرشادات مخصصة لحالتك', color: '#4A8BB5' },
  { icon: Award, title: 'أخصائيون معتمدون', desc: 'جميع أخصائيينا حاصلون على شهادات معتمدة', color: '#7FB285' },
  { icon: Zap, title: 'استبيانات ذكية', desc: 'قيّم حالتك واحصل على توصيات مخصصة', color: '#E8A87C' },
];

const STEPS = [
  { num: '01', title: 'سجّل حسابك', desc: 'أنشئ حسابك كزائر أو كأخصائي في دقيقة واحدة' },
  { num: '02', title: 'أجرِ تقييمك', desc: 'أجب على استبياننا النفسي للحصول على صورة واضحة عن حالتك' },
  { num: '03', title: 'اختر أخصائيك', desc: 'تصفح قائمة أخصائيينا المعتمدين واختر المناسب لك' },
  { num: '04', title: 'ابدأ رحلة التعافي', desc: 'احجز موعدك واستفد من الصناديق النفسية الحصرية' },
];

const TESTIMONIALS = [
  {
    name: 'سارة م.',
    city: 'الجزائر العاصمة',
    text: 'المنصة غيّرت حياتي. وجدت أخصائية رائعة وبدأت العلاج في نفس الأسبوع. الصندوق النفسي مفيد جداً.',
    rating: 5,
    avatar: 'سم',
    color: '#4A8BB5'
  },
  {
    name: 'كريم ب.',
    city: 'وهران',
    text: 'أخيراً منصة جزائرية جادة للصحة النفسية! سهلة الاستخدام ومصممة باحترافية عالية.',
    rating: 5,
    avatar: 'كب',
    color: '#7FB285'
  },
  {
    name: 'نادية ح.',
    city: 'قسنطينة',
    text: 'الاستبيان النفسي دقيق جداً وساعدني على فهم حالتي. أنصح كل شخص يعاني بتجربة المنصة.',
    rating: 5,
    avatar: 'نح',
    color: '#E8A87C'
  },
];

const STATS = [
  { num: '500+', label: 'زائر مسجّل' },
  { num: '50+', label: 'أخصائي معتمد' },
  { num: '1200+', label: 'جلسة علاجية' },
  { num: '98%', label: 'رضا المستخدمين' },
];

// Animated particle component
function Particle({ delay, x, size }: { delay: number; x: number; size: number }) {
  return (
    <motion.div
      className="absolute bottom-0 rounded-full opacity-20 pointer-events-none"
      style={{
        left: `${x}%`,
        width: size,
        height: size,
        background: 'rgba(127, 178, 133, 0.6)',
      }}
      animate={{
        y: [0, -800],
        opacity: [0, 0.4, 0.2, 0],
        rotate: [0, 360],
      }}
      transition={{
        duration: 12 + Math.random() * 8,
        delay,
        repeat: Infinity,
        ease: 'linear',
      }}
    />
  );
}

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const particles = Array.from({ length: 15 }, (_, i) => ({
    delay: i * 0.8,
    x: Math.random() * 100,
    size: 4 + Math.random() * 12,
  }));

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* ─── Navbar ─── */}
      <motion.nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled ? 'glass shadow-lg py-3' : 'py-5'
        }`}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <Brain size={22} className="text-white" />
            </div>
            <div className="flex flex-col justify-center">
              <p className="font-black text-base leading-tight" style={{ color: scrolled ? '#2D5F7E' : 'white', fontFamily: 'Cairo' }}>
                رفيقك الذكي
              </p>
              <p className="text-[10px] leading-tight mt-0.5" style={{ color: scrolled ? '#94a3b8' : 'rgba(255,255,255,0.55)', fontFamily: 'Tajawal' }}>
                منصة الصحة النفسية
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map(link => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold transition-colors hover:opacity-80`}
                style={{ color: scrolled ? '#2D5F7E' : 'white', fontFamily: 'Tajawal' }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Auth Buttons — Only Login */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/auth/login">
              <button className={`text-xs font-bold px-5 py-2.5 rounded-xl transition-all ${
                scrolled 
                  ? 'text-[#2D5F7E] border-2 border-[#4A8BB5] hover:bg-[#4A8BB5] hover:text-white' 
                  : 'text-white border-2 border-white/40 hover:bg-white/20'
              }`} style={{ fontFamily: 'Cairo' }}>
                تسجيل الدخول
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <div className={`space-y-1.5 ${menuOpen ? 'hidden' : 'block'}`}>
              <span className={`block w-6 h-0.5 ${scrolled ? 'bg-slate-700' : 'bg-white'}`}></span>
              <span className={`block w-6 h-0.5 ${scrolled ? 'bg-slate-700' : 'bg-white'}`}></span>
              <span className={`block w-6 h-0.5 ${scrolled ? 'bg-slate-700' : 'bg-white'}`}></span>
            </div>
            {menuOpen && <span className={`text-xl ${scrolled ? 'text-slate-700' : 'text-white'}`}>✕</span>}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="lg:hidden glass border-t border-white/20 mt-3"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="px-4 py-4 space-y-3">
                {NAV_LINKS.map(link => (
                  <a key={link.href} href={link.href} className="block text-slate-700 font-semibold py-2"
                    style={{ fontFamily: 'Tajawal' }}
                    onClick={() => setMenuOpen(false)}>
                    {link.label}
                  </a>
                ))}
                <div className="flex flex-col gap-2 pt-3">
                  <Link href="/auth/login" className="w-full">
                    <button className="w-full btn-secondary text-sm py-2.5 rounded-xl" style={{ fontFamily: 'Cairo' }}>تسجيل الدخول</button>
                  </Link>
                  <Link href="/auth/register?role=patient" className="w-full">
                    <button className="w-full btn-primary text-sm py-2.5 rounded-xl" style={{ fontFamily: 'Cairo' }}>سجل كزائر (مريض)</button>
                  </Link>
                  <Link href="/auth/register?role=specialist" className="w-full">
                    <button className="w-full btn-secondary text-sm py-2.5 rounded-xl" style={{ fontFamily: 'Cairo' }}>سجل كأخصائي</button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* ─── Hero Section ─── */}
      <section id="home" ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden gradient-hero">
        {/* Particles */}
        {particles.map((p, i) => (
          <Particle key={i} {...p} />
        ))}

        {/* Decorative circles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, #4A8BB5, transparent)' }}
            animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, #7FB285, transparent)' }}
            animate={{ scale: [1.2, 1, 1.2], rotate: [360, 180, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-5 border border-white" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5 border border-white" />
        </div>

        {/* Hero Content — clean, simple, centered */}
        <div className="relative z-10 w-full max-w-2xl mx-auto px-6 text-center flex flex-col items-center gap-8">

          {/* Main heading — clean white, no animated colors */}
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-snug"
            style={{ fontFamily: 'Cairo' }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.7 }}
          >
            رفيقك الذكي
            <br />
            <span className="text-white/70 font-semibold text-2xl sm:text-3xl">في رحلة التعافي</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-sm sm:text-base text-white/60 max-w-md mx-auto leading-relaxed -mt-4"
            style={{ fontFamily: 'Tajawal' }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            منصة آمنة تربطك بأفضل الأخصائيين النفسيين المعتمدين. سجّل وابدأ رحلتك.
          </motion.p>

          {/* Two registration buttons — modest, clean */}
          <motion.div
            className="flex flex-row gap-3 w-full max-w-xs sm:max-w-sm mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <Link href="/auth/register?role=patient" className="flex-1">
              <motion.button
                className="w-full py-3.5 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2"
                style={{
                  background: 'rgba(127,178,133,0.85)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(127,178,133,0.6)',
                  fontFamily: 'Cairo'
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Heart size={16} />
                <span>أنا مريض</span>
              </motion.button>
            </Link>

            <Link href="/auth/register?role=specialist" className="flex-1">
              <motion.button
                className="w-full py-3.5 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2"
                style={{
                  background: 'rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255,255,255,0.35)',
                  fontFamily: 'Cairo'
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Award size={16} />
                <span>أنا أخصائي</span>
              </motion.button>
            </Link>
          </motion.div>

          {/* Minimal trust line */}
          <motion.p
            className="text-white/35 text-xs"
            style={{ fontFamily: 'Tajawal' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75 }}
          >
            تسجيل مجاني · أخصائيون معتمدون · سرية تامة
          </motion.p>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown size={28} className="text-white/40" />
        </motion.div>
      </section>

      {/* ─── Stats Section ─── */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="text-4xl md:text-5xl font-black gradient-text mb-2">{stat.num}</div>
                <div className="text-sm text-slate-500 font-semibold">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Features Section ─── */}
      <section id="services" className="py-24 px-4 sm:px-6" style={{ background: '#F0F7FF' }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="badge badge-primary text-sm mb-4 px-4 py-2">خدماتنا</span>
            <h2 className="text-3xl md:text-5xl font-black text-slate-800 mb-4">
              كل ما تحتاجه في مكان واحد
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              منصة رفيقك الذكي تجمع أحدث الأدوات الرقمية للصحة النفسية في واجهة بسيطة وسهلة الاستخدام
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feat, i) => (
              <motion.div
                key={feat.title}
                className="card-hover bg-white rounded-2xl p-6 shadow-sm border border-slate-100"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${feat.color}20` }}>
                  <feat.icon size={24} style={{ color: feat.color }} />
                </div>
                <h3 className="text-lg font-black text-slate-800 mb-2">{feat.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── How it works ─── */}
      <section id="how" className="py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="badge badge-sage text-sm mb-4 px-4 py-2">كيف يعمل</span>
            <h2 className="text-3xl md:text-5xl font-black text-slate-800 mb-4">
              ابدأ رحلتك في 4 خطوات
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                className="text-center relative"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                {i < STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-0 w-full h-0.5 bg-gradient-to-l from-[#4A8BB5] to-[#d8e8f0] z-0" />
                )}
                <div className="relative z-10 w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4 shadow-lg"
                  style={{ boxShadow: '0 8px 25px rgba(74,139,181,0.35)' }}>
                  <span className="text-2xl font-black text-white">{step.num}</span>
                </div>
                <h3 className="text-lg font-black text-slate-800 mb-2">{step.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Boxes Preview ─── */}
      <section className="py-24 px-4 sm:px-6 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-white" style={{ filter: 'blur(80px)' }} />
          <div className="absolute bottom-10 left-10 w-48 h-48 rounded-full bg-[#7FB285]" style={{ filter: 'blur(60px)' }} />
        </div>
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-2 rounded-full text-sm font-bold mb-4"
              style={{ background: 'rgba(232,168,124,0.25)', color: '#f5c99a', border: '1px solid rgba(232,168,124,0.4)' }}>
              🌟 أبرز ميزاتنا
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
              الصناديق النفسية الحصرية
            </h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              أدوات علاجية متكاملة مصممة من قبل خبراء. لكل حالة نفسية صندوق خاص يحتوي على كل ما تحتاجه.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {([
              { id: 'anxiety', sticker: <AnxiSticker />, name: 'صندوق القلق', price: '1500 دج', gradient: 'linear-gradient(135deg, #4A8BB5 0%, #2D5F7E 100%)', items: ['5 كتب علاجية', 'بطاقات تأريض تفاعلية', 'ورقة عمل كاملة', 'أدوات تقييم معيارية'] },
              { id: 'ocd', sticker: <OcdStickerLanding />, name: 'صندوق الوسواس القهري', price: '1200 دج', gradient: 'linear-gradient(135deg, #7FB285 0%, #2D5F7E 100%)', items: ['كتيب فهم الوسواس والبروتوكول', 'بطاقات علاج التعرض ERP', 'أدوات تتبع السلوك', 'مقياس Y-BOCS تفاعلي'] },
              { id: 'dep', sticker: <DepStickerLanding />, name: 'صندوق الاكتئاب', price: '1500 دج', gradient: 'linear-gradient(135deg, #E8A87C 0%, #2D5F7E 100%)', items: ['4 كتب ومراجعات علاجية', 'بطاقات التنشيط السلوكي', 'مخطط التقييم اليومي', 'مقياس PHQ-9'] },
            ] as const).map((box, i) => (
              <motion.div
                key={box.id}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                whileHover={{ y: -5 }}
              >
                {/* Box lid — platform gradient with sticker */}
                <div className="h-36 flex items-center justify-center relative overflow-hidden" style={{ background: box.gradient }}>
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full border border-white" />
                    <div className="absolute -bottom-6 -left-6 w-20 h-20 rounded-full border border-white" />
                  </div>
                  <motion.div
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 3 + i * 0.5, repeat: Infinity }}
                    className="relative z-10 p-1.5 rounded-full bg-white shadow-md border border-black/10 transition-transform group-hover:scale-105"
                  >
                    {box.sticker}
                  </motion.div>
                </div>

                {/* Box body */}
                <div className="p-5">
                  <h3 className="text-sm font-black text-slate-800 mb-1" style={{ fontFamily: 'Cairo' }}>{box.name}</h3>
                  <div className="text-lg font-black mb-3" style={{ color: '#2D5F7E', fontFamily: 'Cairo' }}>{box.price}</div>
                  <ul className="space-y-1.5 text-right">
                    {box.items.map(item => (
                      <li key={item} className="flex items-center gap-2 text-xs text-slate-600 font-semibold" style={{ fontFamily: 'Tajawal' }}>
                        <CheckCircle size={11} className="text-[#7FB285] flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/auth/register?role=patient">
              <motion.button
                className="px-8 py-3.5 rounded-xl font-bold text-base text-white"
                style={{ background: 'linear-gradient(135deg, #2D5F7E, #4A8BB5)', boxShadow: '0 8px 24px rgba(45,95,126,0.3)', fontFamily: 'Cairo' }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                اكتشف الصناديق بالمنصة
              </motion.button>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Testimonials ─── */}
      <section id="testimonials" className="py-24 px-4 sm:px-6" style={{ background: '#F0F7FF' }}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="badge badge-peach text-sm mb-4 px-4 py-2">آراء المستخدمين</span>
            <h2 className="text-3xl md:text-5xl font-black text-slate-800">ماذا يقول مستخدمونا؟</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 card-hover"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center font-black text-white text-sm"
                    style={{ background: t.color }}>
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-black text-slate-800">{t.name}</div>
                    <div className="text-xs text-slate-400 flex items-center gap-1">
                      <MapPin size={10} /> {t.city}
                    </div>
                  </div>
                  <div className="mr-auto flex">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <span key={j} className="star">★</span>
                    ))}
                  </div>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">{t.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA Section ─── */}
      <section className="py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="rounded-2xl p-10 md:p-14 relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #2D5F7E, #4A8BB5)' }}
          >
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-white" style={{ filter: 'blur(50px)' }} />
              <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-[#7FB285]" style={{ filter: 'blur(50px)' }} />
            </div>
            <div className="relative z-10">
              <div className="text-4xl mb-4">🌟</div>
              <h2 className="text-2xl md:text-3xl font-black text-white mb-3" style={{ fontFamily: 'Cairo' }}>
                ابدأ رحلتك للراحة النفسية الآن
              </h2>
              <p className="text-white/80 text-base mb-6 max-w-xl mx-auto" style={{ fontFamily: 'Tajawal' }}>
                انضم إلى المنصة في دقائق معدودة، قيّم حالتك النفسية مجاناً وابدأ تصفح أفضل الأدوات العلاجية المخصصة في الجزائر.
              </p>
              <div className="flex justify-center">
                <Link href="/auth/register?role=patient">
                  <motion.button
                    className="px-8 py-3.5 rounded-xl font-bold text-base text-[#2D5F7E]"
                    style={{ background: 'white', boxShadow: '0 8px 24px rgba(0,0,0,0.15)', fontFamily: 'Cairo' }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    ابدأ رحلتك مجاناً
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Contact ─── */}
      <section id="contact" className="py-16 px-4 sm:px-6 gradient-hero">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { icon: Phone, label: 'اتصل بنا', value: '+213 555 000 111' },
              { icon: Mail, label: 'البريد الإلكتروني', value: 'contact@rafiq.dz' },
              { icon: MapPin, label: 'العنوان', value: 'الجزائر العاصمة، الجزائر' },
            ].map(item => (
              <div key={item.label} className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                  <item.icon size={20} className="text-white/80" />
                </div>
                <div className="text-white/60 text-sm">{item.label}</div>
                <div className="text-white font-bold">{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="py-8 px-4 sm:px-6 bg-[#0f1e2b] text-white/50">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <Brain size={16} className="text-white" />
            </div>
            <span className="font-black text-white/80">رفيقك الذكي</span>
          </div>
          <p className="text-sm text-center">
            © 2026 رفيقك الذكي. جميع الحقوق محفوظة. | منصة متخصصة في الصحة النفسية للجزائريين
          </p>
          <div className="flex gap-4 text-sm">
            <a href="#" className="hover:text-white transition-colors">سياسة الخصوصية</a>
            <a href="#" className="hover:text-white transition-colors">الشروط والأحكام</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
