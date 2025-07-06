import React from 'react';
import { Code, Palette, TrendingUp, ShoppingCart, Cpu } from 'lucide-react';
import servicesData from '@/services-data.json';

interface BentoItem {
  id: string;
  title: string;
  category: string;
  description: string;
  icon: string;
  variant: 'dark' | 'light';
  size: 'large' | 'medium' | 'small';
}

interface BentoBoxProps {
  items?: BentoItem[];
  className?: string;
}

const iconMap = {
  code: Code,
  palette: Palette,
  'trending-up': TrendingUp,
  'shopping-cart': ShoppingCart,
  cpu: Cpu,
};

const BentoBox: React.FC<BentoBoxProps> = ({ 
  items = servicesData.services as BentoItem[], 
  className = '' 
}) => {
  return (
    <div className={`w-full bg-black p-4 lg:p-6 xl:p-8 ${className}`}>
      {/* Container that centers content on large screens */}
      <div className="mx-auto max-w-none lg:max-w-7xl xl:max-w-8xl 2xl:max-w-[1600px] 3xl:max-w-[1800px]">
        
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-5 xl:gap-6 2xl:gap-7 3xl:gap-8 min-h-[600px]">
          {/* Left Column - 30% */}
          <div className="flex flex-col gap-4 lg:gap-5 xl:gap-6 2xl:gap-7 3xl:gap-8 w-full lg:w-[30%]">
            {/* Large box - Software Development */}
            <BentoCard 
              item={items[0]} 
              className="flex-1"
            />
            
            {/* Medium box - Creative Design */}
            <BentoCard 
              item={items[1]} 
              className="flex-1"
            />
          </div>

          {/* Right Column - 70% */}
          <div className="flex flex-col gap-4 lg:gap-5 xl:gap-6 2xl:gap-7 3xl:gap-8 w-full lg:w-[70%]">
            {/* Top row - Digital Marketing - TALLER */}
            <BentoCard 
              item={items[2]} 
              className="flex-1"
            />
            
            {/* Bottom row - Two boxes - SHORTER */}
            <div className="flex flex-col sm:flex-row gap-4 lg:gap-5 xl:gap-6 2xl:gap-7 3xl:gap-8 flex-1">
              <BentoCard 
                item={items[3]} 
                className="flex-1"
              />
              <BentoCard 
                item={items[4]} 
                className="flex-1"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const BentoCard: React.FC<{
  item: BentoItem;
  className?: string;
}> = ({ item, className = '' }) => {
  const IconComponent = iconMap[item.icon as keyof typeof iconMap];
  
  const baseClasses = "rounded-3xl p-6 lg:p-8 xl:p-10 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl relative overflow-hidden border backdrop-blur-sm group flex flex-col";
  
  const variantClasses = {
    dark: "bg-neutral-900/90 text-white border-[#4C4C4C] hover:border-[#AD6331] hover:bg-neutral-800/90",
    light: "bg-white text-black border-neutral-300 hover:border-neutral-400 hover:bg-gray-50"
  };

  return (
    <div className={`${baseClasses} ${variantClasses[item.variant]} ${className}`}>
      {/* Icon Circle */}
      <div className="absolute top-6 right-6 w-12 h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center shadow-lg group-hover:bg-[#AD6331]/20 group-hover:border-[#AD6331] transition-all duration-300">
        {IconComponent && (
          <IconComponent 
            size={24} 
            className="text-white lg:w-6 lg:h-6 xl:w-7 xl:h-7 opacity-80 group-hover:text-[#F4A261] transition-colors duration-300" 
          />
        )}
      </div>
      
      {/* Content */}
      <div className="h-full flex flex-col justify-between pr-16 flex-grow">
        <div>
          {/* Category */}
          <div className="text-xs lg:text-sm mb-2 lg:mb-3 font-medium tracking-wide text-[#AD6331]">
            ({item.category})
          </div>
          
          {/* Title */}
          <h3 className="text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-bold mb-4 lg:mb-5 xl:mb-6 tracking-tight leading-tight group-hover:text-white transition-colors duration-300">
            {item.title}
          </h3>
          
          {/* Description */}
          <p className="text-sm lg:text-base xl:text-lg opacity-80 leading-relaxed line-height-[1.6]">
            {item.description}
          </p>
        </div>
      </div>
      
      {/* Subtle gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/5 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );
};

export default BentoBox;
