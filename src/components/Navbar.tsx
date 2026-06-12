/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { LogoIcon } from './LogoIcon';
import { Menu, X, ArrowUpRight, Sparkles, Coins, Flame, Compass, Info, Terminal } from 'lucide-react';
import { motion, Variants } from 'framer-motion';

interface NavbarProps {
  currentPage: 'home' | 'about' | 'calculator' | 'reserve';
  onChangePage: (page: 'home' | 'about' | 'calculator' | 'reserve') => void;
  onOpenWallet?: () => void;
  onOpenTerminal?: () => void;
}

interface HoverGradientMenuItem {
  icon: React.ReactNode;
  label: string;
  page: 'home' | 'about' | 'calculator' | 'reserve';
  gradient: string;
  iconColor: string;
}

const menuItems: HoverGradientMenuItem[] = [
  { 
    icon: <Flame className="h-4 w-4" />, 
    label: "Exposition", 
    page: "home", 
    gradient: "radial-gradient(circle, rgba(255,224,113,0.2) 0%, rgba(255,224,113,0.05) 50%, rgba(255,224,113,0) 100%)", 
    iconColor: "group-hover:text-[#FFE071] text-[#FFE071]/85" 
  },
  { 
    icon: <Coins className="h-4 w-4" />, 
    label: "Gold Calculator", 
    page: "calculator", 
    gradient: "radial-gradient(circle, rgba(251,191,36,0.2) 0%, rgba(251,191,36,0.05) 50%, rgba(251,191,36,0) 100%)", 
    iconColor: "group-hover:text-amber-400 text-amber-400/85" 
  },
  { 
    icon: <Sparkles className="h-4 w-4" />, 
    label: "About Us", 
    page: "about", 
    gradient: "radial-gradient(circle, rgba(253,224,71,0.2) 0%, rgba(253,224,71,0.05) 50%, rgba(253,224,71,0) 100%)", 
    iconColor: "group-hover:text-yellow-300 text-yellow-300/85" 
  },
  { 
    icon: <Compass className="h-4 w-4" />, 
    label: "Atelier Desk", 
    page: "reserve", 
    gradient: "radial-gradient(circle, rgba(52,211,153,0.2) 0%, rgba(16,185,129,0.05) 50%, rgba(4,120,87,0) 100%)", 
    iconColor: "group-hover:text-emerald-400 text-emerald-400/85" 
  }
];

// 3D Flip Card animation variants
const itemVariants: Variants = {
  initial: { rotateX: 0, opacity: 1 },
  hover: { rotateX: -90, opacity: 0 },
};

const backVariants: Variants = {
  initial: { rotateX: 90, opacity: 0 },
  hover: { rotateX: 0, opacity: 1 },
};

const glowVariants: Variants = {
  initial: { opacity: 0, scale: 0.8 },
  hover: {
    opacity: 1,
    scale: 1.8,
    transition: {
      opacity: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
      scale: { duration: 0.4, type: "spring", stiffness: 300, damping: 22 },
    },
  },
};

