import React from 'react'
import Link from 'next/link'
import { Menu, X, Home, User, Settings } from 'lucide-react'
import { NavBar } from '@/components/ui/tubelight-navbar'
import { InteractiveHoverButton } from '@/components/magicui/interactive-hover-button'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { CountingNumber } from '@/components/animate-ui/text/counting-number';


const stats = [
    { number: 50, label: "projects", suffix: "+" },
    { number: 25, label: "clients" },
  ];

export function HeroSection() {
    return (
        <>
            <HeroHeader />
            <main className="overflow-hidden">
                <div
                    aria-hidden
                    className="z-[2] absolute inset-0 pointer-events-none isolate opacity-50 contain-strict hidden lg:block">
                    <div className="w-[35rem] h-[80rem] -translate-y-[350px] absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)]" />
                    <div className="h-[80rem] absolute left-0 top-0 w-56 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]" />
                    <div className="h-[80rem] -translate-y-[350px] absolute left-0 top-0 w-56 -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.04)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)]" />
                </div>
                <section className="min-h-screen flex items-center relative overflow-hidden py-20 rounded-b-[6rem]">
                    {/* Glass Gradient Waves Background */}
                    <div className="absolute inset-0 -z-20">
                        <Image
                            src="/Glass Gradient Waves Background 17.png"
                            alt="Glass gradient waves background"
                            className="absolute inset-0 w-full h-full object-cover"
                            width={3840}
                            height={2160}
                            quality={95}
                            priority
                            sizes="100vw"
                        />
                    </div>
                    
                    {/* Optional overlay for better text readability */}
                    <div aria-hidden className="absolute inset-0 -z-10 size-full bg-black/10" />
                    
                    <div id="home" className="relative w-full z-10">
                        <div className="mx-auto max-w-[90rem] px-6">
                            <div className="text-center">


                                <h1 className="max-w-7xl mx-auto font-black text-white leading-normal md:leading-tight tracking-tight font-['Inter','system-ui','-apple-system','BlinkMacSystemFont','Segoe_UI','Roboto','sans-serif']">
                                    <div className="text-4xl sm:text-6xl md:text-8xl lg:text-[6rem] xl:text-[7rem] 2xl:text-[8rem]">
                                        <span className="sm:hidden">Your Vision Our Code</span>
                                        <span className="hidden sm:block">Your Vision</span>
                                    </div>
                                    <div className="hidden sm:block text-4xl sm:text-6xl md:text-8xl lg:text-[6rem] xl:text-[7rem] 2xl:text-[8rem]">
                                        Our Code
                                    </div>
                                    <div className="text-4xl sm:text-6xl md:text-8xl lg:text-[6rem] xl:text-[7rem] 2xl:text-[8rem]">
                                        Zero <em className="italic text-white">Bullsh*t</em>.
                                    </div>
                                </h1>

                                <p className="max-w-3xl mx-auto mt-8 md:mt-12 text-lg md:text-xl lg:text-2xl text-white/80 font-light leading-relaxed">
                                    We build fast and scale faster. Schedule a call.
                                </p>

                                

                                <div className="mt-12 md:mt-20 flex justify-center">
                                    <a 
                                        href="https://cal.com/christian-fztuyy/30min?overlayCalendar=true&date=2025-07-11"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <InteractiveHoverButton 
                                            className="bg-white/10 backdrop-blur-xl border border-white/20 text-white font-semibold h-16 px-10 text-lg shadow-lg shadow-white/10 hover:bg-white/20 hover:border-white/30 transition-all duration-300"
                                        >
                                            Schedule a Call →
                                        </InteractiveHoverButton>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="mt-16 md:mt-24 text-white">
                            <div className="max-w-5xl mx-auto flex flex-row items-center justify-center gap-8 md:gap-32">
                                {stats.map((stat, idx) => (
                                <div key={idx} className="text-center">
                                    <p className="text-4xl md:text-5xl font-bold flex items-center justify-center">
                                        <CountingNumber number={stat.number} />
                                        {stat.suffix}
                                    </p>
                                    <p className="text-sm md:text-base text-neutral-400 mt-2">{stat.label}</p>
                                </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

const menuItems = [
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Work', href: '#work' },
    { name: 'Home', href: '#home' }
]

const navItems = [
    { name: 'About', url: '#about', icon: User },
    { name: 'Services', url: '#services', icon: Settings },
    { name: 'Work', url: '#work', icon: Home },
]

const HeroHeader = () => {
    const [menuState, setMenuState] = React.useState(false)
    return (
        <header>
            <nav className="fixed z-[100] w-full">
                {/* Desktop Navigation - Tubelight Navbar */}
                <div className="hidden lg:block">
                    <NavBar 
                        items={navItems} 
                        showLogo={true}
                        logoSrc="/starbreak-logo.png"
                        brandName="Starbreak"
                    />
                </div>

                {/* Mobile Navigation */}
                <div className="lg:hidden">
                    <div className="bg-black/20 backdrop-blur-xl border-b border-white/10 px-6 py-4">
                        <div className="flex items-center justify-between">
                            {/* Logo and Brand */}
                            <Link
                                href="#home"
                                aria-label="home"
                                className="flex items-center space-x-1"
                                onClick={(e) => {
                                    e.preventDefault();
                                    const homeElement = document.getElementById('home');
                                    if (homeElement) {
                                        homeElement.scrollIntoView({ behavior: 'smooth' });
                                    }
                                    setMenuState(false);
                                }}>
                                <div className="h-12 w-12">
                                    <Image 
                                        src="/starbreak-logo.png" 
                                        alt="Starbreak" 
                                        className="h-12 w-auto"
                                        width={48}
                                        height={48}
                                    />
                                </div>
                                <span className="text-white font-bold text-xl">Starbreak</span>
                            </Link>

                            {/* Mobile Menu Button */}
                            <button
                                onClick={() => setMenuState(!menuState)}
                                aria-label={menuState ? 'Close Menu' : 'Open Menu'}
                                className="relative z-20 p-3 text-white">
                                <Menu className={cn("size-8 duration-200", menuState && "rotate-180 scale-0 opacity-0")} />
                                <X className={cn("absolute inset-3 size-8 duration-200", menuState ? "rotate-0 scale-100 opacity-100" : "-rotate-180 scale-0 opacity-0")} />
                            </button>
                        </div>

                        {/* Mobile Menu */}
                        <div className={cn(
                            "mt-4 pt-4 border-t border-white/10",
                            menuState ? "block" : "hidden"
                        )}>
                            <div className="flex flex-col space-y-4">
                                {menuItems.map((item, index) => (
                                    <Link
                                        key={index}
                                        href={item.href}
                                        className="text-white/80 hover:text-white transition-colors duration-200 py-3 text-xl font-semibold"
                                        onClick={() => setMenuState(false)}>
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}

