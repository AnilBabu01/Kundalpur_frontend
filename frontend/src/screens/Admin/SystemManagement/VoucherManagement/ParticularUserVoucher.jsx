import React, { useEffect, useState } from 'react';
import { serverInstance } from '../../../../API/ServerInstance';
import Swal from 'sweetalert2';
import moment from 'moment';
import { useNavigate, useLocation } from 'react-router-dom';
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
import './VoucherManagement.css';
import Print from '../../../../assets/Print.png';
import ExportPdf from '../../../../assets/ExportPdf.png';
import ExportExcel from '../../../../assets/ExportExcel.png';
import Edit from '../../../../assets/Edit.png';
import eye from '../../../../assets/eye.png';
import Delete from '../../../../assets/Delete.png';
import exportFromJSON from 'export-from-json';
import Tooltip from '@mui/material/Tooltip';
import Moment from 'moment-js';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import axios from 'axios';
import { backendApiUrl } from '../../../../config/config';
import { format } from 'date-fns';
import CancelVoucher from './CancelVoucher';
const style = {
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '30%',
  bgcolor: 'background.paper',
  p: 2,
  boxShadow: 24,
  borderRadius: '5px',
};
const ParticularUserVoucher = ({ setopendashboard }) => {
  const location = useLocation();
  const navigation = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [isData, setisData] = useState('');
  const [refetchdata, setrefetchdata] = useState(false);
  const [Data, setData] = useState('');
  const [cancelData, setcancelData] = useState('');
  const [open, setOpen] = React.useState(false);
  const handleOpen = (data) => {
    setcancelData(data);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const cancelVouhcer = async (row) => {
    axios.defaults.headers.post[
      'Authorization'
    ] = `Bearer ${sessionStorage.getItem('token')}`;
    const res = await axios.post(`${backendApiUrl}admin/cancel-each-voucher`, {
      voucherNo: Number(row?.voucherNo),
      voucherId: Number(Data?.assign),
    });
    console.log('empl', res.data.data);

    if (res.data.data.status === 'success') {
      setrefetchdata(!refetchdata);

      Swal.fire('Great!', res.data.data.message, 'success');
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    if (location.state) {
      setData(location.state?.userdata);

      serverInstance(
        `admin/allocated-vouchers?userId=${Number(
          location.state?.userdata?.assign,
        )}`,
        'get',
      ).then((res) => {
        if (res.status) {
          setisData(res.data);
        } else {
          Swal('Error', 'somthing went  wrong', 'error');
        }
        console.log(res);
      });
    }

    setopendashboard(true);
  }, [refetchdata]);
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
              <div className="add-div-close-div1">
                <h2>Update cheque status</h2>
                <CloseIcon onClick={() => handleClose()} />
              </div>
              <CancelVoucher
                row={cancelData}
                Data={Data}
                handleClose={handleClose}
                setrefetchdata={setrefetchdata}
                refetchdata={refetchdata}
              />
            </div>
          </Box>
        </Fade>
      </Modal>
      <div className="dashboarmain1">
        <div>
          <div className="backebj_voucher">
            <button onClick={() => navigation(-1)}>Back</button>
          </div>

          <div className="table-div-maain">
            {/* <TableContainer component={Paper}> */}
            <Table
              sx={{ minWidth: 650, width: '97%' }}
              aria-label="simple table"
            >
              <TableHead style={{ background: '#F1F0F0' }}>
                <TableRow>
                  <TableCell>S.No</TableCell>
                  <TableCell>Empoyee Name</TableCell>

                  <TableCell>Voucher Number</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {isData && (
                  <>
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
                        <TableCell> {index + 1}</TableCell>
                        <TableCell>{row?.name}</TableCell>

                        <TableCell>{row?.voucherNo}</TableCell>
                        <TableCell>{row.status}</TableCell>
                        <TableCell>
                          {row.status === 'unallocated' ? (
                            <>
                              {' '}
                              <button
                                onClick={() => handleOpen(row)}
                                className="Cancel_btnN"
                              >
                                Cancel
                              </button>{' '}
                            </>
                          ) : (
                            <>
                              {' '}
                              <button className="Accepted_btn">
                                Accepted
                              </button>{' '}
                            </>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    count={isData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    rowsPerPageOptions={[20, 25, 40]}
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
                    // showFirstButton={true}
                    // showLastButton={true}
                    //ActionsComponent={TablePaginationActions}
                    //component={Box}
                    //sx and classes prop discussed in styling section
                  />
                </TableRow>
              </TableFooter>
            </Table>
            {/* </TableContainer> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ParticularUserVoucher;
