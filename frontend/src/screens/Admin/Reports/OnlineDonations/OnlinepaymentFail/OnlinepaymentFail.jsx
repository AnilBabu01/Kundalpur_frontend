import React, { useEffect, useState } from 'react';
import { serverInstance } from '../../../../../API/ServerInstance';
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
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import exportFromJSON from 'export-from-json';
import Moment from 'moment-js';
import DownloadIcon from '@mui/icons-material/Download';
import CircularProgress from '@mui/material/CircularProgress';
import { ExportPdfUser } from '../../../compoments/ExportPdf';
import axios from 'axios';
import { backendApiUrl } from '../../../../../config/config';
import Print from '../../../../../assets/Print.png';
import ExportPdf from '../../../../../assets/ExportPdf.png';
import ExportExcel from '../../../../../assets/ExportExcel.png';
import { ExportPdfmanulElectronic } from '../../../compoments/ExportPdf';
import OnlineTotal from '../../../compoments/OnlineTotal';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import PrintOnline from '../../../compoments/PrintOnline';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';

import { Box } from '@mui/material';
import Modal from '@mui/material/Modal';

import Fade from '@mui/material/Fade';
import OnlineTap from '../OnlineTap';
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,

  color: '#FDC99C',
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',

  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  zIndex: 2,
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  left: '11px',
  bottom: '0px',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    height: '17px',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const style5 = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: '70%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  p: 2,

  boxShadow: 24,
  borderRadius: '15px',
};
const OnlinepaymentFail = ({ setopendashboard }) => {
  const navigation = useNavigate();
  const [isData, setisData] = React.useState('');
  const [filterstate, setfilterstate] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [refetch, setrefetch] = useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [deleteId, setdeleteId] = useState('');
  const [datefrom, setdatefrom] = useState('');
  const [dateto, setdateto] = useState('');
  const [searchvalue, setsearchvalue] = useState('');
  const [userrole, setuserrole] = useState('');
  const [voucherfrom, setvoucherfrom] = useState('');
  const [voucherto, setvoucherto] = useState('');
  const [open5, setOpen5] = React.useState(false);
  const handleOpen5 = () => setOpen5(true);
  const handleClose5 = () => setOpen5(false);
  const handleClickOpen1 = (id) => {
    setOpen1(true);
    setdeleteId(id);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  const handleClose2 = () => {
    setOpen1(false);
    serverInstance(
      `admin/donation-list?id=${deleteId}&mode=${1}`,
      'delete',
    ).then((res) => {
      if (res.status === true) {
        Swal.fire('Great!', 'Cheque donation delete successfully', 'success');
        setrefetch(!refetch);
        console.log(res);
      } else {
        Swal('Error', 'somthing went  wrong', 'error');
      }
      console.log(res);
    });
  };

  const getall_donation = () => {
    setvoucherfrom('');
    setvoucherto('');
    setdatefrom('');
    setdateto('');
    serverInstance('admin/donation-list', 'get').then((res) => {
      if (res.status) {
        let filterData = res.data.filter(
          (item) =>
            item?.MODE_OF_DONATION === 'ONLINE' &&
            item?.PAYMENT_STATUS === false,
        );
        setisData(filterData);
      } else {
        Swal('Error', 'somthing went  wrong', 'error');
      }
      console.log(res);
    });
  };

  const downloadrecept = (row) => {
    navigation('/admin-panel/room/online/recipt', {
      state: {
        userdata: row,
      },
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const ExportToExcel = () => {
    const fileName = 'OnlineDonationReport';
    const exportType = 'xls';
    console.log('click');
    var data = [];
    isData.map((item, index) => {
      data.push({
        Date: Moment(item?.DATE_OF_DAAN).format('DD/MM/YYYY'),
        'Receipt No': item?.RECEIPT_NO,
        Name: item?.NAME,
        'Phone No': item?.MobileNo,
        Address: item?.ADDRESS,
        'Head/Item': item?.TYPE,
        Amount: item?.AMOUNT,
        Remark: item?.REMARK,
        MODE_OF_DONATION: item?.MODE_OF_DONATION,

        CHEQUE_NO: item?.CHEQUE_NO,
        DATE_OF_CHEQUE: item?.DATE_OF_CHEQUE,

        'Created Date': Moment(item?.created_at).format('DD-MM-YYYY hh:mm a'),
      });
    });
    exportFromJSON({ data, fileName, exportType });
  };

  const filterdata = async () => {
    axios.defaults.headers.get[
      'Authorization'
    ] = `Bearer ${sessionStorage.getItem('token')}`;
    if (searchvalue) {
      const res = await axios.get(
        `${backendApiUrl}/admin/search-online-cheque?search=${searchvalue}&type=ONLINE`,
      );

      if (res.data.status) {
        let filterData = res.data.data.filter(
          (item) => item?.PAYMENT_STATUS === false,
        );
        setisData(filterData);
      }
    } else {
      const res = await axios.get(
        `${backendApiUrl}/admin/filter-online-cheque?fromDate=${datefrom}&toDate=${dateto}&fromRec=${voucherfrom}&toRec=${voucherto}&type=${1}`,
      );

      if (res.data.status) {
        let filterData = res.data.data.filter(
          (item) => item?.PAYMENT_STATUS === false,
        );
        setisData(filterData);
      }
    }
  };
  useEffect(() => {
    getall_donation();
    setopendashboard(true);
  }, [filterstate, refetch]);

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open5}
        onClose={handleClose5}
        closeAfterTransition
      >
        <Fade in={open5}>
          <Box sx={style5}>
            <PrintOnline isData={isData} handleClose={handleClose5} />
          </Box>
        </Fade>
      </Modal>
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

      <OnlineTap setopendashboard={setopendashboard} />
      <div style={{ marginLeft: '5rem', marginRight: '1rem' }}>
        <div className="search-header">
          <div className="search-inner-div-reports">
            <div className="Center_main_dic_filetr">
              <label>From Date</label>
              <input
                style={{ width: '250px' }}
                type="date"
                placeholder="From"
                value={datefrom}
                name="datefrom"
                onChange={(e) => {
                  setdatefrom(e.target.value);
                }}
              />
            </div>

            <div className="Center_main_dic_filetr">
              <label>To Date</label>
              <input
                style={{ width: '250px' }}
                type="date"
                placeholder="From"
                value={dateto}
                name="dateto"
                onChange={(e) => {
                  setdateto(e.target.value);
                }}
              />
            </div>
            <div className="Center_main_dic_filetr">
              <label>From Voucher</label>
              <input
                style={{ width: '100%' }}
                type="text"
                placeholder="From"
                value={voucherfrom}
                name="voucherfrom"
                onChange={(e) => {
                  setvoucherfrom(e.target.value);
                }}
              />
            </div>
            <div className="Center_main_dic_filetr">
              <label>To Voucher</label>
              <input
                style={{ width: '100%' }}
                type="text"
                placeholder="From"
                value={voucherto}
                name="voucherto"
                onChange={(e) => {
                  setvoucherto(e.target.value);
                }}
              />
            </div>
            <div className="Center_main_dic_filetr">
              <label>&nbsp;</label>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                />
              </Search>
            </div>

            <div className="Center_main_dic_filetr">
              <label>&nbsp;</label>
              <button onClick={() => filterdata()}>Search</button>
            </div>
            <div className="Center_main_dic_filetr">
              <label>&nbsp;</label>
              <button onClick={() => getall_donation()}>Reset</button>
            </div>
          </div>
        </div>

        <div
          className="search-header-prin"
          style={{
            paddingBottom: '1rem',
          }}
        >
          <div
            className="search-header-print"
            style={{
              borderBottom: '1px  solid gray',
              width: '100%',
              borderTop: ' 1px solid gray',
              paddingTop: '1%',
            }}
          >
            <Tooltip title="Export Excel File">
              <IconButton>
                <img
                  onClick={() => ExportToExcel()}
                  src={ExportExcel}
                  alt="cc"
                  style={{ width: '30px' }}
                />
              </IconButton>
            </Tooltip>
            &nbsp;&nbsp;
            <Tooltip title="Export Pdf File">
              <IconButton>
                <img
                  onClick={() =>
                    ExportPdfmanulElectronic(isData, 'ManualCashReport')
                  }
                  src={ExportPdf}
                  alt="cc"
                  style={{ width: '30px' }}
                />
              </IconButton>
            </Tooltip>
            <Tooltip title="Print Report">
              <IconButton>
                <img
                  style={{ width: '30px' }}
                  onClick={() => handleOpen5()}
                  src={Print}
                  alt=" Print"
                />
              </IconButton>
            </Tooltip>
          </div>
        </div>

        <div className="table-div-maain">
          <Table
            sx={{ minWidth: 650, width: '100%' }}
            aria-label="simple table"
          >
            <TableHead style={{ background: '#F1F0F0' }}>
              <TableRow>
                <TableCell>Receipt No</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Name </TableCell>
                <TableCell>Donation Type</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isData ? (
                <>
                  {(rowsPerPage > 0
                    ? isData
                        .reverse()
                        .slice(
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
                      <TableCell>{row?.RECEIPT_NO}</TableCell>
                      <TableCell>
                        {moment(row?.DATE_OF_DAAN).format('DD/MM/YYYY')}
                      </TableCell>
                      <TableCell>{row?.NAME}</TableCell>
                      <TableCell> {row?.MODE_OF_DONATION}</TableCell>
                      <TableCell> {row?.AMOUNT}</TableCell>

                      <TableCell align="left">
                        {row?.PAYMENT_STATUS === true
                          ? 'Payment succrssfull'
                          : 'Payment failed'}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell> &nbsp;</TableCell>
                    <TableCell> &nbsp;</TableCell>
                    <TableCell> &nbsp;</TableCell>
                    <TableCell>Total Amount</TableCell>
                    <TableCell>
                      <OnlineTotal data={isData} />
                    </TableCell>
                    <TableCell> &nbsp;</TableCell>
                  </TableRow>
                </>
              ) : (
                <>
                  <TableCell colSpan={9} align="center">
                    <CircularProgress />
                  </TableCell>
                </>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  // count={isData.length}
                  // rowsPerPage={rowsPerPage}
                  // page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  rowsPerPageOptions={[50, 100, 150]}
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
    </>
  );
};

export default OnlinepaymentFail;
