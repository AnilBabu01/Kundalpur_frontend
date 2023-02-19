import React, { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Link, Outlet } from 'react-router-dom';
import WindowResize from './WindowResize';
import DesktopDrawar from './DesktopDrawar';
import MobileDrawar from './MobileDrawar';
import logoApp from './logoApp.jpeg';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import Avatar from '@mui/material/Avatar';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import UploadIcon from '@mui/icons-material/Upload';
import Divider from '@mui/material/Divider';
import Logout from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import Person2Icon from '@mui/icons-material/Person2';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { ListItemButton } from '@mui/material';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import CloseIcon from '@mui/icons-material/Close';
import Signature from '../Signature/Signature';
import ProfileAdminAndEmp from '../Profile/ProfileAdminAndEmp';
import ChangePassword from '../ChangePassword/ChangePassword';
const style = {
  position: 'absolute',
  top: '48%',
  left: '50%',
  width: '40%',
  transform: 'translate(-50%, -50%)',
  background: '#FFFFFF',
  borderRadius: '15px',
  bgcolor: 'background.paper',
  p: 2,
  boxShadow: 24,
};

const style1 = {
  position: 'absolute',
  top: '48%',
  left: '50%',
  width: '20.5%',
  transform: 'translate(-50%, -50%)',
  background: '#FFFFFF',
  borderRadius: '15px',
  bgcolor: 'background.paper',
  p: 2,
  boxShadow: 24,
};

