import React, { useEffect, useState } from 'react';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { serverInstance } from '../../../../API/ServerInstance';
import Swal from 'sweetalert2';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import { Box } from '@mui/material';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import CloseIcon from '@mui/icons-material/Close';
import AcceptRequest from './AcceptRequest';
import './Assign.css';
const style = {
  position: 'absolute',
  top: '27%',
  left: '50%',
  transform: 'translate(-50%, -50%)',

  bgcolor: 'background.paper',
  p: 2,
  boxShadow: 24,
  borderRadius: '5px',
};
const Assign = ({ setopendashboard }) => {
  const [isData, setisData] = React.useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = React.useState(false);
  const [empdata, setempdata] = useState('');
  const handleOpen = (data) => {
    setOpen(true);
    setempdata(data);
  };
  const handleClose = () => setOpen(false);
  const navigation = useNavigate();
  console.log('ass', isData);
  useEffect(() => {
    setopendashboard(true);
    getall_donation();
  }, [open]);

  const getall_donation = () => {
    serverInstance('user/get-req-voucher', 'get').then((res) => {
      if (res.status) {
        setisData(res.data);
      } else {
        Swal('Error', 'somthing went  wrong', 'error');
      }
      console.log(res);
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
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
          <Box sx={style}>
            <div>
              <div className="add-div-close-div1222">
                <h2>Generate Voucher</h2>
                <CloseIcon onClick={() => handleClose()} />
              </div>

              <AcceptRequest setOpen={setOpen} empdata={empdata} />
            </div>
          </Box>
        </Fade>
      </Modal>

      <div className="table-div-maain">
        <Table sx={{ width: '100%' }} aria-label="simple table">
          <TableHead style={{ background: '#F1F0F0' }}>
            <TableRow>
              <TableCell>EmpId</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? isData.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage,
                )
              : isData
            ).map((row, index) => (
              <TableRow
                key={index}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                }}
              >
                <TableCell> {row.id}</TableCell>
                <TableCell>{row.Username}</TableCell>
                <TableCell> {row.Role}</TableCell>

                <TableCell>
                  <button
                    onClick={() => handleOpen(row)}
                    className="Accepted_btn"
                  >
                    Accepted
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                count={isData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[5, 10, 25]}
                labelRowsPerPage={<span>Rows:</span>}
                labelDisplayedRows={({ page }) => {
                  return `Page: ${page}`;
                }}
                backIconButtonProps={{
                  color: 'secondary',
                }}
                nextIconButtonProps={{ color: 'secondary' }}
                SelectProps={{
                  inputProps: {
                    'aria-label': 'page number',
                  },
                }}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </>
  );
};

export default Assign;
