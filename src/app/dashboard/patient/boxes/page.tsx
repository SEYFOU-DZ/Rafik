'use client';

import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/DashboardLayout';
import { BOXES } from '@/lib/data';
import {
  X, CheckCircle, BookOpen, Sparkles, FileText,
  ChevronDown, ChevronUp, ShoppingBag, Lock, Star, HelpCircle
} from 'lucide-react';

const PDFViewer = lazy(() => import('@/components/PDFViewer'));

// ────────────────────────────────────────────────────────────
// Hand-drawn Monochrome SVG Stickers for Illnesses
// ────────────────────────────────────────────────────────────
function AnxietySticker() {
  return (
    <svg className="w-16 h-16" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="46" fill="white" stroke="#1e293b" strokeWidth="4"/>
      <circle cx="50" cy="50" r="40" fill="none" stroke="#1e293b" strokeWidth="1" strokeDasharray="3 3"/>
      {/* Clean stylized brain with chaotic thought loop */}
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
    <svg className="w-16 h-16" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="46" fill="white" stroke="#1e293b" strokeWidth="4"/>
      <circle cx="50" cy="50" r="40" fill="none" stroke="#1e293b" strokeWidth="1" strokeDasharray="3 3"/>
      {/* Clean symmetrical alignment and check ticks */}
      <rect x="36" y="36" width="28" height="28" stroke="#1e293b" strokeWidth="2.5" rx="3" fill="none"/>
      <rect x="42" y="42" width="16" height="16" stroke="#1e293b" strokeWidth="1.5" rx="1.5" fill="none"/>
      <path d="M50 24 L50 32 M50 68 L50 76 M24 50 L32 50 M68 50 L76 50" stroke="#1e293b" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

function DepressionSticker() {
  return (
    <svg className="w-16 h-16" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="46" fill="white" stroke="#1e293b" strokeWidth="4"/>
      <circle cx="50" cy="50" r="40" fill="none" stroke="#1e293b" strokeWidth="1" strokeDasharray="3 3"/>
      {/* Clean clouds and raindrops representation */}
      <path d="M35 52 C30 52, 28 46, 33 42 C31 36, 38 30, 46 33 C49 26, 61 26, 64 33 C70 30, 74 36, 72 42 C76 46, 74 52, 69 52 Z" fill="none" stroke="#1e293b" strokeWidth="2.5" strokeLinejoin="round"/>
      <path d="M42 60 L40 66 M50 62 L48 68 M58 60 L56 66" stroke="#1e293b" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

function StickerRenderer({ id }: { id: string }) {
  if (id === 'box-anxiety' || id === 'anxiety') return <AnxietySticker />;
  if (id === 'box-ocd' || id === 'ocd') return <OcdSticker />;
  return <DepressionSticker />;
}

// ────────────────────────────────────────────────────────────
// PDF Modal
// ────────────────────────────────────────────────────────────
function PDFModal({ book, onClose }: { book: any; onClose: () => void }) {
  return (
    <div
      className="modal-overlay"
      style={{ zIndex: 1100 }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
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
          <Suspense fallback={
            <div className="flex flex-col items-center justify-center gap-3 py-16">
              <div className="w-10 h-10 border-2 border-[#4A8BB5]/20 border-t-[#4A8BB5] rounded-full animate-spin" />
              <p className="text-slate-400 text-sm">جاري فتح الكتاب…</p>
            </div>
          }>
            <PDFViewer fileUrl={book.file} title={book.title} />
          </Suspense>
        </div>
      </motion.div>
    </div>
  );
}

function FlipCard({ card }: { card: any }) {
  const [flipped, setFlipped] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const getSubHeader = () => {
    if (card.subtitle) return card.subtitle;
    if (card.type === 'technique') return 'تمرين عملي مهدئ وموجه';
    if (card.type === 'affirmation') return 'تأكيد إيجابي لبرمجة العقل الباطن';
    return 'معلومة علمية لشرح الأعراض';
  };

  const getEmoji = () => {
    if (card.type === 'technique') return '🛠️';
    if (card.type === 'affirmation') return '✨';
    return '🧠';
  };

  return (
    <>
      <div
        className="cursor-pointer"
        style={{ perspective: '900px', height: '240px' }}
        onClick={() => setFlipped(f => !f)}
      >
        <motion.div
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          style={{ transformStyle: 'preserve-3d', position: 'relative', width: '100%', height: '100%' }}
        >
          {/* Front Face */}
          <div
            className="absolute inset-0 rounded-xl p-4 sm:p-5 flex flex-col justify-between border-2 shadow-sm transition-all"
            style={{ 
              backfaceVisibility: 'hidden', 
              background: 'linear-gradient(135deg, #ffffff 0%, #F5F9FD 100%)', 
              borderColor: card.type === 'technique' ? '#7FB285' : card.type === 'affirmation' ? '#E8A87C' : '#4A8BB5'
            }}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wide" 
                style={{ 
                  background: card.type === 'technique' ? 'rgba(127,178,133,0.12)' : card.type === 'affirmation' ? 'rgba(232,168,124,0.12)' : 'rgba(74,139,181,0.12)', 
                  color: card.type === 'technique' ? '#3d6b43' : card.type === 'affirmation' ? '#a05a2c' : '#2D5F7E' 
                }}>
                {card.badge || 'بطاقة مساعدة'}
              </span>
              <span className="text-slate-400 text-xs font-bold flex items-center gap-1">
                <span>اقلب للشرح</span> ↻
              </span>
            </div>

            <div className="flex items-center gap-3 py-1">
              {card.image ? (
                <div 
                  className="w-16 h-20 rounded-lg overflow-hidden border border-slate-200 flex-shrink-0 bg-slate-100 hover:opacity-90 shadow-xs"
                  onClick={(e) => { e.stopPropagation(); setPreviewImage(card.image); }}
                  title="انقر لتكبير صورة البطاقة"
                >
                  <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="text-2xl">{getEmoji()}</div>
              )}
              <div className="flex-1 min-w-0">
                <h4 className="font-black text-slate-800 text-sm sm:text-base leading-snug" style={{ fontFamily: 'Cairo' }}>{card.title}</h4>
                <p className="text-slate-400 text-xs font-semibold leading-relaxed mt-1">{getSubHeader()}</p>
                {card.image && (
                  <button 
                    onClick={(e) => { e.stopPropagation(); setPreviewImage(card.image); }}
                    className="text-[10px] font-bold text-[#4A8BB5] hover:underline mt-1 block"
                  >
                    عرض البطاقة المصورة 🔍
                  </button>
                )}
              </div>
            </div>

            <div className="border-t border-slate-100 pt-2 text-[10px] text-slate-400 font-bold text-left">
              انقر لقلب البطاقة وقراءة الخطوات 👆
            </div>
          </div>

          {/* Back Face */}
          <div
            className="absolute inset-0 rounded-xl p-4 sm:p-5 overflow-y-auto"
            style={{ 
              backfaceVisibility: 'hidden', 
              transform: 'rotateY(180deg)', 
              background: 'linear-gradient(135deg, #1d3649, #2D5F7E)' 
            }}
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-[9px] font-black text-white/50">{card.badge}</span>
              <span className="text-[9px] font-black text-white/50">توجيه عملي</span>
            </div>
            <p className="text-white/95 text-xs sm:text-sm leading-relaxed whitespace-pre-line" style={{ fontFamily: 'Tajawal' }}>{card.content}</p>
          </div>
        </motion.div>
      </div>

      {previewImage && (
        <div 
          className="modal-overlay" 
          style={{ zIndex: 1200 }}
          onClick={() => setPreviewImage(null)}
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            className="bg-white rounded-2xl p-3 max-w-md max-h-[90vh] overflow-hidden flex flex-col items-center shadow-2xl relative"
            onClick={e => e.stopPropagation()}
          >
            <button 
              onClick={() => setPreviewImage(null)}
              className="absolute top-4 left-4 p-2 rounded-xl bg-slate-900/60 text-white hover:bg-slate-900"
            >
              <X size={16} />
            </button>
            <img src={previewImage} alt="البطاقة" className="max-h-[82vh] w-auto rounded-xl object-contain shadow-sm" />
          </motion.div>
        </div>
      )}
    </>
  );
}

// ────────────────────────────────────────────────────────────
// Inline Assessment
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
          <motion.div
            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-4 border-t border-slate-100 pt-4">
              {done ? (
                <div className="text-center py-4 space-y-2">
                  <div className="text-3xl font-black" style={{ color: level.color, fontFamily: 'Cairo' }}>{total}/{max}</div>
                  <div className="font-bold text-sm" style={{ color: level.color }}>{level.label}</div>
                  <div className="progress-bar mt-2">
                    <motion.div className="progress-fill" style={{ width: `${pct * 100}%`, background: level.color }}
                      initial={{ width: 0 }} animate={{ width: `${pct * 100}%` }} transition={{ duration: 0.8 }} />
                  </div>
                  <button onClick={() => { setAnswers({}); setDone(false); }}
                    className="text-xs text-slate-400 hover:text-slate-600 underline mt-2">إعادة التقييم</button>
                </div>
              ) : (
                <>
                  {assessment.questions.map((q: string, qi: number) => (
                    <div key={qi}>
                      <p className="text-slate-600 text-sm font-semibold mb-2">{qi + 1}. {q}</p>
                      <div className="grid grid-cols-4 gap-2">
                        {[{ v: 0, l: 'أبداً' }, { v: 1, l: 'أحياناً' }, { v: 2, l: 'غالباً' }, { v: 3, l: 'دائماً' }].map(o => (
                          <button key={o.v}
                            onClick={() => setAnswers(p => ({ ...p, [qi]: o.v }))}
                            className={`py-2 rounded-xl text-xs font-bold border-2 transition-all ${
                              answers[qi] === o.v ? 'text-white' : 'border-slate-200 text-slate-500 hover:border-[#4A8BB5]'
                            }`}
                            style={answers[qi] === o.v ? { background: '#4A8BB5', borderColor: '#4A8BB5' } : {}}>
                            {o.l}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={() => setDone(true)}
                    disabled={Object.keys(answers).length < assessment.questions.length}
                    className="btn-primary w-full py-2.5 rounded-xl text-sm"
                    style={{ opacity: Object.keys(answers).length < assessment.questions.length ? 0.5 : 1 }}>
                    عرض النتيجة
                  </button>
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
// Box Content Drawer (slides from right)
// ────────────────────────────────────────────────────────────
function BoxDrawer({ box, userRole, onClose }: { box: any; userRole: 'patient' | 'specialist'; onClose: () => void }) {
  const [tab, setTab] = useState<'books' | 'cards' | 'tools'>('books');
  const [openPdf, setOpenPdf] = useState<any>(null);
  const content = userRole === 'patient' ? box.patientContent : box.specialistContent;

  const tabs = [
    { key: 'books', label: 'الكتب', icon: BookOpen, count: content.booklets?.length || 0 },
    { key: 'cards', label: 'البطاقات', icon: Sparkles, count: content.cards?.length || 0 },
    { key: 'tools', label: 'أدوات التقييم', icon: FileText, count: content.assessments?.length || content.protocols?.length || 0 },
  ];

  return (
    <>
      <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 60 }}
          transition={{ type: 'spring', damping: 22, stiffness: 260 }}
          className="absolute inset-y-0 left-0 w-full max-w-2xl bg-white flex flex-col shadow-2xl overflow-hidden"
          style={{ margin: '0 0 0 auto' }}
          onClick={e => e.stopPropagation()}
        >
          {/* Drawer header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="bg-slate-100 w-10 h-10 rounded-xl flex items-center justify-center">
                <StickerRenderer id={box.id} />
              </div>
              <div>
                <h3 className="font-black text-slate-800 text-base" style={{ fontFamily: 'Cairo' }}>{box.name}</h3>
                <p className="text-xs text-slate-400">{userRole === 'patient' ? 'محتوى الزائر' : 'محتوى الأخصائي'}</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 rounded-xl hover:bg-slate-100 transition-colors">
              <X size={18} className="text-slate-500" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-slate-100 px-4 flex-shrink-0 overflow-x-auto">
            {tabs.map(t => (
              <button key={t.key} onClick={() => setTab(t.key as any)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-bold whitespace-nowrap border-b-2 transition-all ${
                  tab === t.key ? 'border-[#4A8BB5] text-[#2D5F7E]' : 'border-transparent text-slate-400 hover:text-slate-600'
                }`}>
                <t.icon size={14} />
                {t.label}
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                  tab === t.key ? 'bg-[#4A8BB5]/12 text-[#2D5F7E]' : 'bg-slate-100 text-slate-400'
                }`}>{t.count}</span>
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-5">
            <AnimatePresence mode="wait">

              {/* Books tab */}
              {tab === 'books' && (
                <motion.div key="books" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3">
                  {(!content.booklets || content.booklets.length === 0) ? (
                    <div className="text-center py-12 text-slate-400">
                      <BookOpen size={36} className="mx-auto mb-3 opacity-25" />
                      <p className="text-sm">لا توجد كتب في هذا القسم</p>
                    </div>
                  ) : content.booklets.map((b: any, i: number) => (
                    <motion.div key={b.id}
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                      onClick={() => setOpenPdf(b)}
                      className="flex items-center gap-4 p-4 border border-slate-200 rounded-xl hover:border-[#4A8BB5] hover:shadow-md transition-all cursor-pointer group bg-white"
                    >
                      <div className="w-11 h-14 rounded-lg flex items-center justify-center bg-slate-100 flex-shrink-0">
                        <BookOpen size={20} style={{ color: '#4A8BB5' }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-black text-slate-700 text-sm" style={{ fontFamily: 'Cairo' }}>{b.title}</h4>
                        <p className="text-slate-400 text-xs mt-0.5 truncate">{b.subtitle}</p>
                        <div className="flex items-center gap-2 mt-1.5">
                          <span className="badge badge-primary text-xs">{b.pages} صفحة</span>
                          <span className="text-xs font-bold text-[#2D5F7E] opacity-0 group-hover:opacity-100 transition-opacity">اضغط للفتح →</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {/* Cards tab */}
              {tab === 'cards' && (
                <motion.div key="cards" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  {(!content.cards || content.cards.length === 0) ? (
                    <div className="text-center py-12 text-slate-400">
                      <Sparkles size={36} className="mx-auto mb-3 opacity-25" />
                      <p className="text-sm">لا توجد بطاقات في هذا القسم</p>
                    </div>
                  ) : (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {content.cards.map((card: any, i: number) => (
                          <motion.div key={card.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                            <FlipCard card={card} />
                          </motion.div>
                        ))}
                      </div>
                    </>
                  )}
                </motion.div>
              )}

              {/* Tools tab */}
              {tab === 'tools' && (
                <motion.div key="tools" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3">
                  {content.assessments?.map((a: any) => (
                    <InlineAssessment key={a.id} assessment={a} />
                  ))}
                  {content.protocols?.map((p: any) => (
                    <div key={p.id} className="p-5 rounded-xl border border-slate-200 bg-white">
                      <h4 className="font-black text-slate-700 mb-2 text-sm" style={{ fontFamily: 'Cairo' }}>{p.title}</h4>
                      <p className="text-slate-500 text-sm leading-relaxed">{p.content}</p>
                    </div>
                  ))}
                  {!content.assessments?.length && !content.protocols?.length && (
                    <div className="text-center py-12 text-slate-400">
                      <FileText size={36} className="mx-auto mb-3 opacity-25" />
                      <p className="text-sm">لا توجد أدوات في هذا القسم</p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* PDF modal on top of drawer */}
      <AnimatePresence>
        {openPdf && <PDFModal book={openPdf} onClose={() => setOpenPdf(null)} />}
      </AnimatePresence>
    </>
  );
}

// ────────────────────────────────────────────────────────────
// Box Card — redesigned with uniform monochrome stickers
// ────────────────────────────────────────────────────────────
function BoxCard({ box, owned, onBuy, onOpen }: { box: any; owned: boolean; onBuy: () => void; onOpen: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.32 }}
      className="relative group w-full max-w-sm mx-auto"
    >
      {/* Box body */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow flex flex-col h-full">
        {/* Box lid: Platform themed gradient */}
        <div className="relative h-40 flex items-center justify-center overflow-hidden"
          style={{ 
            background: box.id === 'box-anxiety' 
              ? 'linear-gradient(135deg, #4A8BB5 0%, #2D5F7E 100%)' 
              : box.id === 'box-ocd' 
                ? 'linear-gradient(135deg, #7FB285 0%, #2D5F7E 100%)' 
                : 'linear-gradient(135deg, #E8A87C 0%, #2D5F7E 100%)'
          }}
        >
          {/* Subtle mock pattern lines */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 right-0 h-px bg-white" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-white" />
          </div>

          {/* Black and white Sticker on Box Lid */}
          <div className="relative z-10 p-1.5 rounded-full bg-white shadow-md border border-black/10 transition-transform group-hover:scale-105">
            <StickerRenderer id={box.id} />
          </div>

          {/* Owned badge */}
          {owned && (
            <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-xl text-[10px] font-black"
              style={{ background: 'rgba(127,178,133,0.25)', color: '#a3f0b5', border: '1px solid rgba(127,178,133,0.3)' }}>
              <CheckCircle size={10} /> مفعّل
            </div>
          )}

          {/* Price tag */}
          <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg text-white/95 text-[10px] font-black"
            style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)' }}>
            {box.price} {box.currency}
          </div>
        </div>

        {/* Box info */}
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-3 mb-2">
              <div>
                <h3 className="font-black text-slate-850 text-sm sm:text-base leading-tight" style={{ fontFamily: 'Cairo' }}>{box.name}</h3>
                <p className="text-slate-450 text-[11px] font-semibold mt-0.5">{box.nameEn}</p>
              </div>
              <div className="flex items-center gap-0.5 flex-shrink-0">
                <Star size={11} className="text-amber-400 fill-amber-400" />
                <span className="text-[10px] font-bold text-slate-600">{box.rating}</span>
              </div>
            </div>

            <p className="text-slate-500 text-xs leading-relaxed mb-4 line-clamp-2" style={{ fontFamily: 'Tajawal' }}>{box.shortDesc}</p>

            {/* Content summary */}
            <div className="flex items-center gap-2 mb-4 text-[10px] text-slate-450 font-semibold" style={{ fontFamily: 'Tajawal' }}>
              <span className="flex items-center gap-1"><BookOpen size={10} /> {box.patientContent.booklets.length} كتب</span>
              <span className="text-slate-200">|</span>
              <span className="flex items-center gap-1"><Sparkles size={10} /> {box.patientContent.cards.length} بطاقة</span>
              <span className="text-slate-200">|</span>
              <span className="flex items-center gap-1"><FileText size={10} /> استبيانات</span>
            </div>
          </div>

          {/* Action */}
          {owned ? (
            <motion.button
              onClick={onOpen}
              className="w-full py-2.5 rounded-xl font-bold text-xs text-white flex items-center justify-center gap-1.5"
              style={{ background: 'linear-gradient(135deg, #2D5F7E, #4A8BB5)', boxShadow: '0 4px 14px rgba(45,95,126,0.22)' }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Sparkles size={13} /> فتح الصندوق
            </motion.button>
          ) : (
            <motion.button
              onClick={onBuy}
              className="w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all border-2"
              style={{ borderColor: '#4A8BB5', color: '#2D5F7E', background: 'rgba(74,139,181,0.04)' }}
              whileHover={{ background: '#2D5F7E', color: 'white', borderColor: '#2D5F7E', scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ShoppingBag size={13} /> اقتناء فوري
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ────────────────────────────────────────────────────────────
// Confirm Purchase Modal (no form — direct buy)
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
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-2xl p-10 text-center max-w-sm w-full shadow-2xl"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.3, 1] }}
            transition={{ duration: 0.5 }}
            className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-5"
            style={{ background: 'rgba(127,178,133,0.15)' }}
          >
            <CheckCircle size={44} style={{ color: '#7FB285' }} />
          </motion.div>
          <h3 className="text-xl font-black text-slate-800 mb-2" style={{ fontFamily: 'Cairo' }}>تم الاقتناء بنجاح! 🎉</h3>
          <p className="text-slate-450 text-sm">جاري فتح {box.name}…</p>
          <div className="mt-5 w-8 h-8 border-2 border-[#7FB285]/25 border-t-[#7FB285] rounded-full animate-spin mx-auto" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden"
      >
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
          <button onClick={onClose} className="absolute top-3 left-3 p-2 rounded-xl text-white/50 hover:text-white hover:bg-white/10 transition-all">
            <X size={16} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <h3 className="text-xl font-black text-slate-800" style={{ fontFamily: 'Cairo' }}>اقتناء {box.name}</h3>
            <p className="text-slate-500 text-sm mt-1 leading-relaxed">{box.description}</p>
          </div>

          <div className="space-y-2">
            {[
              ...box.patientContent.booklets.map((b: any) => ({ icon: '📖', label: b.title })),
              ...box.patientContent.cards.map((c: any) => ({ icon: '🃏', label: c.title })),
              { icon: '📊', label: 'أدوات تقييم نفسي معتمدة' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-slate-600">
                <CheckCircle size={10} style={{ color: '#7FB285' }} className="flex-shrink-0" />
                <span>{item.icon} {item.label}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between py-3 px-4 rounded-xl"
            style={{ background: '#F2F7FB', border: '1px solid #dde8f0' }}>
            <span className="font-bold text-slate-600 text-sm">التكلفة الإجمالية</span>
            <span className="text-2xl font-black" style={{ color: '#2D5F7E', fontFamily: 'Cairo' }}>
              {box.price} <span className="text-sm font-bold">{box.currency}</span>
            </span>
          </div>

          <div className="flex gap-3">
            <button onClick={onClose} className="btn-secondary flex-1 py-3 rounded-xl text-sm">إلغاء</button>
            <motion.button
              onClick={handleBuy}
              disabled={loading}
              className="btn-primary flex-1 py-3 rounded-xl text-sm flex items-center justify-center gap-2"
              whileHover={!loading ? { scale: 1.02 } : {}}
              whileTap={!loading ? { scale: 0.98 } : {}}
            >
              {loading
                ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> جاري…</>
                : <><ShoppingBag size={14} /> تأكيد الاقتناء المباشر</>}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// Main Page
// ────────────────────────────────────────────────────────────
export default function BoxesPage() {
  const { user, isLoading, updateUser } = useAuth();
  const router = useRouter();
  const [confirmBox, setConfirmBox] = useState<any>(null);
  const [openBox, setOpenBox] = useState<any>(null);

  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'patient')) router.push('/auth/login');
  }, [user, isLoading, router]);

  const purchasedIds: string[] = user?.purchasedBoxes || [];

  const handleConfirm = (boxId: string) => {
    updateUser({ purchasedBoxes: [...purchasedIds, boxId] });
    setConfirmBox(null);
    setOpenBox(BOXES.find(b => b.id === boxId) || null);
  };

  if (isLoading || !user) return null;

  return (
    <DashboardLayout role="patient">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-black text-slate-800" style={{ fontFamily: 'Cairo' }}>الصناديق النفسية</h1>
          <p className="text-slate-400 text-sm mt-1">أدوات علاجية حصرية مُصمَّمة من قبل خبراء نفسيين معتمدين</p>
        </div>

        {/* Owned notice */}
        {purchasedIds.length > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="flex items-center gap-3 p-4 rounded-xl text-sm font-semibold"
            style={{ background: 'rgba(127,178,133,0.1)', border: '1px solid rgba(127,178,133,0.25)', color: '#3d6b43' }}>
            <CheckCircle size={16} />
            لديك {purchasedIds.length} {purchasedIds.length === 1 ? 'صندوق' : 'صناديق'} مشتراة — اضغط «فتح الصندوق» للوصول إليها
          </motion.div>
        )}

        {/* Grid: optimized responsive sizing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {BOXES.map(box => (
            <BoxCard
              key={box.id}
              box={box}
              owned={purchasedIds.includes(box.id)}
              onBuy={() => setConfirmBox(box)}
              onOpen={() => setOpenBox(box)}
            />
          ))}
        </div>

        {/* Info section */}
        <div className="p-5 rounded-2xl flex items-start gap-4 bg-white border border-slate-200">
          <div className="text-2xl">ℹ️</div>
          <div>
            <h4 className="font-black text-slate-700 mb-1 text-sm" style={{ fontFamily: 'Cairo' }}>ما هي الصناديق النفسية؟</h4>
            <p className="text-slate-500 text-sm leading-relaxed">
              حزم أدوات علاجية شاملة تشمل كتيبات إرشادية، بطاقات علاجية تفاعلية، واستبيانات تقييم نفسي معتمدة.
              صُمِّمت بعناية من قبل أخصائيين معتمدين لمساعدتك على فهم وإدارة حالتك النفسية.
            </p>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {confirmBox && (
          <ConfirmModal
            box={confirmBox}
            onClose={() => setConfirmBox(null)}
            onConfirm={() => handleConfirm(confirmBox.id)}
          />
        )}
        {openBox && (
          <BoxDrawer
            box={openBox}
            userRole="patient"
            onClose={() => setOpenBox(null)}
          />
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
}
