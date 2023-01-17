import './App.css';
import { useEffect, useState } from 'react';
import { getAnimePosts, getComicPosts } from './apis';
import Box from '@mui/material/Box';

function App() {
  const [postsAnime, setPostsAnime] = useState()
  const [postsComic, setPostsComic] = useState()

  useEffect(() => {
    getAnimePosts().then(response => setPostsAnime(response))
    getComicPosts().then(response => setPostsComic(response))
  }, [])
  return (
    <Box>
      <Box sx={{mb: '40px'}}>
        <h1 style={{color: 'red'}}>Animes: {postsAnime && postsAnime.length}</h1>
        {postsAnime ? postsAnime.items.map(item => <h1 key={item.id}>{item.title}</h1>) : <>Loading...</>} 
      </Box>   
      <Box>
        <h1 style={{color: 'red'}}>Comics: {postsComic && postsComic.length}</h1>
        {postsComic ? postsComic.items.map(item => <h1 key={item.id}>{item.title}</h1>) : <>Loading...</>} 
      </Box>   
    </Box>
  );
}

export default App;
