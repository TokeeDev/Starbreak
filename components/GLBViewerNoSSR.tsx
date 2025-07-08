'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface GLBViewerProps {
  src: string;
  className?: string;
  interactive?: boolean;
}

export default function GLBViewerNoSSR({ src, className, interactive = true }: GLBViewerProps) {
  const [isClient, setIsClient] = useState(false);
  const viewerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const viewer = viewerRef.current;
    if (viewer && interactive && isClient) {
      viewer.addEventListener('load', () => {
        console.log('Model loaded successfully');
      });
    }
  }, [interactive, isClient]);

  if (!isClient) {
    // Placeholder during SSR
    return (
      <div className={className}>
        <div className="w-full h-full bg-neutral-900 rounded-lg flex items-center justify-center">
          <div className="text-white animate-pulse">Loading 3D Model...</div>
        </div>
      </div>
    );
  }

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