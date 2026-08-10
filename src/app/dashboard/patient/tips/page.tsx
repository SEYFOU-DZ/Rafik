'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/DashboardLayout';
import { TIPS } from '@/lib/data';
import { Lightbulb, Heart, Brain } from 'lucide-react';

export default function TipsPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'patient')) router.push('/auth/login');
  }, [user, isLoading, router]);

  if (isLoading || !user) return null;

  const dominant = user.assessmentResult?.dominant;
  const personalizedTips = dominant === 'anxiety' ? TIPS.anxiety : dominant === 'depression' ? TIPS.depression : [];

  return (
    <DashboardLayout role="patient">
      <div className="space-y-6 max-w-4xl">
        <div>
          <h1 className="text-2xl font-black text-slate-800">النصائح والإرشادات</h1>
          <p className="text-slate-400 text-sm mt-1">
            {dominant ? 'نصائح مخصصة بناءً على نتيجة استبيانك' : 'نصائح عامة لتحسين صحتك النفسية'}
          </p>
        </div>

        {/* Personalized tips */}
        {personalizedTips.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: 'rgba(232,168,124,0.15)' }}>
                <Brain size={14} style={{ color: '#E8A87C' }} />
              </div>
              <h2 className="font-black text-slate-800">نصائح مخصصة لك ✨</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {personalizedTips.map((tip, i) => (
                <motion.div
                  key={tip.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-2xl p-5 border-2 border-dashed shadow-sm card-hover"
                  style={{ borderColor: `${tip.color}40` }}
                >
                  <div className="flex items-start gap-3">
                    <div className="text-2xl flex-shrink-0">{tip.icon}</div>
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <h3 className="font-black text-slate-800 text-sm">{tip.title}</h3>
                        <span className="badge text-xs" style={{ background: `${tip.color}15`, color: tip.color }}>{tip.category}</span>
                      </div>
                      <p className="text-slate-500 text-sm leading-relaxed">{tip.content}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* General tips */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: 'rgba(74,139,181,0.12)' }}>
              <Lightbulb size={14} style={{ color: '#4A8BB5' }} />
            </div>
            <h2 className="font-black text-slate-800">نصائح الصحة النفسية العامة</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {TIPS.general.map((tip, i) => (
              <motion.div
                key={tip.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm card-hover"
              >
                <div className="flex items-start gap-3">
                  <div className="text-2xl flex-shrink-0">{tip.icon}</div>
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <h3 className="font-black text-slate-800 text-sm">{tip.title}</h3>
                      <span className="badge badge-primary text-xs">{tip.category}</span>
                    </div>
                    <p className="text-slate-500 text-sm leading-relaxed">{tip.content}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Daily reminder card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="rounded-2xl p-6 relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #2D5F7E, #4A8BB5)' }}
        >
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white opacity-5" style={{ filter: 'blur(30px)' }} />
          <div className="relative z-10 flex items-start gap-4">
            <div className="text-3xl flex-shrink-0">💫</div>
            <div>
              <h3 className="font-black text-white mb-2">تذكّر دائماً</h3>
              <p className="text-white/80 text-sm leading-relaxed">
                الصحة النفسية رحلة وليست وجهة. كل خطوة صغيرة تقوم بها نحو العناية بنفسك هي انتصار حقيقي.
                أنت لست وحدك في هذه الرحلة — رفيقك الذكي معك في كل خطوة.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
