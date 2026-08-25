import React, { useState } from 'react';
import { Expand, ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageGalleryProps {
  images: string[];
  title: string;
  className?: string;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ images, title, className = '' }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const displayImages = images && images.length > 0 ? images : [
    'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80'
  ];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? displayImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === displayImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Main viewport */}
      <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden bg-charcoal-100 dark:bg-charcoal-900 border border-charcoal-200 dark:border-charcoal-800 group shadow-md">
        <img
          src={displayImages[activeIndex]}
          alt={`${title} - View ${activeIndex + 1}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

        {/* Counter badge */}
        <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm border border-white/10 px-2.5 py-1 rounded-md text-xs font-mono text-white">
          Photo {activeIndex + 1} of {displayImages.length}
        </div>

        {/* Fullscreen view button */}
        <button
          onClick={() => setIsFullscreen(true)}
          className="absolute top-3 right-3 bg-black/70 hover:bg-brand-700 text-white p-2 rounded-lg backdrop-blur-sm border border-white/10 transition-all opacity-90 sm:opacity-0 group-hover:opacity-100"
          aria-label="Expand image"
        >
          <Expand className="w-4 h-4" />
        </button>

        {/* Nav arrows if multiple images */}
        {displayImages.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-brand-700 text-white p-2 rounded-full backdrop-blur-sm border border-white/10 transition-all opacity-80 sm:opacity-0 group-hover:opacity-100"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-brand-700 text-white p-2 rounded-full backdrop-blur-sm border border-white/10 transition-all opacity-80 sm:opacity-0 group-hover:opacity-100"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails row */}
      {displayImages.length > 1 && (
        <div className="flex gap-2.5 overflow-x-auto pb-1.5 scrollbar-thin">
          {displayImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`relative flex-shrink-0 w-20 h-14 sm:w-24 sm:h-16 rounded-xl overflow-hidden border-2 transition-all ${
                activeIndex === idx
                  ? 'border-brand-700 ring-2 ring-brand-700/30'
                  : 'border-charcoal-200 dark:border-charcoal-800 opacity-60 hover:opacity-100'
              }`}
            >
              <img
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      {isFullscreen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-4"
          onClick={() => setIsFullscreen(false)}
        >
          <div className="relative max-w-5xl w-full max-h-[85vh] flex items-center justify-center">
            <img
              src={displayImages[activeIndex]}
              alt={title}
              className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl border border-charcoal-800"
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsFullscreen(false);
              }}
              className="absolute top-4 right-4 bg-charcoal-900/90 text-white p-2.5 rounded-full hover:bg-brand-700 transition-colors"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
