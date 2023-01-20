import { Button, Tab, Tabs, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { signOut } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { getAnimePosts, getComicPosts, getMemberList } from "../apis";
import TableAnime from "../components/TableAnime";
import TableComic from "../components/TableComic";
import TableLiveAction from "../components/TableLiveAction";
import TableMember from "../components/TableMember";
import TabPanel from "../components/TabPanel";
import AuthContext from "../context";
import { auth } from '../utils/firebase';

function Home() {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const [postsLiveAction, setPostsLiveAction] = useState();
  const [postsAnime, setPostsAnime] = useState();
  const [postsComic, setPostsComic] = useState();
  const [memberList, setMemberList] = useState();
  const [value, setValue] = useState(0);

  useEffect(() => {
    getAnimePosts().then((response) => {
      setPostsLiveAction(response.liveActions);
      setPostsAnime(response.animes);
    });
    getComicPosts().then((response) => setPostsComic(response));
    getMemberList().then((response) => setMemberList(response));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const a11yProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
 
  const handleLogout = () => {               
      signOut(auth).then(() => {
      // Sign-out successful.
          localStorage.removeItem('access_token');
          navigate("/login");
      }).catch((error) => {
      // An error happened.
      });
  }

  return (
    <Box width={"80%"} margin="0 auto">
      <Typography>Xin chào: {authContext.userInfo ? authContext.userInfo.email : ""}</Typography>
      <Button onClick={handleLogout}>Sign out</Button>
      <Typography component="h1" fontSize="3rem" marginBottom="20px">Hệ thống quản lý tài nguyên Yurei</Typography>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs sx={{"& button": {fontWeight: 'bold', fontSize: '1.5rem'}}} variant="fullWidth" value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Anime" {...a11yProps(0)} />
            <Tab label="Live Action" {...a11yProps(1)} />
            <Tab label="Comic" {...a11yProps(2)} />
            <Tab label="Nhân sự" {...a11yProps(3)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <TableAnime data={postsAnime}/>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <TableLiveAction data={postsLiveAction}/>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <TableComic data={postsComic}/>
        </TabPanel>
        <TabPanel value={value} index={3}>
          <TableMember data={memberList}/>
        </TabPanel>
      </Box>
      <ToastContainer />
    </Box>
  );
}

export default Home;
