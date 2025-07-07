'use client';

import React from 'react';
import { Square } from 'lucide-react';
import { StarsBackground } from '@/components/animate-ui/backgrounds/stars';

/*
  NOTE: There is a persistent TypeScript error with the <model-viewer> element below.
  This is a known issue with how some editors cache TypeScript's language server.
  The code is correct, but the error may not clear until you restart your code editor.
*/
declare global {
  interface JSX {
    IntrinsicElements: {
      'model-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        suppressHydrationWarning?: boolean;
      };
    };
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
          </h2>
          <div className="text-[#AD6331] border border-[#AD6331] p-2 hidden md:block">
            <Square size={32} strokeWidth={1} />
          </div>
        </div>

        {/* Dotted Separator */}
        <div className="w-full border-b border-dashed border-neutral-600 mb-12"></div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Left Column: Description */}
          <div className="max-w-xl">
            <p className="text-xl lg:text-2xl font-medium leading-relaxed lg:leading-loose tracking-wide">
              We&apos;re Starbreak — a creative dev studio for people who actually want shit built.
              We design and launch digital products that work hard and look good doing it. Whether it&apos;s a web app, mobile MVP, or a scrappy startup idea, we move fast and build like we mean it. No fluff, no filler — just clean design, sharp code, and projects that ship.
            </p>
          </div>

          {/* Right Column: 3D Model Viewer */}
          <div className="w-full h-96 flex items-center justify-center">
            <model-viewer
              src="https://z1yerx063o.ufs.sh/f/GN4ttTOsk7DcZUtl2QfwqnV0CiAr9JF6DdPoEx58Oh4mfgNU"
              alt="Starbreak 3D Logo"
              camera-controls
              auto-rotate
              ar
              shadow-intensity="1"
              style={{ width: '100%', height: '100%', '--poster-color': 'transparent' }}
              suppressHydrationWarning={true}
            >
            </model-viewer>
          </div>
        </div>
      </div>
    </section>
  );
}
