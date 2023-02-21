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
import './VoucherManagement.css';
import AddVoucherToUser from './AddVoucherToUser/AddVoucherToUser';
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
import { format } from 'date-fns';
const style = {
  position: 'absolute',
  top: '27%',
  left: '50%',
  transform: 'translate(-50%, -50%)',

  background: '#FFFFFF',
  borderRadius: '15px',
  bgcolor: 'background.paper',
  p: 2,
  boxShadow: 24,
};
const ParticularUserVoucher = ({ setopendashboard }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = React.useState(false);
  const [isData, setisData] = useState('');
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigation = useNavigate();

  const getall_donation = () => {
    serverInstance('user/add-voucher-user', 'get').then((res) => {
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

  useEffect(() => {
    getall_donation();
    setopendashboard(true);
  }, []);
  return (
    <>
      <div className="dashboarmain1">
        <div>
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
                  <TableCell>Voucher</TableCell>
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
                        <TableCell> {`${row.from} to ${row.to}`}</TableCell>
                        <TableCell>{row?.voucher}</TableCell>
                        <TableCell>
                          {row.status ? 'Allocated' : 'Not Used'}
                        </TableCell>
                        <TableCell>
                          <button className="Accepted_btn">Accepted</button>
                          <button className="Cancel_btnN">Cancel</button>
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
