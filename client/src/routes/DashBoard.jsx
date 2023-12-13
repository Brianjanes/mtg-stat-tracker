// Landing.js
import React, { useState } from "react";
import { Container, Typography, Button, Modal, Box } from "@mui/material";
import RoundResultsTable from "../components/RoundResultsTable";

const DashBoard = () => {
  const [showModal, setShowModal] = useState(false);
  const [numberOfRounds, setNumberOfRounds] = useState(3);
  const [tournamentData, setTournamentData] = useState([]);

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
    fetch("/add-tournament", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tournamentData }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
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
        gap: "8rem",
        maxHeight: "100hv",
        margin: "2rem",
      }}
    >
      <Box style={{ border: "1px solid black", width: "60%", height: "20rem" }}>
        <h1>You are signed in now!</h1>
        <form>
          <input
            type="number"
            min={3}
            max={14}
            value={numberOfRounds}
            onChange={handleInputChange}
          />
          <Button
            variant="outlined"
            style={{
              border: "1px solid #2f4050",
              height: "2rem",
            }}
            onClick={(e) => addResults(e)}
          >
            Input Results
          </Button>

          <Modal open={showModal} onClose={handleCloseModal}>
            <Box sx={style}>
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
      <Box style={{ width: "60%", border: "1px solid black", height: "20rem" }}>
        <Typography>TESTING LAYOUT</Typography>
      </Box>
    </Container>
  );
};

export default DashBoard;