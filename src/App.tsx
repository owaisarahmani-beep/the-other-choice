import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { HowItWorks } from './components/HowItWorks';
import { About } from './components/About';
import { Footer } from './components/Footer';
import { RealityGateway } from './components/RealityGateway';
import { SimulationView } from './components/simulation/SimulationView';
import { OnboardingData, SimulationResult } from './engine/types';
import { generateSimulation } from './engine/generator';
import { loadSimulation, saveSimulation } from './utils/storage';

export default function App(): React.JSX.Element {
  const [currentView, setCurrentView] = useState<'landing' | 'simulation'>('landing');
  const [activeSimulation, setActiveSimulation] = useState<SimulationResult | null>(null);
  const [isGatewayOpen, setIsGatewayOpen] = useState(false);

  // Restore existing simulation on initial mount
  useEffect(() => {
    const saved = loadSimulation();
    const savedView = localStorage.getItem('the_other_choice_active_view');
    if (saved) {
      setActiveSimulation(saved);
      if (savedView === 'landing') {
        setCurrentView('landing');
      } else {
        setCurrentView('simulation');
      }
    }
  }, []);

  const handleOpenGateway = () => {
    setIsGatewayOpen(true);
  };

  const handleCloseGateway = () => {
    setIsGatewayOpen(false);
  };

  const handleSimulationReady = (data: OnboardingData) => {
    const newSim = generateSimulation(data);
    saveSimulation(newSim);
    setActiveSimulation(newSim);
    setCurrentView('simulation');
    localStorage.setItem('the_other_choice_active_view', 'simulation');
    setIsGatewayOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExploreConcept = () => {
    const element = document.getElementById('how-it-works');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExitSimulation = () => {
    setCurrentView('landing');
    localStorage.setItem('the_other_choice_active_view', 'landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResumeSimulation = () => {
    if (activeSimulation) {
      setCurrentView('simulation');
      localStorage.setItem('the_other_choice_active_view', 'simulation');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#080910] text-[#F5F3FF] selection:bg-[#A78BFA]/30 selection:text-[#F5F3FF] font-body relative">
      {currentView === 'simulation' && activeSimulation ? (
        /* Dedicated Simulation View */
        <SimulationView
          simulation={activeSimulation}
          onNewSimulation={handleOpenGateway}
          onExit={handleExitSimulation}
        />
      ) : (
        /* Landing Page View */
        <>
          <Navbar
            onOpenGateway={handleOpenGateway}
            hasActiveSimulation={!!activeSimulation}
            onResumeSimulation={handleResumeSimulation}
          />

          <main>
            <Hero
              onStartSimulation={handleOpenGateway}
              onExploreConcept={handleExploreConcept}
            />
            <HowItWorks />
            <About />
          </main>

          <Footer />
        </>
      )}

      {/* Multi-Step Reality Gateway Onboarding Modal */}
      <RealityGateway
        isOpen={isGatewayOpen}
        onClose={handleCloseGateway}
        onSimulationReady={handleSimulationReady}
      />
    </div>
  );
}
