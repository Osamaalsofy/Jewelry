/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { HERO_BRANDS } from '../data';

interface HeroSectionProps {
  onJoinUs: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onJoinUs }) => {
  // Video ref for timeline scrubbing
  const scrubVideoRef = useRef<HTMLVideoElement | null>(null);
  const prevXRef = useRef<number | null>(null);
  const pendingSeekTimeRef = useRef<number | null>(null);
  
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [textOffset, setTextOffset] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  // Real-time ticking exchange rates for gold, silver, and diamonds
  const [rates, setRates] = useState({
    gold: 2415.82,
    silver: 29.64,
    diamond: 6185.20,
  });
  const [trends, setTrends] = useState<{ gold?: 'up' | 'down'; silver?: 'up' | 'down'; diamond?: 'up' | 'down' }>({});

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const rateInterval = setInterval(() => {
      setRates(prev => {
        const goldDiff = (Math.random() - 0.49) * 0.95;
        const silverDiff = (Math.random() - 0.48) * 0.04;
        const diamondDiff = (Math.random() - 0.495) * 2.80;

        setTrends({
          gold: goldDiff > 0 ? 'up' : 'down',
          silver: silverDiff > 0 ? 'up' : 'down',
          diamond: diamondDiff > 0 ? 'up' : 'down',
        });

        // Clear transient triggers to allow keyframe scale-up pulses during ticking
        const timer = setTimeout(() => {
          setTrends({});
        }, 600);

        return {
          gold: parseFloat((prev.gold + goldDiff).toFixed(2)),
          silver: parseFloat((prev.silver + silverDiff).toFixed(2)),
          diamond: parseFloat((prev.diamond + diamondDiff).toFixed(2)),
        };
      });
    }, 2000);

    return () => {
      clearInterval(rateInterval);
    };
  }, []);

  // Process any pending seek request when video seek completes
  const handleSeeked = () => {
    const video = scrubVideoRef.current;
    if (!video) return;
    if (pendingSeekTimeRef.current !== null) {
      const nextSeek = pendingSeekTimeRef.current;
      pendingSeekTimeRef.current = null;
      video.currentTime = nextSeek;
    }
  };

  useEffect(() => {
    const video = scrubVideoRef.current;
    if (!video) return;

    // Initial video setup: must remain paused initially and not autoplay
    video.muted = true;
    video.playsInline = true;
    video.preload = "auto";
    video.autoplay = false;
    video.loop = false; // Controlled via manual mouse scrub
    video.pause();

    const handleLoadedMetadata = () => {
      setIsVideoLoaded(true);
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);

    const handleMouseMove = (e: MouseEvent) => {
      if (!video) return;
      const duration = video.duration;
      if (!duration || isNaN(duration)) return;

      const currentX = e.clientX;
      const currentY = e.clientY;
      const prevX = prevXRef.current;

      if (prevX === null) {
        prevXRef.current = currentX;
        return;
      }

      // Calculate delta movement
      const delta = currentX - prevX;
      prevXRef.current = currentX;

      // Convert delta movement into a playback time offset with specified sensitivity
      const SENSITIVITY = 0.8;
      const offset = (delta / window.innerWidth) * SENSITIVITY * duration;

      // Calculate targetTime from the offset and clamp it between 0 and video duration
      let targetTime = video.currentTime + offset;
      if (targetTime < 0) targetTime = 0;
      if (targetTime > duration) targetTime = duration;

      // Update playback position through video.currentTime.
      // Use the seeked/seeking tracking to avoid seek-flooding during fast dragging.
      if (video.seeking) {
        pendingSeekTimeRef.current = targetTime;
      } else {
        video.currentTime = targetTime;
        pendingSeekTimeRef.current = null;
      }

      // Track coordinates for text translation
      const { innerWidth, innerHeight } = window;
      const xPercent = (currentX / innerWidth) - 0.5;
      const yPercent = (currentY / innerHeight) - 0.5;
      
      // Compute smooth parallax offset: range representing depth
      setTextOffset({ x: xPercent * 35, y: yPercent * 35 });
    };

    const handleMouseLeave = () => {
      prevXRef.current = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      if (video) {
        video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      }
    };
  }, []);

  return (
    <div
      id="hero-outer-container"
      className="flex-1 w-full h-full relative flex flex-col justify-between bg-transparent group/card z-10"
    >


      {/* Inner Hero Card Container - Styled fully transparently to stretch edge-to-edge */}
      <div
        id="hero-inner-card"
        className="relative w-full h-full bg-transparent flex flex-col justify-between"
      >


        {/* =========================================================================
            LAYER 2 (Middle): Rotating Monument Video with mix-blend-mode: screen
            This is the Hero Scrubbing Video (which rotates based on mouse move!) 
            ========================================================================= */}
        <div
          id="hero-diamond-video-wrapper"
          className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none z-20 overflow-hidden"
          style={{
            transform: `translate3d(${-textOffset.x * 1.6}px, ${-textOffset.y * 1.6}px, 0)`,
            transition: 'transform 1.4s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <video
            ref={scrubVideoRef}
            id="interactive-scrubbing-video"
            playsInline
            muted
            preload="auto"
            autoPlay={false}
            onSeeked={handleSeeked}
            className="w-[80%] md:w-[52%] h-[76%] object-contain select-none opacity-85 transition-opacity duration-1000 group-hover/card:opacity-100 mix-blend-screen"
            style={{ 
              filter: 'contrast(1.25) brightness(1.2) drop-shadow(0 25px 60px rgba(168, 142, 255, 0.25))',
            }}
            src="/videos/Hero 0.webm"
          />
        </div>

        {/* =========================================================================
            LAYER 3 (Foreground): Main Content layout (text sits elegantly themed with blend depth)
            Spatially positioned ABOVE the rotating video asset so it is fully visible and accessible!
            ========================================================================= */}
        <div
          id="hero-content-overlay"
          className="relative z-30 flex flex-col items-center justify-start h-full p-8 pt-28 md:pt-36 md:p-16 max-w-[88rem] mx-auto w-full select-none text-center"
        >
          <div className="max-w-4xl flex flex-col items-center">
            {/* Main Headline - Styled in elegant pure white with accurate scroll-linked fade out, and no float translation */}
            <h1
              id="hero-main-title"
              className="text-[60px] leading-tight font-bold tracking-[-0.02em] whitespace-nowrap bg-gradient-to-b from-white via-[#F1ECE1] to-[#C0A060] bg-clip-text text-transparent drop-shadow-[0_4px_30px_rgba(0,0,0,0.85)] select-text"
              style={{
                fontFamily: "'Prata', serif",
                fontSize: '60px',
                paddingLeft: '0px',
                marginTop: '-50px',
                opacity: Math.max(0, 1 - scrollY / 320),
                transition: 'opacity 0.15s ease-out',
              }}
            >
              Atelier Jewelry Shop
            </h1>

          </div>

          {/* Scoped CSS Style Tag for live rate ticker animations */}
          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .ribbon-ticker-track {
              display: flex;
              width: max-content;
              animation: marquee 35s linear infinite;
            }
          `}} />
        </div>

        {/* =========================================================================
            FIXED ACTION BUTTON (Positioned directly above the change rate bar with no hover scale/motion effects)
            ========================================================================= */}
        <button
          id="join-us-action-btn"
          onClick={onJoinUs}
          className="absolute bottom-[92px] left-1/2 -translate-x-1/2 z-35 flex items-center gap-3 bg-white text-black pl-8 pr-3 py-2.5 rounded-full font-semibold shadow-2xl cursor-pointer select-none transition-colors duration-150 whitespace-nowrap"
        >
          <span className="text-sm tracking-widest uppercase font-mono">EXPLORE BESPOKE GALLERY</span>
          <div className="bg-black rounded-full p-1.5">
            <ArrowRight className="w-4 h-4 text-white" />
          </div>
        </button>
        
        {/* =========================================================================
            BOTTOM LEFT & RIGHT CUSTOM IMMERSIVE CORNER TABS (Matches screenshot layout exactly)
            Draws high-fidelity inverse curved backgrounds (color `#F5F5F5`) to morph container edges!
            ========================================================================= */}
        {/* Bottom Left Tab */}
        <div className="absolute bottom-0 left-0 z-35 select-none pointer-events-auto hidden xl:block">
          <svg className="absolute bottom-0 left-0 w-[360px] h-24 text-[#F5F5F5] fill-current" viewBox="0 0 360 96" preserveAspectRatio="none">
            <path d="M 360 96 Q 328 96 328 64 L 328 32 Q 328 0 296 0 L 0 0 L 0 96 Z" />
          </svg>
          <div className="relative z-40 flex items-center gap-6 h-24 pl-8 pr-12 pt-4">
            <div>
              <span className="block text-2xl font-serif font-black text-black tracking-tight leading-none">4.8K</span>
              <span className="block text-[10px] font-bold text-black/60 uppercase tracking-widest mt-1 font-mono">Artisan Commissions</span>
            </div>
            <button 
              id="bottom-left-join-guild-btn"
              onClick={onJoinUs}
              className="bg-black hover:bg-[#FFE071] text-white hover:text-black hover:scale-105 active:scale-95 transition-all duration-300 text-[11px] tracking-wider uppercase font-bold px-5 py-3 rounded-full flex items-center gap-1.5 shadow-md cursor-pointer"
            >
              <span>Book Atelier Desk</span>
              <span className="text-[10px] text-amber-300">✦</span>
            </button>
          </div>
        </div>

        {/* Bottom Right Tab */}
        <div className="absolute bottom-0 right-0 z-35 select-none pointer-events-auto hidden xl:block">
          <svg className="absolute bottom-0 right-0 w-[360px] h-24 text-[#F5F5F5] fill-current" viewBox="0 0 360 96" preserveAspectRatio="none">
            <path d="M 0 96 Q 32 96 32 64 L 32 32 Q 32 0 64 0 L 360 0 L 360 96 Z" />
          </svg>
          <div className="relative z-40 flex items-center justify-end gap-6 h-24 pr-8 pl-12 pt-4">
            <button 
              id="bottom-right-gia-register-btn"
              className="group bg-[#EAEAEA] hover:bg-[#FFE071] text-black hover:scale-105 active:scale-95 transition-all duration-300 px-5 py-3 rounded-full flex items-center gap-3 shadow-sm cursor-pointer border border-black/5"
              onClick={onJoinUs}
            >
              <div className="bg-white group-hover:bg-black rounded-full p-2 transition-colors">
                <Sparkles className="w-3.5 h-3.5 text-black group-hover:text-white transition-colors" />
              </div>
              <div className="text-left font-sans select-none">
                <span className="block text-[10px] font-bold uppercase tracking-widest text-black leading-none">GIA Register</span>
                <span className="block text-[9px] text-black/50 tracking-wider mt-0.5">Verification Dossier →</span>
              </div>
            </button>
          </div>
        </div>

        {/* =========================================================================
            CINEMATIC COMMODITIES DYNAMIC FLOATING SPOT TICKER (Floating Pill Container)
            ========================================================================= */}
        <div
          id="hero-cinematic-spot-ticker"
          onClick={onJoinUs}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[90%] xl:w-auto xl:min-w-[500px] z-30 bg-black/75 backdrop-blur-xl border border-white/10 py-3 px-6 rounded-full flex items-center justify-between text-white select-none cursor-pointer overflow-hidden transition-all duration-300 hover:bg-black/90 hover:border-amber-400/30 shadow-2xl"
        >
          {/* Label left side sticky */}
          <div className="flex items-center gap-3 bg-[#FFE071] text-black px-3 py-1 rounded-full shrink-0 z-40 shadow-sm mr-4">
            <span className="h-1.5 w-1.5 rounded-full bg-black animate-pulse" />
            <span className="text-[9px] font-extrabold tracking-widest uppercase font-mono">Live Term</span>
          </div>

          {/* Marquee Rate Ticker Track */}
          <div className="w-full overflow-hidden relative">
            <div className="ribbon-ticker-track flex items-center gap-20">
              {/* Repeat ticker items multiple times for elegant, infinite linear flow */}
              {[1, 2, 3, 4].map((groupIndex) => (
                <div key={groupIndex} className="flex items-center gap-16 shrink-0 font-mono text-[12px] tracking-tight text-white/90">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white/60">Gold</span>
                    <span className={`font-bold transition-transform duration-200 ${trends.gold === 'up' ? 'text-emerald-400 scale-105' : trends.gold === 'down' ? 'text-rose-400 scale-105' : 'text-amber-100'}`}>
                      ${rates.gold.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white/60">Silver</span>
                    <span className={`font-bold transition-transform duration-200 ${trends.silver === 'up' ? 'text-emerald-400 scale-105' : trends.silver === 'down' ? 'text-rose-400 scale-105' : 'text-slate-100'}`}>
                      ${rates.silver.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white/60">Diamond</span>
                    <span className={`font-bold transition-transform duration-200 ${trends.diamond === 'up' ? 'text-emerald-400 scale-105' : trends.diamond === 'down' ? 'text-rose-400 scale-105' : 'text-cyan-100'}`}>
                      ${rates.diamond.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Prompt/Right Accent sticky */}
          <div className="flex items-center gap-2 pl-4 py-0.5 hover:text-amber-300 transition-colors shrink-0 z-40 hidden md:flex font-mono text-[9px] tracking-wider uppercase text-white/50 font-bold">
            <span>Inquire Live Rates →</span>
          </div>
        </div>

      </div>
    </div>
  );
};
