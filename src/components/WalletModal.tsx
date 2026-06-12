/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { X, Sparkles, Send, Library, FileText, Compass, CheckCircle, MessageSquare } from 'lucide-react';
import { JewelryInquiry } from '../types';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PRE_FILLED_INQUIRIES: JewelryInquiry[] = [
  {
    id: 'inq-1',
    gemType: 'Diamond',
    category: 'Ring',
    caratOrWeight: '1.8 Carat (D-Flawless Cut)',
    engraving: 'Forever & Always',
    userMessage: 'Looking for a bespoke solitaire engagement ring utilizing GIA certified stones with brilliant clarity. Please advise on metal pricing.',
    clientName: 'Alexander Sterling',
    clientEmail: 'alex@sterlingholdings.com',
    timestamp: '2026-06-09 14:32',
    referenceNumber: 'HALO-XAU-9521',
    status: 'Artisan Assigned'
  },
  {
    id: 'inq-2',
    gemType: 'Platinum',
    category: 'Bespoke Custom',
    caratOrWeight: '25.5 Grams (Pure Pt950)',
    engraving: 'A.S. 2026',
    userMessage: 'Custom heavy mens chain request. Let me know the lead time for casting custom platinum components.',
    clientName: 'Alexander Sterling',
    clientEmail: 'alex@sterlingholdings.com',
    timestamp: '2026-06-10 09:15',
    referenceNumber: 'HALO-GEM-3829',
    status: 'In Review'
  }
];

