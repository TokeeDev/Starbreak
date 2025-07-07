"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  name: string
  url: string
  icon: LucideIcon
}

interface NavBarProps {
  items: NavItem[]
  className?: string
  showLogo?: boolean
  logoSrc?: string
  brandName?: string
}

export function NavBar({ items, className, showLogo = false, logoSrc, brandName }: NavBarProps) {
  const [activeTab, setActiveTab] = useState(items[0].name)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div
      className={cn(
        "fixed top-4 left-0 right-0 z-50 flex justify-center pointer-events-none",
        className,
      )}
    >
      <div className="flex items-center gap-2 bg-black/20 border border-white/10 backdrop-blur-xl py-2 px-4 rounded-full shadow-lg pointer-events-auto">
        {showLogo && logoSrc && brandName && (
          <Link
            href="#home"
            className="flex items-center space-x-2 mr-4"
            onClick={(e) => {
              e.preventDefault();
              const homeElement = document.getElementById('home');
              if (homeElement) {
                homeElement.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            <img 
              src={logoSrc} 
              alt={brandName} 
              className="h-10 w-auto"
              width={40}
              height={40}
            />
            <span className="text-white font-bold text-xl">{brandName}</span>
          </Link>
        )}
        {items.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.name

          return (
            <Link
              key={item.name}
              href={item.url}
              onClick={() => setActiveTab(item.name)}
              className={cn(
                "relative cursor-pointer text-base font-semibold px-4 py-2 rounded-full transition-colors",
                "text-white/80 hover:text-white",
                isActive && "bg-white/10 text-white",
              )}
            >
              <span className="hidden md:inline">{item.name}</span>
              <span className="md:hidden">
                <Icon size={18} strokeWidth={2.5} />
              </span>
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full bg-white/5 rounded-full -z-10"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-white rounded-t-full">
                    <div className="absolute w-12 h-6 bg-white/20 rounded-full blur-md -top-2 -left-2" />
                    <div className="absolute w-8 h-6 bg-white/20 rounded-full blur-md -top-1" />
                    <div className="absolute w-4 h-4 bg-white/20 rounded-full blur-sm top-0 left-2" />
                  </div>
                </motion.div>
              )}
            </Link>
          )
        })}
      </div>
    </div>
  )
} 