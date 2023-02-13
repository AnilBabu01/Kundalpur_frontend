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
import NotificationsIcon from '@mui/icons-material/Notifications';
import { ListItemButton } from '@mui/material';
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
      <MenuItem onClick={() => navigate('/admin-panel/masters/signature')}>
        <ListItemIcon>
          <UploadIcon fontSize="small" />
        </ListItemIcon>
        Upload signature
      </MenuItem>
      <MenuItem onClick={() => navigate('/changepassword')}>
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

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        elevation={0}
        position="static"
        sx={{ bgcolor: 'white', color: 'black', paddingLeft: '2.3%' }}
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
                sx={{ display: { xs: 'none', sm: 'block' } }}
              >
                Donation
              </Typography>
            </>
          ) : (
            <>
              <img
                src={logoApp}
                alt=" logoApp"
                style={{ width: '25px', height: '25px' }}
              />
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ display: { xs: 'none', sm: 'block' }, ml: 2 }}
              >
                Donation
              </Typography>

              {open && (
                <span style={{ marginLeft: '4.5%', display: 'flex' }}>
                  <img
                    src={logoApp}
                    alt=" logoApp"
                    style={{ width: '25px', height: '25px' }}
                  />
                  <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ display: { xs: 'none', sm: 'block' }, ml: 2 }}
                  >
                    Donation
                  </Typography>
                </span>
              )}
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
              <Typography
                sx={{
                  size: '10px',
                  lineHeight: '17px',
                }}
              >
                {empName ? empName : adminName}
              </Typography>
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
    </Box>
  );
};

export default DashboardWrapper;