export const WalletModal: React.FC<WalletModalProps> = ({ isOpen, onClose }) => {
  const [inquiries, setInquiries] = useState<JewelryInquiry[]>(() => {
    const saved = localStorage.getItem('halo_jewelry_inquiries');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // use default
      }
    }
    return PRE_FILLED_INQUIRIES;
  });

  const [activeTab, setActiveTab] = useState<'create' | 'history' | 'appraisal'>('create');
  
  // Custom Form fields
  const [gemType, setGemType] = useState<JewelryInquiry['gemType']>('Diamond');
  const [category, setCategory] = useState<JewelryInquiry['category']>('Ring');
  const [carat, setCarat] = useState('1.5 Carat');
  const [engraving, setEngraving] = useState('');
  const [userMessage, setUserMessage] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

  // Cache to LocalStorage on change
  useEffect(() => {
    localStorage.setItem('halo_jewelry_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail || !userMessage) {
      alert('Please complete all required fields.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const uniqueRef = 'HALO-' + gemType.substring(0, 3).toUpperCase() + '-' + Math.floor(1000 + Math.random() * 9000);
      const newInquiry: JewelryInquiry = {
        id: `inq-${Date.now()}`,
        gemType,
        category,
        caratOrWeight: carat,
        engraving: engraving.trim() || undefined,
        userMessage: userMessage,
        clientName: clientName,
        clientEmail: clientEmail,
        timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16),
        referenceNumber: uniqueRef,
        status: 'In Review'
      };

      setInquiries(prev => [newInquiry, ...prev]);
      setIsSubmitting(false);

      // Reset fields
      setUserMessage('');
      setEngraving('');
      setSubmitSuccess(`Your bespoke invitation request [${uniqueRef}] was submitted directly to our Master GIA Appraiser.`);
      
      // Auto transition to history view
      setTimeout(() => {
        setSubmitSuccess(null);
        setActiveTab('history');
      }, 3500);

    }, 2000);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to withdraw this consultation request?')) {
      setInquiries(prev => prev.filter(item => item.id !== id));
    }
  };

  if (!isOpen) return null;

  return (
    <div
      id="wallet-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in"
    >
      <div
        id="wallet-modal-container"
        className="w-full max-w-2xl bg-[#0F0F0F] text-white rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative flex flex-col max-h-[90vh]"
      >
        {/* Decorative Luxury golden gradient background */}
        <div className="absolute top-0 inset-x-0 h-[100px] bg-gradient-to-b from-[#FFE071]/10 to-transparent pointer-events-none" />

        {/* Modal Header */}
        <div className="relative px-6 py-5 flex items-center justify-between border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-[#FFE071] to-[#C2B2FF] text-black rounded-xl">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold tracking-tight text-white font-serif">Halo Atelier Desk</h3>
              <p className="text-xs text-[#FFE071]/80 font-mono tracking-widest uppercase">Bespoke Jewelry Consultation</p>
            </div>
          </div>
          <button
            id="close-wallet-btn"
            onClick={onClose}
            className="p-1.5 text-white/50 hover:text-white hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Golden success banner */}
        {submitSuccess && (
          <div className="bg-[#FFE071] text-black px-6 py-3 text-xs md:text-sm text-center font-semibold animate-slide-down flex items-center justify-center gap-2">
            <CheckCircle className="w-4 h-4 text-black shrink-0" />
            <span>{submitSuccess}</span>
          </div>
        )}

        {/* Modern navigation Tabs representing custom boutique desk */}
        <div className="flex border-b border-white/5 bg-black/50 overflow-x-auto shrink-0 select-none">
          <button
            id="wallet-tab-overview"
            onClick={() => setActiveTab('create')}
            className={`flex-1 min-w-[140px] py-4 text-xs tracking-wider font-bold uppercase transition-all duration-300 ${
              activeTab === 'create'
                ? 'border-b-2 border-[#FFE071] text-[#FFE071] bg-white/[0.02]'
                : 'border-b-2 border-transparent text-white/40 hover:text-white hover:bg-white/5'
            }`}
          >
            Custom Atelier Desk
          </button>
          <button
            id="wallet-tab-mint"
            onClick={() => setActiveTab('history')}
            className={`flex-1 min-w-[140px] py-4 text-xs tracking-wider font-bold uppercase transition-all duration-300 ${
              activeTab === 'history'
                ? 'border-b-2 border-[#FFE071] text-[#FFE071] bg-white/[0.02]'
                : 'border-b-2 border-transparent text-white/40 hover:text-white hover:bg-white/5'
            }`}
          >
            Inquiry Ledger ({inquiries.length})
          </button>
          <button
            id="wallet-tab-burn"
            onClick={() => setActiveTab('appraisal')}
            className={`flex-1 min-w-[140px] py-4 text-xs tracking-wider font-bold uppercase transition-all duration-300 ${
              activeTab === 'appraisal'
                ? 'border-b-2 border-[#FFE071] text-[#FFE071] bg-white/[0.02]'
                : 'border-b-2 border-transparent text-white/40 hover:text-white hover:bg-white/5'
            }`}
          >
            Artisan Appraisal Guide
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="p-6 overflow-y-auto flex-1 bg-black/10">
          {activeTab === 'create' && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="p-4 bg-[#FFE071]/5 rounded-xl border border-[#FFE071]/10 text-xs md:text-sm leading-relaxed text-white/70">
                ✨ <strong>CREATE A BESPOKE MASTERPIECE:</strong> Configure your jewelry preference or specify exact carat requirements. Your configurations and message details will be routed directly to our design workshop.
              </div>

              {/* Grid 1: Basic Specifications */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-white/40 mb-2">
                    Primary Medium / Gem Category
                  </label>
                  <select
                    value={gemType}
                    onChange={(e) => setGemType(e.target.value as JewelryInquiry['gemType'])}
                    className="w-full h-11 bg-black/40 border border-white/10 rounded-lg px-3 font-sans text-sm text-white focus:outline-none focus:border-[#FFE071] focus:ring-1 focus:ring-[#FFE071] transition-all"
                  >
                    <option value="Diamond" className="bg-black text-white">Diamond (Brilliant Carbon)</option>
                    <option value="Platinum" className="bg-black text-white font-semibold">Platinum pt950 (Precious)</option>
                    <option value="Gold" className="bg-black text-white">Gold 24K (Pure bullion)</option>
                    <option value="Silver" className="bg-black text-white">Sterling Silver 925</option>
                    <option value="Emerald" className="bg-black text-white">Zambian Emerald</option>
                    <option value="Sapphire" className="bg-black text-white">Royal Blue Sapphire</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-white/40 mb-2">
                    Jewelry Setting Structure
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as JewelryInquiry['category'])}
                    className="w-full h-11 bg-black/40 border border-white/10 rounded-lg px-3 font-sans text-sm text-white focus:outline-none focus:border-[#FFE071] focus:ring-1 focus:ring-[#FFE071] transition-all"
                  >
                    <option value="Ring" className="bg-black text-white">Solitaire engagement ring</option>
                    <option value="Necklace" className="bg-black text-white">Luxury collar necklace</option>
                    <option value="Bracelet" className="bg-black text-white">Gems-encrusted tennis bracelet</option>
                    <option value="Earrings" className="bg-black text-white">Art-deco drop earrings</option>
                    <option value="Bespoke Custom" className="bg-black text-white font-semibold">Bespoke Custom creation</option>
                  </select>
                </div>
              </div>

              {/* Grid 2: Custom Fine details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-white/40 mb-2">
                    Sizing, Carat, or Total Weight
                  </label>
                  <input
                    type="text"
                    value={carat}
                    onChange={(e) => setCarat(e.target.value)}
                    placeholder="e.g. 1.8 Carats, Size 6"
                    className="w-full h-11 bg-black/40 border border-white/10 rounded-lg px-3 font-mono text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#FFE071] focus:ring-1 focus:ring-[#FFE071] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-white/40 mb-2">
                    Fine Laser Engraving (Optional)
                  </label>
                  <input
                    type="text"
                    value={engraving}
                    onChange={(e) => setEngraving(e.target.value)}
                    placeholder="e.g. Forever & Always"
                    maxLength={40}
                    className="w-full h-11 bg-black/40 border border-white/10 rounded-lg px-3 font-serif text-sm italic text-amber-200 placeholder-white/20 focus:outline-none focus:border-[#FFE071] focus:ring-1 focus:ring-[#FFE071] transition-all"
                  />
                </div>
              </div>

              {/* Inquiry details text block */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-white/40 mb-2">
                  Fine Jewelry Inquiry or Design Specifications *
                </label>
                <textarea
                  value={userMessage}
                  onChange={(e) => setUserMessage(e.target.value)}
                  rows={3}
                  required
                  placeholder="Describe your design specifications or anything you would like to ask our master jewelers regarding dimensions, GIA diamond certifications, custom settings, or delivery timelines..."
                  className="w-full bg-black/40 border border-white/10 rounded-lg p-3 font-sans text-xs md:text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#FFE071] focus:ring-1 focus:ring-[#FFE071] transition-all leading-relaxed"
                />
              </div>

              {/* Personal Contact Details */}
              <div className="border-t border-white/5 pt-4 space-y-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-white/40">Client Invitation credentials</span>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="FullName"
                      className="w-full h-11 bg-black/40 border border-white/10 rounded-lg px-3 font-sans text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#FFE071] transition-all"
                    />
                  </div>

                  <div>
                    <input
                      type="email"
                      required
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      placeholder="Email Address"
                      className="w-full h-11 bg-black/40 border border-white/10 rounded-lg px-3 font-sans text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#FFE071] transition-all"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 bg-white hover:bg-[#FFE071] disabled:bg-white/20 text-black font-bold uppercase tracking-wider text-xs rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                {isSubmitting ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin text-black" />
                    Transmitting Design Sheet to Atelier...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-black" />
                    Submit Private Jewelry Inquiry
                  </>
                )}
              </button>
            </form>
          )}

          {activeTab === 'history' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-serif text-white/80 tracking-wide">Submitted Private Inquiries</h4>
                <span className="text-[10px] text-white/40 font-mono flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-ping" />
                  Synced Live with Atelier Ledger
                </span>
              </div>

              {inquiries.length === 0 ? (
                <div className="p-8 text-center bg-black/20 rounded-xl border border-white/5 space-y-2">
                  <Library className="w-8 h-8 text-white/20 mx-auto" />
                  <p className="text-sm text-white/50 font-serif">No inquiry files in this session.</p>
                  <p className="text-xs text-white/30">Use the Atelier Desk to cast a brand new inquiry.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {inquiries.map((inq) => (
                    <div
                      key={inq.id}
                      className="p-4 bg-white/[0.02] hover:bg-white/[0.04] rounded-xl border border-white/10 transition-all duration-200"
                    >
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="px-2 py-0.5 bg-white/10 rounded text-[10px] font-bold tracking-wider text-white">
                              {inq.category}
                            </span>
                            <span className="text-xs font-mono text-[#FFE071] font-semibold">
                              {inq.gemType}
                            </span>
                            <span className="text-[10px] text-white/30 font-mono">#{inq.referenceNumber}</span>
                          </div>
                          <span className="text-[10px] text-white/40 block mt-1">{inq.timestamp}</span>
                        </div>

                        <div className="text-right">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-[#FFE071]/10 text-[#FFE071] border border-[#FFE071]/20">
                            {inq.status}
                          </span>
                        </div>
                      </div>

                      <div className="text-xs text-white/70 bg-black/40 p-3 rounded-lg border border-white/5 space-y-1 mb-2">
                        {inq.engraving && (
                          <div className="text-amber-200 italic font-serif mb-1">
                            Engraving Inscription: "{inq.engraving}"
                          </div>
                        )}
                        <p className="italic leading-relaxed">"{inq.userMessage}"</p>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-white/40">
                        <span>Submitted by: <strong className="text-white/60">{inq.clientName}</strong></span>
                        <button
                          type="button"
                          onClick={() => handleDelete(inq.id)}
                          className="hover:text-rose-400 font-semibold uppercase text-[10px] tracking-wider transition-colors cursor-pointer"
                        >
                          Withdraw
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'appraisal' && (
            <div className="space-y-6 text-sm text-white/70 leading-relaxed font-sans">
              <div className="p-4 bg-white/5 rounded-xl border border-white/10 space-y-3">
                <h5 className="font-serif text-white font-medium text-base flex items-center gap-2">
                  <Compass className="w-5 h-5 text-[#FFE071]" />
                  The GIA Appraisal Standards
                </h5>
                <p className="text-xs">
                  Each precious stone verified, cataloged, or quoted through the Halo fine jewelry systems undergoes stringent diamond certification processes adhering to international GIA diamond grading metrics:
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center text-xs mt-2">
                  <div className="p-2 bg-black/40 rounded border border-white/5">
                    <span className="block text-[#FFE071] font-mono font-bold">Cut</span>
                    <span className="text-[10px] text-white/40">Excellent to Ideal</span>
                  </div>
                  <div className="p-2 bg-black/40 rounded border border-white/5">
                    <span className="block text-[#FFE071] font-mono font-bold">Clarity</span>
                    <span className="text-[10px] text-white/40">FL (Flawless) - VVS</span>
                  </div>
                  <div className="p-2 bg-black/40 rounded border border-white/5">
                    <span className="block text-[#FFE071] font-mono font-bold">Color</span>
                    <span className="text-[10px] text-white/40">D, E, F (Colorless)</span>
                  </div>
                  <div className="p-2 bg-black/40 rounded border border-white/5">
                    <span className="block text-[#FFE071] font-mono font-bold">Carat</span>
                    <span className="text-[10px] text-white/40">Up to 10+ ct certified</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h5 className="font-serif text-white font-medium text-base flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#FFE071]" />
                  Live Spot Rate Estimations
                </h5>
                <p className="text-xs">
                  We integrate raw precious metal pricing updates. While setting diamond values involves rigorous clarity appraisals, gold (XAU) and sterling silver (XAG) values are computed at raw weights instantly following GIA appraisal steps:
                </p>
                <ul className="text-xs space-y-1.5 list-disc list-inside text-white/60">
                  <li>Pure gold jewelry is prepared strictly using certified 24K bullion.</li>
                  <li>Our platinum pieces standard is pt950 (95% pure dense platinum element).</li>
                  <li>Every design quotation locks the spot price for up to 48 hours for guarantee.</li>
                </ul>
              </div>

              <div className="p-4 bg-[#FFE071]/5 rounded-xl border border-[#FFE071]/10 flex items-center gap-3">
                <MessageSquare className="w-5 h-5 text-[#FFE071] shrink-0" />
                <div className="text-xs">
                  <strong>Need instant assist?</strong> You can submit any appraisal ticket through the <span className="text-[#FFE071] font-bold">Ledger</span> and an associate artisan will contact you in Paris hours (CET).
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-black/50 border-t border-white/5 flex justify-between items-center text-[10px] text-white/40 shrink-0 font-mono uppercase tracking-widest select-none">
          <span>Paris • Geneva • New York</span>
          <span>Halo GIA Atelier Desk v1.2</span>
        </div>
      </div>
    </div>
  );
};
