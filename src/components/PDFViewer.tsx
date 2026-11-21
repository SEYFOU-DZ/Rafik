'use client';

import { useState, useEffect } from 'react';
import { Download, ExternalLink, Maximize2, Minimize2, FileText, AlertCircle } from 'lucide-react';

interface PDFViewerProps {
  fileUrl: string;
  title?: string;
}

export default function PDFViewer({ fileUrl, title }: PDFViewerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [loadError, setLoadError] = useState(false);

  return (
    <div className={`flex flex-col w-full h-full bg-slate-900 rounded-xl overflow-hidden shadow-inner ${isFullscreen ? 'fixed inset-0 z-[1200] rounded-none' : 'min-h-[70vh] flex-1'}`}>
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-800 text-white border-b border-slate-700/60 flex-shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          <FileText size={16} className="text-[#4A8BB5] flex-shrink-0" />
          <span className="text-xs font-bold text-slate-200 truncate">{title || 'مستند PDF'}</span>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-semibold transition-colors"
            title="فتح في علامة تبويب جديدة"
          >
            <ExternalLink size={13} />
            <span className="hidden sm:inline">نافذة جديدة</span>
          </a>

          <a
            href={fileUrl}
            download
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#4A8BB5] hover:bg-[#3d7ca4] text-white text-xs font-semibold transition-colors shadow-sm"
            title="تحميل الملف"
          >
            <Download size={13} />
            <span>تحميل</span>
          </a>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 transition-colors"
            title={isFullscreen ? 'تصغير' : 'ملء الشاشة'}
          >
            {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
          </button>
        </div>
      </div>

      <div className="relative flex-1 w-full h-full min-h-[60vh] bg-slate-950 flex items-center justify-center">
        {!loadError ? (
          <iframe
            src={`${fileUrl}#toolbar=1&navpanes=1&scrollbar=1`}
            className="w-full h-full border-0 min-h-[65vh]"
            title={title || 'عارض الملفات'}
            onError={() => setLoadError(true)}
          />
        ) : (
          <div className="flex flex-col items-center justify-center p-8 text-center text-white space-y-4">
            <AlertCircle size={40} className="text-[#E8A87C]" />
            <div>
              <p className="font-bold text-base">عرض ملف PDF</p>
              <p className="text-xs text-slate-400 mt-1">يمكنك فتح الملف في نافذة مستقلة أو تحميله مباشرة للقراءة</p>
            </div>
            <div className="flex gap-3">
              <a
                href={fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center gap-2"
              >
                <ExternalLink size={14} /> فتح في نافذة جديدة
              </a>
              <a
                href={fileUrl}
                download
                className="px-4 py-2 rounded-xl bg-[#4A8BB5] hover:bg-[#3d7ca4] text-white text-xs font-bold flex items-center gap-2"
              >
                <Download size={14} /> تحميل PDF
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
