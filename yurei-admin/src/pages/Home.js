import { useContext, useEffect, useState } from "react";
import { getAnimePosts, getComicPosts, getMemberList } from "../apis";
import Box from "@mui/material/Box";
import { Button, Tab, Tabs, Typography } from "@mui/material";
import {
  getImageURLFromContent,
  getContentFromHTML,
  getContentComicFromHTML,
} from "../utils";
import TabPanel from "../components/TabPanel";
import TableMember from "../components/TableMember";
import TableAnime from "../components/TableAnime";
import { useNavigate } from "react-router-dom";
import {  signOut } from "firebase/auth";
import {auth} from '../utils/firebase';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from "../context";

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
          console.log("Signed out successfully")
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
          <Box sx={{ mb: "40px" }}>
          <Typography
            component="h1"
            sx={{ color: "red", fontWeight: "bold", fontSize: "30px" }}
          >
            Live Actions: {postsLiveAction && postsLiveAction.length}
          </Typography>
          {postsLiveAction ? (
            postsLiveAction.map((item) => (
              <Box
                sx={{
                  borderTop: "10px solid red",
                  borderBottom: "10px solid red",
                  m: "40px 0",
                }}
              >
                <h1 key={item.id}>{item.title}</h1>
                <Typography
                  key={Math.random()}
                  component="img"
                  src={getImageURLFromContent(item.content)}
                  alt="temp_image"
                  width={"300px"}
                ></Typography>
                <Typography component="p" fontWeight={"bold"}>
                  Tên Live Action: {getContentFromHTML(item.content).fullName}
                </Typography>
                <Typography component="p" fontWeight={"bold"}>
                  Số tập: {getContentFromHTML(item.content).fullEpisodes}
                </Typography>
                <Typography component="div" fontWeight={"bold"}>
                  Thể loại:{" "}
                  {getContentFromHTML(item.content).fullCategories.map((cat) => (
                    <Typography component="p" marginLeft={"10px"}>
                      {cat}
                    </Typography>
                  ))}
                </Typography>
                <Typography component="div" fontWeight={"bold"}>
                  Nhân sự:{" "}
                  {getContentFromHTML(item.content).fullStaffs.map((staff) => (
                    <Typography component="p" marginLeft={"10px"}>
                      {staff}
                    </Typography>
                  ))}
                </Typography>
                <Typography component="p" fontWeight={"bold"}>
                  Nội dung: {getContentFromHTML(item.content).fullSummary}
                </Typography>
              </Box>
            ))
          ) : (
            <>Loading...</>
          )}
          </Box>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Box>
          <Typography
            component="h1"
            sx={{ color: "red", fontWeight: "bold", fontSize: "30px" }}
          >
            Comics: {postsComic && postsComic.items.length}
          </Typography>
          {postsComic ? (
            postsComic.items.map((item) => (
              <Box
                sx={{
                  borderTop: "10px solid red",
                  borderBottom: "10px solid red",
                  m: "40px 0",
                }}
              >
                <h1 key={item.id}>{item.title}</h1>
                <Typography
                  key={Math.random()}
                  component="img"
                  src={getImageURLFromContent(item.content)}
                  alt="temp_image"
                  width={"300px"}
                ></Typography>
                <Typography component="p" fontWeight={"bold"}>
                  Số chap: {getContentComicFromHTML(item.content).fullChapters}
                </Typography>
                <Typography component="p" fontWeight={"bold"}>
                  Năm phát hành:{" "}
                  {getContentComicFromHTML(item.content).fullReleaseYear}
                </Typography>
                <Typography marginTop={"10px"} component="p" fontWeight={"bold"}>
                  Nội dung: {getContentComicFromHTML(item.content).fullSummary}
                </Typography>
              </Box>
            ))
          ) : (
            <>Loading...</>
          )}
          </Box>
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
