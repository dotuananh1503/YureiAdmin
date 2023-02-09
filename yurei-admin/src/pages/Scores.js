import { Box, Typography } from "@mui/material";
import { ref, onValue } from "firebase/database";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import HeaderGame from "../components/HeaderGame";
import ReactPlayer from 'react-player/youtube';
import { db } from "../utils/firebase";

const Scores = () => {
  const [topScores, setTopScores] = useState();

  useEffect(() => {
    const DbRef = ref(db, "Scores");

    onValue(DbRef, (snapshot) => {
      let records = [];
      snapshot.forEach((child) => {
        let id = child.key;
        let value = child.val();
        records.push({ id, value });
      });
      records.sort((a,b) => b.value.playerScores - a.value.playerScores);
      setTopScores(records);
    });
  }, []);

  return (
    <Box sx={{ display: "flex", height: "100%", flexDirection: "column" }}>
      <HeaderGame />
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <ReactPlayer url='https://www.youtube.com/watch?v=xXw_2_Rre70' controls/>
        <Box
          sx={{
            textAlign: "center",
            fontSize: "2rem",
            mb: "20px",
            fontWeight: "bold",
            textTransform: "uppercase",
            background: "linear-gradient(to right, #30CFD0, #330867)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          TOP SCORES:{" "}
        </Box>
        <Box
          className="flex-center flex-column"
          sx={{
            border: "3px solid black",
            width: "50%",
            p: "20px",
            mb: "30px",
            borderImage: "linear-gradient(to right, #5C258D, #4389A2) 1",
          }}
        >
          {topScores ? (
            topScores.map((score, index) => (
              <Box
                key={score.id}
                fontSize="2rem"
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "400px",
                }}
              >
                <Box>
                  {index + 1}. {score.value.playerName}
                </Box>
                <Box>{score.value.playerScores}</Box>
              </Box>
            ))
          ) : (
            <Typography>No records!!!!</Typography>
          )}
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default Scores;
