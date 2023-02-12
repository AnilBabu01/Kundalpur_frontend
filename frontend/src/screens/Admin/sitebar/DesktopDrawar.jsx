import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FeedbackIcon from '@mui/icons-material/Feedback';
import HelpIcon from '@mui/icons-material/Help';
import InterestsIcon from '@mui/icons-material/Interests';
import PublicIcon from '@mui/icons-material/Public';
import SellIcon from '@mui/icons-material/Sell';
import StorefrontIcon from '@mui/icons-material/Storefront';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Box, Typography } from '@mui/material';
// import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from 'react-router-dom';
import logo from './logo.jpeg';
import logo1 from './logo1.jpeg';
import side1 from './side1.jpeg';
import side2 from './side2.jpeg';
import side3 from './side3.jpeg';
import side4 from './side4.jpeg';
import side5 from './side5.jpeg';
import side6 from './side6.jpeg';
import ExpandLess from '@mui/icons-material/ExpandLess';

const drawerWidth = '17%';

const openedMixin = (theme) => ({
  width: drawerWidth,
  minWidth: '240px',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));
const StyledListItemButton = styled(ListItemButton)(() => ({
  '&.Mui-selected': {
    '&::before': {
      content: '""',
      position: 'absolute',
      left: 0,
      top: 13,
      bottom: 0,
      background: '#44ce42',
      height: '24px',
      width: '4px',
    },
    backgroundColor: '#fff !important',
  },
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

const DesktopDrawar = ({ open, handleDrawerClose, handleDrawerOpen }) => {
  const stylesag = {
    listActive: {
      '&::before': {
        content: '""',
        position: 'absolute',
        left: 0,
        top: 13,
        bottom: 0,
        background: '#44ce42',
        height: '24px',
        width: '4px',
      },
      backgroundColor: '#fff !important',
    },
    ListText: {
      '&.MuiListItemText-root': {
        fontFamily: "'Nunito', sans-serif !important",
        fontWeight: 600,
        lineHeight: '20px',
      },
    },
    DrawerSecTitle: {
      textAlign: 'left',
      marginLeft: '25px !important',
      fontSize: '13px !important',
      color: 'rgb(111, 126, 140)',
      fontFamily: "'Nunito', sans-serif !important",
      textTransform: 'uppercase',
      fontWeight: 400,
      padding: '5px 0px',
    },
    ListButtonIcon: {
      transform: 'rotate(90deg)',
      transition: 'all 0.2s ease-out !important',
    },
    ListinBtnclose: {
      transform: 'rotate(0deg)',
      transition: 'all 0.2s ease-out !important',
    },
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  };

  const navigate = useNavigate();
  const [openedTab, setOpenedTab] = React.useState(0); // for opening subtabs
  const [activeTabId, setActiveTabId] = React.useState(1); // for showing tab as active
  const navigationTabs = [
    {
      id: 1,
      name: 'Masters',
      active: false,
      icon: <img src={side2} style={{ width: '25px' }} />,
      subTabs: [
        {
          id: 1.1,
          name: 'Masters',
          link: 'master',
          active: false,
          icon: <StorefrontIcon />,
          subTabs: [],
        },
        {
          id: 1.2,
          name: 'Other Masters',
          link: 'sellAccount',
          active: false,
          icon: <SellIcon />,
          subTabs: [],
        },
      ],
    },
    {
      id: 2,
      name: 'Donation',
      active: false,
      icon: <img src={side6} style={{ width: '25px' }} />,
      subTabs: [
        {
          id: 2.1,
          name: 'Donation',
          link: 'donation',
          active: false,
          icon: <StorefrontIcon />,
          subTabs: [],
        },
        {
          id: 2.2,
          name: 'Manual Donation',
          link: 'manualdonation',
          active: false,
          icon: <SellIcon />,
          subTabs: [],
        },
      ],
    },
    {
      id: 3,
      name: 'System',
      active: false,
      icon: <img src={side5} style={{ width: '25px' }} />,
      subTabs: [
        {
          id: 3.1,
          name: 'User Management',
          link: 'usermanagement',
          active: false,
          icon: <PublicIcon />,
          subTabs: [],
        },
        {
          id: 3.2,
          name: 'Role Management',
          link: 'rolemanagement',
          active: false,
          icon: <AccountBalanceIcon />,
          subTabs: [],
        },
        {
          id: 3.3,
          name: 'Generate Voucher',
          link: 'vouchermanagement',
          active: false,
          icon: <AccountBalanceIcon />,
          subTabs: [],
        },
        {
          id: 3.4,
          name: 'Assign Voucher',
          link: 'assign',
          active: false,
          icon: <AccountBalanceIcon />,
          subTabs: [],
        },
      ],
    },
  ];

  const navigationTabs1 = [
    {
      id: 4,
      name: 'Reports',
      active: false,
      icon: <img src={side3} style={{ width: '25px' }} />,
      subTabs: [
        {
          id: 4.1,
          name: 'Manual Report',
          link: 'manualreports',
          active: false,
          icon: <PublicIcon />,
          subTabs: [],
        },
        {
          id: 4.2,
          name: 'Consolidated Cash',
          link: 'consolidated/report',
          active: false,
          icon: <AccountBalanceIcon />,
          subTabs: [],
        },
        {
          id: 4.3,
          name: 'Head Donation',
          link: 'head/report',
          active: false,
          icon: <AccountBalanceIcon />,
          subTabs: [],
        },
        {
          id: 4.4,
          name: 'Donations Report',
          link: 'reports/allreport',
          active: false,
          icon: <AccountBalanceIcon />,
          subTabs: [],
        },
        {
          id: 4.5,
          name: 'Cash',
          link: 'reports/manualcash',
          active: false,
          icon: <AccountBalanceIcon />,
          subTabs: [],
        },
        {
          id: 4.6,
          name: 'Electronic',
          link: 'reports/electronic',
          active: false,
          icon: <AccountBalanceIcon />,
          subTabs: [],
        },
        {
          id: 4.7,
          name: 'Cheque',
          link: 'reports/manualcheque',
          active: false,
          icon: <AccountBalanceIcon />,
          subTabs: [],
        },
        {
          id: 4.8,
          name: 'Item',
          link: 'reports/manualitem',
          active: false,
          icon: <AccountBalanceIcon />,
          subTabs: [],
        },

        {
          id: 4.9,
          name: 'Cheque donation',
          link: 'reports/cheque',
          active: false,
          icon: <AccountBalanceIcon />,
          subTabs: [],
        },
        {
          id: 5.1,
          name: 'Online donation',
          link: 'reports/online',
          active: false,
          icon: <AccountBalanceIcon />,
          subTabs: [],
        },
      ],
    },
    {
      id: 5,
      name: 'Dharamshala',
      active: false,
      icon: <img src={side4} style={{ width: '25px' }} />,
      subTabs: [
        {
          id: 5.1,
          name: 'Dharamshala',
          link: 'promdoion',
          active: false,
          icon: <PublicIcon />,
          subTabs: [],
        },

        {
          id: 5.3,
          name: 'Category',
          link: 'sponsodrhip',
          active: false,
          icon: <AccountBalanceIcon />,
          subTabs: [],
        },
        {
          id: 5.4,
          name: 'Facilities',
          link: 'sponsodrip',
          active: false,
          icon: <AccountBalanceIcon />,
          subTabs: [],
        },
        {
          id: 5.4,
          name: 'Room',
          link: 'sponsodrip',
          active: false,
          icon: <AccountBalanceIcon />,
          subTabs: [],
        },
      ],
    },

    {
      id: 6,
      name: 'Room Booking',
      active: false,
      icon: <img src={side4} style={{ width: '25px' }} />,
      subTabs: [
        {
          id: 6.1,
          name: 'Checkin',
          link: 'promdon',
          active: false,
          icon: <PublicIcon />,
          subTabs: [],
        },

        {
          id: 6.3,
          name: 'Hold',
          link: 'sponship',
          active: false,
          icon: <AccountBalanceIcon />,
          subTabs: [],
        },
        {
          id: 6.4,
          name: 'Room Shift',
          link: 'sponsodrip',
          active: false,
          icon: <AccountBalanceIcon />,
          subTabs: [],
        },
        {
          id: 6.4,
          name: 'Room',
          link: 'sponsodrip',
          active: false,
          icon: <AccountBalanceIcon />,
          subTabs: [],
        },
      ],
    },
  ];
  return (
    <Drawer
      variant="permanent"
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: '#F1DAC6',
        },
      }}
    >
      <DrawerHeader>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
        >
          {open ? (
            <>
              <img
                src={logo1}
                style={{
                  width: '180px',
                  height: '50px',
                  borderRadius: '50%',
                }}
                alt="Logo"
              />
              <IconButton onClick={handleDrawerClose}>
                <CloseIcon htmlColor="#8e94a9" />
              </IconButton>
            </>
          ) : (
            <>
              <div style={{ display: 'flex', flexDirection: 'column-reverse' }}>
                <img
                  src={logo}
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                  }}
                  alt="Logo"
                />
                <IconButton onClick={handleDrawerOpen}>
                  <ArrowForwardIosIcon htmlColor="#8e94a9" />
                </IconButton>
              </div>
            </>
          )}
        </Box>
      </DrawerHeader>
      <Divider />
      <List>
        <ListItem disablePadding sx={{ display: 'block' }}>
          <Tooltip title="Dashbord">
            <StyledListItemButton
              selected={activeTabId === 0}
              onClick={() => {
                setActiveTabId(0);
                handleDrawerClose();
                navigate('/admin-panel/dashboard');
              }}
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.2,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <img src={side1} style={{ width: '25px' }} />
              </ListItemIcon>
              <ListItemText
                classes={{ root: stylesag.ListText }}
                primary="Dashboard"
                sx={{ opacity: open ? 1 : 0, ml: 1 }}
              />
            </StyledListItemButton>
          </Tooltip>
        </ListItem>
        <Divider style={{ padding: '5px 0px' }} />

        {/* Navigation Tabs from here */}

        {navigationTabs.map((Tab, i) => (
          <React.Fragment key={i}>
            <StyledListItemButton
              selected={Tab.id === activeTabId}
              onClick={() => {
                setActiveTabId(Tab.id);
                setOpenedTab(openedTab === Tab.id ? 0 : Tab.id);
              }}
            >
              <ListItemIcon>{Tab.icon}</ListItemIcon>
              <ListItemText primary={Tab.name} />

              {Tab.id === activeTabId && openedTab !== 0 ? (
                <ExpandLess />
              ) : (
                <ChevronRightIcon />
              )}
            </StyledListItemButton>

            <Collapse in={Tab.id === openedTab} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {Tab.subTabs.map((subTab, index) => (
                  <React.Fragment key={index}>
                    <StyledListItemButton
                      selected={subTab.id === activeTabId}
                      onClick={() => {
                        navigate('/admin-panel/' + subTab.link);
                        setActiveTabId(subTab.id);
                      }}
                      sx={{ pl: 4 }}
                    >
                      <ListItemIcon>{subTab.icon}</ListItemIcon>
                      <ListItemText primary={subTab.name} />
                    </StyledListItemButton>
                  </React.Fragment>
                ))}
              </List>
            </Collapse>
          </React.Fragment>
        ))}
      </List>

      <ListItem disablePadding sx={{ display: 'block' }}>
        <StyledListItemButton
          selected={activeTabId === 7}
          onClick={() => {
            setActiveTabId(7);
            navigate('/admin-panel/donatedusers');
            handleDrawerClose();
          }}
          sx={{
            minHeight: 48,
            justifyContent: open ? 'initial' : 'center',
            px: 2,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : 'auto',
              justifyContent: 'center',
            }}
          >
            <img src={side6} style={{ width: '25px' }} />
          </ListItemIcon>
          <ListItemText
            classes={{ root: stylesag.ListText }}
            primary="Donated user"
            sx={{ opacity: open ? 1 : 0, ml: 1 }}
          />
        </StyledListItemButton>
      </ListItem>
      <List>
        {/* Navigation Tabs from here */}

        {navigationTabs1.map((Tab, i) => (
          <React.Fragment key={i}>
            <StyledListItemButton
              selected={Tab.id === activeTabId}
              onClick={() => {
                setActiveTabId(Tab.id);
                setOpenedTab(openedTab === Tab.id ? 0 : Tab.id);
              }}
            >
              <ListItemIcon>{Tab.icon}</ListItemIcon>
              <ListItemText primary={Tab.name} />

              {Tab.id === activeTabId && openedTab !== 0 ? (
                <ExpandLess />
              ) : (
                <ChevronRightIcon />
              )}
            </StyledListItemButton>

            <Collapse in={Tab.id === openedTab} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {Tab.subTabs.map((subTab, index) => (
                  <React.Fragment key={index}>
                    <StyledListItemButton
                      selected={subTab.id === activeTabId}
                      onClick={() => {
                        navigate('/admin-panel/' + subTab.link);
                        setActiveTabId(subTab.id);
                      }}
                      sx={{ pl: 4 }}
                    >
                      <ListItemIcon>{subTab.icon}</ListItemIcon>
                      <ListItemText primary={subTab.name} />
                    </StyledListItemButton>
                  </React.Fragment>
                ))}
              </List>
            </Collapse>
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  );
};

export default DesktopDrawar;
