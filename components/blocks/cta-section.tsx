'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { Sparkles, Zap, Rocket, Square } from 'lucide-react';
import { StarsBackground } from '@/components/animate-ui/backgrounds/stars';
import { InteractiveHoverButton } from '@/components/magicui/interactive-hover-button';

const CTASection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { stiffness: 150, damping: 15 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 15 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / 20;
        const y = (e.clientY - rect.top - rect.height / 2) / 20;
        
        mouseX.set(x);
        mouseY.set(y);
        setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, [mouseX, mouseY]);

  const floatingIcons = [
    { Icon: Sparkles, delay: 0, duration: 3 },
    { Icon: Zap, delay: 1, duration: 4 },
    { Icon: Rocket, delay: 2, duration: 3.5 },
  ];

  return (
    <section 
      ref={containerRef}
      id="contact"
      className="relative bg-black text-white overflow-hidden py-12 lg:py-16"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated Stars Background */}
      <StarsBackground className="absolute inset-0 -z-20" />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 -z-10">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-[#AD6331]/20 via-black/50 to-purple-900/20"
          animate={{
            background: isHovered 
              ? "linear-gradient(135deg, rgba(173, 99, 49, 0.3) 0%, rgba(0, 0, 0, 0.6) 50%, rgba(147, 51, 234, 0.3) 100%)"
              : "linear-gradient(135deg, rgba(173, 99, 49, 0.2) 0%, rgba(0, 0, 0, 0.5) 50%, rgba(147, 51, 234, 0.2) 100%)"
          }}
          transition={{ duration: 0.8 }}
        />
      </div>

      {/* Floating Orbs - Hide on mobile for performance */}
      <div className="absolute inset-0 -z-5 hidden md:block">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-96 h-96 rounded-full"
            style={{
              background: `radial-gradient(circle, ${
                i % 2 === 0 ? 'rgba(173, 99, 49, 0.1)' : 'rgba(147, 51, 234, 0.1)'
              } 0%, transparent 70%)`,
              left: `${20 + (i * 15)}%`,
              top: `${10 + (i * 10)}%`,
            }}
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Floating Icons - Hide on mobile */}
      <div className="hidden lg:block">
        {floatingIcons.map(({ Icon, delay, duration }, index) => (
          <motion.div
            key={index}
            className="absolute text-[#AD6331]/30"
            style={{
              left: `${20 + index * 30}%`,
              top: `${20 + index * 20}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              rotate: [0, 180, 360],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Icon size={48} />
          </motion.div>
        ))}
      </div>

      {/* Mouse Follower Effect - Desktop only */}
      {isHovered && (
        <motion.div
          className="absolute pointer-events-none z-10 hidden lg:block"
          style={{
            left: mousePosition.x - 100,
            top: mousePosition.y - 100,
          }}
        >
          <div className="w-52 h-52 rounded-full bg-gradient-radial from-[#AD6331]/20 to-transparent blur-xl" />
        </motion.div>
      )}

      {/* Section Header */}
      <div className="container mx-auto px-4 relative z-20">
        <div className="flex items-center justify-between md:justify-end mb-8">
          <h2 className="flex items-baseline gap-3 md:gap-6 font-mono text-left md:text-right">
            <span className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-wider">CONTACT*</span>
            <span className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-[#AD6331]">04</span>
          </h2>
          <div className="text-[#AD6331] border border-[#AD6331] p-2 hidden md:block ml-6">
            <Square size={32} strokeWidth={1} />
          </div>
        </div>

        {/* Dotted Separator */}
        <div className="w-full border-b border-dashed border-neutral-600 mb-8 md:mb-12"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-20">
        <motion.div
          className="max-w-6xl mx-auto text-center"
          style={{ x: springX, y: springY }}
        >
          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-6 md:mb-8"
          >
            <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl xl:text-9xl font-black leading-tight mb-4">
              <span className="block">Ready to</span>
              <span className="block bg-gradient-to-r from-[#AD6331] via-white to-purple-400 bg-clip-text text-transparent">
                Build Something
              </span>
              <span className="block">Epic?</span>
            </h3>
          </motion.div>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="max-w-4xl mx-auto mb-12 md:mb-16 px-4"
          >
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-neutral-300 leading-relaxed">
              Stop wasting time with agencies that talk big but deliver small. 
              <span className="text-white font-semibold"> Let&apos;s build your vision together.</span>
            </p>
          </motion.div>

          {/* CTA Button Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="relative px-4"
          >
            <a 
              href="https://cal.com/christian-fztuyy/30min?overlayCalendar=true&date=2025-07-11"
              target="_blank"
              rel="noopener noreferrer"
            >
              <InteractiveHoverButton 
                className="bg-white/10 backdrop-blur-xl border border-white/20 text-white font-semibold h-14 md:h-16 px-8 md:px-10 text-base md:text-lg shadow-lg shadow-white/10 hover:bg-white/20 hover:border-white/30 transition-all duration-300 w-full sm:w-auto"
              >
                Schedule a Call →
              </InteractiveHoverButton>
            </a>

            {/* Additional CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="mt-8 md:mt-12 flex flex-col gap-4 md:gap-6 justify-center items-center"
            >
              <div className="flex items-center gap-2 text-neutral-400">
                <Sparkles className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                <span className="text-sm md:text-lg">Free 30-minute consultation</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-400">
                <Zap className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                <span className="text-sm md:text-lg">Same-day response guaranteed</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Bottom Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="mt-16 md:mt-24 grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto px-4"
          >
            {[
              { stat: "24hrs", label: "Average Response Time" },
              { stat: "100%", label: "Client Satisfaction" },
              { stat: "2-4wks", label: "Typical Project Timeline" },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#AD6331] mb-2">{item.stat}</div>
                <div className="text-sm sm:text-base text-neutral-400">{item.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
};

export default CTASection;
