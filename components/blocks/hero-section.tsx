import React from 'react'
import Link from 'next/link'
import { ArrowRight, ChevronRight, Menu, X, Home, User, Settings, Phone, Github, Twitter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AnimatedGroup } from '@/components/ui/animated-group'
import { StarsBackground } from '@/components/animate-ui/backgrounds/stars'
import { NavBar } from '@/components/ui/tubelight-navbar'
import { InteractiveHoverButton } from '@/components/magicui/interactive-hover-button'
import { ConsultationForm } from '@/components/ui/consultation-form'
import { Footer } from '@/components/ui/footer'
import { cn } from '@/lib/utils'

const transitionVariants = {
    item: {
        hidden: {
            opacity: 0,
            filter: 'blur(12px)',
            y: 12,
        },
        visible: {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            transition: {
                type: 'spring' as const,
                bounce: 0.3,
                duration: 1.5,
            },
        },
    },
} as const

export function HeroSection() {
    const [showForm, setShowForm] = React.useState(false)

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
                <section className="h-screen flex items-center relative overflow-hidden">
                    {/* Glass Gradient Waves Background */}
                    <div className="absolute inset-0 -z-20">
                        <img
                            src="/Glass Gradient Waves Background 17.png"
                            alt="Glass gradient waves background"
                            className="absolute inset-0 w-full h-full object-cover"
                            width="2000"
                            height="1200"
                        />
                    </div>
                    
                    {/* Optional overlay for better text readability */}
                    <div aria-hidden className="absolute inset-0 -z-10 size-full bg-black/10" />
                    
                    <div className="relative w-full z-[60]">
                        <div className="mx-auto max-w-[90rem] px-6">
                            <div className="text-center">


                                <h1 className="max-w-7xl mx-auto font-black text-white leading-[0.9] md:leading-[0.85] tracking-tight font-['Inter','system-ui','-apple-system','BlinkMacSystemFont','Segoe_UI','Roboto','sans-serif']">
                                    <div className="text-6xl sm:text-7xl md:text-8xl lg:text-[6rem] xl:text-[7rem] 2xl:text-[8rem] whitespace-nowrap">
                                        Your Vision Our Code
                                    </div>
                                    <div className="text-6xl sm:text-7xl md:text-8xl lg:text-[6rem] xl:text-[7rem] 2xl:text-[8rem]">
                                        Zero <em className="italic text-white">Bullsh*t</em>.
                                    </div>
                                </h1>

                                <p className="max-w-3xl mx-auto mt-8 md:mt-12 text-xl md:text-2xl lg:text-3xl text-white/80 font-light leading-relaxed">
                                    We build fast and scale faster. Schedule a call.
                                </p>

                                

                                <div className="mt-12 md:mt-20 flex justify-center">
                                    <InteractiveHoverButton 
                                        className="bg-white/10 backdrop-blur-xl border border-white/20 text-white font-semibold h-16 px-10 text-lg shadow-lg shadow-white/10 hover:bg-white/20 hover:border-white/30 transition-all duration-300"
                                        onClick={() => setShowForm(true)}>
                                        Schedule a Call →
                                    </InteractiveHoverButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>   
            </main>
            <ConsultationForm 
                isVisible={showForm} 
                onClose={() => setShowForm(false)}
                calendlyUrl="YOUR_CALENDLY_LINK_HERE"
            />
        </>
    )
}

const menuItems = [
    { name: 'About', href: '#link' },
    { name: 'Services', href: '#link' },
    { name: 'Contact', href: '#link' },
    { name: 'Home', href: '#link' }
]

const navItems = [
    { name: 'About', url: '#link', icon: User },
    { name: 'Services', url: '#link', icon: Settings },
    { name: 'Work', url: '#link', icon: Home },
    { name: 'Contact', url: '#link', icon: Phone },
]

const HeroHeader = () => {
    const [menuState, setMenuState] = React.useState(false)
    const [isScrolled, setIsScrolled] = React.useState(false)

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])
    return (
        <header>
            <nav className="fixed z-50 w-full">
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
                                href="/"
                                aria-label="home"
                                className="flex items-center space-x-3">
                                <div className="h-12 w-12">
                                    <img 
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

const Logo = ({ className }: { className?: string }) => {
    return (
        <div className={cn('flex items-center', className)}>
            <img 
                src="/starbreak-logo.png" 
                alt="Starbreak" 
                className="h-16 w-auto"
                width={64}
                height={64}
            />
        </div>
    )
}