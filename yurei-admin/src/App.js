import "./App.css";
import { useEffect, useState } from "react";
import { getAnimePosts, getComicPosts, getMemberList } from "./apis";
import Box from "@mui/material/Box";
import { Tab, Tabs, Typography } from "@mui/material";
import {
  getImageURLFromContent,
  getContentFromHTML,
  getContentComicFromHTML,
} from "./utils";
import TabPanel from "./components/TabPanel";

function App() {
  const [postsAnime, setPostsAnime] = useState();
  const [postsLiveAction, setPostsLiveAction] = useState();
  const [postsComic, setPostsComic] = useState();
  const [memberList, setMemberList] = useState();
  const [value, setValue] = useState(0);

  useEffect(() => {
    getAnimePosts().then((response) => {
      setPostsAnime(response.animes);
      setPostsLiveAction(response.liveActions);
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

  return (
    <Box width={"60%"} margin="0 auto">
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
          <Box sx={{ mb: "40px" }}>
          <Typography
            component="h1"
            sx={{ color: "red", fontWeight: "bold", fontSize: "30px" }}
          >
            Animes: {postsAnime && postsAnime.length}
          </Typography>
          {postsAnime ? (
            postsAnime.map((item) => (
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
                  Tên Anime: {getContentFromHTML(item.content).fullName}
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
          <Box>
          <Typography
            component="h1"
            sx={{ color: "red", fontWeight: "bold", fontSize: "30px" }}
          >
            Members: {memberList && memberList.length}
          </Typography>
          {memberList ? (
            memberList.map((item) => (
              <h1 key={Math.random()}>Nickname: {item["Nickname"]} - Team: {item["Team"]} - Vị trí: {item["Vị trí"]}</h1>
            ))
          ) : (
            <>Loading...</>
          )}
          </Box>
        </TabPanel>
      </Box>

    </Box>
  );
}

export default App;
