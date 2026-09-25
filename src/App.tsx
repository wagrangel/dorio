/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { StoreProvider } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { CategoryHighlights } from './components/CategoryHighlights';
import { ProductGrid } from './components/ProductGrid';
import { BrandConcept } from './components/BrandConcept';
import { InstagramFeed } from './components/InstagramFeed';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { AdminPanel } from './components/AdminPanel';
import { FaceShapeGuideModal } from './components/FaceShapeGuideModal';
import { FloatingActions } from './components/FloatingActions';

export default function App() {
  return (
    <StoreProvider>
      <div className="min-h-screen flex flex-col bg-[#FAFAF9] text-[#121212]">
        {/* Navigation */}
        <Navbar />

        {/* Main Content */}
        <main className="flex-1">
          {/* Hero Campaign */}
          <HeroBanner />

          {/* Categories Showcase */}
          <CategoryHighlights />

          {/* Product Catalog & Vitrine */}
          <ProductGrid />

          {/* Brand Manifesto & Concept */}
          <BrandConcept />

          {/* Instagram Community & UGC */}
          <InstagramFeed />
        </main>

        {/* Footer */}
        <Footer />

        {/* Global Modals & Drawers */}
        <ProductDetailModal />
        <CartDrawer />
        <CheckoutModal />
        <AdminPanel />
        <FaceShapeGuideModal />
        <FloatingActions />
      </div>
    </StoreProvider>
  );
}
