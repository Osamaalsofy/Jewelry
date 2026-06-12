/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowRight, ArrowUpRight, TrendingUp, Compass, ShieldCheck, Heart } from 'lucide-react';
import { INFO_CARDS } from '../data';
import { motion } from 'motion/react';

interface InfoSectionProps {
  onDiscover: () => void;
}

export const InfoSection: React.FC<InfoSectionProps> = ({ onDiscover }) => {
  return (
    <section
      id="info-meet-section"
      className="relative w-full h-[1000px] overflow-visible bg-neutral-50 border-t-2 border-neutral-200 flex flex-col justify-center py-20 px-4 sm:px-6 md:px-12 z-20"
    >
      <motion.div 
        className="max-w-[88rem] mx-auto w-full animate-fade-in"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Row 1: Header Presentation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-12 md:mb-16 items-start">
          <div>
            <h2
              id="meet-halo-heading"
              className="text-neutral-950 text-4xl md:text-5xl font-serif font-black leading-tight mb-6 md:mb-8"
              style={{ letterSpacing: '-0.03em' }}
            >
              Meet Halo Fine Joaillerie.
            </h2>
            
            {/* Discover It Button with White Circle arrow */}
            <button
              id="discover-it-btn"
              onClick={onDiscover}
              className="inline-flex items-center gap-3 bg-[#111111] hover:bg-[#FFE071] hover:text-black text-white text-sm uppercase tracking-widest font-black pl-6 pr-1.5 py-1.5 rounded-full transition-all duration-300 group cursor-pointer border-2 border-neutral-950"
            >
              <span>Our Collections</span>
              <span className="bg-white rounded-full p-2 group-hover:bg-amber-100 transition-colors">
                <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-0.5 transition-transform" />
              </span>
            </button>
          </div>

          <div>
            <p
              id="meet-halo-description"
              className="text-neutral-900 text-xl sm:text-2xl md:text-3xl leading-relaxed font-serif italic font-extrabold"
            >
              Halo designs and hand-sets spectacular custom jewelry, combining raw bullion commodity metals with GIA-certified conflict-free diamonds.
            </p>
          </div>
        </div>

        {/* Row 2: 3-Column Responsive Grid */}
        <div
          id="info-cards-grid"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {/* Card 1: Blooms image (Spans 2 columns on lg) */}
          <div
            id="info-card-blooms"
            className="lg:col-span-2 rounded-2xl overflow-hidden min-h-[260px] md:min-h-[280px] lg:min-h-[320px] flex flex-col justify-between p-6 md:p-8 relative group transition-all duration-300 hover:shadow-xl border-2 border-neutral-250"
            style={{
              backgroundImage: `url('https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260423_164207_f243351d-ed59-48ec-83a0-a5e996bdbe3c.png&w=1280&q=85')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {/* Subtle background overlay on hover */}
            <div className="absolute inset-0 bg-black/15 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            {/* Title (top) */}
            <div className="relative z-10">
              <span className="inline-flex items-center gap-1.5 bg-neutral-950/90 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold text-white mb-3 shadow border border-white/10">
                <Compass className="w-3.5 h-3.5 text-[#FFE071]" />
                Paris Workshop
              </span>
              <h3
                className="text-white text-2xl md:text-3.5xl font-serif font-black leading-snug drop-shadow-md"
                style={{ letterSpacing: '-0.02em' }}
              >
                Inspirations that bloom
              </h3>
            </div>

            {/* Body (bottom) */}
            <p className="relative z-10 text-white font-sans max-w-sm font-semibold drop-shadow-sm text-xs md:text-sm lg:text-base leading-relaxed bg-neutral-950/90 backdrop-blur-md p-4 rounded-xl border border-white/15 shadow-md">
              Each rare gemstone is set individually onto micro-sculpted golden mountings, capturing absolute elegance and lasting luster.
            </p>
          </div>

          {/* Card 2: Always pure, always certified */}
          <div
            id="info-card-fluid-peg"
            className="rounded-2xl p-6 md:p-8 min-h-[260px] md:min-h-[280px] lg:min-h-[320px] flex flex-col justify-between bg-neutral-950 text-white hover:bg-black hover:border-amber-400/40 border-2 border-white/10 hover:shadow-xl transition-all duration-300 group"
          >
            {/* Top icon and heading */}
            <div>
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-4 md:mb-6 border border-white/15 group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-5 h-5 text-[#FFE071]" />
              </div>
              <h3 className="text-white text-xl md:text-2xl font-serif font-black leading-snug whitespace-pre-line">
                Always pure,{"\n"}always ethical.
              </h3>
            </div>

            {/* Bottom body */}
            <p className="text-neutral-200 text-xs md:text-sm leading-relaxed font-sans font-medium">
              We certify each brilliant-cut diamond under professional GIA optics. Fully conflict-free and ethically sourced.
            </p>
          </div>

          {/* Card 3: Bespoke Personalization */}
          <div
            id="info-card-automated"
            className="rounded-2xl p-6 md:p-8 min-h-[260px] md:min-h-[280px] lg:min-h-[320px] flex flex-col justify-between bg-neutral-950 text-white hover:bg-black hover:border-purple-400/40 border-2 border-white/10 hover:shadow-xl transition-all duration-300 group"
          >
            {/* Top icon and heading */}
            <div>
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-4 md:mb-6 border border-white/15 group-hover:scale-105 transition-transform">
                <TrendingUp className="w-5 h-5 text-[#C2B2FF]" />
              </div>
              <h3 className="text-white text-xl md:text-2xl font-serif font-black leading-snug whitespace-pre-line">
                Bespoke{"\n"}Engraving Desk
              </h3>
            </div>

            {/* Bottom body */}
            <p className="text-neutral-200 text-xs md:text-sm leading-relaxed font-sans font-medium">
              Engrave laser-perfect custom names, dates, or personal symbols directly into internal metal margins of rings and neck bands.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
