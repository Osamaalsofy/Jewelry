/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Coins, HelpCircle, ArrowRightLeft, DollarSign, TrendingUp, Sparkles, Scale, Info, CheckCircle2 } from 'lucide-react';

interface CalculatorPageProps {
  onBookAtelier: () => void;
  goldBaseSpot: number; // passed down if available, otherwise default
}

export const CalculatorPage: React.FC<CalculatorPageProps> = ({ onBookAtelier, goldBaseSpot = 2640.50 }) => {
  // Input states
  const [goldWeight, setGoldWeight] = useState<number>(50); // default 50 grams
  const [weightUnit, setWeightUnit] = useState<'grams' | 'ounces'>('grams');
  const [karatMultipliers, setKaratMultipliers] = useState({
    '24k': 1.0,     // 99.9% pure
    '22k': 0.916,   // 91.6% pure
    '21k': 0.875,   // 87.5% pure
    '18k': 0.750,   // 75.0% pure
  });
  const [selectedKarat, setSelectedKarat] = useState<'24k' | '22k' | '21k' | '18k'>('24k');
  const [customSpotPrice, setCustomSpotPrice] = useState<number>(goldBaseSpot);
  const [exchangeRate, setExchangeRate] = useState<number>(3.75); // USD to SAR pegged rate
  
  // Custom interactive sliders/states
  const [craftingPremium, setCraftingPremium] = useState<number>(8.5); // % customization markup for Atelier
  const [applyVAT, setApplyVAT] = useState<boolean>(true); // 15% VAT calculation typical in KSA

  // Derived calculations
  const [calcResults, setCalcResults] = useState({
    pureWeightGrams: 0,
    rawPriceUSD: 0,
    rawPriceSAR: 0,
    premiumPriceUSD: 0,
    premiumPriceSAR: 0,
    vatUSD: 0,
    vatSAR: 0,
    totalPriceUSD: 0,
    totalPriceSAR: 0,
    exchangeUsed: 3.75
  });

  // Calculate whenever anything changes
  useEffect(() => {
    // 1 Troy Ounce = 31.1034768 grams
    const GRAMS_PER_OZ = 31.1034768;
    
    // Weight converted to Troy Ounces for matching SPOT price quote standard (usually per Troy Ounce)
    const totalWeightInGrams = weightUnit === 'grams' ? goldWeight : goldWeight * GRAMS_PER_OZ;
    const totalWeightInOunces = weightUnit === 'ounces' ? goldWeight : goldWeight / GRAMS_PER_OZ;

    // Spot gold price applies per Troy Ounce based on selected Karat purity multiplier
    const purityFactor = karatMultipliers[selectedKarat];
    const pureOunces = totalWeightInOunces * purityFactor;
    const pureGrams = totalWeightInGrams * purityFactor;

    // Core Value USD
    const rawUSDValue = pureOunces * customSpotPrice;
    const rawSARValue = rawUSDValue * exchangeRate;

    // Premium multiplier calculation
    const premiumPercentMultiplier = 1 + (craftingPremium / 100);
    const premiumUSD = rawUSDValue * (craftingPremium / 100);
    const premiumSAR = premiumUSD * exchangeRate;

    // Subtotal
    const subtotalUSD = rawUSDValue + premiumUSD;

    // VAT (15% in Saudi Arabia)
    const vatRate = applyVAT ? 0.15 : 0;
    const calculatedVatUSD = subtotalUSD * vatRate;
    const calculatedVatSAR = calculatedVatUSD * exchangeRate;

    // Grand totals
    const finalUSD = subtotalUSD + calculatedVatUSD;
    const finalSAR = finalUSD * exchangeRate;

    setCalcResults({
      pureWeightGrams: pureGrams,
      rawPriceUSD: rawUSDValue,
      rawPriceSAR: rawSARValue,
      premiumPriceUSD: premiumUSD,
      premiumPriceSAR: premiumSAR,
      vatUSD: calculatedVatUSD,
      vatSAR: calculatedVatSAR,
      totalPriceUSD: finalUSD,
      totalPriceSAR: finalSAR,
      exchangeUsed: exchangeRate
    });
  }, [
    goldWeight, 
    weightUnit, 
    selectedKarat, 
    customSpotPrice, 
    exchangeRate, 
    craftingPremium, 
    applyVAT
  ]);

  // Fast preset setters
  const applyPresetWeight = (grams: number) => {
    setGoldWeight(grams);
    setWeightUnit('grams');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="w-full h-full min-h-[calc(100vh-120px)] overflow-y-auto px-4 md:px-12 py-8 flex flex-col justify-between z-30 relative scrollbar-thin scrollbar-thumb-white/20"
    >
      <div className="max-w-6xl mx-auto w-full pt-8 pb-16">
        
        {/* Header Summary info */}
        <div className="text-center max-w-2xl mx-auto mb-12 bg-neutral-950/70 backdrop-blur-md border border-white/10 p-6 md:p-8 rounded-3xl shadow-2xl relative z-10 transition-all duration-300">
          <span className="inline-flex items-center gap-1.5 bg-amber-400/10 border border-amber-400/25 px-4 py-1.5 rounded-full text-amber-300 text-[10px] font-mono tracking-widest uppercase mb-4 shadow-sm">
            <Coins className="w-3.5 h-3.5" />
            <span>Interactive Commodity Desk</span>
          </span>
          <h1 className="text-3xl md:text-4xl font-serif text-white tracking-tight mb-3 font-bold">
            Pure Gold & Saudi Riyal <br />
            <span className="text-[#FFE071] italic font-serif">Live Valuation Terminal</span>
          </h1>
          <p className="text-neutral-200 text-xs md:text-sm tracking-wide leading-relaxed font-sans font-semibold">
            Instantly compute spot-indexed metal weights, conversion margins, and local VAT estimations to obtain certified pricing in Saudi Riyals (SAR) at official exchange metrics.
          </p>
        </div>

        {/* Dynamic Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT: Inputs Form (7 Cols) */}
          <div className="lg:col-span-7 bg-neutral-950/90 backdrop-blur-xl border-2 border-white/15 rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-2xl gap-6">
            
            {/* 1. Metal Weight Selection */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2">
                  <Scale className="w-4 h-4 text-amber-400" />
                  <span>Configured Weight</span>
                </label>
                <div className="flex bg-neutral-900 p-1 rounded-lg border border-white/20 text-[10px] font-bold uppercase overflow-hidden">
                  <button 
                    type="button"
                    onClick={() => setWeightUnit('grams')}
                    className={`px-3 py-1 rounded-md transition-all cursor-pointer ${weightUnit === 'grams' ? 'bg-[#FFE071] text-black font-extrabold shadow-sm' : 'text-neutral-300 hover:text-white'}`}
                  >
                    Grams
                  </button>
                  <button 
                    type="button"
                    onClick={() => setWeightUnit('ounces')}
                    className={`px-3 py-1 rounded-md transition-all cursor-pointer ${weightUnit === 'ounces' ? 'bg-[#FFE071] text-black font-extrabold shadow-sm' : 'text-neutral-300 hover:text-white'}`}
                  >
                    Oz (Troy)
                  </button>
                </div>
              </div>

              {/* Numerical Inputs and Quick Slider */}
              <div className="flex items-center gap-4 mb-3">
                <input 
                  type="number" 
                  min="0.1" 
                  max="10000"
                  step="0.1"
                  value={goldWeight}
                  onChange={(e) => setGoldWeight(Math.max(0.1, parseFloat(e.target.value) || 0.1))}
                  className="bg-neutral-900 border-2 border-white/20 rounded-xl px-4 py-3 text-white text-lg font-mono font-bold w-32 focus:outline-none focus:border-amber-400 text-center"
                />
                
                {/* Horizontal slider */}
                <input 
                  type="range"
                  min="1"
                  max="500"
                  value={goldWeight <= 500 ? goldWeight : 500}
                  onChange={(e) => setGoldWeight(parseInt(e.target.value) || 1)}
                  className="flex-1 accent-amber-300 h-1 bg-white/20 rounded-lg cursor-pointer"
                />
              </div>

              {/* Fast weight presets */}
              <div className="flex flex-wrap gap-2">
                <button type="button" onClick={() => applyPresetWeight(10)} className="bg-neutral-900 hover:bg-neutral-800 text-neutral-200 text-xs font-mono px-3.5 py-1.5 rounded-lg border border-white/10 transition-all text-center font-bold">10g (Ring)</button>
                <button type="button" onClick={() => applyPresetWeight(21.4)} className="bg-neutral-900 hover:bg-neutral-800 text-neutral-200 text-xs font-mono px-3.5 py-1.5 rounded-lg border border-white/10 transition-all text-center font-bold">21.4g (Standard Coin)</button>
                <button type="button" onClick={() => applyPresetWeight(50)} className="bg-neutral-900 hover:bg-neutral-800 text-neutral-200 text-xs font-mono px-3.5 py-1.5 rounded-lg border border-white/10 transition-all text-center font-bold">50g (Atelier Ingot)</button>
                <button type="button" onClick={() => applyPresetWeight(116.64)} className="bg-neutral-900 hover:bg-neutral-800 text-neutral-200 text-xs font-mono px-3.5 py-1.5 rounded-lg border border-white/10 transition-all text-center font-bold">10 Tola (116.6g)</button>
                <button type="button" onClick={() => applyPresetWeight(311.03)} className="bg-neutral-900 hover:bg-neutral-800 text-neutral-200 text-xs font-mono px-3.5 py-1.5 rounded-lg border border-white/10 transition-all text-center font-bold">10 oz (311g)</button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 2. Selecting Gold Karat & Purity */}
              <div>
                <label className="text-white font-bold text-xs uppercase tracking-wider block mb-2 leading-none flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Gold Purity (Karat)</span>
                </label>
                <select 
                  value={selectedKarat}
                  onChange={(e) => setSelectedKarat(e.target.value as any)}
                  className="w-full bg-neutral-900 border-2 border-white/20 rounded-xl px-4 py-3 text-white text-sm font-bold tracking-wide focus:outline-none focus:border-amber-400 appearance-none cursor-pointer"
                >
                  <option className="bg-neutral-950 text-white" value="24k">24K Fine Gold (99.9% Pure)</option>
                  <option className="bg-neutral-950 text-white" value="22k">22K Fine Gold (91.6% Pure)</option>
                  <option className="bg-neutral-950 text-white" value="21k">21K Atelier Standard (87.5% Pure)</option>
                  <option className="bg-neutral-950 text-white" value="18k">18K Bespoke Design (75.0% Pure)</option>
                </select>
              </div>

              {/* 3. Base Spot Price Tuning (Interactive) */}
              <div>
                <label className="text-white font-bold text-xs uppercase tracking-wider block mb-2 leading-none flex items-center gap-2">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Gold Spot Price (USD/oz)</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-200 font-mono text-sm font-bold">$</span>
                  <input
                    type="number"
                    value={customSpotPrice}
                    step="0.5"
                    onChange={(e) => setCustomSpotPrice(Math.max(100, parseFloat(e.target.value) || goldBaseSpot))}
                    className="w-full bg-neutral-900 border-2 border-white/20 rounded-xl pl-8 pr-4 py-3 text-white text-sm font-mono font-bold focus:outline-none focus:border-amber-400"
                  />
                  <button 
                    type="button"
                    onClick={() => setCustomSpotPrice(goldBaseSpot)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[9px] font-mono tracking-widest font-black bg-[#FFE071] text-black px-2.5 py-1 rounded hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  >
                    RESET
                  </button>
                </div>
              </div>
            </div>

            {/* 4. Interactive Exchange Rate between USD and Saudi Rial */}
            <div className="border-t border-white/10 pt-4">
              <div className="flex justify-between items-center mb-2">
                <label className="text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2">
                  <ArrowRightLeft className="w-4 h-4 text-[#FFE071]" />
                  <span>Saudi Rial Peg Rate (SAR per USD)</span>
                </label>
                <span className="text-black font-mono text-xs font-black bg-[#FFE071] px-2.5 py-0.5 rounded shadow">
                  Current: {exchangeRate.toFixed(4)} SAR / USD
                </span>
              </div>
              <p className="text-neutral-300 text-xs leading-relaxed mb-3 font-sans font-medium">
                The Saudi Arabian Riyal (SAR) is legally pegged to the US Dollar at exactly <b>3.7500 SAR</b>. You can fine-tune this with cash spread indicators below (e.g. 3.73 - 3.78) representing physical atelier premium exchange spreads.
              </p>
              
              <div className="flex items-center gap-4">
                <input 
                  type="range"
                  min="3.70"
                  max="3.80"
                  step="0.005"
                  value={exchangeRate}
                  onChange={(e) => setExchangeRate(parseFloat(e.target.value))}
                  className="flex-1 accent-amber-300 h-1 bg-white/20 rounded-lg cursor-pointer"
                />
                <input
                  type="number"
                  min="3.0"
                  max="4.5"
                  step="0.001"
                  value={exchangeRate}
                  onChange={(e) => setExchangeRate(parseFloat(e.target.value) || 3.75)}
                  className="bg-neutral-900 border-2 border-white/20 rounded-lg px-3 py-1.5 text-white text-xs font-mono font-bold w-20 focus:outline-none focus:border-amber-400 text-center"
                />
              </div>
            </div>

            {/* 5. Custom Crafting markup & Tax parameter settings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-white/10 pt-4">
              {/* Premium casting markup */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[11px] font-bold text-white uppercase">Atelier Premium Margin</span>
                  <span className="text-xs font-mono font-bold text-[#FFE071]">{craftingPremium}%</span>
                </div>
                <input 
                  type="range"
                  min="2"
                  max="20"
                  step="0.5"
                  value={craftingPremium}
                  onChange={(e) => setCraftingPremium(parseFloat(e.target.value))}
                  className="w-full accent-[#FFE071] h-1 bg-white/20 rounded-lg cursor-pointer animate-pulse"
                />
              </div>

              {/* Saudi Arabia VAT Checkbox */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="block text-[11px] font-bold text-white uppercase">Gold Customs Tariff (VAT)</span>
                  <span className="block text-[10px] text-neutral-300 font-medium">15% Standard Saudi luxury tax</span>
                </div>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={applyVAT}
                    onChange={(e) => setApplyVAT(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-10 h-5 bg-white/20 rounded-full peer peer-focus:ring-2 peer-focus:ring-[#FFE071] peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#FFE071]"></div>
                </label>
              </div>
            </div>

          </div>

          {/* RIGHT: Real-Time Valuation Invoice Dashboard (5 Cols) */}
          <div className="lg:col-span-12 xl:col-span-5 flex flex-col justify-between gap-6">
            
            {/* Primary Live Exchange Banner */}
            <div className="bg-neutral-950/95 backdrop-blur-3xl border-2 border-[#FFE071]/50 rounded-3xl p-6 md:p-8 relative overflow-hidden shadow-2xl">
              
              {/* Soft gold aura gradient */}
              <div className="absolute -right-12 -top-12 w-40 h-40 bg-amber-400/20 rounded-full blur-[40px]" />

              <span className="text-[#FFE071] text-[10px] font-mono tracking-widest font-black bg-[#FFE071]/15 px-3 py-1 rounded border border-[#FFE071]/40 uppercase block w-fit mb-4">
                Grand Valuation Certificate
              </span>

              {/* SAR Saudi Rial Big Highlight */}
              <div className="mb-6">
                <span className="text-neutral-200 text-xs font-mono uppercase tracking-widest block mb-1 font-bold">Estimated Value in Saudi Riyals</span>
                <div className="flex items-baseline gap-2 overflow-x-auto scrollbar-none">
                  <span className="text-4xl md:text-5xl font-serif font-black text-[#FFE071] tracking-tight leading-none drop-shadow">
                    {calcResults.totalPriceSAR.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                  <span className="text-sm font-sans font-bold text-[#FFE071] uppercase">SAR</span>
                </div>
              </div>

              {/* USD Equivalent Side Column */}
              <div className="border-t border-white/20 pt-4 pb-4 flex justify-between items-center">
                <div>
                  <span className="text-neutral-300 text-xs font-mono uppercase tracking-widest block font-bold">USD Equivalent</span>
                  <span className="text-xl font-serif font-black text-white tracking-tight">
                    ${calcResults.totalPriceUSD.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
                
                {/* Visual Ratio Peg */}
                <div className="text-right">
                  <span className="text-neutral-300 text-xs font-mono uppercase tracking-widest block font-bold">Pure Metal Yield</span>
                  <span className="text-xs font-mono font-black text-[#FFE071] bg-black/60 py-1.5 px-3 rounded border border-[#FFE071]/30 inline-block mt-0.5 shadow-sm">
                    {calcResults.pureWeightGrams.toFixed(2)}g Pure Gold
                  </span>
                </div>
              </div>

              {/* Complete Line-By-Line Invoice Breakdown */}
              <div className="bg-neutral-900/80 p-4 rounded-2xl border border-white/10 space-y-2.5">
                
                <div className="flex justify-between text-xs text-neutral-200 font-medium">
                  <span>Raw spot value ({goldWeight.toFixed(1)} {weightUnit})</span>
                  <span className="font-mono font-bold text-white">
                    {calcResults.rawPriceSAR.toLocaleString('en-US', { maximumFractionDigits: 1 })} SAR
                  </span>
                </div>

                <div className="flex justify-between text-xs text-neutral-200 font-medium">
                  <span>Artisan Handcasting Premium ({craftingPremium}%)</span>
                  <span className="font-mono font-bold text-white">
                    +{calcResults.premiumPriceSAR.toLocaleString('en-US', { maximumFractionDigits: 1 })} SAR
                  </span>
                </div>

                {applyVAT && (
                  <div className="flex justify-between text-xs text-neutral-200 font-medium">
                    <span>Saudi Custom Luxury VAT (15.0%)</span>
                    <span className="font-mono font-bold text-[#FFE071]">
                      +{calcResults.vatSAR.toLocaleString('en-US', { maximumFractionDigits: 1 })} SAR
                    </span>
                  </div>
                )}

                <div className="border-t border-white/15 pt-2.5 flex justify-between text-base font-black text-white">
                  <span className="font-serif">Estimated Complete Quote</span>
                  <span className="font-mono text-[#FFE071] underline decoration-amber-400 decoration-wavy underline-offset-4">
                    {calcResults.totalPriceSAR.toLocaleString('en-US', { minimumFractionDigits: 2 })} SAR
                  </span>
                </div>
              </div>

              {/* Advisory note */}
              <div className="flex items-start gap-2.5 mt-4 text-[11px] text-neutral-300 leading-normal font-sans font-medium">
                <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  Our calculations are based on professional global commodities indices and the official Saudi Central Bank pegged currency rate (1 USD = 3.7500 SAR). Handcrafted mount details subject to final artisan commission review.
                </span>
              </div>

            </div>

            {/* Book Commission Desk Dynamic CTA */}
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={onBookAtelier}
              className="bg-gradient-to-r from-[#FFE071] to-amber-300 hover:from-white hover:to-white text-black font-extrabold text-xs tracking-widest uppercase py-4 rounded-2xl flex items-center justify-center gap-3 shadow-xl cursor-pointer group/btn"
            >
              <CheckCircle2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>Lock Valuation & Book Atelier Desk</span>
            </motion.button>

          </div>

        </div>

      </div>

      {/* Footer Branding Line */}
      <div className="max-w-6xl mx-auto w-full border-t border-white/10 pt-4 pb-4 flex flex-col sm:flex-row justify-between items-center text-white/40 text-[10px] font-mono gap-2">
        <span>EST. 2026 • VAULT INDEXING SECURE ALGORITHM • SPOT TERM</span>
        <span>PEGGED CENTRAL SCENARIOS: 1 USD = 3.75 SAR • TAX ESTIMATOR</span>
      </div>
    </motion.div>
  );
};
