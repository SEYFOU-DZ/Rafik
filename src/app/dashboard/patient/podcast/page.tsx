'use client';

import { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/DashboardLayout';
import { PODCASTS } from '@/lib/data';
import { 
  Play, Pause, Volume2, Sparkles, Star, Headset, 
  Lock, Check, Clock, AlertCircle, ShoppingBag, ArrowLeft
} from 'lucide-react';

function PodcastContent() {
  const { user, isLoading, updateUser } = useAuth();
  const router = useRouter();

  const [activeCategory, setActiveCategory] = useState('الكل');
  const [purchasingPod, setPurchasingPod] = useState<any>(null);
  const [buyingProgress, setBuyingProgress] = useState(false);
  const [activeTrack, setActiveTrack] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playerProgress, setPlayerProgress] = useState(35);

  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'patient')) {
      router.push('/auth/login');
    }
  }, [user, isLoading, router]);

  // Audio timer simulation
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setPlayerProgress(prev => (prev >= 100 ? 0 : prev + 1));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  if (isLoading || !user) return null;

  const purchasedList = user.purchasedPodcasts || [];

  const handleBuy = async () => {
    if (!purchasingPod) return;
    setBuyingProgress(true);
    await new Promise(r => setTimeout(r, 1200));
    
    const updated = [...purchasedList, purchasingPod.id];
    updateUser({ purchasedPodcasts: updated });
    
    setBuyingProgress(false);
    setActiveTrack(purchasingPod); // Auto play after buy
    setIsPlaying(true);
    setPlayerProgress(0);
    setPurchasingPod(null);
  };

  const categories = ['الكل', 'نوم وراحة', 'تأمل وتنفس', 'قلق واسترخاء', 'موسيقى علاجية', 'تطوير الذات'];
  
  const filtered = activeCategory === 'الكل' 
    ? PODCASTS 
    : PODCASTS.filter(p => p.category === activeCategory);

  const startTrack = (pod: any) => {
    setActiveTrack(pod);
    setIsPlaying(true);
    setPlayerProgress(0);
  };

  return (
    <DashboardLayout role="patient">
      <div className="max-w-4xl mx-auto space-y-6 pb-28 text-right">
        
        {/* Back Link */}
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-1.5 text-xs font-black text-slate-400 hover:text-slate-600 transition-colors"
        >
          <ArrowLeft size={14} /> العودة للخلف
        </button>

        {/* Header Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#4A8BB5]/10 text-[#4A8BB5] flex items-center justify-center">
            <Headset size={20} />
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-800" style={{ fontFamily: 'Cairo' }}>الجرعات الصوتية والبودكاست</h1>
            <p className="text-xs text-slate-400 font-semibold mt-0.5">محتوى صوتي وتأملات علاجية مصممة لمساعدتك على الهدوء والتعافي</p>
          </div>
        </div>

        {/* Categories Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none justify-start">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-black whitespace-nowrap transition-all border ${
                activeCategory === cat 
                  ? 'bg-slate-800 text-white border-slate-800' 
                  : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Podcasts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filtered.map(pod => {
            const isOwned = pod.isFree || purchasedList.includes(pod.id);
            const isPlayingThis = activeTrack?.id === pod.id;
            
            return (
              <motion.div
                key={pod.id}
                layoutId={pod.id}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 sm:p-5 flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden"
              >
                {/* Free Badge */}
                {pod.isFree && (
                  <span className="absolute left-3 top-3 text-[10px] font-black px-2 py-0.5 rounded bg-green-50 text-green-600">
                    مجاني
                  </span>
                )}

                <div className="space-y-4">
                  {/* Top line with Cover and Host */}
                  <div className="flex gap-3 items-center">
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl shadow-sm border border-slate-100" style={{ background: pod.gradient }}>
                      {pod.cover}
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">
                        {pod.category}
                      </span>
                      <h3 className="font-black text-slate-800 text-sm sm:text-base mt-1 truncate" style={{ fontFamily: 'Cairo' }}>{pod.title}</h3>
                      <p className="text-xs text-slate-400 font-semibold">{pod.host}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-500 leading-relaxed font-semibold h-12 overflow-hidden line-clamp-3">
                    {pod.description}
                  </p>

                  {/* Rating and listens */}
                  <div className="flex items-center gap-3 text-[10px] text-slate-400 font-bold border-t border-slate-50 pt-3">
                    <div className="flex items-center gap-0.5">
                      <Star size={10} className="text-amber-400 fill-amber-400" />
                      <span className="text-slate-600">{pod.rating}</span>
                    </div>
                    <span>•</span>
                    <span>{pod.duration}</span>
                    <span>•</span>
                    <span>{pod.episodes} حلقات</span>
                  </div>
                </div>

                {/* Bottom Action Section */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  {isOwned ? (
                    <button
                      onClick={() => isPlayingThis ? setIsPlaying(!isPlaying) : startTrack(pod)}
                      className={`flex-1 py-2.5 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition-all ${
                        isPlayingThis 
                          ? 'bg-[#4A8BB5] text-white' 
                          : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {isPlayingThis && isPlaying ? <Pause size={14} /> : <Play size={14} />}
                      <span>{isPlayingThis ? (isPlaying ? 'شغال حالياً' : 'استئناف الاستماع') : 'ابدأ الاستماع'}</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => setPurchasingPod(pod)}
                      className="flex-1 py-2.5 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 bg-[#4A8BB5] text-white hover:opacity-95 shadow-sm transition-all"
                    >
                      <Lock size={12} />
                      <span>اقتناء البودكاست ({pod.price} دج)</span>
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Purchase Confirmation Modal */}
        <AnimatePresence>
          {purchasingPod && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                onClick={() => setPurchasingPod(null)}
              />
              <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full relative z-10 text-center space-y-5 border border-slate-100 text-right"
              >
                <div className="flex justify-between items-center border-b border-slate-50 pb-3">
                  <h3 className="text-base font-black text-slate-800" style={{ fontFamily: 'Cairo' }}>تأكيد عملية الاقتناء</h3>
                  <button onClick={() => setPurchasingPod(null)} className="text-slate-400 hover:text-slate-600">✕</button>
                </div>

                <div className="flex gap-3 items-center p-3 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ background: purchasingPod.gradient }}>
                    {purchasingPod.cover}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">{purchasingPod.title}</h4>
                    <p className="text-xs text-slate-400">{purchasingPod.host}</p>
                  </div>
                </div>

                <div className="space-y-2 text-xs font-semibold text-slate-500">
                  <div className="flex justify-between">
                    <span>قيمة المحتوى:</span>
                    <span className="text-slate-800 font-bold">{purchasingPod.price} دج</span>
                  </div>
                  <div className="flex justify-between">
                    <span>طريقة الدفع:</span>
                    <span className="text-[#4A8BB5] font-bold">الرصيد الافتراضي للمنصة</span>
                  </div>
                </div>

                <button
                  onClick={handleBuy}
                  disabled={buyingProgress}
                  className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-black flex items-center justify-center gap-2 transition-colors mt-2"
                  style={{ fontFamily: 'Cairo' }}
                >
                  {buyingProgress ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>تأكيد الدفع والتنشيط <ShoppingBag size={14} /></>
                  )}
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Global Floating Audio Player */}
        <AnimatePresence>
          {activeTrack && (
            <motion.div
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 80, opacity: 0 }}
              className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 bg-slate-900 text-white rounded-2xl p-4 shadow-xl border border-slate-800 z-40 text-right flex flex-col gap-3"
            >
              {/* Cover + Info */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: activeTrack.gradient }}>
                  {activeTrack.cover}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-sm truncate" style={{ fontFamily: 'Cairo' }}>{activeTrack.title}</h4>
                  <p className="text-xs text-white/50 truncate">{activeTrack.host}</p>
                </div>
                <button 
                  onClick={() => { setActiveTrack(null); setIsPlaying(false); }}
                  className="text-white/40 hover:text-white text-xs"
                >
                  إغلاق
                </button>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1">
                <div className="h-1 bg-white/10 rounded-full overflow-hidden cursor-pointer">
                  <div className="h-full bg-[#4A8BB5] transition-all duration-300" style={{ width: `${playerProgress}%` }} />
                </div>
                <div className="flex justify-between text-[10px] text-white/40">
                  <span>03:15</span>
                  <span>00:00</span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Volume2 size={14} className="text-white/40" />
                  <div className="w-12 h-1 bg-white/20 rounded-full">
                    <div className="h-full bg-white rounded-full" style={{ width: '70%' }} />
                  </div>
                </div>

                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-10 h-10 rounded-full bg-white text-slate-900 flex items-center justify-center hover:scale-105 transition-transform"
                >
                  {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
                </button>

                <div className="text-[10px] font-bold text-[#7FB285] bg-[#7FB285]/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Sparkles size={10} />
                  <span>تأثير استرخائي مفعّل</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </DashboardLayout>
  );
}

export default function PodcastPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-2 border-[#4A8BB5] border-t-transparent rounded-full animate-spin" /></div>}>
      <PodcastContent />
    </Suspense>
  );
}
