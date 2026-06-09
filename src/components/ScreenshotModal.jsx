import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const ScreenshotModal = ({ screenshots, initialIndex = 0, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % screenshots.length);
  }, [screenshots.length]);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length);
  }, [screenshots.length]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    document.addEventListener('keydown', handleKeyDown);
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose, goNext, goPrev]);

  return (
    <AnimatePresence>
      <motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
      >
        {/* Close Button */}
        <button
          id="screenshot-modal-close"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
        >
          <X className="w-6 h-6 text-white" />
        </button>

        {/* Counter */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/60 text-sm font-medium">
          {currentIndex + 1} / {screenshots.length}
        </div>

        {/* Previous Button */}
        {screenshots.length > 1 && (
          <button
            id="screenshot-modal-prev"
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            className="absolute left-4 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer z-10"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
        )}

        {/* Image */}
        <motion.img
          key={currentIndex}
          src={screenshots[currentIndex]}
          alt={`Battle screenshot ${currentIndex + 1}`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
        />

        {/* Next Button */}
        {screenshots.length > 1 && (
          <button
            id="screenshot-modal-next"
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            className="absolute right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer z-10"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default ScreenshotModal;
