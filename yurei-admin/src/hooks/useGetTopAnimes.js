import { useEffect, useState } from "react";

const useGetTopAnimes = (pagesToFetch) => {
  const [resultList, setResultList] = useState([]);
  const [isDone, setIsDone] = useState(false);

  const queryAnimePage = (page) => {
    return `
    {
      Page(page:${page}, perPage:50){
        media (sort:POPULARITY_DESC, isAdult: false, type: ANIME){      
          title {
            english
           	romaji            
          }
          id
          type
          seasonYear
          episodes
          season
          characters(sort:FAVOURITES_DESC, perPage: 10){
            nodes{
              id
              name {
                full
              }
              image{
                large
              }
              gender
              age
            }
          }      
        }	
      }
  }`;
  };

  useEffect(() => {
    const fetchAnimePage = async (page) => {
      try {
        const response = await fetch("https://graphql.anilist.co/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: queryAnimePage(page),
          }),
        });
        const { data } = await response.json();
        const arrayOfAnimes = data.Page.media;
        arrayOfAnimes.forEach((element) => {
          const characterList = element.characters.nodes.map(
            // eslint-disable-next-line array-callback-return
            (elem) => {
              if (elem.image.large !== undefined) {
                const character = {
                  id: elem.id,
                  name: elem.name.full,
                  image: elem.image.large,
                  gender: elem.gender,
                  age: elem.age,
                };
                return character;
              }
            }
          );
          const anime = {
            title: element.title.english || element.title.romaji,
            characters: characterList,
            id: element.id,
            type: element.type,
            seasonYear: element.seasonYear,
            episodes: element.episodes,
            season: element.season
          };
          setResultList((oldArr) => [...oldArr, anime]);
        });
      } catch (error) {
        console.error(error);
      }
    };
    const fetchAllPages = async () => {
      for (let i = 1; i <= pagesToFetch; i++) {
        await fetchAnimePage(i);
      }
      setIsDone(true);
    };
    fetchAllPages();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { results: resultList, isDone: isDone };
};
export default useGetTopAnimes;