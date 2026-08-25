import React, { useState, useRef, useCallback } from 'react';
import { Sparkles, ArrowLeftRight } from 'lucide-react';
import { BeforeAfterData } from '../../types';

interface BeforeAfterSliderProps {
  data: BeforeAfterData;
  title?: string;
  className?: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  data,
  title,
  className = '',
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const width = rect.width;
    const percentage = Math.max(0, Math.min(100, (x / width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {title && (
        <div className="flex items-center justify-between">
          <h3 className="text-base sm:text-lg font-bold text-charcoal-950 dark:text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-brand-600 dark:text-brand-400" />
            {title}
          </h3>
          <span className="text-xs text-charcoal-500 font-mono flex items-center gap-1">
            <ArrowLeftRight className="w-3.5 h-3.5" /> Drag to compare
          </span>
        </div>
      )}

      {/* Interactive slider frame */}
      <div
        ref={containerRef}
        className="relative aspect-[16/10] sm:aspect-[16/9] w-full select-none rounded-2xl overflow-hidden border border-charcoal-200 dark:border-charcoal-800 bg-charcoal-950 shadow-xl cursor-ew-resize"
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
      >
        {/* AFTER Image (Full container underneath) */}
        <img
          src={data.afterImage}
          alt={data.afterLabel || 'After Custom Transformation'}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />

        {/* AFTER Label Badge */}
        <div className="absolute top-4 right-4 z-10 bg-black/80 dark:bg-charcoal-950/90 border border-emerald-500/50 text-emerald-400 text-xs font-bold px-3 py-1.5 rounded-lg shadow-md backdrop-blur-sm pointer-events-none uppercase tracking-wider font-mono">
          {data.afterLabel || 'Custom Solution (After)'}
        </div>

        {/* BEFORE Image (Clipped with inset percentage) */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{ width: `${sliderPosition}%` }}
        >
          <img
            src={data.beforeImage}
            alt={data.beforeLabel || 'Before - Raw Container'}
            className="absolute inset-0 w-full h-full object-cover max-w-none"
            style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%' }}
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* BEFORE Label Badge */}
        <div className="absolute top-4 left-4 z-10 bg-black/80 dark:bg-charcoal-950/90 border border-charcoal-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-md backdrop-blur-sm pointer-events-none uppercase tracking-wider font-mono">
          {data.beforeLabel || 'Raw Container (Before)'}
        </div>

        {/* Dividing Slider Handle Bar */}
        <div
          className="absolute top-0 bottom-0 z-20 w-1 bg-brand-500 shadow-[0_0_12px_rgba(220,38,38,0.8)]"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-charcoal-950 border-2 border-brand-500 text-brand-400 flex items-center justify-center shadow-2xl">
            <ArrowLeftRight className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Summary caption */}
      {data.transformationSummary && (
        <p className="text-xs sm:text-sm text-charcoal-700 dark:text-charcoal-300 bg-white dark:bg-charcoal-900 border border-charcoal-200 dark:border-charcoal-800 p-3.5 rounded-xl">
          <span className="font-bold text-brand-700 dark:text-brand-400">Transformation: </span>
          {data.transformationSummary}
        </p>
      )}
    </div>
  );
};