const style3 = {
  position: 'absolute',
  top: '48%',
  left: '50%',
  width: '30%',
  transform: 'translate(-50%, -50%)',
  background: '#FFFFFF',
  borderRadius: '15px',
  bgcolor: 'background.paper',
  p: 2,
  boxShadow: 24,
};
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,

  border: '1px solid #FDC99C',
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
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
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
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const notificationMenuItems = [
  {
    title: 'Title for notification',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sed turpis vitae lorem aliquam ultricies. lorem aliquam ultricies. lorem aliquam ultricies.',
    icon: (
      <Avatar
        sx={{
          bgcolor: 'colors.green',
        }}
      >
        <NotificationsNoneOutlinedIcon
          fontSize="large"
          sx={{
            color: 'common.white',
          }}
        />
      </Avatar>
    ),
  },
  {
    title: 'Title for notification',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sed turpis vitae lorem aliquam ultricies. lorem aliquam ultricies. lorem aliquam ultricies.',
    icon: (
      <Avatar
        sx={{
          bgcolor: 'colors.green',
        }}
      >
        <NotificationsNoneOutlinedIcon
          fontSize="large"
          sx={{
            color: 'common.white',
          }}
        />
      </Avatar>
    ),
  },
  {
    title: 'Title for notification',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sed turpis vitae lorem aliquam ultricies. lorem aliquam ultricies. lorem aliquam ultricies.',
    icon: (
      <Avatar
        sx={{
          bgcolor: 'colors.green',
        }}
      >
        <NotificationsNoneOutlinedIcon
          fontSize="large"
          sx={{
            color: 'common.white',
          }}
        />
      </Avatar>
    ),
  },
];
const RenderNotification1 = () => {
  return (
    <>
      {notificationMenuItems.map(({ title, icon, description }) => {
        return (
          <div key={title}>
            <ListItem alignItems="flex-start" disableGutters disablePadding>
              <ListItemButton>
                <ListItemAvatar>{icon}</ListItemAvatar>
                <ListItemText
                  primaryTypographyProps={{
                    fontWeight: 700,
                  }}
                  primary={title}
                  secondary={<p>{description.slice(0, 30)}</p>}
                />
              </ListItemButton>
            </ListItem>
            <Divider
              sx={{
                borderBottomWidth: 2,
              }}
            />
          </div>
        );
      })}

      <Box
        sx={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography
          component="a"
          sx={{
            cursor: 'pointer',
          }}
        >
          See more
        </Typography>
      </Box>
    </>
  );
};
const DashboardWrapper = () => {
  const navigate = useNavigate();
  const resize = WindowResize();
  const adminName = sessionStorage.getItem('adminName');
  const empName = sessionStorage.getItem('empName');
  const empRole = sessionStorage.getItem('empRole');
  const [open, setOpen] = React.useState(false);
  const [anchorEl1, setAnchorEl1] = useState(false);
  const open1 = Boolean(anchorEl1);
  const handleClick1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl1(null);
  };
  const [anchorEl2, setAnchorEl2] = useState(false);
  const open2 = Boolean(anchorEl2);

  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
    console.log('open');
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const [open3, setOpen3] = React.useState(false);
  const handleClickOpen3 = () => {
    setOpen3(true);
  };

  const handleClose3 = () => {
    setOpen3(false);
  };

  const [open4, setOpen4] = React.useState(false);
  const handleClickOpen4 = () => {
    setOpen4(true);
  };

  const handleClose4 = () => {
    setOpen4(false);
  };

  const [open5, setOpen5] = React.useState(false);
  const handleClickOpen5 = () => {
    setOpen5(true);
  };

  const handleClose5 = () => {
    setOpen5(false);
  };

  const logout = () => {
    handleClose();
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userrole');

    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const mobileMenuId = 'primary-search-account-menu-mobile';

  const RenderNotification = (
    <Menu
      anchorEl={anchorEl2}
      id="account-menu"
      open={open2}
      onClose={handleClose2}
      onClick={handleClose2}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: 'visible',
          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
          mt: 1.5,
          '& .MuiAvatar-root': {
            width: 22,
            height: 32,
          },
          '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      <RenderNotification1 />
    </Menu>
  );

  const renderMobileMenu = (
    <Menu
      anchorEl={anchorEl1}
      id="account-menu"
      open={open1}
      onClose={handleClose}
      onClick={handleClose}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: 'visible',
          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
          mt: 1.5,
          '& .MuiAvatar-root': {
            width: 22,
            height: 32,
          },
          '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      <MenuItem onClick={() => handleClickOpen3()}>
        <ListItemIcon>
          <UploadIcon fontSize="small" />
        </ListItemIcon>
        Upload signature
      </MenuItem>

      <MenuItem onClick={() => handleClickOpen4()}>
        <ListItemIcon>
          <Person2Icon fontSize="small" />
        </ListItemIcon>
        Profile
      </MenuItem>
      <MenuItem onClick={() => handleClickOpen5()}>
        <ListItemIcon>
          <LockOpenIcon fontSize="small" />
        </ListItemIcon>
        Change password
      </MenuItem>

      <Divider />
      <MenuItem onClick={() => logout()}>
        <ListItemIcon>
          <Logout fontSize="small" />
        </ListItemIcon>
        Logout
      </MenuItem>
    </Menu>
  );

  const renderModal = (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open3}
        onClose={handleClose3}
        closeAfterTransition
      >
        <Fade in={open3}>
          <Box sx={style1}>
            <div>
              <div className="add-div-close-div-user-add">
                <div>
                  <h2 clssName="add_text_only">Upload Signature</h2>
                </div>

                <CloseIcon onClick={() => handleClose3()} />
              </div>

              <Signature setOpen3={setOpen3} />
            </div>
          </Box>
        </Fade>
      </Modal>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open4}
        onClose={handleClose4}
        closeAfterTransition
      >
        <Fade in={open4}>
          <Box sx={style}>
            <div>
              <div className="add-div-close-div-user-add">
                <div>
                  <h2 clssName="add_text_only">Update Profile</h2>
                </div>

                <CloseIcon onClick={() => handleClose4()} />
              </div>

              <ProfileAdminAndEmp setOpen4={setOpen4} />
            </div>
          </Box>
        </Fade>
      </Modal>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open5}
        onClose={handleClose5}
        closeAfterTransition
      >
        <Fade in={open5}>
          <Box sx={style3}>
            <div>
              <div className="add-div-close-div-user-add">
                <div>
                  <h2 clssName="add_text_only"> Change new Password </h2>
                </div>

                <CloseIcon onClick={() => handleClose5()} />
              </div>

              <ChangePassword setOpen5={setOpen5} />
            </div>
          </Box>
        </Fade>
      </Modal>
    </>
  );
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        elevation={0}
        position="static"
        sx={{ bgcolor: 'white', color: 'black', paddingLeft: '3.7%' }}
      >
        <Toolbar>
          {resize.isMobile ? (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
              onClick={() => handleDrawerOpen()}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            ''
          )}

          {resize.isMobile ? (
            <>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ display: { xs: 'none', sm: 'block', fontWeight: '800' } }}
              >
                श्री दिगम्बर जैन सिद्धक्षेत्र कुण्डलगिरि कुण्डलपुर दमोह (म.प्र.)
              </Typography>
            </>
          ) : (
            <>
              <span
                style={{ marginLeft: open ? '14%' : '0.1%', display: 'flex' }}
              >
                <img
                  src={logoApp}
                  alt=" logoApp"
                  style={{ width: '25px', height: '25px' }}
                />
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{
                    display: { xs: 'none', sm: 'block', fontWeight: '800' },
                    ml: 2,
                  }}
                >
                  श्री दिगम्बर जैन सिद्धक्षेत्र कुण्डलगिरि कुण्डलपुर दमोह
                  (म.प्र.)
                </Typography>
              </span>
            </>
          )}

          <Box sx={{ flexGrow: 1 }} />
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
              onClick={handleClick2}
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Avatar
                // alt={adminuser && adminuser?.adminuser}
                // src={`${backendUrl}uploads/images/${user?.profile_image}`}

                sx={{
                  width: 35,
                  height: 35,
                  marginRight: '11px',
                  marginTop: '5px',
                  marginLeft: '11px',
                }}
              />
              <div
                style={{
                  paddingRight: '1rem',
                  paddingTop: '0.5rem',
                  paddingLeft: '1rem',

                  border: '1px solid gray',

                  paddingBottom: '0.5rem',
                  borderRadius: '5px',
                }}
              >
                <Typography
                  sx={{
                    size: '10px',
                    lineHeight: '17px',
                  }}
                >
                  {empName ? empName : adminName}
                </Typography>
              </div>

              <IconButton size="small" aria-label="more" onClick={handleClick1}>
                <ArrowDropDownOutlinedIcon
                  size="large"
                  sx={{ color: 'gray' }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleClick1}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          width: 1,
          resize,
        }}
      >
        {resize.isMobile ? (
          <MobileDrawar open={open} handleDrawerClose={handleDrawerClose} />
        ) : (
          <DesktopDrawar
            open={open}
            handleDrawerClose={handleDrawerClose}
            handleDrawerOpen={handleDrawerOpen}
          />
        )}

        <Box
          sx={{
            width: {
              xs: '100%',
              sm: `calc(100% - 65px)`,
            },
            marginLeft: 'auto',
          }}
        >
          <Outlet />
        </Box>
      </Box>
      {renderMobileMenu}
      {RenderNotification}
      {renderModal}
    </Box>
  );
};

export default DashboardWrapper;
