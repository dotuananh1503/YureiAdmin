import { Box, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import useGetTopAnimes from "../hooks/useGetTopAnimes";

const Games = () => {
  const [quizData, setQuizData] = useState([]);
  const { results, isDone } = useGetTopAnimes(10);
  useEffect(() => {
    if (isDone) {
      setQuizData(results);
      console.log(quizData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [results, isDone]);

  return (
    <Box>
      {isDone ? (
        results.map((item, index) => (
          <Box key={index}>
            <Typography sx={{ color: "red", fontWeight: 'bold', fontSize: '2rem'}}>{item.title}</Typography>
            <Box sx={{ ml: "2rem" }}>
              {item.characters.map((char, idx) => (
                <Box key={idx}>
                  <Typography fontSize="1.5rem" component="p">
                    {char.name} - {char.gender}
                  </Typography>
                  <Typography component="img" src={char.image} alt="DUMP-IMAGE"/>
                </Box>
              ))}
            </Box>
          </Box>
        ))
      ) : (
        <Box className="flex-center flex-column" sx={{ height: "100%" }}>
          <CircularProgress />
          <Typography marginTop="10px" fontSize="1.5rem" component="p">Đang khởi tạo game...</Typography>
        </Box>
      )}
    </Box>
  );
};

export default Games;
