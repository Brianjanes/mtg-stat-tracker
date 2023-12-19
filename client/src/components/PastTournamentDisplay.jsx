import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Collapse,
  IconButton,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import LoadingSpinner from "./LoadingSpinner";

const TournamentRow = ({ tournament }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow>
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
              <ul>
                {tournament.tournamentResults.map((result, resultIndex) => (
                  <li key={resultIndex}>
                    Round {result.round}: {result.matchup}, Wins: {result.wins},
                    Losses: {result.losses}, Draws: {result.draws}
                  </li>
                ))}
              </ul>
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
    <div>
      {pastTournaments ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Tournament Name</TableCell>
                <TableCell>Tournament Date</TableCell>
                <TableCell>Tournament Location</TableCell>
                <TableCell>Deck Name</TableCell>
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
    </div>
  );
};

export default PastTournamentDisplay;
