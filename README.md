# ⚜️ Halo Atelier | Fine Exhibition & Bespoke Jewelry Studio

Halo Atelier is an ultra-premium, high-craft digital exhibition and interactive design desk for Place Vendôme’s finest custom commissions. It showcases GIA-certified diamonds, real-time precious metal pricing metrics, and bespoke artisan consultation workspaces in a highly polished, cinematic visual interface.

---

## ✨ Features & Capabilites

- **⚜️ High-Craft Cinematic Layout**: Elegant Prata typography, responsive alignment constraints, and spacious negative-space grids.
- **⚡ Interactive Commodity Desk**: Live simulated gold and Riyal valuation calculations, instantly computing VAT taxes and conversion metrics relative to Saudi Riyals (SAR).
- **💍 Solitaire & Metal Atelier Workspace**: A rich customized inquiry form where clients select jewelry blueprint categories, precious alloy ratios, diamond cuts, and custom laser engravings with live specs.
- **👜 Fully Portrayable Wallet Sandbox**: Integrated mock digital vault playground mimicking private luxury client-access keys.

---

## 🚀 Deployment Guide

You can easily host Halo Atelier using any premium zero-config cloud platform. Because we removed the automatic GitHub Actions workflow triggers, your pushes will remain quiet and will not trigger automated build emails or notifications.

### 🌟 Vercel (Recommended)
1. Go to [Vercel.com](https://vercel.com) and click **Add New** -> **Project**.
2. Connect your GitHub account and import your `halo-atelier` repository.
3. Vercel automatically detects **Vite** as your preset. Click **Deploy**.

### ⚡ Netlify
1. Go to [Netlify.com](https://www.netlify.com) and click **Import from Git**.
2. Authenticate with GitHub and choose your repository.
3. Leave default settings (Build Command: `npm run build`, Publish directory: `dist`) and click **Deploy Site**.

---

## 💻 Local Workspace Execution

You can run the full workspace on minor devices locally with these commands:

### Prerequisites:
Make sure you have Node.js (version 18 or above) installed.

1. **Install Dependencies**:
   ```bash
   npm install
   ```
2. **Run Dev Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

3. **Build Locally**:
   ```bash
   npm run build
   ```
   Compiles the production-ready assets into the `/dist` directory.
