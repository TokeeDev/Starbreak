/*
	Installed from https://reactbits.dev/ts/tailwind/
*/

import React, { useState, useEffect } from "react";
import { gsap } from "gsap";

interface FlowingMenuItemData {
  link: string;
  text: string;
  image: string;
}

interface MenuItemProps extends FlowingMenuItemData {
  onClick: () => void;
  isMobile: boolean;
}

interface FlowingMenuProps<T extends FlowingMenuItemData> {
  items?: T[];
  onItemClick: (item: T) => void;
}

const FlowingMenu = <T extends FlowingMenuItemData>({ items = [], onItemClick }: FlowingMenuProps<T>) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      // Using 768px as the breakpoint for mobile
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="w-full h-full overflow-hidden">
      <nav className="flex flex-col h-full m-0 p-0">
        {items.map((item, idx) => (
          <MenuItem key={idx} {...item} onClick={() => onItemClick(item)} isMobile={isMobile} />
        ))}
      </nav>
    </div>
  );
};

const MenuItem: React.FC<MenuItemProps> = ({ text, image, onClick, isMobile }) => {
  const itemRef = React.useRef<HTMLDivElement>(null);
  const marqueeRef = React.useRef<HTMLDivElement>(null);
  const marqueeInnerRef = React.useRef<HTMLDivElement>(null);

  const animationDefaults = { duration: 0.6, ease: "expo" };

  const findClosestEdge = (
    mouseX: number,
    mouseY: number,
    width: number,
    height: number,
  ): "top" | "bottom" => {
    const topEdgeDist = Math.pow(mouseX - width / 2, 2) + Math.pow(mouseY, 2);
    const bottomEdgeDist =
      Math.pow(mouseX - width / 2, 2) + Math.pow(mouseY - height, 2);
    return topEdgeDist < bottomEdgeDist ? "top" : "bottom";
  };

  const handleMouseEnter = (ev: React.MouseEvent<HTMLButtonElement>) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current)
      return;
    const rect = itemRef.current.getBoundingClientRect();
    const edge = findClosestEdge(
      ev.clientX - rect.left,
      ev.clientY - rect.top,
      rect.width,
      rect.height,
    );

    const tl = gsap.timeline({ defaults: animationDefaults });
    tl.set(marqueeRef.current, { y: edge === "top" ? "-101%" : "101%" })
      .set(marqueeInnerRef.current, { y: edge === "top" ? "101%" : "-101%" })
      .to([marqueeRef.current, marqueeInnerRef.current], { y: "0%" });
  };

  const handleMouseLeave = (ev: React.MouseEvent<HTMLButtonElement>) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current)
      return;
    const rect = itemRef.current.getBoundingClientRect();
    const edge = findClosestEdge(
      ev.clientX - rect.left,
      ev.clientY - rect.top,
      rect.width,
      rect.height,
    );

    const tl = gsap.timeline({ defaults: animationDefaults }) as TimelineMax;
    tl.to(marqueeRef.current, { y: edge === "top" ? "-101%" : "101%" }).to(
      marqueeInnerRef.current,
      { y: edge === "top" ? "101%" : "-101%" },
    );
  };

  const repeatedMarqueeContent = React.useMemo(() => {
    const repeatCount = isMobile ? 2 : 4;
    const bgClass = isMobile
      ? "bg-contain bg-center bg-no-repeat"
      : "bg-cover bg-center";

    return Array.from({ length: repeatCount }).map((_, idx) => (
      <React.Fragment key={idx}>
        <span className="text-[#060010] uppercase font-normal text-xl md:text-2xl p-2">
          {text}
        </span>
        <div
          className={`w-48 sm:w-64 h-32 sm:h-40 mx-4 rounded-lg ${bgClass}`}
          style={{ backgroundImage: `url(${image})` }}
        />
      </React.Fragment>
    ));
  }, [text, image, isMobile]);

  return (
    <div
      className="flex-1 relative overflow-hidden text-center shadow-[0_-1px_0_0_#fff]"
      ref={itemRef}
    >
      <button
        className="flex items-center justify-center h-full w-full relative cursor-pointer uppercase no-underline font-semibold text-white text-2xl md:text-3xl lg:text-4xl xl:text-5xl hover:text-[#060010] focus:text-white focus-visible:text-[#060010]"
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {text}
      </button>
      <div
        className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none bg-white translate-y-[101%]"
        ref={marqueeRef}
      >
        <div className="h-full w-full flex" ref={marqueeInnerRef}>
          <div className="flex items-center justify-center relative h-full w-full will-change-transform animate-marquee">
            {repeatedMarqueeContent}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlowingMenu;

