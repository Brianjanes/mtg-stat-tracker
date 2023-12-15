// Landing.js
import React, { useState } from "react";
import { Container, Typography, Button, Modal, Box } from "@mui/material";
import RoundResultsTable from "../components/RoundResultsTable";
import CloseIcon from "@mui/icons-material/Close";

const DashBoard = ({ savedTournamentData }) => {
  const [showModal, setShowModal] = useState(false);
  const [numberOfRounds, setNumberOfRounds] = useState(3);
  const [tournamentData, setTournamentData] = useState([]);
  const [tournamentName, setTournamentName] = useState("");
  const [tournamentDate, setTournamentDate] = useState("");
  const [deckName, setDeckName] = useState("");
  const [tournamentLocation, setTournamentLocation] = useState("");

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "auto",
    height: "80%",
    bgcolor: "#2f4050",
    border: "1px solid whitesmoke",
    boxShadow: 24,
    p: 4,
    overflowY: "scroll",
  };

  const addResults = (e) => {
    e.preventDefault();
    setShowModal(!showModal);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    setNumberOfRounds(parseInt(e.target.value, 10));
  };

  const handleRoundDataChange = (round, roundData) => {
    setTournamentData((prevData) => {
      const updatedData = [...prevData];
      updatedData[round - 1] = { round, ...roundData };
      return updatedData;
    });
  };

  const handleTournamentSubmit = () => {
    const tournamentDetails = {
      tournamentName,
      tournamentDate,
      tournamentLocation,
      deckName,
    };

    const updatedTournamentData = {
      ...tournamentDetails,
      tournamentData: tournamentData,
    };

    console.log(updatedTournamentData);

    fetch("/add-tournament", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tournamentData: updatedTournamentData }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.res.status === 200) {
          console.log("Successfully added tournament to Database.");
        } else {
          console.log("Status code not 200 while adding new tournament.");
        }
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };
  return (
    <Container
      style={{
        maxWidth: "90%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "8rem",
        maxHeight: "100hv",
        margin: "2rem",
      }}
    >
      <Box
        style={{
          border: "1px solid whitesmoke",
          width: "60%",
          height: "20rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>You are signed in now!</h1>
        <form>
          <input
            type="number"
            className="dashboard-number-input"
            min={3}
            max={14}
            value={numberOfRounds}
            onChange={handleInputChange}
          />
          <Button
            variant="outlined"
            style={{
              border: "1px solid whitesmoke",
              height: "2rem",
              color: "whitesmoke",
            }}
            onClick={(e) => addResults(e)}
          >
            Input Results
          </Button>

          <Modal open={showModal} onClose={handleCloseModal}>
            <Box sx={style}>
              <div className="top-modal-div">
                <div className="top-modal-close">
                  <CloseIcon
                    onClick={() => {
                      setShowModal(false);
                    }}
                  />
                </div>
                <div className="top-modal-input">
                  <span className="input-name">Deck Name:</span>
                  <input
                    id="deckName"
                    value={deckName}
                    type="text"
                    onChange={(e) => setDeckName(e.target.value)}
                  />
                </div>
                <div className="top-modal-input">
                  <span className="input-name">Tournament Name:</span>
                  <input
                    id="tournamentName"
                    value={tournamentName}
                    type="text"
                    onChange={(e) => setTournamentName(e.target.value)}
                  />
                </div>
                <div className="top-modal-input">
                  <span className="input-name" placeholder="Location">
                    Tournament Location:
                  </span>
                  <input
                    id="tournamentLocation"
                    value={tournamentLocation}
                    type="text"
                    onChange={(e) => setTournamentLocation(e.target.value)}
                  />
                </div>
                <div className="top-modal-input">
                  <span className="input-name">Tournament Date:</span>
                  <input
                    id="tournamentDate"
                    value={tournamentDate}
                    type="date"
                    onChange={(e) => setTournamentDate(e.target.value)}
                  />
                </div>
              </div>
              {Array.from({ length: numberOfRounds }, (_, index) => (
                <RoundResultsTable
                  key={index}
                  round={index + 1}
                  onRoundDataChange={handleRoundDataChange}
                />
              ))}
              <div className="button-div">
                <Button
                  variant="outlined"
                  style={{
                    backgroundColor: "#2f4050",
                    color: "whitesmoke",
                    border: "1px solid whitesmoke",
                    height: "3rem",
                    width: "auto",
                  }}
                  onClick={handleTournamentSubmit}
                >
                  Submit Results
                </Button>
              </div>
            </Box>
          </Modal>
        </form>
      </Box>
      <Box
        style={{
          width: "60%",
          border: "1px solid whitesmoke",
          height: "20rem",
        }}
      >
        <Typography>TESTING LAYOUT</Typography>
      </Box>
    </Container>
  );
};

export default DashBoard;
