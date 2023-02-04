import { Tab, Tabs, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useContext, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../components/Header";
import TableAnime from "../components/TableAnime";
import TableComic from "../components/TableComic";
import TableLiveAction from "../components/TableLiveAction";
import TableMember from "../components/TableMember";
import TabPanel from "../components/TabPanel";
import AuthContext from "../context";

function Home() {
  const authContext = useContext(AuthContext);
  const [value, setValue] = useState(0);

  const a11yProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Header />
      <Box width={"80%"} margin="0 auto">
        <Typography
          component="h1"
          fontSize="3rem"
          marginBottom="20px"
          textAlign="center"
        >
          Hệ thống quản lý tài nguyên Yurei
        </Typography>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              sx={{ "& button": { fontWeight: "bold", fontSize: "1.5rem" } }}
              variant="fullWidth"
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Anime" {...a11yProps(0)} />
              <Tab label="Live Action" {...a11yProps(1)} />
              <Tab label="Comic" {...a11yProps(2)} />
              <Tab label="Nhân sự" {...a11yProps(3)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <TableAnime />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <TableLiveAction />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <TableComic />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <TableMember data={authContext.members} />
          </TabPanel>
        </Box>
        <ToastContainer />
      </Box>
    </>
  );
}

export default Home;
