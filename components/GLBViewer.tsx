'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface GLBViewerProps {
  src: string;
  className?: string;
  interactive?: boolean;
}

export default function GLBViewer({ src, className, interactive = true }: GLBViewerProps) {
  const viewerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Add any custom event listeners or interactions
    const viewer = viewerRef.current;
    if (viewer && interactive) {
      viewer.addEventListener('load', () => {
        console.log('Model loaded successfully');
      });
    }
  }, [interactive]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      {/* @ts-expect-error model-viewer is a web component */}
      <model-viewer
        ref={viewerRef}
        src={src}
        camera-controls={interactive}
        auto-rotate={interactive}
        shadow-intensity="1"
        className="w-full h-full"
      />
    </motion.div>
  );
} 