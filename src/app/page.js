"use client";

import { useState } from "react";
import Court from "@/component/Court";
import ScoreButtons from "@/component/ScoreButtons";

export default function Home() {
  // State to track scores, player names, and serve
  const [team1, setTeam1] = useState({ name: "", score: 0 });
  const [team2, setTeam2] = useState({ name: "", score: 0 });
  const [matchType, setMatchType] = useState(""); // No default selection
  const [selectedPlayers, setSelectedPlayers] = useState({ team1A: "", team1B: "", team2A: "", team2B: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTeam1Serving, setIsTeam1Serving] = useState(true); // Track serving side
  const [showPopup, setShowPopup] = useState(false); // Add this state for showPopup

  // Predefined list of players
  const playerList = ["Player A", "Player B", "Player C", "Player D"];

  // Handlers to increment and decrement scores
  const incrementScore = (team) => {
    if (team === 1) setTeam1({ ...team1, score: team1.score + 1 });
    if (team === 2) setTeam2({ ...team2, score: team2.score + 1 });
  };

  const decrementScore = (team) => {
    if (team === 1 && team1.score > 0) setTeam1({ ...team1, score: team1.score - 1 });
    if (team === 2 && team2.score > 0) setTeam2({ ...team2, score: team2.score - 1 });
  };

  // Open and close the player selection modal
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Handle player selection for teams
  const handlePlayerSelect = (playerKey, player) => {
    setSelectedPlayers({ ...selectedPlayers, [playerKey]: player });
  };

  // Change serve side
  const changeServe = () => {
    setIsTeam1Serving(!isTeam1Serving);
  };

  // Confirm player selection and close modal
  const handleConfirmSelection = () => {
    setShowPopup(true); // Show the court layout after confirming
    closeModal();
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl font-extrabold text-center mb-6 text-white">Badminton Score Keeper</h1>

      {/* Match Type Selection */}
      <div className="mb-6 text-center w-full max-w-lg text-white">
        <label className="mr-8 text-lg font-semibold">
          <input
            type="radio"
            value="singles"
            checked={matchType === "singles"}
            onChange={() => {
              setMatchType("singles");
              openModal();
            }}
            className="mr-2"
          />
          Singles
        </label>
        <label className="text-lg font-semibold">
          <input
            type="radio"
            value="doubles"
            checked={matchType === "doubles"}
            onChange={() => {
              setMatchType("doubles");
              openModal();
            }}
            className="mr-2"
          />
          Doubles
        </label>
      </div>

      {/* Player Selection Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white p-6 rounded-lg shadow-xl w-[300px]">
            <h2 className="text-xl font-bold mb-4 text-center">Select Players</h2>
            <div className="flex flex-col">
              {matchType === "singles" ? (
                <>
                  <div className="mb-4">
                    <label className="block mb-2">Player A</label>
                    <select
                      className="w-full p-2 border-2 rounded-lg"
                      onChange={(e) => handlePlayerSelect("team1A", e.target.value)}
                    >
                      <option value="">Select Player</option>
                      {playerList.map((player) => (
                        <option key={player} value={player}>
                          {player}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2">Player B</label>
                    <select
                      className="w-full p-2 border-2 rounded-lg"
                      onChange={(e) => handlePlayerSelect("team2B", e.target.value)}
                    >
                      <option value="">Select Player</option>
                      {playerList.map((player) => (
                        <option key={player} value={player}>
                          {player}
                        </option>
                      ))}
                    </select>
                  </div>
                </>
              ) : (
                <>
                  <div className="mb-4">
                    <label className="block mb-2">Team 1 Player A</label>
                    <select
                      className="w-full p-2 border-2 rounded-lg"
                      onChange={(e) => handlePlayerSelect("team1A", e.target.value)}
                    >
                      <option value="">Select Player</option>
                      {playerList.map((player) => (
                        <option key={player} value={player}>
                          {player}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2">Team 1 Player B</label>
                    <select
                      className="w-full p-2 border-2 rounded-lg"
                      onChange={(e) => handlePlayerSelect("team1B", e.target.value)}
                    >
                      <option value="">Select Player</option>
                      {playerList.map((player) => (
                        <option key={player} value={player}>
                          {player}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2">Team 2 Player A</label>
                    <select
                      className="w-full p-2 border-2 rounded-lg"
                      onChange={(e) => handlePlayerSelect("team2A", e.target.value)}
                    >
                      <option value="">Select Player</option>
                      {playerList.map((player) => (
                        <option key={player} value={player}>
                          {player}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2">Team 2 Player B</label>
                    <select
                      className="w-full p-2 border-2 rounded-lg"
                      onChange={(e) => handlePlayerSelect("team2B", e.target.value)}
                    >
                      <option value="">Select Player</option>
                      {playerList.map((player) => (
                        <option key={player} value={player}>
                          {player}
                        </option>
                      ))}
                    </select>
                  </div>
                </>
              )}
              <div className="flex justify-between">
                <button
                  onClick={closeModal}
                  className="bg-gray-600 text-white py-2 px-4 rounded-lg"
                >
                  Close
                </button>
                <button
                  onClick={handleConfirmSelection} // Use this to handle confirmation
                  className="bg-blue-600 text-white py-2 px-4 rounded-lg"
                  disabled={
                    !selectedPlayers.team1A ||
                    (matchType === "doubles" &&
                      (!selectedPlayers.team1B || !selectedPlayers.team2A || !selectedPlayers.team2B))
                  }
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Court Layout */}
      <Court
        matchType={matchType}
        selectedPlayers={selectedPlayers}
        isTeam1Serving={isTeam1Serving}
        changeServe={changeServe}
        showPopup={showPopup} // Pass showPopup state to the Court component
      />

      {/* Team 1 and Team 2 Scores */}
      <div className="flex justify-center gap-6 w-full max-w-5xl mb-6 flex-wrap">
        {/* Team 1 */}
        <div className="bg-gray-800 p-6 shadow-xl rounded-xl flex flex-col items-center w-[200px] mb-4">
          <h2 className="text-2xl font-bold mb-4 text-white">Team 1</h2>
          <div className="text-white text-xl mb-4">
            {matchType === "singles"
              ? selectedPlayers.team1A
              : `${selectedPlayers.team1A} & ${selectedPlayers.team1B}`}
          </div>
          <div className="text-6xl font-bold text-white mb-4">{team1.score}</div>
          <ScoreButtons
            incrementScore={() => incrementScore(1)}
            decrementScore={() => decrementScore(1)}
          />
        </div>

        {/* Team 2 */}
        <div className="bg-gray-800 p-6 shadow-xl rounded-xl flex flex-col items-center w-[200px] mb-4">
          <h2 className="text-2xl font-bold mb-4 text-white">Team 2</h2>
          <div className="text-white text-xl mb-4">
            {matchType === "singles"
              ? selectedPlayers.team2B
              : `${selectedPlayers.team2A} & ${selectedPlayers.team2B}`}
          </div>
          <div className="text-6xl font-bold text-white mb-4">{team2.score}</div>
          <ScoreButtons
            incrementScore={() => incrementScore(2)}
            decrementScore={() => decrementScore(2)}
          />
        </div>
      </div>
    </div>
  );
}
