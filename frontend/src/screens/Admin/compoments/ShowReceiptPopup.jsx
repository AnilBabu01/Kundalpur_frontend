import React from 'react';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Box from '@mui/material/Box';
import Reciept from '../Reciept/PopupReceupt';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',

  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',

  boxShadow: 24,
  borderRadius: '15px',
};
function ShowReceiptPopup({ open, handleClose }) {
  console.log('hhhh', open);
  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={open}>
          <Box
            sx={{
              ...style,
              width: {
                xs: '90%',
                sm: '70%',
                md: '70%',
              },
            }}
          >
            <Reciept />
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

export default ShowReceiptPopup;
