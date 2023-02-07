//import { Box, CircularProgress, Typography } from "@mui/material";
import { Box, Button, Input } from "@mui/material";
import { useEffect, useState } from "react";
import { useTimer } from "react-timer-hook";
import shuffle from "shuffle-array";
import { savePlayerScores } from "../apis";
import HeaderGame from "../components/HeaderGame";
import Footer from "../components/Footer";
import useGetTopAnimes from "../hooks/useGetTopAnimes";

//const playerNameInStore = localStorage.getItem("playerName");

const Games = () => {
  const rng = (max) => {
    return Math.floor(Math.random() * max);
  };
  const PAGES_TO_GET = 5;
  const [playerName, setPlayerName] = useState(
    localStorage.getItem("playerName") || ""
  );
  const [playerIndex, setPlayerIndex] = useState(0);
  const [finalScore, setFinalScore] = useState(0);
  const [showName, setShowName] = useState(true);
  const [animeList, setAnimeList] = useState();
  const correctAnime = animeList && animeList[playerIndex];
  const [correctChoiceIndex, setCorrectChoiceIndex] = useState();
  const [characterIndex, setCharacterIndex] = useState(() => rng(5));
  const correctCharacter =
    correctAnime && correctAnime.characters[characterIndex];

  const [displayedChoices, setDisplayedChoices] = useState();
  const [wrongChoices, setWrongChoices] = useState();
  const [wrongChoiceDone, setWrongChoiceDone] = useState(false);

  const [charactersAlreadySeen, setCharactersAlreadySeen] = useState([]);

  const randomizeChoices = () => {
    setWrongChoices(shuffle(shuffle.pick(animeList, { picks: 3 })));
    setCharacterIndex(rng(5));
    setWrongChoiceDone(false);
  };

  const stringSimilarity = require("string-similarity");
  useEffect(() => {
    // prevent repeating seen characters
    const answerIsDupe = () => {
      return charactersAlreadySeen.includes(correctCharacter.id);
    };
    const containsBannedCharacters = () => {
      return correctCharacter.id === 36309; // character id for Narrator
    };
    // if the anime name is too similar to the real answer, probably a sequel - mark it as a duplicate to prevent confusion
    // there should be no animes that contain the correct character (prevent ambiguity among answers)
    const containsDupes = (animes) => {
      let foundDupe = false;
      animes.forEach((anime) => {
        if (anime.id === correctAnime.id) foundDupe = true;

        if (
          stringSimilarity.compareTwoStrings(anime.title, correctAnime.title) >=
          0.5
        )
          foundDupe = true;

        // console.log(anime.title + ", " + correctAnime.title);

        anime.characters.forEach((character) => {
          if (character.id === correctCharacter.id) {
            foundDupe = true;
          }
        });
      });
      return foundDupe;
    };
    if (wrongChoices) {
      if (!wrongChoiceDone) {
        if (
          containsDupes(wrongChoices) ||
          answerIsDupe() ||
          containsBannedCharacters()
        ) {
          randomizeChoices();
          console.warn("dupe problem");
        } else {
          // insert the correct answer from 0 to 3
          const correctIndex = rng(4);
          const choicesWithAnswerMixedIn = wrongChoices;
          choicesWithAnswerMixedIn.splice(correctIndex, 0, correctAnime);
          setCorrectChoiceIndex(correctIndex);
          setWrongChoiceDone(true);
          setDisplayedChoices(wrongChoices);

          setCharactersAlreadySeen([
            ...charactersAlreadySeen,
            correctCharacter.id,
          ]);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wrongChoices]);

  const fetchResults = useGetTopAnimes(PAGES_TO_GET);
  const fetchingList = fetchResults.results;
  const doneFetching = fetchResults.isDone;
  const [doneShuffling, setDoneShuffling] = useState(false);

  const shuffleAnimeList = async () => {
    setAnimeList(shuffle(fetchingList, { copy: true }));
  };

  // every time animeList updates, if it is different from what is being fetched, we know that it is done shuffling
  useEffect(() => {
    if (animeList) {
      animeList.forEach((val, idx) => {
        if (fetchingList[idx].id !== val.id) {
          setDoneShuffling(true);
          randomizeChoices();
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animeList]);

  useEffect(() => {
    // done getting all animes
    if (doneFetching) {
      shuffleAnimeList();
      myTimer.resume();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doneFetching]);

  const nextCharacter = () => {
    setPlayerIndex(playerIndex + 1);
    setFinalScore(finalScore + 100);
  };
  useEffect(() => {
    if (doneShuffling) randomizeChoices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerIndex]);

  const [correctIndicator, setCorrectIndicator] = useState();
  const onChoose = (chosenIndex) => {
    // @ts-ignore
    document.activeElement.blur();

    if (chosenIndex === correctChoiceIndex) {
      addTime(3);
      showCorrectIndicator();
      nextCharacter();
    } else {
      gameOver();
      setCorrectIndicator("INCORRECT, the answer was: " + correctAnime.title);
      savePlayerScores("Scores.json", playerName, finalScore);
    }
  };

  const [numTimeouts, setNumTimeouts] = useState(0);
  const showCorrectIndicator = () => {
    setCorrectIndicator("CORRECT! + 3 seconds");
    setNumTimeouts(numTimeouts + 1);
    // hide after 2 seconds (but account for the case when the player gets multiple correct within 2 seconds)
    setTimeout(() => {
      // console.log(numTimeouts);
      if (numTimeouts === 1) {
        setCorrectIndicator("");
      }
      setNumTimeouts(numTimeouts - 1);
    }, 2000);
  };

  const gameOver = () => {
    setIsGameOver(true);
    localStorage.setItem("playerScore", finalScore);
  };

  const timesUp = () => {
    gameOver();
  };

  const STARTING_TIME = 30; // in seconds

  const addTime = (secondsToAdd) => {
    myTimer.restart(
      new Date().getTime() + secondsRemaining * 1000 + secondsToAdd * 1000
    );
  };

  const myTimer = useTimer({
    expiryTimestamp: new Date().getTime() + 1000 * STARTING_TIME,
    onExpire: timesUp,
  });
  const secondsRemaining = myTimer.minutes * 60 + myTimer.seconds;

  const resetTimer = () => {
    myTimer.restart(new Date().getTime() + 1000 * STARTING_TIME);
  };

  useEffect(() => {
    myTimer.start();
    myTimer.pause();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [isGameOver, setIsGameOver] = useState(false);

  const resetGame = () => {
    //let playerScore = localStorage.getItem("playerScore") || 0;
    setIsGameOver(false);
    resetTimer();
    setPlayerIndex(0);
    setFinalScore(0);
    shuffleAnimeList();
    setCorrectIndicator("");
    //savePlayerScores("Scores.json", playerName, playerScore);
  };

  const isPlural = (num) => {
    return num !== 1;
  };

  const handleChangePlayerName = (e) => {
    setPlayerName(e.target.value);
  };

  const handleSaveName = (e) => {
    localStorage.setItem("playerName", playerName);
    setShowName(false);
  };

  return (
    <div>
      <HeaderGame />
      {!localStorage.getItem("playerName") && showName ? (
        <Box>
          <Input
            value={playerName}
            placeholder="Please enter a name"
            onChange={handleChangePlayerName}
          />
          <Button
            sx={{
              display: "block",
              mt: "20px",
              borderImage: "linear-gradient(to right, darkblue, darkorchid) 1",
            }}
            onClick={handleSaveName}
            variant="contained"
            color="primary"
          >
            Save
          </Button>
        </Box>
      ) : (
        <Box>
          <Button
            onClick={() => {
              setShowName(true);
              localStorage.removeItem("playerName");
            }}
          >
            Change Your Name
          </Button>
        </Box>
      )}
      {isGameOver ? (
        <div>
          <div>Game Over!</div>
          <img src={correctCharacter.image} alt=""></img>
          <div>
            This character is <strong>{correctCharacter.name}</strong> from{" "}
            <strong>{correctAnime.title}</strong>
          </div>
          <p>Your Score: {finalScore}</p>
          <Button
            variant="outlined"
            sx={{
              color: "#bf1520",
              borderImage: "linear-gradient(to right, darkblue, darkorchid) 1",
            }}
            onClick={() => resetGame()}
          >
            Play Again
          </Button>
        </div>
      ) : !correctCharacter ? (
        <Box>
          <strong>Please wait...</strong>
          <p>
            Loading the top {fetchingList.length} / {PAGES_TO_GET * 50}{" "}
            animes...
          </p>
        </Box>
      ) : (
        <>
          <img src={correctCharacter.image} alt=""></img>
          <div>Your Score: {finalScore}</div>
          <div style={{ color: secondsRemaining < 10 && "red" }}>
            {myTimer.isRunning
              ? (myTimer.minutes > 0
                  ? myTimer.minutes +
                    (isPlural(myTimer.minutes) ? " minutes " : " minute ")
                  : "") +
                (myTimer.seconds +
                  (isPlural(myTimer.seconds) ? " seconds " : " second ") +
                  "remaining")
              : "Time's up"}
          </div>
          <div>This character is from...</div>
          <Box sx={{ width: "700px" }}>
            {displayedChoices &&
              displayedChoices.map((item, idx) => {
                return (
                  <Button
                    variant="outlined"
                    sx={{
                      color: "#bf1520",
                      width: "350px!important",
                      height: "100px!important",
                      borderImage:
                        "linear-gradient(to right, darkblue, darkorchid) 1",
                    }}
                    key={idx}
                    onClick={() => onChoose(idx)}
                  >
                    {item.title}
                  </Button>
                );
              })}
          </Box>
          <div>{correctIndicator}</div>
          {/* {correctChoiceIndex}
          {correctCharacter.name} */}
        </>
      )}
      <Footer />
    </div>
  );
};

export default Games;
