/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export interface BrandItem {
  id: string;
  name: string;
  style: React.CSSProperties;
}

export interface InfoCardItem {
  id: string;
  title: string;
  body: string;
  bgStyle?: React.CSSProperties;
  className?: string;
  imageUrl?: string;
}

export interface Handlers {
  onOpenConsultation: () => void;
}

export interface UseCaseItem {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
}

export interface JewelryInquiry {
  id: string;
  gemType: 'Diamond' | 'Gold' | 'Silver' | 'Platinum' | 'Emerald' | 'Sapphire';
  category: 'Ring' | 'Necklace' | 'Bracelet' | 'Earrings' | 'Bespoke Custom';
  caratOrWeight: string;
  engraving?: string;
  userMessage: string;
  clientName: string;
  clientEmail: string;
  timestamp: string;
  referenceNumber: string;
  status: 'In Review' | 'Artisan Assigned' | 'Design Proposed' | 'Certified';
}

export interface SpotRates {
  gold: number;
  silver: number;
  diamond: number;
}
