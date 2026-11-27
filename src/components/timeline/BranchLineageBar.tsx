import React from 'react';
import { GitFork, ChevronRight, CornerUpLeft, Compass } from 'lucide-react';
import { SimulationResult, TimelineBranch } from '../../engine/types';
import { getBranchHistory, getBranchSiblings, getBranchChildren } from '../../engine/branchEngine';

interface BranchLineageBarProps {
  simulation: SimulationResult;
  onSelectBranch: (branchId: string) => void;
}

export const BranchLineageBar: React.FC<BranchLineageBarProps> = ({
  simulation,
  onSelectBranch,
}) => {
  const activeBranchId = simulation.activeBranchId || 'root-b';
  const activeBranch: TimelineBranch =
    simulation.branches[activeBranchId] ||
    simulation.branches['root-b'] ||
    Object.values(simulation.branches)[0];

  if (!activeBranch) return null;

  const ancestry = getBranchHistory(simulation, activeBranch.id);
  const siblings = getBranchSiblings(simulation, activeBranch.id);
  const children = getBranchChildren(simulation, activeBranch.id);
  const allBranches = Object.values(simulation.branches);
  const isRoot = activeBranch.parentBranchId === null;
  const parentBranch = activeBranch.parentBranchId
    ? simulation.branches[activeBranch.parentBranchId]
    : null;

  return (
    <div className="w-full mb-8 rounded-xl bg-[#0e0f1a] border border-white/10 p-4 sm:p-5 text-xs font-mono space-y-4">
      {/* Top Row: Multiverse Header & Quick Stats */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded bg-[#F4B978]/15 text-[#F4B978]">
            <Compass className="w-4 h-4" />
          </div>
          <span className="text-[#9292A5] uppercase tracking-wider">
            Multiverse Ledger Navigation
          </span>
          <span className="text-[#606075]">•</span>
          <span className="text-[#F5F3FF] font-medium">
            {allBranches.length} {allBranches.length === 1 ? 'Universe' : 'Universes'} Explored
          </span>
        </div>

        {/* Return to parent button if nested */}
        {!isRoot && parentBranch && (
          <button
            onClick={() => onSelectBranch(parentBranch.id)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-[#9292A5] hover:text-[#F5F3FF] transition-colors cursor-pointer"
            title={`Return to parent branch: ${parentBranch.shortLabel}`}
          >
            <CornerUpLeft className="w-3.5 h-3.5 text-[#F4B978]" />
            <span>Return to {parentBranch.shortLabel}</span>
          </button>
        )}
      </div>

      {/* Middle Row: Ancestry Breadcrumb Chain */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="text-[#606075] uppercase tracking-wider">Lineage:</span>
        {ancestry.map((branch, index) => {
          const isCurrent = branch.id === activeBranch.id;
          return (
            <React.Fragment key={branch.id}>
              {index > 0 && <ChevronRight className="w-3.5 h-3.5 text-[#606075] shrink-0" />}
              <button
                onClick={() => onSelectBranch(branch.id)}
                disabled={isCurrent}
                className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
                  isCurrent
                    ? 'bg-[#F4B978]/20 border border-[#F4B978]/50 text-[#F4B978] font-bold cursor-default shadow-[0_0_12px_rgba(244,185,120,0.15)]'
                    : 'bg-white/5 hover:bg-white/10 text-[#9292A5] hover:text-[#F5F3FF] border border-white/5'
                }`}
              >
                <GitFork className="w-3 h-3 text-[#F4B978]" />
                <span className="truncate max-w-[160px] sm:max-w-none">
                  {branch.shortLabel} {branch.chosenDecision ? `// ${branch.chosenDecision.title}` : ''}
                </span>
              </button>
            </React.Fragment>
          );
        })}
      </div>

      {/* Bottom Row: Active Branch Decision Context & Sibling Switcher */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pt-3 border-t border-white/5">
        {/* Active Branch Decision summary */}
        <div className="flex items-center gap-2 text-xs text-[#9292A5]">
          <span className="w-2 h-2 rounded-full bg-[#F4B978]" />
          <span>Active Universe:</span>
          <span className="text-[#F5F3FF] font-semibold">{activeBranch.name}</span>
          {activeBranch.chosenDecision && (
            <span className="text-[#A78BFA] hidden sm:inline">
              (Diverged at Age {activeBranch.branchCreationAge})
            </span>
          )}
        </div>

        {/* Sibling Branches Quick Switcher (if siblings exist) */}
        {siblings.length > 1 && (
          <div className="flex items-center gap-2">
            <span className="text-[#606075] text-[11px] uppercase">Sibling Paths:</span>
            <div className="inline-flex flex-wrap gap-1">
              {siblings.map((sib) => {
                const isSelected = sib.id === activeBranch.id;
                return (
                  <button
                    key={sib.id}
                    onClick={() => onSelectBranch(sib.id)}
                    className={`px-2 py-0.5 rounded text-[11px] transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#F4B978] text-[#080910] font-bold'
                        : 'bg-white/5 hover:bg-white/10 text-[#9292A5] hover:text-[#F5F3FF]'
                    }`}
                  >
                    {sib.shortLabel}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Children Branches Quick Switcher (if this branch has spawned children) */}
        {children.length > 0 && siblings.length <= 1 && (
          <div className="flex items-center gap-2">
            <span className="text-[#606075] text-[11px] uppercase">Child Branches:</span>
            <div className="inline-flex flex-wrap gap-1">
              {children.map((child) => (
                <button
                  key={child.id}
                  onClick={() => onSelectBranch(child.id)}
                  className="px-2 py-0.5 rounded text-[11px] bg-white/5 hover:bg-white/10 text-[#F4B978] hover:text-[#ffc88b] transition-colors cursor-pointer"
                >
                  {child.shortLabel}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
