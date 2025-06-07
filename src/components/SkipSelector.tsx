import React from 'react';
import { Skip } from '../types/Skip';
import SkipComparisonCard from './SkipComparisonCard';

interface SkipSelectorProps {
  skips: Skip[];
  selectedSkip: Skip | null;
  onSkipSelect: (skip: Skip) => void;
}

const SkipSelector: React.FC<SkipSelectorProps> = ({
  skips,
  selectedSkip,
  onSkipSelect
}) => {
  if (skips.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-slate-400 text-lg">No skip options found</div>
        <p className="text-slate-500 mt-2">Try adjusting your search criteria</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {skips.map((skip) => (
        <SkipComparisonCard
          key={skip.id}
          skip={skip}
          isSelected={selectedSkip?.id === skip.id}
          onSelect={onSkipSelect}
        />
      ))}
    </div>
  );
};

export default SkipSelector;