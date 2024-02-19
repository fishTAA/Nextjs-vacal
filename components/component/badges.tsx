import React from "react";

interface BadgesProps {
  disabilityPercentages: { [key: string]: number };
  handleButtonClick: (part: string, increment: number) => void;
  selectedBodyPart: string;
}

export function Badges({ disabilityPercentages, handleButtonClick, selectedBodyPart }: BadgesProps) {
  const handleBadgeClick = (part: string, percentage: number) => {
  };

  // Filter out badges with 0% percentage
  const filteredBadges = Object.entries(disabilityPercentages).filter(([part, percentage]) => percentage > 0);

  return (
    <div className="flex items-center space-x-4">
      {filteredBadges.map(([part, percentage]) => (
        <button
          key={part}
          className="rounded-md border border-gray-200 bg-white px-3 py-1 text-sm font-medium text-gray-900 shadow-sm transition-colors hover:bg-gray-50 dark:bg-gray-900 dark:hover:bg-gray-50/80 dark:border-gray-800"
          type="button"
          onClick={() => handleBadgeClick(part, percentage)}
        >
          {percentage}% - {part}
        </button>
      ))}
    </div>
  );
}

export default Badges;
