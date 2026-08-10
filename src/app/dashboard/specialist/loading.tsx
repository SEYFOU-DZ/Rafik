'use client';

export default function Loading() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div className="space-y-2">
        <div className="w-48 h-8 skeleton" />
        <div className="w-72 h-4 skeleton" />
      </div>
      <div className="w-full h-40 rounded-2xl skeleton" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl skeleton" />
            <div className="w-16 h-6 skeleton" />
            <div className="w-24 h-4 skeleton" />
          </div>
        ))}
      </div>
    </div>
  );
}
