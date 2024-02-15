import React, { useEffect, useState } from "react";
import {
  TooltipTrigger,
  TooltipContent,
  Tooltip,
  TooltipProvider,
} from "@/components/ui/tooltip";

interface BodyProps {
  handleBodyPartClick: (part: string) => void;
  selectedValue: string;
  setSelectedValue: React.Dispatch<React.SetStateAction<string>>;
}

export function Body({ handleBodyPartClick, selectedValue, setSelectedValue }: BodyProps) {
  // State to track the selected value
  const [currentSelectedValue, setCurrentSelectedValue] = useState(selectedValue);

  // Update the state when the selected value changes
  useEffect(() => {
    setCurrentSelectedValue(selectedValue);
  }, [selectedValue]);

  // Function to handle click on a body part
  const handleBodyPartClickInternal = (part: string) => {
    setSelectedValue(part); // Update the selected value in the parent component
    handleBodyPartClick(part); // Call the parent function to handle the click
  };

  return (
    <section className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center space-y-6">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className={`w-24 h-24 bg-gray-300 rounded-full cursor-pointer dark:bg-gray-700 ${currentSelectedValue === "Head" ? "border-2 border-blue-500" : ""
                  }`}
                onClick={() => handleBodyPartClickInternal("Head")}
              >
                <span className="sr-only">Head</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Head</p>
            </TooltipContent>
          </Tooltip>
          <div className="flex items-center justify-between w-64">
            {/* Left Arm */}
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  className={`w-12 h-36 bg-gray-300 rounded-lg cursor-pointer dark:bg-gray-700 ${currentSelectedValue === "Right Arm" ? "border-2 border-blue-500" : ""
                    }`}
                  onClick={() => {handleBodyPartClickInternal("Right Arm")}}
                >
                  <span className="sr-only">Right Arm</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Right Arm</p>
              </TooltipContent>
            </Tooltip>
            {/* Torso */}
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  className={`w-32 h-48 bg-gray-300 rounded-lg cursor-pointer dark:bg-gray-700 ${currentSelectedValue === "Torso" ? "border-2 border-blue-500" : ""
                    }`}
                  onClick={(e) => handleBodyPartClickInternal("Torso")}
                >
                  <span className="sr-only">Torso</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Torso</p>
              </TooltipContent>
            </Tooltip>
            {/* Right Arm */}
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  className={`w-12 h-36 bg-gray-300 rounded-lg cursor-pointer dark:bg-gray-700 ${currentSelectedValue === "Left Arm" ? "border-2 border-blue-500" : ""
                    }`}
                  onClick={() => handleBodyPartClickInternal("Left Arm")}
                >
                  <span className="sr-only">Left Arm</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Left Arm</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <div className="flex items-end justify-between w-32">
            {/* Right Leg */}
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  className={`w-12 h-32 bg-gray-300 rounded-lg cursor-pointer dark:bg-gray-700 ${currentSelectedValue === "Right Leg" ? "border-2 border-blue-500" : ""
                    }`}
                  onClick={() => handleBodyPartClickInternal("Right Leg")}
                >
                  <span className="sr-only">Right Leg</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Right Leg</p>
              </TooltipContent>
            </Tooltip>
            {/* Left Leg */}
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  className={`w-12 h-32 bg-gray-300 rounded-lg cursor-pointer dark:bg-gray-700 ${currentSelectedValue === "Left Leg" ? "border-2 border-blue-500" : ""
                    }`}
                  onClick={() => handleBodyPartClickInternal("Left Leg")}
                >
                  <span className="sr-only">Left Leg</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Left Leg</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      </div>
    </section>
  );
}

export default Body;
