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
import React, { useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from 'react-router-dom';

import f1 from '../../../assets/f1.png';
import f2 from '../../../assets/f2.png';
import f3 from '../../../assets/f3.png';
import f4 from '../../../assets/f4.png';
import f5 from '../../../assets/f5.png';
import f6 from '../../../assets/f6.png';
import logo1 from '../../../assets/logo1.png';
import croppedlogo from '../../../assets/croppedlogo.png';
import ExpandLess from '@mui/icons-material/ExpandLess';
import image19 from '../../../assets/image19.png';
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
  const [activeTabId, setActiveTabId] = React.useState(0); // for showing tab as active
  const [userrole, setuserrole] = React.useState('');
  const navigationTabs = [];

  const navigationreportTabs = [
    {
      id: 4,
      name: 'Reports',
      active: false,
      icon: <img src={f2} alt="f2" style={{ width: '25px' }} />,
      subTabs: [
        {
          id: 4.6,
          name: 'All Reports',
          link: 'allreport/allhead',
          active: false,
          icon: <img src={f4} alt="f2" style={{ width: '25px' }} />,
          subTabs: [],
        },
        {
          id: 4.5,
          name: 'Donation',
          link: 'electronic/report/cash',
          active: false,
          icon: <img src={f4} alt="f2" style={{ width: '25px' }} />,
          subTabs: [],
        },
        {
          id: 4.1,
          name: 'Manual Donation',
          link: 'manual/report/cash',
          active: false,
          icon: <img src={f4} alt="f2" style={{ width: '25px' }} />,
          subTabs: [],
        },
        {
          id: 4.9,
          name: 'Online donation',
          link: 'online/report/online',
          active: false,
          icon: <img src={f4} alt="f2" style={{ width: '25px' }} />,
          subTabs: [],
        },
      ],
    },
  ];

  const navigationEmpTabs = [
    {
      id: 1,
      name: 'Donation',
      active: false,
      icon: <img src={f4} alt="f4" style={{ width: '25px' }} />,
      subTabs: [
        {
          id: 1.1,
          name: 'Donation',
          link: 'donation',
          active: false,
          icon: <StorefrontIcon />,
          subTabs: [],
        },
        {
          id: 1.2,
          name: 'Manual Donation',
          link: 'manualdonation',
          active: false,
          icon: <SellIcon />,
          subTabs: [],
        },
      ],
    },
  ];
  const navigationTabs1 = [
    {
      id: 2,
      name: 'Donation',
      active: false,
      icon: <img src={f4} alt="f4" style={{ width: '25px' }} />,
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
  ];

  const navigationEmpTabs1 = [
    {
      id: 4,
      name: 'Reports',
      active: false,
      icon: <img src={f2} alt="f2" style={{ width: '25px' }} />,
      subTabs: [
        {
          id: 4.5,
          name: 'Donation',
          link: 'electronic/report/cash',
          active: false,
          icon: <img src={f4} alt="f2" style={{ width: '25px' }} />,
          subTabs: [],
        },
        {
          id: 4.1,
          name: 'Manual Donation',
          link: 'manual/report/cash',
          active: false,
          icon: <img src={f4} alt="f2" style={{ width: '25px' }} />,
          subTabs: [],
        },
        {
          id: 4.9,
          name: 'Online donation',
          link: 'online/report/online',
          active: false,
          icon: <img src={f4} alt="f2" style={{ width: '25px' }} />,
          subTabs: [],
        },
      ],
    },
  ];
  useEffect(() => {
    setuserrole(Number(sessionStorage.getItem('userrole')));
  }, []);

  return (
    <Drawer
      variant="permanent"
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: '#F1DAC6',
        },
      }}
      onMouseMove={() => handleDrawerOpen()}
      onMouseOut={() => handleDrawerClose()}
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
                src={croppedlogo}
                style={{
                  width: '180px',
                  height: '50px',
                  borderRadius: '50%',
                  marginRight: '20%',
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
                  src={logo1}
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
          <Tooltip title="Dashbord" placement="left-end">
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
                <img src={f6} alt="f6" style={{ width: '25px' }} />
              </ListItemIcon>
              <ListItemText
                classes={{ root: stylesag.ListText }}
                primary="Dashboard"
                sx={{ opacity: open ? 1 : 0, ml: 0.8 }}
              />
            </StyledListItemButton>
          </Tooltip>
          {userrole === 1 && (
            <>
              <Tooltip title="System" placement="left-end">
                <StyledListItemButton
                  selected={activeTabId === 20}
                  onClick={() => {
                    setActiveTabId(20);
                    handleDrawerClose();
                    navigate('/admin-panel/usermanagement');
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
                    <img src={f3} alt="f6" style={{ width: '25px' }} />
                  </ListItemIcon>
                  <ListItemText
                    classes={{ root: stylesag.ListText }}
                    primary="System"
                    sx={{ opacity: open ? 1 : 0, ml: 0.8 }}
                  />
                </StyledListItemButton>
              </Tooltip>
            </>
          )}
        </ListItem>
        <Divider style={{ padding: '5px 0px' }} />

        {/* Admin Navigation Tabs */}

        {userrole === 1
          ? navigationTabs.map((Tab, i) => (
              <React.Fragment key={i}>
                <Tooltip title={Tab.name} placement="left-end">
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
                </Tooltip>

                <Collapse
                  in={Tab.id === openedTab}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {Tab.subTabs.map((subTab, index) => (
                      <React.Fragment key={index}>
                        <Tooltip title={subTab.name} placement="left-end">
                          <StyledListItemButton
                            selected={subTab.id === activeTabId}
                            onClick={() => {
                              navigate('/admin-panel/' + subTab.link);
                              setActiveTabId(subTab.id);
                              handleDrawerClose();
                            }}
                            sx={{ pl: 4 }}
                          >
                            <ListItemIcon>{subTab.icon}</ListItemIcon>
                            <ListItemText primary={subTab.name} />
                          </StyledListItemButton>
                        </Tooltip>
                      </React.Fragment>
                    ))}
                  </List>
                </Collapse>
              </React.Fragment>
            ))
          : navigationEmpTabs.map((Tab, i) => (
              <React.Fragment key={i}>
                <Tooltip title={Tab.name} placement="left-end">
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
                </Tooltip>

                <Collapse
                  in={Tab.id === openedTab}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {Tab.subTabs.map((subTab, index) => (
                      <React.Fragment key={index}>
                        <Tooltip title={subTab?.name} placement="left-end">
                          <StyledListItemButton
                            selected={subTab.id === activeTabId}
                            onClick={() => {
                              navigate('/admin-panel/' + subTab.link);
                              setActiveTabId(subTab.id);
                              handleDrawerClose();
                            }}
                            sx={{ pl: 4 }}
                          >
                            <ListItemIcon>{subTab.icon}</ListItemIcon>
                            <ListItemText primary={subTab.name} />
                          </StyledListItemButton>
                        </Tooltip>
                      </React.Fragment>
                    ))}
                  </List>
                </Collapse>
              </React.Fragment>
            ))}
        {userrole === 1 && (
          <>
            <ListItem disablePadding sx={{ display: 'block' }}>
              <Tooltip title="Masters" placement="left-end">
                <StyledListItemButton
                  selected={activeTabId === 9}
                  onClick={() => {
                    setActiveTabId(9);
                    handleDrawerClose();
                    navigate('/admin-panel/masters');
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
                    <img src={f5} alt="f5" style={{ width: '25px' }} />
                  </ListItemIcon>
                  <ListItemText
                    classes={{ root: stylesag.ListText }}
                    primary="Masters"
                    sx={{ opacity: open ? 1 : 0, ml: 0.8 }}
                  />
                </StyledListItemButton>
              </Tooltip>
            </ListItem>
          </>
        )}

        {userrole === 1 && (
          <>
            <ListItem disablePadding sx={{ display: 'block' }}>
              <Tooltip title="Masters" placement="left-end">
                <StyledListItemButton
                  selected={activeTabId === 10}
                  onClick={() => {
                    setActiveTabId(10);
                    handleDrawerClose();
                    navigate('/admin-panel/Dharamshala');
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
                    <img src={f1} alt="f5" style={{ width: '25px' }} />
                  </ListItemIcon>
                  <ListItemText
                    classes={{ root: stylesag.ListText }}
                    primary="Dharamshala"
                    sx={{ opacity: open ? 1 : 0, ml: 0.8 }}
                  />
                </StyledListItemButton>
              </Tooltip>
            </ListItem>
          </>
        )}

        {userrole === 1
          ? navigationTabs1.map((Tab, i) => (
              <React.Fragment key={i}>
                <Tooltip title={Tab?.name} placement="left-end">
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
                </Tooltip>

                <Collapse
                  in={Tab.id === openedTab}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {Tab.subTabs.map((subTab, index) => (
                      <React.Fragment key={index}>
                        <Tooltip title={subTab?.name} placement="left-end">
                          <StyledListItemButton
                            selected={subTab.id === activeTabId}
                            onClick={() => {
                              navigate('/admin-panel/' + subTab.link);
                              setActiveTabId(subTab.id);
                              handleDrawerClose();
                            }}
                            sx={{ pl: 4 }}
                          >
                            <ListItemIcon>{subTab.icon}</ListItemIcon>
                            <ListItemText primary={subTab.name} />
                          </StyledListItemButton>
                        </Tooltip>
                      </React.Fragment>
                    ))}
                  </List>
                </Collapse>
              </React.Fragment>
            ))
          : navigationEmpTabs1.map((Tab, i) => (
              <React.Fragment key={i}>
                <Tooltip title={Tab?.name} placement="left-end">
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
                </Tooltip>

                <Collapse
                  in={Tab.id === openedTab}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {Tab.subTabs.map((subTab, index) => (
                      <React.Fragment key={index}>
                        <Tooltip title={subTab?.name} placement="left-end">
                          <StyledListItemButton
                            selected={subTab.id === activeTabId}
                            onClick={() => {
                              navigate('/admin-panel/' + subTab.link);
                              setActiveTabId(subTab.id);
                              handleDrawerClose();
                            }}
                            sx={{ pl: 4 }}
                          >
                            <ListItemIcon>{subTab.icon}</ListItemIcon>
                            <ListItemText primary={subTab.name} />
                          </StyledListItemButton>
                        </Tooltip>
                      </React.Fragment>
                    ))}
                  </List>
                </Collapse>
              </React.Fragment>
            ))}
      </List>

      <ListItem disablePadding sx={{ display: 'block' }}>
        <Tooltip title="Masters" placement="left-end">
          <StyledListItemButton
            selected={activeTabId === 11}
            onClick={() => {
              setActiveTabId(11);
              handleDrawerClose();
              navigate('/admin-panel/roombooking');
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
              <img src={f1} alt="f5" style={{ width: '25px' }} />
            </ListItemIcon>
            <ListItemText
              classes={{ root: stylesag.ListText }}
              primary="Room Booking"
              sx={{ opacity: open ? 1 : 0, ml: 0.8 }}
            />
          </StyledListItemButton>
        </Tooltip>
      </ListItem>
      {/* {userrole === 1 && (
        <>
          <ListItem disablePadding sx={{ display: 'block' }}>
            <Tooltip title="donated users" placement="left-end">
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
                  <img src={f4} alt="f3" style={{ width: '25px' }} />
                </ListItemIcon>
                <ListItemText
                  classes={{ root: stylesag.ListText }}
                  primary="Donated user"
                  sx={{ opacity: open ? 1 : 0, ml: 1 }}
                />
              </StyledListItemButton>
            </Tooltip>
          </ListItem>
        </>
      )} */}

      <List>
        {userrole === 1
          ? navigationreportTabs.map((Tab, i) => (
              <React.Fragment key={i}>
                <Tooltip title={Tab?.name} placement="left-end">
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
                </Tooltip>

                <Collapse
                  in={Tab.id === openedTab}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {Tab.subTabs.map((subTab, index) => (
                      <React.Fragment key={index}>
                        <Tooltip title={subTab?.name} placement="left-end">
                          <StyledListItemButton
                            selected={subTab.id === activeTabId}
                            onClick={() => {
                              navigate('/admin-panel/' + subTab.link);
                              setActiveTabId(subTab.id);
                              handleDrawerClose();
                            }}
                            sx={{ pl: 4 }}
                          >
                            <ListItemIcon>{subTab.icon}</ListItemIcon>
                            <ListItemText primary={subTab.name} />
                          </StyledListItemButton>
                        </Tooltip>
                      </React.Fragment>
                    ))}
                  </List>
                </Collapse>
              </React.Fragment>
            ))
          : ''}
      </List>
    </Drawer>
  );
};

export default DesktopDrawar;
