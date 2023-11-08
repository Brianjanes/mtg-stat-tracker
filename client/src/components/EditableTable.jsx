import React, { useState } from "react";
import "../App.css";

const EditableTable = () => {
  const [data, setData] = useState({
    round: 0,
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
        name === "round" ||
        name === "wins" ||
        name === "losses" ||
        name === "draws"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
  };

  return (
    <div className="table-div">
      <table>
        <thead>
          <tr>
            <th>Round </th>
            <th>Matchup</th>
            <th>Wins</th>
            <th>Losses</th>
            <th>Draws</th>
            <th>Notes</th>
            {/* <th>Submit</th> */}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input
                className="number-input"
                name="round"
                value={data.round}
                type="number"
                onChange={(e) => onChangeInput(e)}
                placeholder="Round #"
                min={1}
              />
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
            <td>
              <input
                className="number-input"
                name="wins"
                value={data.wins}
                type="number"
                onChange={(e) => onChangeInput(e)}
                placeholder="0"
                max={2}
                min={0}
              />
            </td>
            <td>
              <input
                className="number-input"
                name="losses"
                value={data.losses}
                type="number"
                onChange={(e) => onChangeInput(e)}
                placeholder="0"
                max={2}
                min={0}
              />
            </td>
            <td>
              <input
                className="number-input"
                name="draws"
                value={data.draws}
                type="number"
                onChange={(e) => onChangeInput(e)}
                placeholder="0"
                max={1}
                min={0}
              />
            </td>
            <td>
              <input
                className="text-input"
                name="notes"
                value={data.notes}
                type="text"
                onChange={(e) => onChangeInput(e)}
                placeholder="Match Notes"
              />
            </td>
            <td className="button-div">
              <button
                onClick={(e) => {
                  handleSubmit(e);
                }}
              >
                Submit
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default EditableTable;
