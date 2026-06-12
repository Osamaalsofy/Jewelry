/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ArrowRight, ShoppingBag, Landmark, Code, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { USE_CASES } from '../data';
import { motion } from 'motion/react';

export const UseCasesSection: React.FC = () => {
  const [activeTabIdx, setActiveTabIdx] = useState(0);
  const activeCase = USE_CASES[activeTabIdx];

  const featuresList = {
    atelier: [
      'Place Vendôme design standards',
      'Artisan-drawn physical sketches',
      'Hand-cut gem-holding mounts',
      'Complimentary global couriers'
    ],
    castings: [
      'Pure 24K Yellow Gold bullion',
      'Pure Platinum pt950 castings',
      'Accurate alloy weights lock',
      'Strict laser-grade hallmarking'
    ],
    appraisals: [
      'D-Color diamond specialists',
      'Fully certified GIA reports',
      'Live London/US metal indexes',
      'Complimentary lifetime clean'
    ]
  };

  const currentFeatures = activeTabIdx === 0 
    ? featuresList.atelier 
    : activeTabIdx === 1 
      ? featuresList.castings 
      : featuresList.appraisals;

  return (
    <section
      id="use-cases-section"
      className="relative w-full min-h-screen md:min-h-[780px] overflow-visible bg-neutral-50 border-t-2 border-neutral-200 flex flex-col justify-center py-20 px-4 sm:px-6 md:px-12 z-30 shadow-[0_-15px_40px_rgba(0,0,0,0.03)]"
    >
      <motion.div 
        className="max-w-[88rem] mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Left Column (Metadata + tab controllers) */}
        <div id="use-cases-left-col" className="md:pr-12 md:pt-2">
          <span className="text-neutral-800 text-xs font-black uppercase tracking-wider block mb-2 font-mono bg-[#FFE071]/35 px-3 py-1 rounded w-fit border border-neutral-300">
            Halo Joaillerie Core Services
          </span>
          <h2
            id="use-modes-title"
            className="text-5xl md:text-6xl font-serif font-black leading-none mb-6 text-neutral-950"
            style={{ letterSpacing: '-0.04em' }}
          >
            Our disciplines
          </h2>
          <p
            id="use-modes-desc"
            className="text-neutral-900 text-sm md:text-base leading-relaxed max-w-md mb-10 font-sans font-medium"
          >
            We manage every step of fine jewelry production—from design sketch desks to GIA diamond classification and physical casting.
          </p>

          {/* Interactive Mode Controllers */}
          <div className="space-y-3.5" id="use-cases-tabs-wrapper">
            {USE_CASES.map((useCase, idx) => (
              <button
                key={useCase.id}
                id={`use-case-tab-trigger-${useCase.id}`}
                onClick={() => setActiveTabIdx(idx)}
                className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-300 flex items-center justify-between group cursor-pointer ${
                  activeTabIdx === idx
                    ? 'bg-white border-[#FFE071] shadow-lg ring-2 ring-[#FFE071]/20'
                    : 'bg-white/80 border-neutral-200 hover:border-neutral-400 hover:bg-white'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl transition-colors ${
                    activeTabIdx === idx ? 'bg-neutral-950 text-[#FFE071]' : 'bg-neutral-100 text-neutral-800 border border-neutral-300/40'
                  }`}>
                    {idx === 0 && <ShoppingBag className="w-5 h-5" />}
                    {idx === 1 && <Landmark className="w-5 h-5" />}
                    {idx === 2 && <Code className="w-5 h-5" />}
                  </div>
                  <div>
                    <h4 className="text-base font-serif font-black text-neutral-950">{useCase.title}</h4>
                    <span className="text-xs text-neutral-700 font-sans font-semibold block mt-0.5">
                      {idx === 0 && 'Master design sketches & settings'}
                      {idx === 1 && 'Pure luxury bullion element castings'}
                      {idx === 2 && 'GIA diamond appraisals & indexes'}
                    </span>
                  </div>
                </div>
                <ArrowRight className={`w-5 h-5 transition-transform duration-300 ${
                  activeTabIdx === idx 
                    ? 'text-neutral-950 translate-x-1' 
                    : 'text-neutral-400 group-hover:translate-x-0.5 group-hover:text-neutral-950'
                }`} />
              </button>
            ))}
          </div>

          {/* Interactive Feature List related to active tab */}
          <div className="mt-8 p-6 bg-white border-2 border-neutral-200 rounded-2xl space-y-3 hidden sm:block shadow-sm">
            <h5 className="text-xs font-black font-mono uppercase tracking-wider text-neutral-950 flex items-center gap-1.5 pb-2 border-b border-neutral-150">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Atelier Capability Scope</span>
            </h5>
            <div className="grid grid-cols-2 gap-3.5 pt-1">
              {currentFeatures.map((feat, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-neutral-900 font-bold font-sans">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (The immersive interactive video card with dynamic overlays) */}
        <div
          id="use-cases-right-col"
          className="relative rounded-3xl overflow-hidden h-[450px] sm:h-[500px] md:h-[55vh] md:min-h-[480px] lg:h-[62vh] lg:min-h-[520px] xl:h-[68vh] xl:min-h-[580px] shadow-2xl border border-black/5 flex flex-col justify-end group"
        >
          {/* Autoplay locked background video */}
          <div className="absolute inset-0 w-full h-full bg-black z-0">
            <video
              id={`usecase-bg-video-${activeCase.id}`}
              autoPlay
              muted
              loop
              playsInline
              key={activeCase.videoUrl} // Force reload video when url switches
              className="object-cover w-full h-full opacity-60 scale-102 transition-transform duration-[4000ms] group-hover:scale-105"
              src={activeCase.videoUrl}
            />
          </div>

          {/* Dark high-fidelity gradient backing layer for superb typography contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none z-10" />

          {/* Overlay Content */}
          <div className="relative z-20 p-8 md:p-12 text-white">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-mono font-bold tracking-widest text-amber-200 mb-4 border border-white/10">
              Maison Guild Standard
            </span>

            <h3
              className="text-white text-4xl md:text-5xl font-serif font-bold leading-tight mb-5"
              style={{ letterSpacing: '-0.03em' }}
            >
              {activeCase.title}
            </h3>

            <p className="text-white/80 text-base max-w-md mb-8 leading-relaxed font-sans">
              {activeCase.description}
            </p>

            {/* CTA action with leading circular icon */}
            <div className="inline-flex items-center gap-4 cursor-pointer group/link">
              <span className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center group-hover/link:bg-[#FFE071] group-hover/link:text-black transition-all text-white border border-white/10 shadow-lg">
                <ArrowRight className="w-5 h-5 group-hover/link:translate-x-0.5 transition-transform" />
              </span>
              <span className="text-sm font-bold tracking-wider text-white uppercase group-hover/link:text-[#FFE071] transition-colors font-sans">
                Explore Process
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
