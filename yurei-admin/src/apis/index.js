import API from "../utils/http";
import axios from "axios";
import { Global } from "../constants";

export const getAnimePosts = async () => {
    try {
      const response = await API.get(`${Global.ANIME_BLOG_ID}/posts`, {
        params: {
            key: Global.API_KEY,
            maxResults: Global.MAX_RESULTS
        }
      });
      let liveActions = response.data.items.filter(item => item.title.includes("Live action"))
      let animes = response.data.items.filter(item => !item.title.includes("Live action"))
      return {animes, liveActions}
    } catch (error) {
      return error;
    }
}

export const getComicPosts = async () => {
    try {
      const response = await API.get(`${Global.COMIC_BLOG_ID}/posts`, {
        params: {
            key: Global.API_KEY,
            maxResults: Global.MAX_RESULTS
        }
      });
      let result = {...response, items: response.data.items.filter(item => !item.title.includes("Chapter"))};
      return result
    } catch (error) {
      return error;
    }
}

export const getPageViews = async () => {
  try {
    const response = await API.get(`${Global.COMIC_BLOG_ID}/pageviews`, {
      params: {
          key: Global.API_KEY,
          range: Global.RANGE
      }
    });
    return response
  } catch (error) {
    return error;
  }
}

export const getMemberList = async (sheetID = 1) => {
  try {
    const response = await axios.get(`https://opensheet.elk.sh/1PrUFQj43Aqpq7UP6InyO-Ez0aHtgpFVVvo9946UXsXY/${sheetID}`);
    return response.data;
  } catch (error) {
    return error;
  }
}
