/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Compass, ShieldCheck, Heart, ArrowRight, TrendingUp, TrendingDown, Coins, Activity, DollarSign } from 'lucide-react';

interface AboutPageProps {
  onExploreProducts: () => void;
  onExploreCalculator: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onExploreProducts, onExploreCalculator }) => {
  const [rates, setRates] = useState({
    gold: 2415.82,
    silver: 29.64,
    platinum: 984.35,
  });
  const [trends, setTrends] = useState<{ [key: string]: 'up' | 'down' | null }>({
    gold: null,
    silver: null,
    platinum: null,
  });

  useEffect(() => {
    const rateInterval = setInterval(() => {
      setRates(prev => {
        const goldDiff = (Math.random() - 0.49) * 0.95;
        const silverDiff = (Math.random() - 0.48) * 0.04;
        const platinumDiff = (Math.random() - 0.49) * 0.75;

        setTrends({
          gold: goldDiff > 0 ? 'up' : 'down',
          silver: silverDiff > 0 ? 'up' : 'down',
          platinum: platinumDiff > 0 ? 'up' : 'down',
        });

        // Auto-clear active highlights
        const timer = setTimeout(() => {
          setTrends({ gold: null, silver: null, platinum: null });
        }, 800);

        return {
          gold: parseFloat((prev.gold + goldDiff).toFixed(2)),
          silver: parseFloat((prev.silver + silverDiff).toFixed(2)),
          platinum: parseFloat((prev.platinum + platinumDiff).toFixed(2)),
        };
      });
    }, 2500);

    return () => clearInterval(rateInterval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="w-full h-full min-h-[calc(100vh-120px)] overflow-y-auto px-4 md:px-12 py-8 flex flex-col justify-between z-30 relative scrollbar-thin scrollbar-thumb-white/20"
    >
      <div className="max-w-6xl mx-auto w-full pt-12 pb-16">
        
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-16 bg-neutral-950/70 backdrop-blur-md border border-white/10 p-6 md:p-8 rounded-3xl shadow-2xl relative z-10 transition-all duration-300">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-[#FFE071]/15 border border-[#FFE071]/40 px-4 py-1.5 rounded-full text-[#FFE071] text-xs font-semibold tracking-widest uppercase mb-4 shadow-[0_2px_12px_rgba(255,224,113,0.1)]"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FFE071] animate-pulse" />
            <span>The Heritage of Halo Atelier</span>
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-serif text-white tracking-tight mb-6 font-bold leading-tight drop-shadow-md">
            Sculpting Pure Luster <br />
            <span className="text-[#FFE071] italic font-serif">Through Time and Fire</span>
          </h1>
          <p className="text-neutral-200 text-sm md:text-base leading-relaxed tracking-wide font-sans font-semibold">
            Founded during the turn of the new frontier, Halo Atelier unites cutting-edge mathematical 
            precision with the ancestral goldsmith traditions of Place Vendôme. We transform certified physical 
            noble commodities into timeless heirlooms.
          </p>
        </div>

        {/* =========================================================================
            TODAY'S PRECIOUS COMMODITIES SPOT RATES LIVE MONITOR (Replaces old feature grid)
            ========================================================================= */}
        <div className="mb-16 bg-black/40 p-6 md:p-8 rounded-3xl border border-white/10 backdrop-blur-md">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
            <div>
              <h2 className="text-2xl font-serif text-white flex items-center gap-2 font-bold">
                <Coins className="w-5 h-5 text-[#FFE071] animate-bounce" />
                Live Commodity Index Rates
              </h2>
              <p className="text-xs text-neutral-300 font-sans mt-1">
                Real-time terminal pricing for fine casting bullion indices. Rates refresh live every 2.5 seconds.
              </p>
            </div>
            <div className="flex items-center gap-2 bg-emerald-950/70 border border-emerald-400 px-4 py-2 rounded-full text-emerald-400 text-[11px] font-mono font-bold uppercase shadow-[0_0_15px_rgba(16,185,129,0.15)]">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping mr-1" />
              ● Terminal Feed Active
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* 1. GOLD SPOT CARD */}
            <div className="bg-neutral-950/80 backdrop-blur-md border-2 border-white/10 hover:border-[#FFE071] rounded-2xl p-6 transition-all duration-300 relative overflow-hidden group shadow-xl">
              <div className="absolute top-0 right-0 p-3">
                <span className="text-[10px] font-mono font-bold text-[#FFE071] bg-[#FFE071]/15 px-3 py-1 rounded-full uppercase border border-[#FFE071]/35">
                  XAU/USD
                </span>
              </div>
              
              <span className="text-xs font-mono text-neutral-300 block mb-1 font-semibold">Precious Gold (24K Bullion)</span>
              
              <div className="flex items-baseline gap-2 mt-2 mb-1">
                <span 
                  className={`text-4xl font-serif font-black tracking-tight transition-all duration-300 ${
                    trends.gold === 'up' ? 'text-emerald-400' : trends.gold === 'down' ? 'text-rose-400' : 'text-white'
                  }`}
                >
                  ${rates.gold.toFixed(2)}
                </span>
                <span className="text-xs text-neutral-200 font-mono">/ t oz</span>
              </div>

              {/* Sub-metrics */}
              <div className="grid grid-cols-2 gap-2 pt-3 mt-3 border-t border-white/10 text-xs font-mono">
                <div>
                  <span className="text-neutral-400 block pb-1">Price / gram</span>
                  <span className="text-[#FFE071] font-bold text-sm">${(rates.gold / 31.1035).toFixed(2)}</span>
                </div>
                <div>
                  <span className="text-neutral-400 block pb-1">24h Change</span>
                  <span className={`font-bold flex items-center gap-0.5 text-sm ${trends.gold === 'down' ? 'text-rose-400' : 'text-emerald-400'}`}>
                    {trends.gold === 'down' ? <TrendingDown className="w-3.5 h-3.5" /> : <TrendingUp className="w-3.5 h-3.5" />}
                    {trends.gold === 'down' ? '-0.14%' : '+0.32%'}
                  </span>
                </div>
              </div>

              {/* Graphical Sparkline Simulation */}
              <div className="mt-4 pt-2 flex items-center justify-between text-[10px] font-mono uppercase text-neutral-400 border-t border-white/5">
                <span>Volatility Trend</span>
                <div className="flex items-end gap-0.5 h-6">
                  <div className="w-1.5 h-2 bg-white/20 rounded" />
                  <div className="w-1.5 h-3 bg-white/20 rounded" />
                  <div className="w-1.5 h-1.5 bg-white/30 rounded" />
                  <div className="w-1.5 h-4 bg-white/25 rounded" />
                  <div className="w-1.5 h-5 bg-[#FFE071]/80 rounded animate-pulse" />
                </div>
              </div>
            </div>

            {/* 2. SILVER SPOT CARD */}
            <div className="bg-neutral-950/80 backdrop-blur-md border-2 border-white/10 hover:border-slate-300 rounded-2xl p-6 transition-all duration-300 relative overflow-hidden group shadow-xl">
              <div className="absolute top-0 right-0 p-3">
                <span className="text-[10px] font-mono font-bold text-slate-200 bg-slate-400/15 px-3 py-1 rounded-full uppercase border border-slate-400/35">
                  XAG/USD
                </span>
              </div>

              <span className="text-xs font-mono text-neutral-300 block mb-1 font-semibold">Sterling Silver (Fine 999)</span>
              
              <div className="flex items-baseline gap-2 mt-2 mb-1">
                <span 
                  className={`text-4xl font-serif font-black tracking-tight transition-all duration-300 ${
                    trends.silver === 'up' ? 'text-emerald-400' : trends.silver === 'down' ? 'text-rose-400' : 'text-white'
                  }`}
                >
                  ${rates.silver.toFixed(2)}
                </span>
                <span className="text-xs text-neutral-200 font-mono">/ t oz</span>
              </div>

              {/* Sub-metrics */}
              <div className="grid grid-cols-2 gap-2 pt-3 mt-3 border-t border-white/10 text-xs font-mono">
                <div>
                  <span className="text-neutral-400 block pb-1">Price / gram</span>
                  <span className="text-slate-200 font-bold text-sm">${(rates.silver / 31.1035).toFixed(2)}</span>
                </div>
                <div>
                  <span className="text-neutral-400 block pb-1">24h Change</span>
                  <span className={`font-bold flex items-center gap-0.5 text-sm ${trends.silver === 'down' ? 'text-rose-400' : 'text-emerald-400'}`}>
                    {trends.silver === 'down' ? <TrendingDown className="w-3.5 h-3.5" /> : <TrendingUp className="w-3.5 h-3.5" />}
                    {trends.silver === 'down' ? '-0.88%' : '+1.14%'}
                  </span>
                </div>
              </div>

              {/* Sparkline */}
              <div className="mt-4 pt-2 flex items-center justify-between text-[10px] font-mono uppercase text-neutral-400 border-t border-white/5">
                <span>Volatility Trend</span>
                <div className="flex items-end gap-0.5 h-6">
                  <div className="w-1.5 h-1.5 bg-white/20 rounded" />
                  <div className="w-1.5 h-3.5 bg-white/25 rounded" />
                  <div className="w-1.5 h-4 bg-white/20 rounded" />
                  <div className="w-1.5 h-2 bg-[#FFE071]/60 rounded animate-pulse" />
                  <div className="w-1.5 h-5 bg-white/40 rounded" />
                </div>
              </div>
            </div>

            {/* 3. PLATINUM SPOT CARD */}
            <div className="bg-neutral-950/80 backdrop-blur-md border-2 border-white/10 hover:border-emerald-400 rounded-2xl p-6 transition-all duration-300 relative overflow-hidden group shadow-xl">
              <div className="absolute top-0 right-0 p-3">
                <span className="text-[10px] font-mono font-bold text-emerald-300 bg-emerald-400/15 px-3 py-1 rounded-full uppercase border border-emerald-400/35">
                  XPT/USD
                </span>
              </div>

              <span className="text-xs font-mono text-neutral-300 block mb-1 font-semibold">Pure Platinum (pt950 Grade)</span>
              
              <div className="flex items-baseline gap-2 mt-2 mb-1">
                <span 
                  className={`text-4xl font-serif font-black tracking-tight transition-all duration-300 ${
                    trends.platinum === 'up' ? 'text-emerald-400' : trends.platinum === 'down' ? 'text-rose-400' : 'text-white'
                  }`}
                >
                  ${rates.platinum.toFixed(2)}
                </span>
                <span className="text-xs text-neutral-200 font-mono">/ t oz</span>
              </div>

              {/* Sub-metrics */}
              <div className="grid grid-cols-2 gap-2 pt-3 mt-3 border-t border-white/10 text-xs font-mono">
                <div>
                  <span className="text-neutral-400 block pb-1">Price / gram</span>
                  <span className="text-emerald-300 font-bold text-sm">${(rates.platinum / 31.1035).toFixed(2)}</span>
                </div>
                <div>
                  <span className="text-neutral-400 block pb-1">24h Change</span>
                  <span className={`font-bold flex items-center gap-0.5 text-sm ${trends.platinum === 'down' ? 'text-rose-400' : 'text-emerald-400'}`}>
                    {trends.platinum === 'down' ? <TrendingDown className="w-3.5 h-3.5" /> : <TrendingUp className="w-3.5 h-3.5" />}
                    {trends.platinum === 'down' ? '-0.04%' : '+0.72%'}
                  </span>
                </div>
              </div>

              {/* Sparkline */}
              <div className="mt-4 pt-2 flex items-center justify-between text-[10px] font-mono uppercase text-neutral-400 border-t border-white/5">
                <span>Volatility Trend</span>
                <div className="flex items-end gap-0.5 h-6">
                  <div className="w-1.5 h-4 bg-white/30 rounded" />
                  <div className="w-1.5 h-2 bg-white/20 rounded" />
                  <div className="w-1.5 h-5 bg-[#FFE071]/70 rounded animate-pulse" />
                  <div className="w-1.5 h-1.5 bg-white/20 rounded" />
                  <div className="w-1.5 h-3.5 bg-white/30 rounded" />
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Narrative Split Block */}
        <div className="bg-gradient-to-r from-black/80 to-neutral-900/60 backdrop-blur-lg border border-white/15 rounded-3xl p-8 md:p-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center shadow-2xl">
          <div>
            <span className="text-[#FFE071] text-[11px] font-bold uppercase font-mono tracking-widest block mb-2">Our Place Vendôme Suite</span>
            <h2 className="text-2xl md:text-3xl font-serif text-white mb-4 font-bold leading-tight">
              Where investment grade security meets fine artistic expression.
            </h2>
            <p className="text-neutral-200 text-sm leading-relaxed mb-6 font-sans font-medium">
              Halo Atelier is designed for those who value absolute tangibility. We don't deal in digital estimations; we execute state-level physical deliverable refining, casting, laser engraving, and certified hand-setting.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={onExploreCalculator}
                className="bg-[#FFE071] hover:bg-white text-black font-extrabold text-xs py-3.5 px-6 rounded-full transition-all flex items-center gap-2 tracking-wider uppercase shadow-md cursor-pointer hover:scale-105 active:scale-95"
              >
                <span>Commodity Calculator</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button 
                onClick={onExploreProducts}
                className="bg-white/10 hover:bg-white/20 text-white border border-white/30 font-bold text-xs py-3.5 px-6 rounded-full transition-all tracking-wider uppercase cursor-pointer hover:scale-105 active:scale-95"
              >
                Browse Masterworks
              </button>
            </div>
          </div>

          {/* Image/Visual Right Panel */}
          <div className="relative rounded-2xl overflow-hidden group border border-white/10 shadow-2xl h-64 md:h-80">
            <img 
              src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260423_164207_f243351d-ed59-48ec-83a0-a5e996bdbe3c.png&w=1280&q=85"
              alt="Artisan sculpting fine metal bands" 
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 select-none referrer-no-referrer"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex items-end p-6">
              <div>
                <span className="text-[10px] font-mono font-bold tracking-widest text-[#FFE071] bg-black/85 px-3 py-1 rounded-full uppercase border border-[#FFE071]/40">Workshop Master Lab</span>
                <p className="text-white font-serif text-[15px] mt-2 font-bold drop-shadow">
                  "Perfect alignment on every micro bevel."
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Footer Branding Line */}
      <div className="max-w-6xl mx-auto w-full border-t border-white/10 pt-4 pb-4 flex flex-col sm:flex-row justify-between items-center text-white/40 text-[10px] font-mono gap-2">
        <span>EST. 2026 • HALO FINE JEWELRY INC.</span>
        <span>VERIFIED GIA NOBLE VAULTS • PLACE VENDÔME, PARIS</span>
      </div>
    </motion.div>
  );
};
