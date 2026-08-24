'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/DashboardLayout';
import { ASSESSMENT_QUESTIONS } from '@/lib/data';
import { CheckCircle, ArrowLeft, ArrowRight, Brain, AlertTriangle, TrendingUp, Stethoscope, Activity } from 'lucide-react';

const OPTIONS = [
  { value: 0, label: 'أبداً', color: '#7FB285' },
  { value: 1, label: 'عدة أيام', color: '#4A8BB5' },
  { value: 2, label: 'أكثر من نصف الأيام', color: '#E8A87C' },
  { value: 3, label: 'يومياً تقريباً', color: '#e05a5a' },
];

const QUESTIONS_PER_PAGE = 4;

function getSeverity(score: number, max: number) {
  const pct = score / max;
  if (pct < 0.25) return { label: 'خفيف جداً', color: '#7FB285', emoji: '🟢' };
  if (pct < 0.5) return { label: 'خفيف', color: '#4A8BB5', emoji: '🔵' };
  if (pct < 0.75) return { label: 'متوسط', color: '#E8A87C', emoji: '🟡' };
  return { label: 'شديد', color: '#e05a5a', emoji: '🔴' };
}

export default function AssessmentPage() {
  const { user, isLoading, updateUser } = useAuth();
  const router = useRouter();
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [currentPage, setCurrentPage] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'patient')) router.push('/auth/login');
  }, [user, isLoading, router]);

  const totalPages = Math.ceil(ASSESSMENT_QUESTIONS.length / QUESTIONS_PER_PAGE);
  const pageQuestions = ASSESSMENT_QUESTIONS.slice(
    currentPage * QUESTIONS_PER_PAGE,
    (currentPage + 1) * QUESTIONS_PER_PAGE
  );
  const pageAnswered = pageQuestions.every(q => answers[q.id] !== undefined);
  const totalAnswered = Object.keys(answers).length;
  const progress = (totalAnswered / ASSESSMENT_QUESTIONS.length) * 100;

  const setAnswer = (qId: string, val: number) => setAnswers(p => ({ ...p, [qId]: val }));

  const handleSubmit = () => {
    const psychQs = ASSESSMENT_QUESTIONS.filter(q => q.type === 'psych');
    const medicalQs = ASSESSMENT_QUESTIONS.filter(q => q.type === 'medical');
    
    const psychScore = psychQs.reduce((s, q) => s + (answers[q.id] || 0), 0);
    const medicalScore = medicalQs.reduce((s, q) => s + (answers[q.id] || 0), 0);
    
    const anxietyQs = ASSESSMENT_QUESTIONS.filter(q => q.category === 'anxiety' || q.category === 'both');
    const depressionQs = ASSESSMENT_QUESTIONS.filter(q => q.category === 'depression' || q.category === 'both');
    const anxiety = anxietyQs.reduce((s, q) => s + (answers[q.id] || 0), 0);
    const depression = depressionQs.reduce((s, q) => s + (answers[q.id] || 0), 0);
    
    // Determine recommendation type
    let recommendation = 'psych'; // 'psych' | 'medical' | 'both'
    if (psychScore >= 8 && medicalScore >= 8) {
      recommendation = 'both';
    } else if (medicalScore >= 8) {
      recommendation = 'medical';
    } else {
      recommendation = 'psych';
    }

    const res = { 
      anxiety, 
      depression, 
      psychScore, 
      medicalScore, 
      recommendation,
      dominant: anxiety >= depression ? 'anxiety' : 'depression'
    };
    
    setResult(res);
    updateUser({ assessmentDone: true, assessmentResult: res });
    setSubmitted(true);
    
    // Auto-redirect if medical or both is needed after 4 seconds
    if (recommendation === 'medical' || recommendation === 'both') {
      setTimeout(() => {
        router.push('/dashboard/patient/doctor?redirected=true');
      }, 4500);
    }
  };

  if (isLoading || !user) return null;

  return (
    <DashboardLayout role="patient">
      <div className="max-w-2xl mx-auto">
        {!submitted ? (
          <>
            {/* Header */}
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(74,139,181,0.12)' }}>
                  <Brain size={20} style={{ color: '#4A8BB5' }} />
                </div>
                <div>
                  <h1 className="text-2xl font-black text-slate-800">الاستبيان النفسي</h1>
                  <p className="text-slate-400 text-sm">استبيان سري ودقيق لتقييم حالتك النفسية</p>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-4">
                <div className="flex justify-between text-xs font-semibold text-slate-500 mb-1.5">
                  <span>السؤال {totalAnswered} من {ASSESSMENT_QUESTIONS.length}</span>
                  <span>الصفحة {currentPage + 1} من {totalPages}</span>
                </div>
                <div className="progress-bar">
                  <motion.div className="progress-fill" style={{ width: `${progress}%` }} />
                </div>
              </div>

              {/* Page steps */}
              <div className="flex gap-2 mt-4">
                {Array.from({ length: totalPages }, (_, i) => (
                  <div key={i} className={`flex-1 h-1.5 rounded-full transition-all duration-500 ${
                    i < currentPage ? 'bg-[#7FB285]' : i === currentPage ? 'bg-[#4A8BB5]' : 'bg-slate-200'
                  }`} />
                ))}
              </div>
            </motion.div>

            {/* Notice */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-4 rounded-2xl mb-6 flex items-start gap-3"
              style={{ background: 'rgba(74,139,181,0.07)', border: '1px solid rgba(74,139,181,0.15)' }}
            >
              <AlertTriangle size={16} style={{ color: '#4A8BB5' }} className="mt-0.5 flex-shrink-0" />
              <p className="text-sm text-slate-600 leading-relaxed">
                <strong className="text-[#2D5F7E]">ملاحظة هامة:</strong> هذا الاستبيان للتوعية الذاتية فقط وليس تشخيصاً طبياً.
                إجاباتك سرية تماماً ولن تُشارك مع أي طرف آخر.
              </p>
            </motion.div>

            {/* Questions */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {pageQuestions.map((q, qi) => (
                  <div key={q.id} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black text-white flex-shrink-0"
                        style={{ background: '#4A8BB5' }}>
                        {currentPage * QUESTIONS_PER_PAGE + qi + 1}
                      </div>
                      <p className="text-slate-700 font-bold leading-relaxed text-base">{q.text}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {OPTIONS.map(opt => {
                        const selected = answers[q.id] === opt.value;
                        return (
                          <motion.button
                            key={opt.value}
                            onClick={() => setAnswer(q.id, opt.value)}
                            className="relative flex items-center gap-2 p-3 rounded-xl border-2 text-sm font-semibold transition-all text-right"
                            style={{
                              borderColor: selected ? opt.color : '#d8e8f0',
                              background: selected ? `${opt.color}12` : 'white',
                              color: selected ? opt.color : '#6b7f8e',
                            }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                              selected ? 'border-current' : 'border-slate-300'
                            }`}>
                              {selected && <div className="w-2 h-2 rounded-full bg-current" />}
                            </div>
                            {opt.label}
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex gap-3 mt-6">
              {currentPage > 0 && (
                <button onClick={() => setCurrentPage(p => p - 1)}
                  className="btn-secondary flex-1 py-3 rounded-xl flex items-center justify-center gap-2">
                  <ArrowRight size={16} /> السابق
                </button>
              )}
              {currentPage < totalPages - 1 ? (
                <motion.button
                  onClick={() => pageAnswered && setCurrentPage(p => p + 1)}
                  disabled={!pageAnswered}
                  className={`btn-primary flex-1 py-3 rounded-xl flex items-center justify-center gap-2 ${!pageAnswered ? 'opacity-50 cursor-not-allowed' : ''}`}
                  whileHover={pageAnswered ? { scale: 1.02 } : {}}
                  whileTap={pageAnswered ? { scale: 0.98 } : {}}
                >
                  التالي <ArrowLeft size={16} />
                </motion.button>
              ) : (
                <motion.button
                  onClick={() => Object.keys(answers).length === ASSESSMENT_QUESTIONS.length && handleSubmit()}
                  disabled={Object.keys(answers).length < ASSESSMENT_QUESTIONS.length}
                  className={`btn-primary flex-1 py-3 rounded-xl flex items-center justify-center gap-2 ${
                    Object.keys(answers).length < ASSESSMENT_QUESTIONS.length ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  whileHover={Object.keys(answers).length === ASSESSMENT_QUESTIONS.length ? { scale: 1.02 } : {}}
                  whileTap={Object.keys(answers).length === ASSESSMENT_QUESTIONS.length ? { scale: 0.98 } : {}}
                >
                  <CheckCircle size={16} /> عرض النتيجة
                </motion.button>
              )}
            </div>
          </>
        ) : (
          /* ─── Results ─── */
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            <div className="text-center py-6 bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', damping: 10 }}
                className="w-16 h-16 mx-auto rounded-full bg-slate-50 flex items-center justify-center text-3xl mb-3 border border-slate-100"
              >
                {result.recommendation === 'medical' ? '🩺' : result.recommendation === 'both' ? '🏥' : '🧠'}
              </motion.div>
              <h2 className="text-xl font-black text-slate-800 mb-1" style={{ fontFamily: 'Cairo' }}>تم تحليل إجاباتك بنجاح!</h2>
              <div className="inline-block px-4 py-1.5 rounded-full text-xs font-black mt-2"
                style={{ 
                  background: result.recommendation === 'medical' ? 'rgba(232,168,124,0.12)' : result.recommendation === 'both' ? 'rgba(224,90,90,0.12)' : 'rgba(74,139,181,0.12)',
                  color: result.recommendation === 'medical' ? '#E8A87C' : result.recommendation === 'both' ? '#e05a5a' : '#4A8BB5'
                }}>
                التشخيص المقترح: {
                  result.recommendation === 'medical' ? 'تحتاج إلى استشارة طبية (طبيب عام)' : 
                  result.recommendation === 'both' ? 'تحتاج إلى استشارة طبية ونفسية مشتركة' : 
                  'تحتاج إلى استشارة نفسية'
                }
              </div>
            </div>

            {/* Diagnostic Alert Card if Medical or Both */}
            {(result.recommendation === 'medical' || result.recommendation === 'both') && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-5 rounded-2xl border flex flex-col gap-3 text-right"
                style={{ background: 'rgba(232, 168, 124, 0.08)', borderColor: 'rgba(232, 168, 124, 0.25)' }}
              >
                <div className="flex items-center gap-2 text-[#b5673a] font-black text-sm" style={{ fontFamily: 'Cairo' }}>
                  <Stethoscope size={18} />
                  <span>توجيه طبي هام</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                  بناءً على الأعراض الجسدية التي اخترتها (كالصداع، آلام الصدر أو الهضم)، نوصي بشدة بزيارة الطبيب العام أولاً للتأكد من سلامتك العضوية واستبعاد أي مسببات جسدية لهذه الأعراض.
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#E8A87C] animate-ping" />
                  <span className="text-[11px] text-[#b5673a] font-bold">جاري توجيهك الآن تلقائياً إلى صفحة الطبيب العام...</span>
                </div>
              </motion.div>
            )}

            {/* Scores detail */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm text-center">
                <div className="w-10 h-10 mx-auto rounded-xl bg-[#4A8BB5]/10 flex items-center justify-center text-lg mb-2 text-[#4A8BB5]">
                  <Brain size={20} />
                </div>
                <p className="text-slate-400 text-xs font-bold mb-1">المقياس النفسي</p>
                <div className="text-2xl font-black text-slate-800">{result.psychScore}/24</div>
                <div className="text-[11px] text-slate-400 font-semibold mt-1">
                  {result.psychScore >= 8 ? 'أعراض نفسية متوسطة إلى شديدة' : 'أعراض نفسية خفيفة'}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm text-center">
                <div className="w-10 h-10 mx-auto rounded-xl bg-[#E8A87C]/10 flex items-center justify-center text-lg mb-2 text-[#E8A87C]">
                  <Activity size={20} />
                </div>
                <p className="text-slate-400 text-xs font-bold mb-1">المقياس الجسدي الطبي</p>
                <div className="text-2xl font-black text-slate-800">{result.medicalScore}/24</div>
                <div className="text-[11px] text-slate-400 font-semibold mt-1">
                  {result.medicalScore >= 8 ? 'أعراض جسدية تستدعي فحصاً' : 'أعراض جسدية خفيفة'}
                </div>
              </div>
            </div>

            {/* Recommended Tools */}
            <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm space-y-3">
              <h3 className="text-sm font-black text-slate-800 flex items-center gap-2 mb-1" style={{ fontFamily: 'Cairo' }}>
                <TrendingUp size={16} className="text-[#7FB285]" />
                خطواتك القادمة المقترحة
              </h3>
              
              {(result.recommendation === 'medical' || result.recommendation === 'both') && (
                <div 
                  onClick={() => router.push('/dashboard/patient/doctor')}
                  className="flex items-center gap-3 p-3 rounded-xl border border-dashed border-[#E8A87C]/40 hover:bg-[#E8A87C]/05 cursor-pointer transition-all"
                >
                  <span className="text-xl">🩺</span>
                  <div className="flex-1 text-right">
                    <p className="font-bold text-slate-700 text-sm">استشارة الطبيب العام للمنصة</p>
                    <p className="text-slate-400 text-xs mt-0.5">احجز موعداً فورياً مع الطبيب العام</p>
                  </div>
                  <ArrowLeft size={16} className="text-[#E8A87C]" />
                </div>
              )}

              <div 
                onClick={() => router.push('/dashboard/patient/specialists')}
                className="flex items-center gap-3 p-3 rounded-xl border border-slate-50 hover:bg-slate-50 cursor-pointer transition-all"
              >
                <span className="text-xl">👨‍⚕️</span>
                <div className="flex-1 text-right">
                  <p className="font-bold text-slate-700 text-sm">تحدث مع أخصائي نفسي</p>
                  <p className="text-slate-400 text-xs mt-0.5">جلسة علاجية خاصة وسرية عبر الإنترنت</p>
                </div>
                <ArrowLeft size={16} className="text-slate-400" />
              </div>

              <div 
                onClick={() => router.push('/dashboard/patient/boxes')}
                className="flex items-center gap-3 p-3 rounded-xl border border-slate-50 hover:bg-slate-50 cursor-pointer transition-all"
              >
                <span className="text-xl">📦</span>
                <div className="flex-1 text-right">
                  <p className="font-bold text-slate-700 text-sm">اقتنِ حقيبتك العلاجية المخصصة</p>
                  <p className="text-slate-400 text-xs mt-0.5">بروتوكولات وكتب وبطاقات التعافي الذاتي</p>
                </div>
                <ArrowLeft size={16} className="text-slate-400" />
              </div>
            </div>

            {/* Manual redirection action */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              {(result.recommendation === 'medical' || result.recommendation === 'both') && (
                <button 
                  onClick={() => router.push('/dashboard/patient/doctor')}
                  className="btn-primary flex-1 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2"
                  style={{ background: 'linear-gradient(135deg, #E8A87C 0%, #b5673a 100%)' }}
                >
                  <Stethoscope size={16} /> الذهاب للطبيب العام الآن
                </button>
              )}
              <button 
                onClick={() => router.push(result.recommendation === 'psych' ? '/dashboard/patient/specialists' : '/dashboard/patient')}
                className="btn-secondary flex-1 py-3 rounded-xl text-sm font-bold"
              >
                العودة للرئيسية
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
}
