import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { HowItWorks } from './components/HowItWorks';
import { About } from './components/About';
import { Footer } from './components/Footer';
import { RealityGateway } from './components/RealityGateway';

export default function App(): React.JSX.Element {
  const [isGatewayOpen, setIsGatewayOpen] = useState(false);

  const handleOpenGateway = () => {
    setIsGatewayOpen(true);
  };

  const handleCloseGateway = () => {
    setIsGatewayOpen(false);
  };

  const handleExploreConcept = () => {
    const element = document.getElementById('how-it-works');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#080910] text-[#F5F3FF] selection:bg-[#A78BFA]/30 selection:text-[#F5F3FF] font-body relative">
      {/* Primary Navigation */}
      <Navbar onOpenGateway={handleOpenGateway} />

      {/* Main Page Content */}
      <main>
        {/* Cinematic Multiverse Hero Section */}
        <Hero
          onStartSimulation={handleOpenGateway}
          onExploreConcept={handleExploreConcept}
        />

        {/* How It Works Section */}
        <HowItWorks />

        {/* About Section */}
        <About />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Reality Gateway Modal */}
      <RealityGateway
        isOpen={isGatewayOpen}
        onClose={handleCloseGateway}
      />
    </div>
  );
}
