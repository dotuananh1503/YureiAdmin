import './App.css';
import { useEffect, useState } from 'react';
import { getAnimePosts, getComicPosts, getMemberList } from './apis';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

function App() {
  const [postsAnime, setPostsAnime] = useState()
  const [postsComic, setPostsComic] = useState()
  const [memberList, setMemberList] = useState()

  useEffect(() => {
    getAnimePosts().then(response => setPostsAnime(response))
    getComicPosts().then(response => setPostsComic(response))
    getMemberList().then(response => setMemberList(response))
    console.log(memberList)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <Box>
      <Box sx={{mb: '40px'}}>
        <Typography component="h1" sx={{color: 'red'}}>Animes: {postsAnime && postsAnime.length}</Typography>
        {postsAnime ? postsAnime.items.map(item => <h1 key={item.id}>{item.title}</h1>) : <>Loading...</>} 
      </Box>   
      <Box>
        <Typography component="h1" sx={{color: 'red'}}>Comics: {postsComic && postsComic.length}</Typography>
        {postsComic ? postsComic.items.map(item => <h1 key={item.id}>{item.title}</h1>) : <>Loading...</>} 
      </Box>   
    </Box>
  );
}

export default App;
