import React, { useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Collapse,
  IconButton,
  TableContainer,
  Paper,
  TableHead,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import LoadingSpinner from "./LoadingSpinner";

const determineBackgroundColor = (result) => {
  if (result.wins >= 2) {
    return "#80ff80"; // Green for 2 or more wins
  } else if (result.losses >= 2) {
    return "#ff8080"; // Red for 2 or more losses
  } else if (result.draws > 0) {
    return "#ffff99"; // Light blue for draws
  } else {
    return "inherit"; // Default background color
  }
};

const boxStyle = {
  border: "1px solid whitesmoke",
  borderRadius: "5px",
  width: "100%",
  height: "400px", // Set a fixed height for the container
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  boxShadow: "0px 0px 4px 3px rgba(0,0,0,0.4)",
  overflowY: "scroll",
};

const headerStyle = {
  backgroundColor: "#2f4050",
  color: "whitesmoke",
  padding: "10px",
  textAlign: "center",
  width: "100%",
};

const TournamentResultsTable = ({ tournamentResults }) => {
  return (
    <Table>
      <TableBody>
        {tournamentResults.map((result, resultIndex) => (
          <TableRow
            style={{
              backgroundColor: determineBackgroundColor(result),
            }}
            key={resultIndex}
          >
            <TableCell>
              Round {result.round}: {result.matchup}
            </TableCell>
            <TableCell>Wins: {result.wins}</TableCell>
            <TableCell>Losses: {result.losses}</TableCell>
            <TableCell>Draws: {result.draws}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

const TournamentRow = ({ tournament }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow style={{ backgroundColor: "inherit", color: "whitesmoke" }}>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{tournament.tournamentMetaData.tournamentName}</TableCell>
        <TableCell>{tournament.tournamentMetaData.tournamentDate}</TableCell>
        <TableCell>
          {tournament.tournamentMetaData.tournamentLocation}
        </TableCell>
        <TableCell>{tournament.tournamentMetaData.deckName}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <div>
              <h4>Tournament Results</h4>
              <TournamentResultsTable
                tournamentResults={tournament.tournamentResults}
              />
            </div>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

const PastTournamentDisplay = ({ pastTournaments }) => {
  console.log(pastTournaments);

  return (
    <Box style={boxStyle}>
      <div style={headerStyle}>Tournament Results</div>
      {pastTournaments ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell style={{ textAlign: "center" }}>
                  Tournament Name
                </TableCell>
                <TableCell style={{ textAlign: "center" }}>
                  Tournament Date
                </TableCell>
                <TableCell style={{ textAlign: "center" }}>
                  Tournament Location
                </TableCell>
                <TableCell style={{ textAlign: "center" }}>Deck Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pastTournaments.map((tournamentArray, index) => (
                <TournamentRow key={index} tournament={tournamentArray[0]} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <div className="loadingDiv">
          <LoadingSpinner />
        </div>
      )}
    </Box>
  );
};

export default PastTournamentDisplay;
