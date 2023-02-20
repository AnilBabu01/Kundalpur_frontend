import React, { useEffect, useState } from 'react';
import { serverInstance } from '../../../../API/ServerInstance';
import Swal from 'sweetalert2';
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
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Adduser from './Adduser/Adduser';
import Typography from '@mui/material/Typography';
import UpdateEmployee from './Adduser/UpdateEmployee';
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
import './UserManagement.css';

const style = {
  position: 'absolute',
  top: '48%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  background: '#FFFFFF',
  borderRadius: '15px',
  bgcolor: 'background.paper',
  p: 1,
  boxShadow: 24,
};
const UserManagement = ({ setopendashboard }) => {
  const navigate = useNavigate();
  const [isData, setisData] = React.useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = React.useState(false);
  const [refetch, setrefetch] = useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [deleteId, setdeleteId] = useState('');
  const [empdata, setempdata] = useState('');
  const [open3, setOpen3] = React.useState(false);
  const [name, setname] = useState('');
  const [phoneno, setphoneno] = useState('');
  const handleClickOpen3 = (data) => {
    setOpen3(true);
    setempdata(data);
  };

  const handleClose3 = () => {
    setOpen3(false);
  };
  const handleClickOpen1 = (id) => {
    setOpen1(true);
    setdeleteId(id);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  const handleClose2 = () => {
    setOpen1(false);
    serverInstance(`admin/add-employee?id=${deleteId}`, 'delete').then(
      (res) => {
        if (res.status === true) {
          Swal.fire('Great!', 'User delete successfully', 'success');
          setrefetch(true);
        } else {
          Swal('Error', 'somthing went  wrong', 'error');
        }
        console.log(res);
      },
    );
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getall_donation = () => {
    setname('');
    setphoneno('');
    serverInstance('admin/add-employee', 'get').then((res) => {
      if (res.status) {
        setisData(res.data);
      } else {
        Swal('Error', 'somthing went  wrong', 'error');
      }
      console.log(res);
    });
  };

  var options = { year: 'numeric', month: 'short', day: '2-digit' };
  var today = new Date();
  const currDate = today
    .toLocaleDateString('en-IN', options)
    .replace(/-/g, ' ');
  const currTime = today.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const ExportToExcel = () => {
    const fileName = 'EmployeeList';
    const exportType = 'xls';
    var data = [];

    isData.map((item, index) => {
      data.push({
        userid: item?.id,
        Username: item?.Username,
        Email: item?.Email,
        'Phone No': item?.Mobile,
        Role: item?.Role,
        Address: item?.Address,

        'Created Date': Moment(item?.created_at).format('DD-MM-YYYY'),
      });
    });

    exportFromJSON({ data, fileName, exportType });
  };

  const ExportPdfmanul = (fileName) => {
    const doc = new jsPDF();

    const tableColumn = [
      'Userid',
      'UserName',
      'Email',
      'Phone No',
      'Role',
      'Address',
    ];

    const tableRows = [];

    isData.forEach((item) => {
      const ticketData = [
        item?.id,
        item?.Username,
        item?.Email,
        item?.Mobile,
        item?.Role,
        item?.Address,
      ];

      tableRows.push(ticketData);
    });

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    const date = Date().split(' ');

    const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];

    doc.text(`Report of ${fileName}`, 8, 9);
    doc.setFont('Lato-Regular', 'normal');
    doc.setFontSize(28);
    doc.save(`${fileName}_${dateStr}.pdf`);
  };

  const filterdata = async () => {
    serverInstance(
      `admin/add-employee?name=${name}&phone=${phoneno}',
      'get`,
    ).then((res) => {
      if (res.data) {
        setisData(res.data);
      }
    });
  };

  useEffect(() => {
    setopendashboard(true);
    getall_donation();
  }, [refetch, open, open1, open3]);
  return (
    <>
      <Dialog
        open={open1}
        onClose={handleClose1}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'Do you want to delete'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            After delete you cannot get again
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose1}>Disagree</Button>
          <Button onClick={handleClose2} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
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
              <div className="add-div-close-div-user-add">
                <div>
                  <h2 clssName="add_text_only"> Add Employee</h2>
                  <Typography
                    style={{ marginTop: '0.5rem' }}
                    variant="body2"
                    color="primary"
                    align="right"
                  >
                    {currDate} / {currTime}
                  </Typography>
                </div>

                <CloseIcon onClick={() => handleClose()} />
              </div>

              <Adduser setOpen={setOpen} />
            </div>
          </Box>
        </Fade>
      </Modal>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open3}
        onClose={handleClose3}
        closeAfterTransition
      >
        <Fade in={open3}>
          <Box sx={style}>
            <div>
              <div className="add-div-close-div-user-add">
                <div>
                  <h2 clssName="add_text_only"> Update Employee</h2>
                  <Typography
                    style={{ marginTop: '0.5rem' }}
                    variant="body2"
                    color="primary"
                    align="right"
                  >
                    {currDate} / {currTime}
                  </Typography>
                </div>

                <CloseIcon onClick={() => handleClose3()} />
              </div>

              <UpdateEmployee setOpen={setOpen3} empdata={empdata} />
            </div>
          </Box>
        </Fade>
      </Modal>
      <div className="dashboarddiv">
        <div className="uemploye_main">
          <div className="search-header-employee">
            <div className="search-inner-div">
              <input
                type="text"
                placeholder="Name"
                name="name"
                value={name}
                onChange={(e) => setname(e.target.value)}
              />
              <input
                type="text"
                placeholder="Phone No"
                name="phoneno"
                value={phoneno}
                onChange={(e) => setphoneno(e.target.value)}
              />
              <button onClick={() => filterdata()}>Search</button>
              <button onClick={() => getall_donation()}>Reset</button>
              <button onClick={() => handleOpen()}>+Add</button>
              <Tooltip title="Export Excel File">
                <img
                  onClick={() => ExportToExcel()}
                  src={ExportExcel}
                  style={{ width: '30px', marginRight: '0.2rem' }}
                />
              </Tooltip>
              <Tooltip title="Export Pdf File">
                <img
                  onClick={() => ExportPdfmanul('Employee_list')}
                  src={ExportPdf}
                  style={{ width: '30px', marginRight: '0.2rem' }}
                />
              </Tooltip>
            </div>
          </div>

          <div>
            <div
              className="table-div-maain"
              style={{ paddingRight: '1.5%', paddingLeft: '0.4%' }}
            >
              {/* <TableContainer component={Paper}> */}
              <Table
                sx={{ minWidth: 650, width: '100%' }}
                aria-label="simple table"
              >
                <TableHead style={{ background: '#F1F0F0' }}>
                  <TableRow>
                    <TableCell>Sr No.</TableCell>
                    <TableCell>Mobile</TableCell>
                    <TableCell>Username</TableCell>
                    <TableCell>Address</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Edit/Delete</TableCell>
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
                      <TableCell>{index + 1}</TableCell>
                      <TableCell> {row.Mobile}</TableCell>
                      <TableCell>{row.Username}</TableCell>
                      <TableCell> {row.Address}</TableCell>
                      <TableCell>{row.Email}</TableCell>
                      <TableCell>{row.Role}</TableCell>
                      <TableCell>
                        {row.Status ? 'Active' : 'De-Active'}
                      </TableCell>

                      <TableCell>
                        <Tooltip title="View Details">
                          <img
                            onClick={() =>
                              navigate(
                                '/admin-panel/masters/employeeUserInfo',
                                {
                                  state: {
                                    userdata: row,
                                  },
                                },
                              )
                            }
                            src={eye}
                            style={{ width: '20px', marginRight: '0.2rem' }}
                          />
                        </Tooltip>
                        <Tooltip title="Edit Employee">
                          <img
                            onClick={() => handleClickOpen3(row)}
                            src={Edit}
                            style={{ width: '20px', marginRight: '0.2rem' }}
                          />
                        </Tooltip>
                        <Tooltip title="Delete Employee">
                          <img
                            onClick={() => handleClickOpen1(row.id)}
                            src={Delete}
                            style={{ width: '20px', marginRight: '0.2rem' }}
                          />
                        </Tooltip>
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
      </div>
    </>
  );
};

export default UserManagement;
