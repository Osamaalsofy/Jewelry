/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { InfoSection } from './components/InfoSection';
import { UseCasesSection } from './components/UseCasesSection';
import { Footer } from './components/Footer';
import { WalletModal } from './components/WalletModal';
import { AboutPage } from './components/AboutPage';
import { CalculatorPage } from './components/CalculatorPage';
import { AtelierReservePage } from './components/AtelierReservePage';
import { TypographyTerminal } from './components/TypographyTerminal';

export default function App() {
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [currentPage, setCurrentPage] = useState<'home' | 'about' | 'calculator' | 'reserve'>('home');

  // Track page scroll to apply parallax effect on the background video
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handler helpers
  const handleOpenWallet = () => setIsWalletOpen(true);
  const handleCloseWallet = () => setIsWalletOpen(false);

  const handleDiscover = () => {
    // Switch page back to home if they are on another subpage
    if (currentPage !== 'home') {
      setCurrentPage('home');
      setTimeout(() => {
        const targetElement = document.getElementById('use-cases-section');
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return;
    }

    // Scroll smoothly to use cases section
    const targetElement = document.getElementById('use-cases-section');
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      id="root-app-wrapper"
      className="flex flex-col bg-[#F5F5F5] min-h-screen relative font-sans select-none overflow-x-hidden animate-fade-in"
    >
      {/* =========================================================================
          IMMERSED BACKGROUND SCROLL VIDEO LAYER (The custom "BG" Lavender and Coins)
          Runs in background for all time, with a custom 10% parallax scroll sync.
          ========================================================================= */}
      <div 
        id="parallax-bg-video-container"
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-[0.12] transition-opacity duration-1000"
        style={{ transform: `translateY(${scrollY * 0.12}px)` }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover scale-102"
          src="/videos/background.mp4"
        />
      </div>

      {/* Outer shadow overlay for luxury depth */}
      <div className="absolute inset-x-0 top-0 h-[200px] bg-gradient-to-b from-[#4D33DE]/5 to-transparent pointer-events-none z-10" />

      {/* Sticky/Fixed navbar over all screens and scroll positions */}
      <Navbar 
        currentPage={currentPage} 
        onChangePage={(page) => {
          setCurrentPage(page);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenWallet={handleOpenWallet}
        onOpenTerminal={() => setIsTerminalOpen(true)}
      />

      {/* =========================================================================
          1. NAVBAR & HERO COLLATED UPPER WORKSPACE
          ========================================================================= */}
      <header
        id="upper-hero-header-block"
        className={`flex flex-col overflow-hidden relative z-20 transition-all duration-500 ${
          currentPage === 'home' ? 'h-screen' : 'min-h-screen'
        }`}
      >
        {/* =========================================================================
            HEADER CORE BACKGROUND VIDEO LAYER: Runs full screen on the header section
            ========================================================================= */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none z-0"
          src="/videos/BG.mp4"
        />

        {/* Dynamic Inner Cinematic View Switcher */}
        {currentPage === 'home' ? (
          <HeroSection onJoinUs={() => {
            setCurrentPage('reserve');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }} />
        ) : currentPage === 'about' ? (
          <div className="pt-24 flex-1">
            <AboutPage 
              onExploreProducts={handleDiscover}
              onExploreCalculator={() => {
                setCurrentPage('calculator');
                window.scrollTo({ top: 0 });
              }}
            />
          </div>
        ) : currentPage === 'calculator' ? (
          <div className="pt-24 flex-1">
            <CalculatorPage 
              goldBaseSpot={2640.50}
              onBookAtelier={() => {
                setCurrentPage('reserve');
                window.scrollTo({ top: 0 });
              }}
            />
          </div>
        ) : (
          <div className="pt-24 flex-1">
            <AtelierReservePage 
              onBackHome={() => {
                setCurrentPage('home');
                window.scrollTo({ top: 0 });
              }}
            />
          </div>
        )}
      </header>

      {/* =========================================================================
          2. GENERAL MARKETING EXTRA SECTIONS (Exposed only on the Home exposition)
          ========================================================================= */}
      {currentPage === 'home' && (
        <main id="main-content-core" className="relative z-20">
          <InfoSection onDiscover={handleDiscover} />

          {/* =========================================================================
              4. USE CASES PRACTICE SECTION
              ========================================================================= */}
          <UseCasesSection />
        </main>
      )}

      {/* =========================================================================
          5. FOOTER
          ========================================================================= */}
      <Footer />

      {/* =========================================================================
          6. PREMIUM INTERACTIVE WALLET PLAYGROUND MODAL
          ========================================================================= */}
      <WalletModal isOpen={isWalletOpen} onClose={handleCloseWallet} />
      
      {/* =========================================================================
          7. PREMIUM FONT TYPOGRAPHY TERMINAL CONSOLE
          ========================================================================= */}
      <TypographyTerminal isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} />
    </div>
  );
}
