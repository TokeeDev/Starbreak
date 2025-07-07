'use client';

import React from 'react';
import { Square, MoveUpRight } from 'lucide-react';
import { StarsBackground } from '@/components/animate-ui/backgrounds/stars';

/*
  NOTE: There is a persistent TypeScript error with the <model-viewer> element below.
  This is a known issue with how some editors cache TypeScript's language server.
  The code is correct, but the error may not clear until you restart your code editor.
*/
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': any;
    }
  }
}

export default function About() {
  return (
    <section 
      id="about" 
      className="bg-black text-white relative overflow-hidden"
    >
      <StarsBackground className="absolute inset-0 -z-10" />

      {/* Main Content */}
      <div className="container mx-auto px-4 relative z-10 py-20 lg:py-32">
        <div className="flex items-center justify-between mb-12">
          <h2 className="flex items-baseline gap-6 font-mono">
            <span className="text-6xl lg:text-8xl font-bold text-[#AD6331]">01</span>
            <span className="text-5xl lg:text-7xl font-bold tracking-wider">ABOUT*</span>
            <span className="text-2xl lg:text-3xl text-neutral-400 font-light hidden sm:inline">关于</span>
          </h2>
          <div className="text-[#AD6331] border border-[#AD6331] p-2 hidden md:block">
            <Square size={32} strokeWidth={1} />
          </div>
        </div>

        {/* Dotted Separator */}
        <div className="w-full border-b border-dashed border-neutral-600 mb-12"></div>

        {/* Main Description */}
        <div className="max-w-4xl">
          <p className="text-xl lg:text-3xl font-medium leading-relaxed lg:leading-loose tracking-wide">
            WE'RE A TEAM OF DIGITAL NATIVES WHO HAVE BEEN BUILDING AND INVESTING IN WEB TECHNOLOGIES FOR OVER 10 YEARS. FOUNDED IN 2024, STARBREAK IS DEDICATED TO HELPING BUSINESSES WITH GLOBAL ASPIRATIONS FIND INNOVATION AND ADOPTION ANYWHERE.
          </p>
        </div>
      </div>
    </section>
  );
}
