'use client';

import { useEffect, lazy, Suspense, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/DashboardLayout';
import { BOXES } from '@/lib/data';
import { X, ShoppingBag, Sparkles, BookOpen, FileText, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';

const PDFViewer = lazy(() => import('@/components/PDFViewer'));

// ────────────────────────────────────────────────────────────
// Hand-drawn Monochrome SVG Stickers for Illnesses
// ────────────────────────────────────────────────────────────
function AnxietySticker() {
  return (
    <svg className="w-14 h-14" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="46" fill="white" stroke="#1e293b" strokeWidth="4"/>
      <circle cx="50" cy="50" r="40" fill="none" stroke="#1e293b" strokeWidth="1" strokeDasharray="3 3"/>
      <path d="M38 50 C38 42, 44 36, 50 36 C56 36, 62 42, 62 50 C62 58, 56 64, 50 64 C44 64, 38 58, 38 50 Z" stroke="#1e293b" strokeWidth="2.5" fill="none"/>
      <path d="M50 36 C50 42, 50 58, 50 64" stroke="#1e293b" strokeWidth="2" fill="none"/>
      <path d="M44 42 C46 44, 48 44, 48 42 M56 42 C54 44, 52 44, 52 42" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <path d="M46 54 Q48 57, 50 57 Q52 57, 54 54" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <path d="M30 35 Q40 28, 50 30 Q60 28, 70 35" stroke="#1e293b" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    </svg>
  );
}

function OcdSticker() {
  return (
    <svg className="w-14 h-14" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="46" fill="white" stroke="#1e293b" strokeWidth="4"/>
      <circle cx="50" cy="50" r="40" fill="none" stroke="#1e293b" strokeWidth="1" strokeDasharray="3 3"/>
      <rect x="36" y="36" width="28" height="28" stroke="#1e293b" strokeWidth="2.5" rx="3" fill="none"/>
      <rect x="42" y="42" width="16" height="16" stroke="#1e293b" strokeWidth="1.5" rx="1.5" fill="none"/>
      <path d="M50 24 L50 32 M50 68 L50 76 M24 50 L32 50 M68 50 L76 50" stroke="#1e293b" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

function DepressionSticker() {
  return (
    <svg className="w-14 h-14" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="46" fill="white" stroke="#1e293b" strokeWidth="4"/>
      <circle cx="50" cy="50" r="40" fill="none" stroke="#1e293b" strokeWidth="1" strokeDasharray="3 3"/>
      <path d="M35 52 C30 52, 28 46, 33 42 C31 36, 38 30, 46 33 C49 26, 61 26, 64 33 C70 30, 74 36, 72 42 C76 46, 74 52, 69 52 Z" fill="none" stroke="#1e293b" strokeWidth="2.5" strokeLinejoin="round"/>
      <path d="M42 60 L40 66 M50 62 L48 68 M58 60 L56 66" stroke="#1e293b" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

function StickerRenderer({ id }: { id: string }) {
  if (id === 'box-anxiety') return <AnxietySticker />;
  if (id === 'box-ocd') return <OcdSticker />;
  return <DepressionSticker />;
}

// ────────────────────────────────────────────────────────────
// PDF Modal
// ────────────────────────────────────────────────────────────
function PDFModal({ book, onClose }: { book: any; onClose: () => void }) {
  return (
    <div className="modal-overlay" style={{ zIndex: 1100 }} onClick={e => e.target === e.currentTarget && onClose()}>
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.94 }}
        className="bg-white rounded-2xl w-full max-w-6xl w-[96vw] h-[92vh] flex flex-col overflow-hidden shadow-2xl"
      >
        <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100 flex-shrink-0">
          <div>
            <h4 className="font-black text-slate-800 text-sm" style={{ fontFamily: 'Cairo' }}>{book.title}</h4>
            <p className="text-slate-400 text-xs">{book.subtitle}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-slate-100 transition-colors">
            <X size={18} className="text-slate-500" />
          </button>
        </div>
        <div className="flex-1 overflow-hidden bg-slate-900 p-2 sm:p-4 flex justify-center">
          <Suspense fallback={<div className="flex flex-col items-center justify-center gap-3 py-16"><div className="w-10 h-10 border-2 border-[#4A8BB5]/20 border-t-[#4A8BB5] rounded-full animate-spin" /><p className="text-slate-400 text-sm">جاري فتح الملف…</p></div>}>
            <PDFViewer fileUrl={book.file} title={book.title} />
          </Suspense>
        </div>
      </motion.div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// Inline Assessment Tool for Specialist
// ────────────────────────────────────────────────────────────
function InlineAssessment({ assessment }: { assessment: any }) {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [done, setDone] = useState(false);
  const [open, setOpen] = useState(false);

  const total = Object.values(answers).reduce((a, b) => a + b, 0);
  const max = assessment.questions.length * 3;
  const pct = total / max;

  const level = pct < 0.25 ? { label: 'طبيعي', color: '#7FB285' }
    : pct < 0.5 ? { label: 'خفيف', color: '#4A8BB5' }
    : pct < 0.75 ? { label: 'متوسط', color: '#E8A87C' }
    : { label: 'شديد', color: '#e05a5a' };

  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
      <button onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-slate-100">
            <FileText size={16} className="text-[#2D5F7E]" />
          </div>
          <div className="text-right">
            <p className="font-black text-slate-700 text-sm" style={{ fontFamily: 'Cairo' }}>{assessment.name}</p>
            <p className="text-slate-400 text-xs">{assessment.description}</p>
          </div>
        </div>
        {open ? <ChevronUp size={15} className="text-slate-400 flex-shrink-0" /> : <ChevronDown size={15} className="text-slate-400 flex-shrink-0" />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <div className="px-4 pb-4 space-y-4 border-t border-slate-100 pt-4">
              {done ? (
                <div className="text-center py-4 space-y-2">
                  <div className="text-3xl font-black" style={{ color: level.color, fontFamily: 'Cairo' }}>{total}/{max}</div>
                  <div className="font-bold text-sm" style={{ color: level.color }}>{level.label}</div>
                  <button onClick={() => { setAnswers({}); setDone(false); }} className="text-xs text-slate-400 hover:text-slate-600 underline mt-2">إعادة التقييم</button>
                </div>
              ) : (
                <>
                  {assessment.questions.map((q: string, qi: number) => (
                    <div key={qi}>
                      <p className="text-slate-600 text-sm font-semibold mb-2">{qi + 1}. {q}</p>
                      <div className="grid grid-cols-4 gap-2">
                        {[{ v: 0, l: 'أبداً' }, { v: 1, l: 'أحياناً' }, { v: 2, l: 'غالباً' }, { v: 3, l: 'دائماً' }].map(o => (
                          <button key={o.v} onClick={() => setAnswers(p => ({ ...p, [qi]: o.v }))}
                            className={`py-2 rounded-xl text-xs font-bold border-2 transition-all ${answers[qi] === o.v ? 'text-white' : 'border-slate-200 text-slate-500 hover:border-[#4A8BB5]'}`}
                            style={answers[qi] === o.v ? { background: '#4A8BB5', borderColor: '#4A8BB5' } : {}}>{o.l}</button>
                        ))}
                      </div>
                    </div>
                  ))}
                  <button onClick={() => setDone(true)} disabled={Object.keys(answers).length < assessment.questions.length}
                    className="btn-primary w-full py-2.5 rounded-xl text-sm"
                    style={{ opacity: Object.keys(answers).length < assessment.questions.length ? 0.5 : 1 }}>عرض النتيجة</button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// Specialist Box Drawer
// ────────────────────────────────────────────────────────────
function SpecialistBoxDrawer({ box, onClose }: { box: any; onClose: () => void }) {
  const [tab, setTab] = useState<'books' | 'scales' | 'tools' | 'protocols'>('books');
  const [openPdf, setOpenPdf] = useState<any>(null);
  const content = box.specialistContent;

  const tabs = [
    { key: 'books', label: 'الأدلة والكتب', count: content.booklets?.length || 0 },
    { key: 'scales', label: 'المقاييس النفسية', count: content.clinicalScales?.length || 0 },
    { key: 'tools', label: 'الاستبيانات التفاعلية', count: content.assessments?.length || 0 },
    { key: 'protocols', label: 'البروتوكولات العلاجية', count: content.protocols?.length || 0 },
  ];

  return (
    <>
      <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
        <motion.div
          initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 60 }}
          className="absolute inset-y-0 left-0 w-full max-w-2xl bg-white flex flex-col shadow-2xl overflow-hidden"
          style={{ margin: '0 0 0 auto' }}
          onClick={e => e.stopPropagation()}
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="bg-slate-100 w-10 h-10 rounded-xl flex items-center justify-center">
                <StickerRenderer id={box.id} />
              </div>
              <div>
                <h3 className="font-black text-slate-800 text-base" style={{ fontFamily: 'Cairo' }}>{box.name}</h3>
                <p className="text-xs text-slate-400">نسخة الأخصائي المعتمد</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 rounded-xl hover:bg-slate-100 transition-colors"><X size={18} className="text-slate-500" /></button>
          </div>

          <div className="flex border-b border-slate-100 px-4 flex-shrink-0 overflow-x-auto">
            {tabs.map(t => (
              <button key={t.key} onClick={() => setTab(t.key as any)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-bold whitespace-nowrap border-b-2 transition-all ${
                  tab === t.key ? 'border-[#4A8BB5] text-[#2D5F7E]' : 'border-transparent text-slate-400 hover:text-slate-600'
                }`}>
                {t.label}
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${tab === t.key ? 'bg-[#4A8BB5]/12 text-[#2D5F7E]' : 'bg-slate-100 text-slate-400'}`}>{t.count}</span>
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto p-5">
            <AnimatePresence mode="wait">
              {tab === 'books' && (
                <motion.div key="books" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3">
                  {content.booklets.map((b: any, i: number) => (
                    <motion.div key={b.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                      onClick={() => setOpenPdf(b)}
                      className="flex items-center gap-4 p-4 border border-slate-200 rounded-xl hover:border-[#4A8BB5] hover:shadow-md transition-all cursor-pointer bg-white group">
                      <div className="w-11 h-14 rounded-lg flex items-center justify-center bg-slate-100 flex-shrink-0">
                        <BookOpen size={20} style={{ color: '#4A8BB5' }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-black text-slate-700 text-sm" style={{ fontFamily: 'Cairo' }}>{b.title}</h4>
                        <p className="text-slate-400 text-xs mt-0.5 truncate">{b.subtitle}</p>
                        <span className="badge badge-primary text-xs mt-1">{b.pages} صفحة</span>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
              {tab === 'scales' && (
                <motion.div key="scales" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3">
                  {content.clinicalScales?.map((s: any, i: number) => (
                    <motion.div key={s.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                      onClick={() => setOpenPdf(s)}
                      className="flex items-center gap-4 p-4 border border-slate-200 rounded-xl hover:border-[#7FB285] hover:shadow-md transition-all cursor-pointer bg-white group">
                      <div className="w-11 h-14 rounded-lg flex items-center justify-center bg-green-50 flex-shrink-0">
                        <FileText size={20} className="text-[#3d6b43]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-black text-slate-700 text-sm" style={{ fontFamily: 'Cairo' }}>{s.title}</h4>
                        <p className="text-slate-400 text-xs mt-0.5 truncate">{s.subtitle}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">{s.pages} صفحة</span>
                          <span className="text-[10px] font-bold text-[#4A8BB5] group-hover:underline">عرض المقياس ↗</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  {(!content.clinicalScales || content.clinicalScales.length === 0) && (
                    <p className="text-center py-8 text-xs text-slate-400">لا توجد مقاييس إضافية لهذا الصندوق</p>
                  )}
                </motion.div>
              )}
              {tab === 'tools' && (
                <motion.div key="tools" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3">
                  {content.assessments?.map((a: any) => <InlineAssessment key={a.id} assessment={a} />)}
                </motion.div>
              )}
              {tab === 'protocols' && (
                <motion.div key="protocols" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3">
                  {content.protocols?.map((p: any) => (
                    <div key={p.id} className="p-5 rounded-xl border border-slate-200 bg-white">
                      <h4 className="font-black text-slate-700 mb-2 text-sm" style={{ fontFamily: 'Cairo' }}>{p.title}</h4>
                      <p className="text-slate-500 text-sm leading-relaxed whitespace-pre-line">{p.content}</p>
                    </div>
                  ))}
                </motion.div>
              )}
              {tab === 'scales' && (
                <motion.div key="scales" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3">
                  {content.clinicalScales?.map((s: any, i: number) => (
                    <motion.div key={s.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                      onClick={() => setOpenPdf(s)}
                      className="flex items-center gap-4 p-4 border border-slate-200 rounded-xl hover:border-[#7FB285] hover:shadow-md transition-all cursor-pointer bg-white group">
                      <div className="w-11 h-14 rounded-lg flex items-center justify-center bg-green-50 flex-shrink-0">
                        <FileText size={20} className="text-[#3d6b43]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-black text-slate-700 text-sm" style={{ fontFamily: 'Cairo' }}>{s.title}</h4>
                        <p className="text-slate-400 text-xs mt-0.5 truncate">{s.subtitle}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">{s.pages} صفحة</span>
                          <span className="text-[10px] font-bold text-[#4A8BB5] group-hover:underline">عرض المقياس ↗</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  {(!content.clinicalScales || content.clinicalScales.length === 0) && (
                    <p className="text-center py-8 text-xs text-slate-400">لا توجد مقاييس إضافية لهذا الصندوق</p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {openPdf && <PDFModal book={openPdf} onClose={() => setOpenPdf(null)} />}
      </AnimatePresence>
    </>
  );
}

// ────────────────────────────────────────────────────────────
// Confirm Activation
// ────────────────────────────────────────────────────────────
function ConfirmModal({ box, onClose, onConfirm }: { box: any; onClose: () => void; onConfirm: () => void }) {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleBuy = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setDone(true);
    setTimeout(onConfirm, 1600);
  };

  if (done) {
    return (
      <div className="modal-overlay">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-2xl p-10 text-center max-w-sm w-full shadow-2xl">
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-5 bg-[#7FB285]/15">
            <CheckCircle size={44} style={{ color: '#7FB285' }} />
          </div>
          <h3 className="text-xl font-black text-slate-800 mb-2" style={{ fontFamily: 'Cairo' }}>تم تفعيل الصندوق!</h3>
          <div className="mt-5 w-8 h-8 border-2 border-[#7FB285]/25 border-t-[#7FB285] rounded-full animate-spin mx-auto" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 30 }}
        className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
        <div className="relative h-28 flex items-center justify-center overflow-hidden"
          style={{ 
            background: box.id === 'box-anxiety' 
              ? 'linear-gradient(135deg, #4A8BB5 0%, #2D5F7E 100%)' 
              : box.id === 'box-ocd' 
                ? 'linear-gradient(135deg, #7FB285 0%, #2D5F7E 100%)' 
                : 'linear-gradient(135deg, #E8A87C 0%, #2D5F7E 100%)'
          }}
        >
          <div className="bg-white p-1.5 rounded-full border border-black/10">
            <StickerRenderer id={box.id} />
          </div>
          <button onClick={onClose} className="absolute top-3 left-3 p-2 rounded-xl text-white/50 hover:text-white hover:bg-white/10"><X size={16} /></button>
        </div>
        <div className="p-6 space-y-4">
          <h3 className="text-xl font-black text-slate-800" style={{ fontFamily: 'Cairo' }}>تفعيل صندوق الأخصائي المهني</h3>
          <p className="text-slate-500 text-sm leading-relaxed">{box.description}</p>
          <div className="flex items-center justify-between py-3 px-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="font-bold text-slate-600 text-sm">تكلفة الترخيص المهني</span>
            <span className="text-2xl font-black" style={{ color: '#2D5F7E', fontFamily: 'Cairo' }}>{box.price} {box.currency}</span>
          </div>
          <div className="flex gap-3">
            <button onClick={onClose} className="btn-secondary flex-1 py-3 rounded-xl text-sm">إلغاء</button>
            <button onClick={handleBuy} disabled={loading} className="btn-primary flex-1 py-3 rounded-xl text-sm flex items-center justify-center gap-2">
              <ShoppingBag size={14} /> تفعيل فوري
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// Main Component
// ────────────────────────────────────────────────────────────
export default function SpecialistBoxesPage() {
  const { user, isLoading, updateUser } = useAuth();
  const router = useRouter();
  const [confirmBox, setConfirmBox] = useState<any>(null);
  const [openBox, setOpenBox] = useState<any>(null);

  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'specialist')) router.push('/auth/login');
  }, [user, isLoading, router]);

  const purchasedIds = user?.purchasedBoxes || [];

  const handleConfirm = (boxId: string) => {
    updateUser({ purchasedBoxes: [...purchasedIds, boxId] });
    setConfirmBox(null);
    setOpenBox(BOXES.find(b => b.id === boxId) || null);
  };

  if (isLoading || !user) return null;

  return (
    <DashboardLayout role="specialist">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-black text-slate-800" style={{ fontFamily: 'Cairo' }}>الصناديق المهنية</h1>
          <p className="text-slate-400 text-sm mt-1">أدوات عيادية متقدمة، استبيانات معيارية، وبروتوكولات علاج خاصة بالأخصائيين</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {BOXES.map(box => {
            const owned = purchasedIds.includes(box.id);
            return (
              <motion.div key={box.id} whileHover={{ y: -5 }} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col justify-between">
                <div className="h-36 flex items-center justify-center relative overflow-hidden"
                  style={{ 
                    background: box.id === 'box-anxiety' 
                      ? 'linear-gradient(135deg, #4A8BB5 0%, #2D5F7E 100%)' 
                      : box.id === 'box-ocd' 
                        ? 'linear-gradient(135deg, #7FB285 0%, #2D5F7E 100%)' 
                        : 'linear-gradient(135deg, #E8A87C 0%, #2D5F7E 100%)'
                  }}
                >
                  <div className="bg-white p-1.5 rounded-full border border-black/10">
                    <StickerRenderer id={box.id} />
                  </div>
                  {owned && <span className="absolute top-3 right-3 badge badge-sage text-[10px] font-black">مفعّل</span>}
                </div>
                <div className="p-5 space-y-4">
                  <div>
                    <h3 className="font-black text-slate-800 text-sm" style={{ fontFamily: 'Cairo' }}>{box.name}</h3>
                    <p className="text-slate-400 text-xs mt-0.5">ترخيص عيادي مهني</p>
                  </div>
                  {owned ? (
                    <button onClick={() => setOpenBox(box)} className="btn-primary w-full py-2 rounded-xl text-xs flex items-center justify-center gap-1.5">
                      فتح الصندوق المهني
                    </button>
                  ) : (
                    <button onClick={() => setConfirmBox(box)} className="btn-secondary w-full py-2 rounded-xl text-xs flex items-center justify-center gap-1.5">
                      تفعيل الصندوق المهني — {box.price} {box.currency}
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {confirmBox && <ConfirmModal box={confirmBox} onClose={() => setConfirmBox(null)} onConfirm={() => handleConfirm(confirmBox.id)} />}
        {openBox && <SpecialistBoxDrawer box={openBox} onClose={() => setOpenBox(null)} />}
      </AnimatePresence>
    </DashboardLayout>
  );
}
