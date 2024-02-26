/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/5asOnAAEdcd
 */
"use client";

import React, { FormEventHandler, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Body } from "@/components/component/body";
import { Badges } from "@/components/component/badges";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";

export interface Rating {
  rate: number;
  part: string;
  id: number;
}
interface BodyInt {
  [key: string]: number[];
  head: number[];
  torso: number[];
  left_arm: number[];
  right_arm: number[];
  left_leg: number[];
  right_leg: number[];
  other: number[];
}

const Vacalculator = () => {
  const endpoint = process.env.NEXT_PUBLIC_DB_URI || "http://127.0.0.1:8787";
  const [selectedValue, setSelectedValue] = useState<string>("Others");
  //calculation variables
  const [childrenUnder18, setChildrenUnder18] = useState(0);
  const [childrenAbove18, setChildrenAbove18] = useState(0);
  const [hasSpouse, setMaritalStatus] = useState(false);
  const [aidAndAttendance, setAidAndAttendance] = useState(false);
  const [dependentParents, setDependentParents] = useState(0);
  const [ratings, setRatings] = useState<Array<Rating>>([]);
  const [disabilityRating, setDisabilityRating] = useState({
    bilateralFactor: undefined,
    calculatedRating: undefined,
    disabilityRating: undefined,
  });

  const [monthly, setMonthly] = useState({
    monthly: 0,
  });
  let x = 0;
  const under18Clicked = (under18: string) => {
    setChildrenUnder18(Number(under18));
  };

  const above18Clicked = (above18: string) => {
    setChildrenAbove18(Number(above18));
  };

  const MaritalStatusClicked = (withSpouse: string) => {
    let isMarried = withSpouse === "married";
    setMaritalStatus(isMarried);
    if (!isMarried) {
      setAidAndAttendance(false);
    }
  };

  const aidAndAttendanceClicked = (hasAidAttendance: string) => {
    let aidAttendance = hasAidAttendance === "Yes";
    setAidAndAttendance(aidAttendance);
  };

  const dependentParentsClicked = (dependentParents: string) => {
    setDependentParents(Number(dependentParents));
  };

  const Dependency = async () => {
    let data = {
      disabilityRating: disabilityRating.calculatedRating
        ? disabilityRating.disabilityRating + ""
        : 0,
      childrenUnder18: childrenUnder18,
      childrenAbove18: childrenAbove18,
      hasSpouse: hasSpouse,
      aidAndAttendance: aidAndAttendance,
      dependentParents: dependentParents,
    };
    console.log("data", data);
    fetch(`${endpoint}/api/calculator/dependency`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((r) => r.json())
      .then((res) => {
        console.log("res", res);
        setMonthly(res);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    console.log("updating");
    Dependency();
  }, [
    disabilityRating,
    childrenUnder18,
    childrenAbove18,
    hasSpouse,
    aidAndAttendance,
    dependentParents,
  ]);
  //
  let nextId = useRef(1);

  // function to add new ratings
  const handleButtonClick = (part: string, rating: number) => {
    setRatings([...ratings, { rate: rating, part: part, id: nextId.current }]);
    nextId.current++;
  };

  // Remove rating
  const handleBadgeDelete = (id: number) => {
    let newRates = ratings.filter((item) => item.id != id);
    setRatings(newRates);
  };

  const handleBodyPartClick = (part: string) => {
    setSelectedValue(part); // Update the selected value for both body part and dropdown
  };

  const recalculate = () => {
    setMonthly({ monthly: 0 });
    let body: BodyInt = {
      head: [],
      torso: [],
      left_arm: [],
      right_arm: [],
      left_leg: [],
      right_leg: [],
      other: [],
    };
    ratings.forEach((elem) => {
      let thePart;
      /**
       * use json
       */
      switch (elem.part) {
        case "Head":
          thePart = "head";
          break;
        case "Torso":
          thePart = "torso";
          break;
        case "Left Arm":
          thePart = "left_arm";
          break;
        case "Right Arm":
          thePart = "right_arm";
          break;
        case "Left Leg":
          thePart = "left_leg";
          break;
        case "Right Leg":
          thePart = "right_leg";
          break;
        default:
          thePart = "other";
      }

      body[thePart].push(elem.rate);
    });
    fetch(`${endpoint}/api/calculator/disability-rating`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((r) => r.json())
      .then((res) => {
        setDisabilityRating(res);
      });
    return body;
  };

  useEffect(() => {
    recalculate();
  }, [ratings]);

  return (
    <div className="bg-white p-8">
      <div className="mb-10 text-center text-2xl font-bold uppercase tracking-wide">
        Trajector
      </div>
      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2 p-8 border border-gray-200 rounded-lg dark:border-gray-800">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-1">
              <h2 className="text-lg font-semibold mb-4">
                Begin by choosing the areas where you have disabilities
              </h2>
              <p className="text-sm mb-8">
                Choose the specific body part affected by your disability and
                indicate the percentage of impairment from 0% to 100%.
              </p>
              <div className="grid grid-cols-4 gap-4 mb-8">
                <div className="col-span-1">
                  <Select
                    value={selectedValue}
                    onValueChange={(event) => setSelectedValue(event)}
                  >
                    <SelectTrigger>{selectedValue}</SelectTrigger>
                    <SelectContent>
                      <SelectItem
                        value="Others"
                        onClick={() => handleBodyPartClick("Others")}
                      >
                        Others
                      </SelectItem>
                      <SelectItem
                        value="Head"
                        onClick={() => handleBodyPartClick("Head")}
                      >
                        Head
                      </SelectItem>
                      <SelectItem
                        value="Torso"
                        onClick={() => handleBodyPartClick("Torso")}
                      >
                        Torso
                      </SelectItem>
                      <SelectItem
                        value="Right Arm"
                        onClick={() => handleBodyPartClick("Right Arm")}
                      >
                        Right Arm
                      </SelectItem>
                      <SelectItem
                        value="Left Arm"
                        onClick={() => handleBodyPartClick("Left Arm")}
                      >
                        Left Arm
                      </SelectItem>
                      <SelectItem
                        value="Right Leg"
                        onClick={() => handleBodyPartClick("Right Leg")}
                      >
                        Right Leg
                      </SelectItem>
                      <SelectItem
                        value="Left Leg"
                        onClick={() => handleBodyPartClick("Left Leg")}
                      >
                        Left Leg
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-3 flex flex-wrap gap-4">
                  <Button
                    className="w-1/5"
                    onClick={() => handleButtonClick(selectedValue, 10)}
                  >
                    10%
                  </Button>
                  <Button
                    className="w-1/5"
                    onClick={() => handleButtonClick(selectedValue, 20)}
                  >
                    20%
                  </Button>
                  <Button
                    className="w-1/5"
                    onClick={() => handleButtonClick(selectedValue, 30)}
                  >
                    30%
                  </Button>
                  <Button
                    className="w-1/5"
                    onClick={() => handleButtonClick(selectedValue, 40)}
                  >
                    40%
                  </Button>
                  <Button
                    className="w-1/5"
                    onClick={() => handleButtonClick(selectedValue, 50)}
                  >
                    50%
                  </Button>
                  <Button
                    className="w-1/5"
                    onClick={() => handleButtonClick(selectedValue, 60)}
                  >
                    60%
                  </Button>
                  <Button
                    className="w-1/5"
                    onClick={() => handleButtonClick(selectedValue, 70)}
                  >
                    70%
                  </Button>
                  <Button
                    className="w-1/5"
                    onClick={() => handleButtonClick(selectedValue, 80)}
                  >
                    80%
                  </Button>
                  <Button
                    className="w-1/5"
                    onClick={() => handleButtonClick(selectedValue, 90)}
                  >
                    90%
                  </Button>
                  <Button
                    className="w-1/5"
                    onClick={() => handleButtonClick(selectedValue, 100)}
                  >
                    100%
                  </Button>
                </div>
              </div>
            </div>
            <div className="col-span-1 flex justify-center items-center">
              <Body
                handleBodyPartClick={handleBodyPartClick}
                selectedValue={selectedValue}
                setSelectedValue={setSelectedValue}
              />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold">Ratings</span>
            <Badges
              disabilityPercentages={ratings}
              handleBadgeDelete={handleBadgeDelete} // Pass the handleBadgeDelete function instead
            />
            <span className="text-xs font-semibold">Step 1</span>
          </div>
        </div>
        <div className="p-8 border border-gray-200 rounded-lg dark:border-gray-800">
          <div className="mb-8 flex justify-center items-center"></div>
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">
              Total Disability Rating
            </h3>
            <p className="text-4xl font-bold mb-4">
              {disabilityRating.disabilityRating}%
            </p>
            <h3 className="text-lg font-semibold mb-2">
              Total Monthly Compensation
            </h3>
            <p className="text-xl font-bold">$ {monthly.monthly}</p>
          </div>
          <div className="mt-8"></div>
        </div>
      </div>
      <div className="mt-16 mb-8">
        <h2 className="text-lg font-semibold mb-4">
          To complete the assessment, fill out the form to proceed with
          generating your quote.
        </h2>
        <p className="text-sm mb-8">
          Are you sure your VA rating is fair? Let us uncover your potential
          rating eligibility.
        </p>
        <div className="grid grid-cols-2 gap-8">
          <div className="border-b pb-4">
            <h3 className="text-sm font-semibold mb-2">
              Combined Disability Percentage:
            </h3>
            <p className="text-lg font-bold">
              {disabilityRating.calculatedRating}%
            </p>
          </div>
          <div className="border-b pb-4">
            <h3 className="text-sm font-semibold mb-2">
              Current Disability Rating:
            </h3>
            <p className="text-lg font-bold">
              {disabilityRating.disabilityRating}%
            </p>
          </div>
          <div className="border-b pb-4">
            <h3 className="text-sm font-semibold mb-2">
              Monthly Payment Amount:
            </h3>
            <p className="text-lg font-bold">${monthly.monthly}</p>
          </div>
          <div className="border-b pb-4">
            <Select
              onValueChange={(e) => {
                under18Clicked(e);
              }}
            >
              <SelectTrigger id="children-under-18">
                <SelectValue placeholder="How many dependent children do you have who are under the age of 18?" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="0">None</SelectItem>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4">4</SelectItem>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="6">6</SelectItem>
                <SelectItem value="7">7</SelectItem>
                <SelectItem value="8">8</SelectItem>
                <SelectItem value="9">9</SelectItem>
                <SelectItem value="10">10</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="border-b pb-4">
            <Select
              onValueChange={(e) => {
                above18Clicked(e);
              }}
            >
              <SelectTrigger id="children-18-24">
                <SelectValue placeholder="How many dependent children do you have who are between the ages of 18 and 24?" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="0">None</SelectItem>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4">4</SelectItem>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="6">6</SelectItem>
                <SelectItem value="7">7</SelectItem>
                <SelectItem value="8">8</SelectItem>
                <SelectItem value="9">9</SelectItem>
                <SelectItem value="10">10</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="border-b pb-4">
            <Select
              onValueChange={(e) => {
                MaritalStatusClicked(e);
              }}
            >
              <SelectTrigger id="marital-status">
                <SelectValue placeholder="What is your marital status?" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="single">Single</SelectItem>
                <SelectItem value="married">Married</SelectItem>
                {/* <SelectItem value="divorced">Divorced</SelectItem>
                <SelectItem value="widowed">Widowed</SelectItem> */}
              </SelectContent>
            </Select>
          </div>
          {hasSpouse && (
            <div className="border-b pb-4">
              <Select
                onValueChange={(e) => {
                  aidAndAttendanceClicked(e);
                }}
              >
                <SelectTrigger id="receive Aid and Attendance(A/A)?">
                  <SelectValue placeholder="Do you or your spouse receive Aid and Attendance(A/A)??" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="0">None</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                  <SelectItem value="Yes">Yes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          <div className="border-b pb-4">
            <Select
              onValueChange={(e) => {
                dependentParentsClicked(e);
              }}
            >
              <SelectTrigger id="dependent-parents">
                <SelectValue placeholder="How many dependent parents do you have?" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="0">None</SelectItem>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <div className="text-center">
        <Button>Submit</Button>
      </div>
    </div>
  );
};

export default Vacalculator;
