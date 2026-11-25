import React from 'react';
import { GitFork, Layers, GitBranch } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      index: '01',
      title: 'Choose a decision',
      subtitle: 'The Anchor Point',
      description:
        'Ground the simulation in a defining crossroads. Whether it was a career path declined, a departure delayed, or a venture postponed, establish your divergence origin.',
      icon: <GitFork className="w-5 h-5 text-[#77D9F7]" />,
      accent: '#77D9F7',
    },
    {
      index: '02',
      subtitle: 'The Quantum Shift',
      title: 'Enter another reality',
      description:
        'Cross the threshold into an imagined parallel universe. Witness chronological life events unfold year after year, shaped by the compounding butterfly effects of your alternate choice.',
      icon: <Layers className="w-5 h-5 text-[#A78BFA]" />,
      accent: '#A78BFA',
    },
    {
      index: '03',
      subtitle: 'The Divergence Matrix',
      title: 'Change the future',
      description:
        'Compare your original reality against its counterpart across key life dimensions. Formulate second-generation decisions to explore branching alternate timelines.',
      icon: <GitBranch className="w-5 h-5 text-[#F4B978]" />,
      accent: '#F4B978',
    },
  ];

  return (
    <section id="how-it-works" className="relative py-24 sm:py-32 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-16 sm:mb-20">
          <div className="font-mono text-xs uppercase tracking-[0.25em] text-[#606075] mb-3">
            02 // Method & Mechanics
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-[#F5F3FF] mb-4">
            How It Works
          </h2>
          <p className="text-base text-[#9292A5] leading-relaxed">
            Three structured stages to explore the unlived chapters of your existence, grounded in narrative depth and branching life logic.
          </p>
        </div>

        {/* 3 Step Architectural Editorial Progression */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((item) => (
            <div
              key={item.index}
              className="p-8 rounded-2xl bg-[#0c0d16] border border-white/5 flex flex-col justify-between space-y-8"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                  <span className="font-mono text-2xl font-bold text-[#F5F3FF]">
                    {item.index}
                  </span>
                  <div className="p-2 rounded-lg bg-[#11121C] border border-white/10">
                    {item.icon}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-[#606075]">
                    {item.subtitle}
                  </div>
                  <h3 className="font-heading text-xl font-bold text-[#F5F3FF]">
                    {item.title}
                  </h3>
                </div>

                <p className="text-sm text-[#9292A5] leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 text-[11px] font-mono text-[#606075]">
                Stage {item.index} // Protocol Active
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
