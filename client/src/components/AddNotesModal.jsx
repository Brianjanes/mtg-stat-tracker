import React, { useState, useEffect, useRef } from "react";
import { Modal, Box, Button } from "@mui/material";

const AddNotesModal = ({ onSaveNotes, onClose }) => {
  const [notes, setNotes] = useState("");
  const textInputRef = useRef(null);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "auto", // Adjust the width as needed
    bgcolor: "#2f4050",
    border: "1px solid whitesmoke",
    borderRadius: "5px",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
  };
  useEffect(() => {
    // Focus on the text input when the modal is mounted
    const focusTextInput = () => {
      if (textInputRef.current) {
        textInputRef.current.focus();
      }
    };

    const timeoutId = setTimeout(focusTextInput, 0); // Introduce a small delay

    return () => clearTimeout(timeoutId); // Cleanup on component unmount
  }, []);

  const handleDoneClick = () => {
    onSaveNotes(notes);
    onClose();
  };

  return (
    <Modal open={true} onClose={onClose}>
      <Box sx={style}>
        <textarea
          ref={textInputRef}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Type your match notes here."
          rows={4}
          cols={50}
        />
        <div className="button-div">
          <Button
            variant="outlined"
            onClick={handleDoneClick}
            style={{
              width: "auto",
              border: "1px solid whitesmoke",
              color: "whitesmoke",
            }}
          >
            Add Notes
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default AddNotesModal;
