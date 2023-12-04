import React, { useState } from "react";
import { Container, Typography, Button, Modal, Box } from "@mui/material";
import EditableTable from "../components/EditableTable";

const Landing = () => {
  const [showModal, setShowModal] = useState(false);
  const [numberOfRounds, setNumberOfRounds] = useState(3);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "60%",
    bgcolor: "#2f4050",
    border: "1px solid whitesmoke",

    boxShadow: 24,
    p: 4,
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

  return (
    <Container>
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
            {/* You can dynamically render EditableTable components here based on numberOfRounds */}
            {Array.from({ length: numberOfRounds }, (_, index) => (
              <EditableTable key={index} round={index + 1} />
            ))}
          </Box>
        </Modal>
      </form>
    </Container>
  );
};

export default Landing;
