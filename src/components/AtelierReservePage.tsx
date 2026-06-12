/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Compass, Shield, Calendar, Clock, User, Mail, FileText, CheckCircle2, ArrowRight } from 'lucide-react';

interface AtelierReservePageProps {
  onBackHome: () => void;
}

export const AtelierReservePage: React.FC<AtelierReservePageProps> = ({ onBackHome }) => {
  // Booking Form States
  const [jewelryType, setJewelryType] = useState<'Bespoke Custom' | 'Ring' | 'Necklace' | 'Bracelet' | 'Earrings'>('Bespoke Custom');
  const [metalChoice, setMetalChoice] = useState<'24K Gold' | '18K White Gold' | 'Pt950 Platinum'>('24K Gold');
  const [giaCarat, setGiaCarat] = useState<number>(2.5);
  const [diamondCut, setDiamondCut] = useState<'Brilliant Cut' | 'Emerald Cut' | 'Cushion Cut' | 'Oval Bevel'>('Brilliant Cut');
  const [engravingText, setEngravingText] = useState<string>('');
  
  const [clientName, setClientName] = useState<string>('');
  const [clientEmail, setClientEmail] = useState<string>('');
  const [appointmentDate, setAppointmentDate] = useState<string>('2026-06-15');
  const [appointmentTime, setAppointmentTime] = useState<string>('14:00');

  // Success Confirmation State
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [dossierNumber, setDossierNumber] = useState<string>('');

  const handleCreateCommission = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail) {
      alert("Please provide name and email coordinates.");
      return;
    }

    // Generate a high-fidelity cinematic GIA confirmation dossier
    const randomHex = Math.floor(1000 + Math.random() * 9000);
    const dateCode = appointmentDate.replace(/-/g, '').substring(2, 6);
    setDossierNumber(`GIA-HLA-${dateCode}-${randomHex}`);
    setIsSuccess(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.99 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.99 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-full h-full min-h-[calc(100vh-120px)] overflow-y-auto px-4 md:px-12 py-8 flex flex-col justify-between z-30 relative scrollbar-thin scrollbar-thumb-white/20"
    >
      <div className="max-w-6xl mx-auto w-full pt-8 pb-16">
        
        {/* Upper Title */}
        <div className="text-center max-w-2xl mx-auto mb-10 bg-neutral-950/70 backdrop-blur-md border border-white/10 p-6 md:p-8 rounded-3xl shadow-2xl relative z-10 transition-all duration-300">
          <span className="inline-flex items-center gap-1.5 bg-[#FFE071]/10 border border-[#FFE071]/25 px-4 py-1.5 rounded-full text-[#FFE071] text-[10px] font-mono tracking-widest uppercase mb-4 shadow-sm">
            <Compass className="w-3.5 h-3.5" />
            <span>Place Vendôme commission workspace</span>
          </span>
          <h1 className="text-3xl md:text-4xl font-serif text-white tracking-tight mb-2 font-bold">
            The Bespoke Design <span className="text-[#FFE071] italic font-serif">Atelier Desk</span>
          </h1>
          <p className="text-neutral-200 text-xs md:text-sm tracking-wide font-sans font-semibold">
            Submit structural variables to initiate fine jewelry rendering. Your assigned Place Vendôme artisan will generate official 3D designs and secure GIA optical verification profiles.
          </p>
        </div>

        {!isSuccess ? (
          <form onSubmit={handleCreateCommission} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Box: Form attributes (7 Cols) */}
            <div className="lg:col-span-12 xl:col-span-7 bg-neutral-950/90 backdrop-blur-xl border-2 border-white/15 rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-2xl gap-5">
              
              <h2 className="text-white text-base font-serif font-black flex items-center gap-2 border-b border-white/15 pb-3 leading-none">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <span>1. Metal & Gem Specification</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Jewelry Category */}
                <div>
                  <label className="text-neutral-200 font-bold text-[11px] uppercase font-mono tracking-wider block mb-2 leading-none">Jewelry Category</label>
                  <select 
                    value={jewelryType}
                    onChange={(e) => setJewelryType(e.target.value as any)}
                    className="w-full bg-neutral-900 border-2 border-white/20 rounded-xl px-4 py-3 text-white text-xs font-bold focus:outline-none focus:border-[#FFE071] appearance-none cursor-pointer"
                  >
                    <option className="bg-neutral-950 text-white" value="Bespoke Custom">Bespoke Custom Concept</option>
                    <option className="bg-neutral-950 text-white" value="Ring">Solitaire Ring</option>
                    <option className="bg-neutral-950 text-white" value="Necklace">Artisan Collar Necklace</option>
                    <option className="bg-neutral-950 text-white" value="Bracelet">Engraved Link Bracelet</option>
                    <option className="bg-neutral-950 text-white" value="Earrings">Refraction Stud Earrings</option>
                  </select>
                </div>

                {/* Metal Composition */}
                <div>
                  <label className="text-neutral-200 font-bold text-[11px] uppercase font-mono tracking-wider block mb-2 leading-none">Precious Metal Cast</label>
                  <select 
                    value={metalChoice}
                    onChange={(e) => setMetalChoice(e.target.value as any)}
                    className="w-full bg-neutral-900 border-2 border-white/20 rounded-xl px-4 py-3 text-white text-xs font-bold focus:outline-none focus:border-[#FFE071] appearance-none cursor-pointer"
                  >
                    <option className="bg-neutral-950 text-white" value="24K Gold">24K Pure Yellow Gold (99.9%)</option>
                    <option className="bg-neutral-950 text-white" value="18K White Gold">18K Rhodium White Gold (75.0%)</option>
                    <option className="bg-neutral-950 text-white" value="Pt950 Platinum">Pt950 High Density Platinum (95.0%)</option>
                  </select>
                </div>
              </div>

              {/* Slider Carat Selector */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-neutral-200 font-bold text-[11px] uppercase font-mono tracking-wider leading-none">GIA Diamond weight (Carat scale)</label>
                  <span className="text-black font-mono font-black text-xs bg-[#FFE071] px-2.5 py-0.5 rounded shadow">{giaCarat.toFixed(2)} Carats</span>
                </div>
                <div className="flex items-center gap-4">
                  <input 
                    type="range"
                    min="0.5"
                    max="12.0"
                    step="0.1"
                    value={giaCarat}
                    onChange={(e) => setGiaCarat(parseFloat(e.target.value))}
                    className="flex-1 accent-[#FFE071] h-1 bg-white/20 rounded-lg cursor-pointer"
                  />
                  <span className="text-[11px] font-mono text-neutral-300 font-bold">Scale: 0.5 - 12.0ct</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Specific Diamond Cut */}
                <div>
                  <label className="text-neutral-200 font-bold text-[11px] uppercase font-mono tracking-wider block mb-2 leading-none">GIA Optical Cut Shape</label>
                  <select 
                    value={diamondCut}
                    onChange={(e) => setDiamondCut(e.target.value as any)}
                    className="w-full bg-neutral-900 border-2 border-white/20 rounded-xl px-4 py-3 text-white text-xs font-bold focus:outline-none focus:border-[#FFE071] appearance-none cursor-pointer"
                  >
                    <option className="bg-neutral-950 text-white" value="Brilliant Cut">Brilliant Round Cut</option>
                    <option className="bg-neutral-950 text-white" value="Emerald Cut">Vintage Emerald-Cut</option>
                    <option className="bg-neutral-950 text-white" value="Cushion Cut">Romantic Cushion-Cut</option>
                    <option className="bg-neutral-950 text-white" value="Oval Bevel">Modern Oval Bevel Cut</option>
                  </select>
                </div>

                {/* laser engraving text */}
                <div>
                  <label className="text-neutral-200 font-bold text-[11px] uppercase font-mono tracking-wider block mb-2 leading-none">Laser Engraved Inscription</label>
                  <input 
                    type="text"
                    maxLength={24}
                    placeholder="e.g. Forever Allied ✦"
                    value={engravingText}
                    onChange={(e) => setEngravingText(e.target.value)}
                    className="w-full bg-neutral-900 border-2 border-white/20 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#FFE071] font-mono font-bold"
                  />
                </div>
              </div>

              {/* Client Info Core & Slots */}
              <h2 className="text-white text-base font-serif font-black flex items-center gap-2 border-b border-white/15 pb-3 mt-4 leading-none">
                <Calendar className="w-5 h-5 text-[#FFE071]" />
                <span>2. Client & Appointment Coordinates</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans font-bold">
                <div>
                  <label className="text-neutral-200 font-bold text-[11px] uppercase font-mono tracking-wider block mb-2 leading-none">Your Full Name</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-300"><User className="w-3.5 h-3.5" /></span>
                    <input 
                      type="text"
                      required
                      placeholder="Lord Sterling"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full bg-neutral-900 border-2 border-white/20 rounded-xl pl-9 pr-4 py-3 text-xs text-white focus:outline-none focus:border-[#FFE071] font-sans font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-neutral-200 font-bold text-[11px] uppercase font-mono tracking-wider block mb-2 leading-none">Your Email Address</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-300"><Mail className="w-3.5 h-3.5" /></span>
                    <input 
                      type="email"
                      required
                      placeholder="sterling@noble.com"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      className="w-full bg-neutral-900 border-2 border-white/20 rounded-xl pl-9 pr-4 py-3 text-xs text-white focus:outline-none focus:border-[#FFE071] font-sans font-bold"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-neutral-200 font-bold text-[11px] uppercase font-mono tracking-wider block mb-2">Preferred Consultation Date</label>
                  <input 
                    type="date"
                    required
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    className="w-full bg-neutral-900 border-2 border-white/20 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#FFE071] font-mono text-center font-bold"
                  />
                </div>

                <div>
                  <label className="text-neutral-200 font-bold text-[11px] uppercase font-mono tracking-wider block mb-2">Hour Slot (Saudi Standard Time)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-300"><Clock className="w-3.5 h-3.5" /></span>
                    <select
                      value={appointmentTime}
                      onChange={(e) => setAppointmentTime(e.target.value)}
                      className="w-full bg-neutral-900 border-2 border-white/20 rounded-xl pl-9 pr-4 py-3 text-xs text-white focus:outline-none focus:border-[#FFE071] appearance-none cursor-pointer font-mono font-bold"
                    >
                      <option className="bg-neutral-950 text-white" value="10:00">10:00 AM (Morning Slot)</option>
                      <option className="bg-neutral-950 text-white" value="12:00">12:00 PM (Noon Suite)</option>
                      <option className="bg-neutral-950 text-white" value="14:00">02:00 PM (Artisan Desk)</option>
                      <option className="bg-neutral-950 text-white" value="16:00">04:00 PM (Private Appraisal)</option>
                      <option className="bg-neutral-950 text-white" value="18:00">06:00 PM (Sunset Review)</option>
                    </select>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Box: Live preview summary cardboard (5 Cols) */}
            <div className="lg:col-span-12 xl:col-span-5 bg-neutral-950/95 backdrop-blur-3xl border-2 border-[#FFE071]/50 rounded-3xl p-6 md:p-8 flex flex-col justify-between relative overflow-hidden shadow-2xl">
              
              <div className="absolute -right-16 -top-16 w-48 h-48 bg-amber-400/10 rounded-full blur-[50px]" />

              <div>
                <span className="text-[#FFE071] text-[9px] font-mono tracking-widest font-extrabold bg-[#FFE071]/10 px-2.5 py-1 rounded border border-[#FFE071]/20 uppercase block w-fit mb-4 select-none">
                  Live Commission Draft
                </span>

                <h3 className="text-lg font-serif text-white font-black tracking-wide leading-tight mb-6">
                  Verify your custom jewelry structural credentials
                </h3>

                <div className="space-y-4 font-sans text-sm border-b border-white/10 pb-6 mb-6">
                  
                  <div className="flex justify-between">
                    <span className="text-neutral-300 font-bold">Jewelry Blueprint:</span>
                    <span className="text-white font-semibold font-serif">{jewelryType}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-neutral-300 font-bold">GIA Solitaire Core:</span>
                    <span className="text-white font-mono font-black text-[#FFE071] bg-[#FFE071]/10 px-2.5 py-0.5 rounded border border-[#FFE071]/25">{giaCarat.toFixed(1)} ct {diamondCut}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-neutral-300 font-bold">Precious Alloy Composition:</span>
                    <span className="text-white font-semibold">{metalChoice}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-neutral-300 font-bold">Engraving Inscription:</span>
                    <span className="text-white font-mono font-bold text-[#FFE071] bg-white/5 px-2 py-0.5 rounded border border-white/10">
                      {engravingText ? `"${engravingText}"` : "(None)"}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-neutral-300 font-bold">Preferred Slot Coordinates:</span>
                    <span className="text-white font-mono text-emerald-400 font-extrabold bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/20">{appointmentDate} @ {appointmentTime} AST</span>
                  </div>
                </div>
              </div>

              {/* Certification Standard Seal */}
              <div className="bg-neutral-900 border-2 border-white/10 rounded-2xl p-4 flex gap-3 items-start mb-6 shadow-md">
                <Shield className="w-5 h-5 text-[#FFE071] shrink-0 mt-0.5 animate-pulse" />
                <div>
                  <h4 className="text-white text-xs font-extrabold uppercase tracking-wider mb-1">GIA Conflict-Free Warranty</h4>
                  <p className="text-[11px] text-neutral-200 leading-relaxed font-sans font-medium">
                    Your allocation profile secures specific diamond clarity, color grades, and flawless micro carving parameters certified directly from global noble vaults.
                  </p>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full bg-[#FFE071] hover:bg-white text-black font-extrabold text-[11px] tracking-widest uppercase py-4 rounded-xl flex items-center justify-center gap-2 shadow-xl hover:scale-102 transition-all cursor-pointer"
              >
                <span>Initiate Bespoke Commission</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </button>

            </div>

          </form>
        ) : (
          /* SUCCESS CASE SCREEN */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-xl mx-auto bg-black/80 backdrop-blur-3xl border border-[#FFE071]/50 rounded-3xl p-8 text-center shadow-2xl relative"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-400 to-[#FFE071] rounded-3xl blur opacity-15" />

            <div className="relative z-10">
              <div className="w-16 h-16 bg-[#FFE071]/10 rounded-full flex items-center justify-center mx-auto mb-6 text-[#FFE071] border border-[#FFE071]/25">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <span className="text-[#FFE071] text-[9px] font-mono tracking-widest font-extrabold bg-[#FFE071]/10 px-3 py-1 rounded inline-block uppercase mb-3">
                Appointment Certified
              </span>

              <h2 className="text-2xl font-serif text-white mb-2 font-black">
                Bespoke Atelier Registered
              </h2>

              <p className="text-white/70 text-xs md:text-sm leading-relaxed mb-6 max-w-sm mx-auto font-sans">
                Greetings, <b>{clientName}</b>. Your private designer desk coordinates are secured for <b>{appointmentDate} at {appointmentTime} (Saudi Ast Time)</b>.
              </p>

              {/* Custom GIA Dossier Certificate details wrapper */}
              <div className="bg-neutral-900/60 rounded-xl p-5 border border-white/10 mb-6 font-mono text-left text-xs max-w-sm mx-auto">
                <span className="text-white/30 text-[9px] uppercase tracking-wider block mb-1">GIA Vault Docket Reference</span>
                <span className="text-white text-md font-bold text-[#FFE071] tracking-widest block font-mono mb-3">{dossierNumber}</span>
                
                <div className="border-t border-white/5 pt-3 text-[10px] space-y-1 text-white/60">
                  <p>• Category: <span className="text-white">{jewelryType}</span></p>
                  <p>• Alloy cast: <span className="text-white">{metalChoice}</span></p>
                  <p>• Diamond: <span className="text-white">{giaCarat} ct ({diamondCut})</span></p>
                  <p>• Engraving: <span className="text-white">"{engravingText || 'None'}"</span></p>
                </div>
              </div>

              <button
                onClick={onBackHome}
                className="bg-white hover:bg-[#FFE071] text-black font-extrabold text-[10px] tracking-widest uppercase py-3 px-8 rounded-full shadow-lg transition-all cursor-pointer"
              >
                Return to Exposition
              </button>
            </div>
          </motion.div>
        )}

      </div>

      {/* Footer Branding Line */}
      <div className="max-w-6xl mx-auto w-full border-t border-white/10 pt-4 pb-4 flex flex-col sm:flex-row justify-between items-center text-white/40 text-[10px] font-mono gap-2 animate-pulse">
        <span>EST. 2026 • VAULT DOCKET GIA-HLA PROTOCOL</span>
        <span>AUDITED ACCORDING TO VENUE STANDARDS</span>
      </div>
    </motion.div>
  );
};
