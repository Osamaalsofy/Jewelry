/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrandItem, InfoCardItem, UseCaseItem } from './types';

export const HERO_BRANDS: BrandItem[] = [
  {
    id: 'gia',
    name: 'GIA CERTIFIED',
    style: {
      fontFamily: 'Georgia, serif',
      fontWeight: 700,
      letterSpacing: '0.12em',
      fontSize: '12px',
      textTransform: 'uppercase'
    }
  },
  {
    id: 'cartier',
    name: 'Cartier',
    style: {
      fontFamily: 'Georgia, serif',
      fontWeight: 400,
      fontStyle: 'italic',
      letterSpacing: '0.04em',
      fontSize: '16px'
    }
  },
  {
    id: 'tiffany',
    name: 'TIFFANY & CO.',
    style: {
      fontFamily: '"Times New Roman", serif',
      fontWeight: 600,
      letterSpacing: '0.14em',
      fontSize: '14px',
      textTransform: 'uppercase'
    }
  },
  {
    id: 'vancleef',
    name: 'Van Cleef & Arpels',
    style: {
      fontFamily: 'Georgia, serif',
      fontWeight: 400,
      letterSpacing: '0.02em',
      fontSize: '14px'
    }
  },
  {
    id: 'bulgari',
    name: 'B V L G A R I',
    style: {
      fontFamily: 'Cinzel, Georgia, serif',
      fontWeight: 700,
      letterSpacing: '0.18em',
      fontSize: '13px',
      textTransform: 'uppercase'
    }
  },
  {
    id: 'graff',
    name: 'GRAFF',
    style: {
      fontFamily: 'Helvetica, sans-serif',
      fontWeight: 300,
      letterSpacing: '0.2em',
      fontSize: '13px'
    }
  }
];

export const BACKER_BRANDS: BrandItem[] = [
  {
    id: 'parisian-guild',
    name: 'Union de la Bijouterie Parisienne',
    style: {
      fontFamily: '"Times New Roman", serif',
      fontWeight: 400,
      letterSpacing: '0.06em',
      fontSize: '14px'
    }
  },
  {
    id: 'sothebys',
    name: 'SOTHEBY\'S APPRAISALS',
    style: {
      fontFamily: 'Georgia, serif',
      fontWeight: 700,
      letterSpacing: '0.12em',
      fontSize: '14px'
    }
  },
  {
    id: 'christies',
    name: 'CHRISTIE\'S FINE GEMS',
    style: {
      fontFamily: '"Times New Roman", serif',
      fontWeight: 500,
      letterSpacing: '0.15em',
      fontSize: '13px'
    }
  },
  {
    id: 'antwerp-exchange',
    name: 'Antwerp Diamond Exchange',
    style: {
      fontFamily: 'Helvetica, sans-serif',
      fontWeight: 600,
      letterSpacing: '0.02em',
      fontSize: '14px'
    }
  }
];

export const INFO_CARDS: InfoCardItem[] = [
  {
    id: 'card-1',
    title: 'Inspirations that bloom',
    body: 'Each rare gemstone is set individually onto micro-sculpted golden mountings, capturing absolute elegance and lasting luster.',
    imageUrl: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260423_164207_f243351d-ed59-48ec-83a0-a5e996bdbe3c.png&w=1280&q=85',
    className: 'lg:col-span-2'
  },
  {
    id: 'card-2',
    title: 'Always pure,\nalways ethical.',
    body: 'We certify each brilliant-cut diamond under professional GIA optics. Fully conflict-free and ethically sourced.',
    className: 'bg-[#161616] text-white'
  },
  {
    id: 'card-3',
    title: 'Bespoke\nEngraving Desk',
    body: 'Engrave laser-perfect custom names, dates, or personal symbols directly into internal metal margins of rings and neck bands.',
    className: 'bg-[#161616] text-white'
  }
];

export const USE_CASES: UseCaseItem[] = [
  {
    id: 'custom-solitaire',
    title: 'Bespoke Ateliers',
    description: 'Transform raw concept sheets and diamond select sheets into handcrafted masterworks. Work line-by-line with a designated master artisan based in Place Vendôme, Paris.',
    videoUrl: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260423_183428_ab5e672a-f608-4dcb-b319-f3e040f02e2d.mp4'
  },
  {
    id: 'metal-castings',
    title: 'Noble Castings',
    description: 'Specify weights of standard pure precious commodities. Cast certified 24K yellow gold, 18K white gold, or dense pure Platinum (pt950) into seamless bespoke mounts.',
    videoUrl: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260423_183428_ab5e672a-f608-4dcb-b319-f3e040f02e2d.mp4'
  },
  {
    id: 'asset-appraisals',
    title: 'Private Appraisals',
    description: 'Protect values through official appraisals. Halo locks the current live terminal precious gold and silver index spot rate during your inquiry to safeguard design quotes.',
    videoUrl: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260423_183428_ab5e672a-f608-4dcb-b319-f3e040f02e2d.mp4'
  }
];
