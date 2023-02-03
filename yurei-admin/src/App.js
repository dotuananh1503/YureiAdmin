import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { getAnimePosts, getComicPosts, getMemberList } from "./apis";
import "./App.css";
import { ProtectedRoute } from "./components/ProtectedRoute";
import AuthContext from "./context";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { countAnimeByMember, getAllCategories } from "./utils";
import { auth } from "./utils/firebase";


function App() {
  const [user, setUser] = useState({});
  const [categories, setCategories] = useState({});
  const [countAnimeByMem, setCountAnimeByMem] = useState({});
  const [postsLiveAction, setPostsLiveAction] = useState();
  const [postsAnime, setPostsAnime] = useState();
  const [postsComic, setPostsComic] = useState();
  const [memberList, setMemberList] = useState();

  useEffect(() => {
    setUser(auth.currentUser)
    getAnimePosts().then((response) => {
      setPostsLiveAction(response.liveActions);
      setPostsAnime(response.animes);
      setCategories(getAllCategories(response.animes))
      setCountAnimeByMem(countAnimeByMember(response.animes))
    });
    getComicPosts().then((response) => setPostsComic(response));
    getMemberList().then((response) => setMemberList(response));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider
      value={{
        userInfo: user,
        totalCountCategories: categories,
        countAnimeByMember: countAnimeByMem,
        animes: postsAnime,
        liveActions: postsLiveAction,
        comics: postsComic,
        members: memberList
      }}
    >
      <Box sx={{ width: "100vw", height: "100vh" }}>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Box>
    </AuthContext.Provider>
  );
}

export default App;
