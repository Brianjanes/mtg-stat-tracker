import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import "../App.css";

const EditableTable = ({ round, onRoundDataChange }) => {
  const [data, setData] = useState({
    matchup: "",
    wins: 0,
    losses: 0,
    draws: 0,
    notes: "",
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]:
        name === "wins" || name === "losses" || name === "draws"
          ? Number(value)
          : value,
    }));

    // Call the parent function directly
    onRoundDataChange(round, { ...data, [name]: value });
  };
  console.log(data.round);

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
                <div className="minus-div">-</div>
                <input
                  className="win-loss-draw"
                  name="wins"
                  value={data.wins}
                  type="number"
                  onChange={(e) => onChangeInput(e)}
                  placeholder="0"
                  max={2}
                  min={0}
                />
                <div className="plus-div">+</div>
              </div>
            </td>
            <td className="win-loss-draw">
              <div className="plus-minus-input-div">
                <div className="minus-div">-</div>
                <input
                  name="losses"
                  value={data.losses}
                  type="number"
                  onChange={(e) => onChangeInput(e)}
                  placeholder="0"
                  max={2}
                  min={0}
                />
                <div className="plus-div">+</div>
              </div>
            </td>
            <td className="win-loss-draw">
              <div className="plus-minus-input-div">
                <div className="minus-div">-</div>
                <input
                  className="win-loss-draw"
                  name="draws"
                  value={data.draws}
                  type="number"
                  onChange={(e) => onChangeInput(e)}
                  placeholder="0"
                  max={1}
                  min={0}
                />
                <div className="plus-div">+</div>
              </div>
            </td>
            <td>
              {/* <input
                className="text-input"
                name="notes"
                value={data.notes}
                type="text"
                onChange={(e) => onChangeInput(e)}
                placeholder="Match Notes"
              /> */}
              <Button
                variant="outlined"
                style={{
                  color: "whitesmoke",
                  border: "1px solid whitesmoke",
                  height: "2rem",
                }}
              >
                Add Notes
              </Button>
            </td>
            {/* <td className="button-div">
              <Button
                variant="outlined"
                style={{
                  color: "whitesmoke",
                  border: "1px solid whitesmoke",
                  height: "2rem",
                }}
                onClick={(e) => {
                  handleSubmit(e);
                }}
              >
                Submit
              </Button>
            </td> */}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default EditableTable;
