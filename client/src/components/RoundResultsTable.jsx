//
import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@mui/material";
import "../App.css";
import AddNotesModal from "./AddNotesModal";

const RoundResultsTable = ({ round, onRoundDataChange }) => {
  const [data, setData] = useState({
    matchup: "",
    wins: 0,
    losses: 0,
    draws: 0,
    notes: "",
  });

  const [isModalOpen, setModalOpen] = useState(false);

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]:
        name === "wins" || name === "losses" || name === "draws"
          ? Number(value)
          : value,
    }));
  };

  const incrementNumber = (name) => {
    if ((name === "wins" || name === "losses") && data[name] < 2) {
      setData((prevData) => ({
        ...prevData,
        [name]: prevData[name] + 1,
      }));
    } else if (name === "draws" && data[name] < 1) {
      setData((prevData) => ({
        ...prevData,
        [name]: prevData[name] + 1,
      }));
    }
  };

  const decrementNumber = (name) => {
    if (data[name] > 0) {
      setData((prevData) => ({
        ...prevData,
        [name]: prevData[name] - 1,
      }));
    }
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  // Use useCallback to memoize the onRoundDataChange function
  const memoizedOnRoundDataChange = useCallback(onRoundDataChange, []);

  const handleSaveNotes = (notes) => {
    setData((prevData) => ({
      ...prevData,
      notes: notes,
    }));
    handleCloseModal(); // Close the modal after saving notes
  };

  // Use useEffect with memoizedOnRoundDataChange in the dependency array
  useEffect(() => {
    // Call onRoundDataChange when data changes
    memoizedOnRoundDataChange(round, { ...data, notes: data.notes });
  }, [data, memoizedOnRoundDataChange, round]);
  return (
    <div className="table-div">
      <table>
        <thead>
          <tr>
            <th>Round</th>
            <th>Matchup</th>
            <th>Wins</th>
            <th>Losses</th>
            <th>Draws</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="round-table-component">
              <span>{round}</span>
            </td>
            <td>
              <input
                className="text-input"
                name="matchup"
                value={data.matchup}
                type="text"
                onChange={(e) => onChangeInput(e)}
                placeholder="Matchup"
              />
            </td>
            <td className="win-loss-draw">
              <div className="plus-minus-input-div">
                <div
                  className="minus-div"
                  onClick={() => decrementNumber("wins")}
                >
                  -
                </div>
                <div className="number-display">{data.wins}</div>
                <div
                  className="plus-div"
                  onClick={() => incrementNumber("wins")}
                >
                  +
                </div>
              </div>
            </td>
            <td className="win-loss-draw">
              <div className="plus-minus-input-div">
                <div
                  className="minus-div"
                  onClick={() => decrementNumber("losses")}
                >
                  -
                </div>
                <div className="number-display">{data.losses}</div>
                <div
                  className="plus-div"
                  onClick={() => incrementNumber("losses")}
                >
                  +
                </div>
              </div>
            </td>
            <td className="win-loss-draw">
              <div className="plus-minus-input-div">
                <div
                  className="minus-div"
                  onClick={() => decrementNumber("draws")}
                >
                  -
                </div>
                <div className="number-display">{data.draws}</div>
                <div
                  className="plus-div"
                  onClick={() => incrementNumber("draws")}
                >
                  +
                </div>
              </div>
            </td>
            <td>
              <Button
                variant="outlined"
                style={{
                  color: "whitesmoke",
                  border: "1px solid whitesmoke",
                  height: "2rem",
                }}
                onClick={handleOpenModal}
              >
                Add Notes
              </Button>
              {isModalOpen && (
                <AddNotesModal
                  onSaveNotes={handleSaveNotes}
                  onClose={handleCloseModal}
                />
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default RoundResultsTable;
