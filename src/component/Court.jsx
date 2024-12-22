"use client";
import { useState } from "react";

export default function Court({
  matchType,
  selectedPlayers,
  isTeam1Serving,
  changeServe,
  showPopup,
}) {
  const [serviceSide, setServiceSide] = useState(null); // null, 'top', or 'bottom'
  const [servingPlayer, setServingPlayer] = useState(null);
  const [selectedArea, setSelectedArea] = useState(null); // Track the selected area for visual feedback

  // Handle click to set the service side and selected area
  const handleCourtClick = (e) => {
    const courtTop = e.target.getBoundingClientRect().top;
    const courtLeft = e.target.getBoundingClientRect().left;
    const clickX = e.clientX;
    const clickY = e.clientY;

    // Determine which quadrant was clicked
    const isTopHalf = clickY < courtTop + e.target.offsetHeight / 2;
    const isLeftHalf = clickX < courtLeft + e.target.offsetWidth / 2;

    let newArea;
    if (isTopHalf && isLeftHalf) {
      setServingPlayer("team1A");
      newArea = "top-left";
    } else if (isTopHalf && !isLeftHalf) {
      setServingPlayer("team1B");
      newArea = "top-right";
    } else if (!isTopHalf && isLeftHalf) {
      setServingPlayer("team2A");
      newArea = "bottom-left";
    } else {
      setServingPlayer("team2B");
      newArea = "bottom-right";
    }

    // Update selected area and service side
    setSelectedArea(newArea);
    setServiceSide(isTopHalf ? "top" : "bottom");
  };

  // Function to apply a background color to the selected quadrant
  const getQuadrantClass = (quadrant) => {
    return selectedArea === quadrant
      ? "bg-blue-500 opacity-50" // Apply blue background for selected area
      : "";
  };

  // Function to render a small orange circle in the selected area
  const getCirclePosition = (quadrant) => {
    switch (quadrant) {
      case "top-left":
        return "top-[20%] left-[20%]"; // Position circle in the top-left quadrant
      case "top-right":
        return "top-[20%] right-[20%]"; // Position circle in the top-right quadrant
      case "bottom-left":
        return "bottom-[20%] left-[20%]"; // Position circle in the bottom-left quadrant
      case "bottom-right":
        return "bottom-[20%] right-[20%]"; // Position circle in the bottom-right quadrant
      default:
        return "";
    }
  };

  return (
    <div
      className="relative w-full max-w-[800px] h-[400px] bg-green-600 border-4 border-white mx-auto mb-6 rounded-md"
      onClick={handleCourtClick} // Add click handler
    >
      <div className="absolute top-0 left-0 right-0 bottom-0 border-t-4 border-b-4 border-x-4 border-white rounded-md"></div>
      <div className="absolute top-0 left-0 right-0 flex justify-between">
        <div
          className={`border-l-4 border-white w-[50%] ${getQuadrantClass(
            "top-left"
          )}`}
        ></div>
        <div
          className={`border-r-4 border-white w-[50%] ${getQuadrantClass(
            "top-right"
          )}`}
        ></div>
      </div>
      <div className="absolute left-1/2 top-0 h-full w-1 bg-white transform translate-x-[-50%]"></div>
      <div className="absolute top-[30%] left-0 right-0 border-t-4 border-white"></div>
      <div className="absolute bottom-[30%] left-0 right-0 border-t-4 border-white"></div>
      <div className="absolute top-[50%] left-0 right-0 border-t-4 border-white"></div>

      {/* Service Side Indicator */}
      {serviceSide && (
        <div
          className={`absolute left-0 right-0 ${
            serviceSide === "top"
              ? "top-0 bg-blue-500 opacity-50"
              : "bottom-0 bg-red-500 opacity-50"
          } h-1/2`}
        ></div>
      )}

      {/* Player Positions */}
      {showPopup && (
        <>
          {matchType === "singles" ? (
            <>
              {/* Team 1 (Top) */}
              <div className="absolute top-[10%] left-[50%] text-white transform translate-x-[-50%]">
                {selectedPlayers.team1A && (
                  <>
                    <div>{selectedPlayers.team1A}</div>
                    <div
                      className={`absolute top-0 left-0 w-4 h-4 rounded-full bg-orange-500 ${
                        servingPlayer === "team1A" ? "block" : "hidden"
                      }`}
                    ></div>
                  </>
                )}
              </div>

              {/* Team 2 (Bottom) */}
              <div className="absolute bottom-[10%] left-[50%] text-white transform translate-x-[-50%]">
                {selectedPlayers.team2B && (
                  <>
                    <div>{selectedPlayers.team2B}</div>
                    <div
                      className={`absolute top-0 left-0 w-4 h-4 rounded-full bg-orange-500 ${
                        servingPlayer === "team2B" ? "block" : "hidden"
                      }`}
                    ></div>
                  </>
                )}
              </div>
            </>
          ) : (
            <>
              {/* Team 1 (Top-Left) */}
              <div className="absolute top-[10%] left-[10%] text-white">
                {selectedPlayers.team1A && (
                  <>
                    <div>{selectedPlayers.team1A}</div>
                    <div
                      className={`absolute top-0 left-0 w-4 h-4 rounded-full bg-orange-500 ${
                        servingPlayer === "team1A" ? "block" : "hidden"
                      }`}
                    ></div>
                  </>
                )}
              </div>

              {/* Team 1 (Top-Right) */}
              <div className="absolute top-[10%] right-[10%] text-white">
                {selectedPlayers.team1B && (
                  <>
                    <div>{selectedPlayers.team1B}</div>
                    <div
                      className={`absolute top-0 left-0 w-4 h-4 rounded-full bg-orange-500 ${
                        servingPlayer === "team1B" ? "block" : "hidden"
                      }`}
                    ></div>
                  </>
                )}
              </div>

              {/* Team 2 (Bottom-Left) */}
              <div className="absolute bottom-[10%] left-[10%] text-white">
                {selectedPlayers.team2A && (
                  <>
                    <div>{selectedPlayers.team2A}</div>
                    <div
                      className={`absolute top-0 left-0 w-4 h-4 rounded-full bg-orange-500 ${
                        servingPlayer === "team2A" ? "block" : "hidden"
                      }`}
                    ></div>
                  </>
                )}
              </div>

              {/* Team 2 (Bottom-Right) */}
              <div className="absolute bottom-[10%] right-[10%] text-white">
                {selectedPlayers.team2B && (
                  <>
                    <div>{selectedPlayers.team2B}</div>
                    <div
                      className={`absolute top-0 left-0 w-4 h-4 z-999 text-red rounded-full bg-orange-500 `}
                    ></div>
                  </>
                )}
              </div>
            </>
          )}
        </>
      )}

      {/* Indication Circle for Selected Area */}
      {selectedArea && (
        <div
          className={`absolute w-6 h-6 rounded-full bg-orange-500 z-10 ${getCirclePosition(
            selectedArea
          )}`}
        ></div>
      )}
    </div>
  );
}



