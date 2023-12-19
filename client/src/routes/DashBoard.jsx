// Landing.js
import React, { useState, useEffect } from "react";
import { Container, Typography, Button, Modal, Box } from "@mui/material";
import RoundResultsTable from "../components/RoundResultsTable";
import CloseIcon from "@mui/icons-material/Close";
import { useUser } from "@clerk/clerk-react";
import PastTournamentDisplay from "../components/PastTournamentDisplay";

const DashBoard = ({ savedTournamentData }) => {
  const [showModal, setShowModal] = useState(false);
  const [numberOfRounds, setNumberOfRounds] = useState(3);
  const [tournamentResults, setTournamentResults] = useState([]);
  const [tournamentName, setTournamentName] = useState("");
  const [tournamentDate, setTournamentDate] = useState("");
  const [deckName, setDeckName] = useState("");
  const [tournamentLocation, setTournamentLocation] = useState("");
  const [pastTournaments, setPastTournaments] = useState("");

  const { user } = useUser();

  const currentUserEmail = user?.emailAddresses[0].emailAddress;

  const buttonStyle = {
    backgroundColor: "#2f4050",
    color: "whitesmoke",
    border: "1px solid whitesmoke",
    height: "3rem",
    width: "auto",
  };

  const boxStyle = {
    border: "1px solid whitesmoke",
    borderRadius: "5px",
    width: "60%",
    maxHeight: "90dvh - 100px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0px 0px 4px 3px rgba(0,0,0,0.4)",
    overflowY: "scroll",
  };

  const modalBoxStyle = {
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

  useEffect(() => {
    if (user) {
      fetch(`/addUser`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userEmail: currentUserEmail,
        }),
      });
      fetch(`/get-tournaments/${currentUserEmail}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 200) {
            setPastTournaments(data.data);
            return;
          }
        });
    }
  }, [user]);

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
    setTournamentResults((prevData) => {
      const updatedData = [...prevData];
      updatedData[round - 1] = { round, ...roundData };
      return updatedData;
    });
  };

  const handleTournamentSubmit = () => {
    const tournamentMetaData = {
      tournamentName,
      tournamentDate,
      tournamentLocation,
      deckName,
    };

    const updatedTournamentData = {
      tournaments: [
        {
          tournamentMetaData: tournamentMetaData,
          tournamentResults: tournamentResults,
        },
      ],
    };

    fetch("/add-tournament", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userEmail: currentUserEmail,
        ...updatedTournamentData,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
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
      <Box style={boxStyle}>
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
            <Box sx={modalBoxStyle}>
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
                  style={buttonStyle}
                  onClick={handleTournamentSubmit}
                >
                  Submit Results
                </Button>
              </div>
            </Box>
          </Modal>
        </form>
      </Box>
      <Box style={boxStyle}>
        <PastTournamentDisplay pastTournaments={pastTournaments} />
      </Box>
    </Container>
  );
};

export default DashBoard;
