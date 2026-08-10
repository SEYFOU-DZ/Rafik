'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Download } from 'lucide-react';

// Dynamically imported to avoid SSR issues
let pdfjsLib: any = null;

interface PDFViewerProps {
  fileUrl: string;
}

export default function PDFViewer({ fileUrl }: PDFViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.3);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [canvasRef, setCanvasRef] = useState<HTMLCanvasElement | null>(null);
  const [pdfDoc, setPdfDoc] = useState<any>(null);
  const [rendering, setRendering] = useState(false);

  // Load pdfjs dynamically
  useEffect(() => {
    const loadPdfJs = async () => {
      try {
        const pdfjs = await import('pdfjs-dist');
        // Use local worker copy
        pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
        pdfjsLib = pdfjs;
        loadDocument();
      } catch (err) {
        console.error('Failed to load pdfjs:', err);
        setError('تعذّر تحميل مكتبة عرض PDF');
        setLoading(false);
      }
    };
    loadPdfJs();
  }, [fileUrl]);

  const loadDocument = async () => {
    if (!pdfjsLib) return;
    try {
      setLoading(true);
      setError(null);
      const loadingTask = pdfjsLib.getDocument(fileUrl);
      const doc = await loadingTask.promise;
      setPdfDoc(doc);
      setNumPages(doc.numPages);
      setPageNumber(1);
      setLoading(false);
    } catch (err: any) {
      console.error('PDF load error:', err);
      setError('تعذّر تحميل ملف PDF. تحقق من الملف أو حمّله مباشرة.');
      setLoading(false);
    }
  };

  // Render page on canvas
  useEffect(() => {
    if (!pdfDoc || !canvasRef || rendering) return;

    const renderPage = async () => {
      setRendering(true);
      try {
        const page = await pdfDoc.getPage(pageNumber);
        const viewport = page.getViewport({ scale });
        const canvas = canvasRef;
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        await page.render({ canvasContext: context!, viewport }).promise;
      } catch (err) {
        console.error('Render error:', err);
      } finally {
        setRendering(false);
      }
    };

    renderPage();
  }, [pdfDoc, pageNumber, scale, canvasRef]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-4 text-center px-6">
        <div className="text-5xl">📄</div>
        <p className="text-slate-600 font-bold" style={{ fontFamily: 'Cairo' }}>لا يمكن عرض الملف في المتصفح</p>
        <p className="text-slate-400 text-sm">يمكنك تحميل الملف مباشرة للقراءة</p>
        <a
          href={fileUrl}
          download
          className="btn-primary px-6 py-2.5 rounded-xl text-sm flex items-center gap-2"
        >
          <Download size={14} /> تحميل الملف
        </a>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full">
      {/* Controls bar */}
      <div className="flex items-center gap-2 mb-4 px-4 py-2.5 bg-white rounded-xl shadow-sm border border-slate-100 sticky top-2 z-10">
        <button
          onClick={() => setScale(s => Math.max(0.6, +(s - 0.2).toFixed(1)))}
          className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          title="تصغير"
        >
          <ZoomOut size={15} className="text-slate-600" />
        </button>
        <span className="text-xs font-bold text-slate-600 w-10 text-center">{Math.round(scale * 100)}%</span>
        <button
          onClick={() => setScale(s => Math.min(2.5, +(s + 0.2).toFixed(1)))}
          className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          title="تكبير"
        >
          <ZoomIn size={15} className="text-slate-600" />
        </button>

        <div className="w-px h-5 bg-slate-200 mx-1" />

        <button
          onClick={() => setPageNumber(p => Math.max(1, p - 1))}
          disabled={pageNumber <= 1}
          className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors disabled:opacity-35"
        >
          <ChevronRight size={15} className="text-slate-600" />
        </button>
        <span className="text-xs font-bold text-slate-600 whitespace-nowrap">
          {pageNumber} / {numPages || '—'}
        </span>
        <button
          onClick={() => setPageNumber(p => Math.min(numPages, p + 1))}
          disabled={pageNumber >= numPages}
          className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors disabled:opacity-35"
        >
          <ChevronLeft size={15} className="text-slate-600" />
        </button>

        <div className="w-px h-5 bg-slate-200 mx-1" />

        <a href={fileUrl} download className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors" title="تحميل">
          <Download size={15} className="text-slate-600" />
        </a>
      </div>

      {/* Canvas area */}
      <div className="relative w-full flex justify-center">
        {(loading || rendering) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-slate-50/80 z-10 rounded-xl min-h-64">
            <div className="w-10 h-10 border-2 border-[#4A8BB5]/20 border-t-[#4A8BB5] rounded-full animate-spin" />
            <p className="text-slate-400 text-sm" style={{ fontFamily: 'Tajawal' }}>
              {loading ? 'جاري تحميل الكتاب...' : 'جاري عرض الصفحة...'}
            </p>
          </div>
        )}
        <canvas
          ref={el => setCanvasRef(el)}
          className="shadow-lg rounded-lg max-w-full"
          style={{ display: loading ? 'none' : 'block' }}
        />
      </div>

      {/* Page dots */}
      {numPages > 1 && (
        <div className="flex items-center gap-1.5 mt-4 flex-wrap justify-center">
          {Array.from({ length: Math.min(numPages, 12) }, (_, i) => i + 1).map(p => (
            <button
              key={p}
              onClick={() => setPageNumber(p)}
              className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                pageNumber === p
                  ? 'text-white shadow-sm'
                  : 'bg-white text-slate-400 border border-slate-200 hover:border-[#4A8BB5]'
              }`}
              style={pageNumber === p ? { background: '#4A8BB5' } : {}}
            >
              {p}
            </button>
          ))}
          {numPages > 12 && (
            <span className="text-slate-400 text-xs">... {numPages} صفحة</span>
          )}
        </div>
      )}
    </div>
  );
}
