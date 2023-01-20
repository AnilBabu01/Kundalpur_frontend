import React, { useEffect } from "react";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import UserMaster from "./Usermaster/UserMaster";
import DonationMaster from "./Donationmaster/DonationMaster";
import RoomMaster from "./RoomMaster/RoomMaster";
import IntemMaster from "./Itemmaster/IntemMaster";
import ReceiptMater from "./Receiptmaster/ReceiptMater";
import "./MasterTap.css";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function MasterTap({ setopendashboard }) {
  useEffect(() => {
    setopendashboard(true);
  }, []);

  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <>
      {" "}
      <div className="dashboarddiv">
        <Box sx={{ bgcolor: "background.paper" }}>
          <AppBar position="static">
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="secondary"
              textColor="inherit"
              variant="fullWidth"
              aria-label="full width tabs example"
              style={{ background: "#e96d00" }}
            >
              <Tab label="User Master" {...a11yProps(0)} />
              <Tab label="Donation Type Master" {...a11yProps(1)} />
              <Tab label="Donation Item Master" {...a11yProps(2)} />
              <Tab label="Receipt Master" {...a11yProps(3)} />
              {/* <Tab label="Room Master" {...a11yProps(2)} /> */}
            </Tabs>
          </AppBar>
          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel value={value} index={0} dir={theme.direction}>
              <UserMaster />
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              <DonationMaster />
            </TabPanel>
            <TabPanel value={value} index={2} dir={theme.direction}>
              <IntemMaster />
            </TabPanel>
            <TabPanel value={value} index={3} dir={theme.direction}>
              <ReceiptMater />
            </TabPanel>
            {/* <TabPanel value={value} index={2} dir={theme.direction}>
              <RoomMaster />
            </TabPanel> */}
          </SwipeableViews>
        </Box>
      </div>
    </>
  );
}
