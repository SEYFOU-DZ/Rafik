'use client';

import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header skeleton */}
      <div className="space-y-2">
        <div className="w-48 h-8 skeleton" />
        <div className="w-80 h-4 skeleton" />
      </div>

      {/* Main card skeleton */}
      <div className="w-full h-44 rounded-2xl skeleton" />

      {/* Grid of cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="bg-white border border-slate-100 rounded-2xl p-5 space-y-4 shadow-sm">
            <div className="w-full h-32 rounded-xl skeleton" />
            <div className="w-2/3 h-5 skeleton" />
            <div className="w-1/2 h-4 skeleton" />
            <div className="w-full h-10 rounded-xl skeleton" />
          </div>
        ))}
      </div>
    </div>
  );
}
