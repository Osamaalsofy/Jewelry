/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { LogoIcon } from './LogoIcon';
import { Sparkles, Terminal, ShieldAlert, Cpu } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer
      id="main-app-footer"
      className="bg-[#111112] text-white/50 px-6 py-16 border-t border-white/5 font-sans relative overflow-hidden z-40"
    >
      {/* Immersive background video layer for the footer */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-[0.06]">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
          src="videos/background.mp4"
        />
      </div>

      <div className="max-w-[88rem] mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Logo & Slogan Column */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2 text-white">
              <LogoIcon className="w-6 h-6 text-[#FFE071]" />
              <span className="text-xl font-serif font-bold tracking-tight">Halo</span>
            </div>
            <p className="text-xs text-white/40 leading-relaxed max-w-sm">
              The premium private jewelry design house creating handcrafted solitaires, cast bullion elements, and GIA-certified diamonds.
            </p>
            <div className="flex items-center gap-1.5 text-[10px] text-amber-400 font-mono font-semibold uppercase">
              <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse" />
              Place Vendôme Atelier Active
            </div>
          </div>

          {/* Links: Network & Tech */}
          <div>
            <h5 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">Maison Collections</h5>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#metals" className="hover:text-white transition-colors">Bespoke Solitaires</a>
              </li>
              <li>
                <a href="#gems" className="hover:text-white transition-colors">Fine Colored Sapphires</a>
              </li>
              <li>
                <a href="#appraisals" className="hover:text-white transition-colors">Platinum Casting Mounts</a>
              </li>
              <li>
                <a href="#atelier" className="hover:text-white transition-colors">Heritage Engravings</a>
              </li>
            </ul>
          </div>

          {/* Links: Partners & Ecosystem */}
          <div>
            <h5 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">Inquiry Desk</h5>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#appraisals" className="hover:text-white transition-colors font-semibold text-[#FFE071]">Live Precious Metal Index</a>
              </li>
              <li>
                <a href="#atelier" className="hover:text-white transition-colors">Place Vendôme Consultations</a>
              </li>
              <li>
                <a href="#atelier" className="hover:text-white transition-colors">Artisan Sketch Submissions</a>
              </li>
              <li>
                <a href="#help" className="hover:text-white transition-colors">GIA Gemological Register</a>
              </li>
            </ul>
          </div>

          {/* Security & Reserves Statement */}
          <div className="space-y-4">
            <h5 className="text-xs font-semibold uppercase tracking-wider text-white">Quality Assurance</h5>
            <div className="p-4 bg-white/5 rounded-lg border border-white/5 space-y-2">
              <div className="flex items-center gap-2 text-xs text-white font-medium">
                <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                100% GIA Certified
              </div>
              <p className="text-[10px] text-white/30 leading-relaxed font-sans">
                Each Halo diamond over 0.3 carats is laser-inscribed with a unique register number and accompanied by an official GIA grading dossier.
              </p>
            </div>
          </div>
        </div>

        {/* Divider and Copyright */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div>
            <span>© 2026 Halo Joaillerie & Fine Gems. Handcrafted with precision in Paris. All rights reserved.</span>
          </div>
          <div className="flex gap-6">
            <a href="#privacy" className="hover:text-white transition-colors">Atelier Charter</a>
            <a href="#terms" className="hover:text-white transition-colors">Ethical Sourcing Codes</a>
            <a href="#rules" className="hover:text-white transition-colors">Audited GIA Standards</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
