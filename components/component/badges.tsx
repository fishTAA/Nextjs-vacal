import React from "react";
import { Rating } from "@/app/vacalculator/page";
interface BadgesProps {
  disabilityPercentages: Rating[];
  handleBadgeDelete: (id: number) => void; // Function to handle badge deletion
}

export const Badges: React.FC<BadgesProps> = ({
  disabilityPercentages,
  handleBadgeDelete,
}) => {
  const handleBadgeClick = (id:number) => {
    handleBadgeDelete(id); // Call the function to delete the badge and its percentage
  };

  // Filter out badges with 0% percentage
  const filteredBadges = disabilityPercentages.filter((rating) => rating.rate > 0);

  return (
    <div className="flex items-center space-x-4">
      {filteredBadges.map((rate) => (
        <button
          key={rate.id}
          className="rounded-md border border-gray-200 bg-white px-3 py-1 text-sm font-medium text-gray-900 shadow-sm transition-colors hover:bg-gray-50 dark:bg-gray-900 dark:hover:bg-gray-50/80 dark:border-gray-800"
          type="button"
          onClick={() => handleBadgeClick(rate.id)}
        >
          {rate.rate}% - {rate.part}
        </button>
      ))}
    </div>
  );
};
