/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Copy, Check, X, Shield, Sparkles, AlertCircle, Info } from 'lucide-react';

interface TypographyTerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TypographyTerminal: React.FC<TypographyTerminalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [textInput, setTextInput] = useState('HALO ATELIER // Comm Commision #2481');
  const [activeTab, setActiveTab] = useState<'blueprint' | 'playground' | 'rules'>('blueprint');

  // Exact blueprint code text to copy
  const studioPromptText = `Website Typography Blueprint:
- Primary/Main Font: "Libre Bodoni" (Used for core site layout, paragraphs, standard descriptions, and refined headings to give a luxury look).
- Secondary Font: "Instrument Serif" (Used for supporting descriptions, tall italic taglines, or numbers & certificate labels).
- Accent/Specials Font: "Black Ops One" (Used for brutalist titles, "About Us" and special highlighted categories to bring a modern tech feel).`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(studioPromptText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text', err);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 cursor-pointer"
          onClick={onClose}
        />

        {/* Console Container */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="relative w-full max-w-2xl bg-[#09090b] border-2 border-amber-400/35 rounded-2xl shadow-[0_0_50px_rgba(251,191,36,0.15)] overflow-hidden text-white z-10"
        >
          {/* Neon terminal top-bar */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-black/60">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 mr-2">
                <span className="w-3 h-3 rounded-full bg-rose-500 block" onClick={onClose} />
                <span className="w-3 h-3 rounded-full bg-amber-500 block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500 block" />
              </div>
              <Terminal className="w-4 h-4 text-[#FFE071] animate-pulse" />
              <span className="font-mono text-[10px] uppercase tracking-wider text-white/80 font-bold">
                HALO_ATELIER // TYPO_CONSOLE.sh
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/20 px-2 py-0.5 rounded-full uppercase pb-1">
                ● Live Sync
              </span>
              <button
                onClick={onClose}
                className="p-1 text-white/50 hover:text-white hover:bg-white/10 rounded transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Console Workspace Grid */}
          <div className="p-6 font-mono text-sm leading-relaxed">
            
            {/* Greeting & Instruction Header */}
            <div className="mb-6 p-4 rounded-xl bg-amber-400/[0.03] border border-amber-400/10">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-[#FFE071] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white mb-1">Interactive Typography Terminal</h4>
                  <p className="text-white/60 text-xs leading-normal">
                    This terminal organizes your three chosen fonts. We have implemented them across the entire page. Use this console to review guidelines & copy prompt details instantly for Google AI Studio.
                  </p>
                </div>
              </div>
            </div>

            {/* Sub-tab Selectors */}
            <div className="flex items-center gap-1.5 border-b border-white/10 pb-3 mb-6">
              {[
                { id: 'blueprint', label: '1. Blueprint' },
                { id: 'playground', label: '2. Live Tester' },
                { id: 'rules', label: '3. Best Practice' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-white/10 text-[#FFE071] border border-white/10'
                      : 'text-white/50 hover:text-white/90 bg-transparent'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* TAB CONTENT: 1. Blueprint (The copy-paste helper) */}
            {activeTab === 'blueprint' && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs text-amber-300 font-extrabold tracking-wider uppercase">Google AI Studio Payload:</span>
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 bg-white/5 hover:bg-[#FFE071] hover:text-black border border-white/10 px-3 py-1.5 rounded-lg text-xs transition-all cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Payload Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Prompt Payload</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="relative bg-black rounded-xl p-4 border border-white/5 font-mono text-xs text-white/90 max-h-[160px] overflow-y-auto whitespace-pre-line leading-relaxed shadow-inner">
                  {studioPromptText}
                </div>

                <div className="flex items-start gap-2 bg-blue-500/10 border border-blue-500/20 p-3 rounded-xl text-[11px] text-blue-300">
                  <Shield className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>
                    Copy the payload above and paste it directly into Google AI Studio chat to train the models to respect this typography workflow permanently in upstream development.
                  </span>
                </div>
              </motion.div>
            )}

            {/* TAB CONTENT: 2. Live Tester (Interactive fonts renderer) */}
            {activeTab === 'playground' && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-5"
              >
                <div>
                  <label className="block text-[10px] text-white/50 uppercase tracking-wider mb-1.5 font-bold">Write Your Test Text Here:</label>
                  <input
                    type="text"
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-2 text-sm text-[#FFE071] focus:outline-none focus:border-amber-400"
                    placeholder="Enter custom text..."
                  />
                </div>

                {/* Grid showing fonts */}
                <div className="grid grid-cols-1 gap-3">
                  
                  {/* Font 1 */}
                  <div className="bg-black/60 border border-white/10 p-3.5 rounded-xl">
                    <div className="flex items-center justify-between text-[10px] text-white/40 mb-2">
                      <span>FONT: LIBRE BODONI (PRIMARY)</span>
                      <span className="font-bold text-[#FFE071]">font-bodoni</span>
                    </div>
                    <div 
                      className="text-lg text-white"
                      style={{ fontFamily: '"Libre Bodoni", serif' }}
                    >
                      {textInput || "Default text"}
                    </div>
                  </div>

                  {/* Font 2 */}
                  <div className="bg-black/60 border border-white/10 p-3.5 rounded-xl">
                    <div className="flex items-center justify-between text-[10px] text-white/40 mb-2">
                      <span>FONT: INSTRUMENT SERIF (SECONDARY)</span>
                      <span className="font-bold text-amber-300">font-instrument</span>
                    </div>
                    <div 
                      className="text-2xl italic text-white"
                      style={{ fontFamily: '"Instrument Serif", serif' }}
                    >
                      {textInput || "Default text"}
                    </div>
                  </div>

                  {/* Font 3 */}
                  <div className="bg-black/60 border border-white/10 p-3.5 rounded-xl">
                    <div className="flex items-center justify-between text-[10px] text-white/40 mb-2">
                      <span>FONT: BLACK OPS ONE (ACCENT/TITLES)</span>
                      <span className="font-bold text-yellow-300">font-blackops</span>
                    </div>
                    <div 
                      className="text-base text-white tracking-wide"
                      style={{ fontFamily: '"Black Ops One", cursive' }}
                    >
                      {textInput || "Default text"}
                    </div>
                  </div>

                </div>
              </motion.div>
            )}

            {/* TAB CONTENT: 3. Best Practice (Usage Guides) */}
            {activeTab === 'rules' && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4 text-xs text-white/85"
              >
                <div className="bg-black/40 border border-white/5 p-4 rounded-xl space-y-3">
                  <div className="flex items-center gap-2 text-[#FFE071] font-bold">
                    <Sparkles className="w-4 h-4" />
                    <span className="uppercase">Best Practice Rules & Application Layout</span>
                  </div>
                  
                  <ul className="list-disc pl-5 space-y-2 leading-relaxed text-white/70">
                    <li>
                      <strong className="text-white">Libre Bodoni Layout:</strong> Perfect for luxurious main headers or paragraphs where you want to read with rich contrast and a royal, high-investment appearance.
                    </li>
                    <li>
                      <strong className="text-white">Instrument Serif Layout:</strong> Best utilized in <em className="italic">italic</em> style for supportive labels, subheadings, quotes, and technical specs. It emphasizes artistic attention to detail.
                    </li>
                    <li>
                      <strong className="text-white">Black Ops One Layout:</strong> Use sparingly for eye-catching titles like "About Us", navbar tags, buttons, and callouts to anchor modern structure.
                    </li>
                  </ul>
                </div>

                <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-xl text-emerald-300">
                  <AlertCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Interactive CSS Tailwind classes are active globally across the site!</span>
                </div>
              </motion.div>
            )}

          </div>

          {/* Console footer */}
          <div className="px-6 py-3 bg-black border-t border-white/10 flex items-center justify-between text-[11px] text-white/40">
            <span>TERMINAL CONTROLLER ACTIVE</span>
            <span>PRESS ESC TO CLOSE</span>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
