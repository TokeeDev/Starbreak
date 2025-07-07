import React from 'react';
import BentoBox from '../ui/bentobox';

export function Services() {
    return (
        <section 
            id="services" 
            className="bg-black text-white py-12 lg:py-16 relative overflow-hidden"
        >
            {/* Background Image */}
            <div 
                className="absolute inset-0 bg-contain bg-center opacity-10"
                style={{ backgroundImage: "url('/world-map-dots.png')" }}
            ></div>

            {/* Main Content */}
            <div className="container mx-auto px-4 relative z-10">
                <div className="flex items-center justify-end mb-8">
                    <h2 className="flex items-baseline gap-6 font-mono text-right">
                        <span className="text-5xl lg:text-7xl font-bold tracking-wider">SERVICES*</span>
                        <span className="text-6xl lg:text-8xl font-bold text-[#AD6331]">02</span>
                    </h2>
                </div>

                {/* Dotted Separator */}
                <div className="w-full border-b border-dashed border-neutral-600 mb-8"></div>

                {/* Bento Box Grid */}
                <BentoBox />
            </div>
        </section>
    );
}