const sharedTransition = {
  type: "spring" as const,
  stiffness: 110,
  damping: 18,
  duration: 0.4,
};

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onChangePage, onOpenWallet, onOpenTerminal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run initially
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 px-4 sm:px-10 transition-all duration-300 pointer-events-auto ${
        scrolled 
          ? 'py-3 bg-transparent' 
          : 'py-6 bg-transparent'
      }`}
    >
      {/* Target CSS Selector 2 Inner Container - 3D Hover Gradient style implementation */}
      <div 
        id="navbar-inner-wrapper"
        className={`max-w-[88rem] mx-auto flex items-center justify-between backdrop-blur-xl border rounded-2xl px-5 py-3 transition-all duration-300 ${
          scrolled
            ? 'bg-[#121212]/30 border-white/5'
            : 'bg-[#121212]/40 border-white/10 hover:border-white/15'
        }`}
      >
        {/* Left Side: Brand Logo */}
        <div 
          onClick={() => { onChangePage('home'); setMobileMenuOpen(false); }}
          className="flex items-center gap-3 cursor-pointer group"
          id="navbar-logo-block"
        >
          <LogoIcon className="w-8 h-8 text-[#FFE071] group-hover:scale-105 transition-transform duration-300" />
          <span className="text-xl sm:text-2xl font-serif font-black tracking-tight text-white flex items-center">
            Halo <span className="text-[#FFE071] text-xs font-sans align-middle ml-1.5 animate-pulse">✦</span>
          </span>
        </div>

        {/* Center: Interactive 3D Flip & Hover Glow Navigation Menu (Desktop Only) */}
        <div className="hidden md:flex items-center gap-2 text-xs uppercase tracking-[0.16em] font-extrabold text-white/70">
          <ul className="flex items-center gap-1.5 relative z-10" id="desktop-3d-menu-list">
            {menuItems.map((item) => {
              const isActive = currentPage === item.page;
              return (
                <li key={item.label} className="relative">
                  <motion.div
                    className="block rounded-xl overflow-visible group relative"
                    style={{ perspective: "600px" }}
                    whileHover="hover"
                    initial="initial"
                  >
                    {/* Radial active / hover background halo glow */}
                    <motion.div
                      className="absolute inset-0 z-0 pointer-events-none rounded-xl"
                      variants={glowVariants}
                      style={{
                        background: item.gradient,
                        opacity: isActive ? 1 : 0,
                      }}
                    />

                    {/* Front-facing card */}
                    <motion.button
                      onClick={() => onChangePage(item.page)}
                      className={`flex items-center gap-2 px-4 py-2 relative z-10 bg-transparent rounded-xl transition-colors cursor-pointer text-[10px] sm:text-[11px] ${
                        isActive ? 'text-[#FFE071]' : 'text-white/70 group-hover:text-white'
                      }`}
                      variants={itemVariants}
                      transition={sharedTransition}
                      style={{
                        transformStyle: "preserve-3d",
                        transformOrigin: "center bottom"
                      }}
                    >
                      <span className={`transition-colors duration-300 ${item.iconColor}`}>
                        {item.icon}
                      </span>
                      <span>{item.label}</span>
                    </motion.button>

                    {/* Back-facing rotating card */}
                    <motion.button
                      onClick={() => onChangePage(item.page)}
                      className={`flex items-center gap-2 px-4 py-2 absolute inset-0 z-10 bg-white/5 border border-white/5 rounded-xl transition-colors cursor-pointer text-[10px] sm:text-[11px] ${
                        isActive ? 'text-[#FFE071]' : 'text-white font-black'
                      }`}
                      variants={backVariants}
                      transition={sharedTransition}
                      style={{
                        transformStyle: "preserve-3d",
                        transformOrigin: "center top",
                        transform: "rotateX(90deg)"
                      }}
                    >
                      <span className={`transition-colors duration-300 ${item.iconColor}`}>
                        {item.icon}
                      </span>
                      <span>{item.label}</span>
                    </motion.button>
                  </motion.div>

                  {/* High Contrast bottom indicators for current page */}
                  {isActive && (
                    <motion.div
                      layoutId="nav-active-dot"
                      className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#FFE071] shadow-md shadow-[#FFE071]/40"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Right Side: Primary Desk Action Trigger with extra interactive utilities */}
        <div className="hidden md:flex items-center gap-3">
          {onOpenWallet && (
            <button
              onClick={onOpenWallet}
              title="GIA Certify"
              className="p-2.5 rounded-xl border border-white/5 hover:border-amber-400/40 text-white/70 hover:text-white bg-white/5 transition-all duration-300 cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Info className="w-4 h-4 text-[#FFE071]" />
              <span className="text-[10px] font-sans font-medium tracking-wide">Certify</span>
            </button>
          )}

          {onOpenTerminal && (
            <button
              onClick={onOpenTerminal}
              title="Typography Guide"
              className="p-2.5 rounded-xl border border-white/5 hover:border-emerald-400/40 text-white/70 hover:text-white bg-white/5 transition-all duration-300 cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span className="text-[10px] font-sans font-medium tracking-wide">Guide</span>
            </button>
          )}

          <button
            id="desktop-open-wallet-btn"
            onClick={() => onChangePage('reserve')}
            className="bg-gradient-to-r from-[#FFE071] to-amber-300 hover:from-white hover:to-white text-black font-extrabold text-[10px] uppercase tracking-[0.15em] px-5 py-2.5 rounded-xl transition-all duration-300 shadow-md flex items-center gap-2 group cursor-pointer border border-amber-300/20"
          >
            Atelier Desk
            <ArrowUpRight className="w-3.5 h-3.5 text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Mobile menu trigger */}
        <button
          id="mobile-menu-toggle-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-white hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-[#FFE071]" />}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu-drawer"
          className="absolute top-full left-4 right-4 mt-2 bg-neutral-950/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-xl p-6 flex flex-col gap-4 z-40 animate-slide-down md:hidden pointer-events-auto"
        >
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                onChangePage(item.page);
                setMobileMenuOpen(false);
              }}
              className={`text-sm font-semibold tracking-wider text-left py-2 border-b border-white/5 flex items-center justify-between ${
                currentPage === item.page ? 'text-[#FFE071]' : 'text-white/80'
              }`}
            >
              <span className="flex items-center gap-2">
                {item.icon}
                <span>{item.label}</span>
              </span>
              <ArrowUpRight className="w-4 h-4 opacity-40" />
            </button>
          ))}

          {onOpenWallet && (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenWallet();
              }}
              className="text-sm font-semibold tracking-wider text-left py-2 border-b border-white/5 flex items-center justify-between text-[#FFE071]"
            >
              <span className="flex items-center gap-2">
                <Info className="w-4 h-4 text-[#FFE071]" />
                <span>GIA Certify</span>
              </span>
              <ArrowUpRight className="w-4 h-4 opacity-40" />
            </button>
          )}

          {onOpenTerminal && (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTerminal();
              }}
              className="text-sm font-semibold tracking-wider text-left py-2 border-b border-white/5 flex items-center justify-between text-emerald-400"
            >
              <span className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span>Typography Guide</span>
              </span>
              <ArrowUpRight className="w-4 h-4 opacity-40" />
            </button>
          )}

          <button
            id="mobile-open-wallet-btn"
            onClick={() => {
              setMobileMenuOpen(false);
              onChangePage('reserve');
            }}
            className="w-full bg-[#FFE071] text-black text-xs font-black py-3 rounded-xl uppercase tracking-wider hover:bg-white transition-all text-center mt-2 cursor-pointer flex items-center justify-center gap-1.5"
          >
            <span>Atelier Desk</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </nav>
  );
};
