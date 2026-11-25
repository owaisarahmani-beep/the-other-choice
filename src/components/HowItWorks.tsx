import React from 'react';
import { GitFork, Layers, GitBranch, ArrowRight } from 'lucide-react';

interface FeatureCardProps {
  step: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  accentColor: string;
  tag: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  step,
  title,
  description,
  icon,
  accentColor,
  tag,
}) => {
  return (
    <div className="relative group p-8 rounded-2xl bg-[#11121C]/80 border border-[#A78BFA]/15 hover:border-[#A78BFA]/35 transition-all duration-300 hover:shadow-[0_0_35px_-5px_rgba(167,139,250,0.18)] hover:-translate-y-1 flex flex-col justify-between backdrop-blur-sm">
      {/* Top Ambient Glow on Hover */}
      <div
        className="absolute top-0 left-1/4 right-1/4 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
        }}
      />

      <div>
        {/* Step Number & Icon Header */}
        <div className="flex items-center justify-between mb-8">
          <span className="font-heading text-3xl font-bold tracking-tight text-[#9292A5]/50 group-hover:text-[#F5F3FF] transition-colors">
            {step}
          </span>
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-300"
            style={{
              backgroundColor: 'rgba(17, 18, 28, 0.9)',
              borderColor: `${accentColor}40`,
              boxShadow: `0 0 15px ${accentColor}20`,
            }}
          >
            {icon}
          </div>
        </div>

        {/* Tagline */}
        <div className="mb-2">
          <span
            className="text-[11px] font-mono uppercase tracking-widest px-2.5 py-0.5 rounded-full border"
            style={{
              color: accentColor,
              borderColor: `${accentColor}30`,
              backgroundColor: `${accentColor}10`,
            }}
          >
            {tag}
          </span>
        </div>

        {/* Card Title */}
        <h3 className="font-heading text-xl sm:text-2xl font-semibold text-[#F5F3FF] mb-3 group-hover:text-[#F5F3FF]">
          {title}
        </h3>

        {/* Card Description */}
        <p className="text-sm sm:text-base text-[#9292A5] leading-relaxed font-normal">
          {description}
        </p>
      </div>

      {/* Subtle Bottom Link Cue */}
      <div className="mt-8 pt-4 border-t border-white/5 flex items-center gap-1.5 text-xs font-mono text-[#9292A5] group-hover:text-[#F5F3FF] transition-colors">
        <span>Timeline stage {step}</span>
        <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  );
};

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Choose a decision',
      description:
        'Anchor your simulation in a pivotal turning point. Whether it was the career offer declined, the relationship left behind, or the country unvisited, define your divergence coordinates.',
      icon: <GitFork className="w-5 h-5 text-[#77D9F7]" />,
      accentColor: '#77D9F7',
      tag: 'Branch Origin',
    },
    {
      step: '02',
      title: 'Enter another reality',
      description:
        'Cross the threshold into a parallel timeline. Watch life events unfold year by year, shaped by the compounding butterfly effects of your alternate choice.',
      icon: <Layers className="w-5 h-5 text-[#A78BFA]" />,
      accentColor: '#A78BFA',
      tag: 'Quantum Shift',
    },
    {
      step: '03',
      title: 'Change the future',
      description:
        'Compare your original reality against its counterpart across key metrics. Make subsequent choices within the alternate timeline to spawn recursive branches and endless lives.',
      icon: <GitBranch className="w-5 h-5 text-[#F4B978]" />,
      accentColor: '#F4B978',
      tag: 'Recursive Destiny',
    },
  ];

  return (
    <section id="how-it-works" className="relative py-24 sm:py-32 bg-[#080910] border-t border-[#A78BFA]/10">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-[#A78BFA]/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#11121C] border border-[#A78BFA]/25 mb-4">
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#A78BFA]">
              Multiverse Architecture
            </span>
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-[#F5F3FF] mb-4">
            How It Works
          </h2>
          <p className="text-base sm:text-lg text-[#9292A5] leading-relaxed">
            Three structured stages to explore the unlived chapters of your existence, grounded in narrative depth and branching life logic.
          </p>
        </div>

        {/* 3 Step Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((item) => (
            <FeatureCard
              key={item.step}
              step={item.step}
              title={item.title}
              description={item.description}
              icon={item.icon}
              accentColor={item.accentColor}
              tag={item.tag}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
