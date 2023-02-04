import { members } from "../constants/members";

export const getImageURLFromContent = (html) => {
  let template = document.createElement("template");
  template.innerHTML = html;
  let anchor = template.content.querySelector("a[href]");
  return anchor.href;
};

export const getContentFromHTML = (html) => {
  let template = document.createElement("template");
  template.innerHTML = html;
  let fullSummary = [...template.content.querySelectorAll("p.text-italic")]
    .map((item) => item.innerText)
    .join("");
  let fullName = template.content.querySelectorAll("b")[1].innerText;
  let fullEpisodes = [...template.content.querySelectorAll("span[style]")].find(
    (item) => item.innerHTML.includes('style="color: #e61038;"')
  ).innerText;
  let fullCategories = [
    ...template.content.querySelectorAll("span.anime-span"),
  ].map((item) => item.innerText);
  let fullStaffs = [...template.content.querySelectorAll("li")].map(
    (item) => item.innerText
  );
  let isComplete = template.content.querySelectorAll(".anime-episodes-complete")
  let isDropped = template.content.querySelectorAll(".anime-episodes-drop")
  let isOngoing = template.content.querySelectorAll(".anime-episodes")
  let fullStatus;
  if(isComplete.length > 0){
    fullStatus = [...template.content.querySelectorAll(".anime-episodes-complete")].map(item => item.innerText)
  }
  else if(isDropped.length>0){
    fullStatus = [...template.content.querySelectorAll(".anime-episodes-drop")].map(item => item.innerText)
  }
  else if(isOngoing.length>0){
    fullStatus = [...template.content.querySelectorAll(".anime-episodes")].map(item => item.innerText)
  }
  let final = {
    fullName,
    fullSummary,
    fullEpisodes,
    fullCategories,
    fullStaffs,
    fullStatus
  };
  return final;
};

export const getContentComicFromHTML = (html) => {
  let template = document.createElement("template");
  template.innerHTML = html;
  let fullSummary =
    template.content.querySelectorAll("p#synopsis")[0].innerText;
  let fullChapters = [
    ...template.content.querySelectorAll(".y6x11p"),
  ][0].innerText.split(" ")[1];
  let fullReleaseYear = [
    ...template.content.querySelectorAll(".y6x11p"),
  ][1].innerText.split(" ")[3];
  let fullAuthors;
  let temp = [...template.content.querySelectorAll(".y6x11p")].map(
    (item) => item.innerText
  ).slice(2);
  if(temp.length === 3){
    fullAuthors = temp.slice(0,2)
    fullAuthors[0] = fullAuthors[0].replace("Tác giả 1", "").trim()
    fullAuthors[1] = fullAuthors[1].replace("Tác giả 2", "").trim()
  } else if(temp.length === 2){
    fullAuthors = temp.slice(0,1)
    fullAuthors[0] = fullAuthors[0].replace("Tác giả", "").trim()
  }
  let fullArtists = temp[temp.length - 1];
  fullArtists = fullArtists.replace("Họa sĩ", "").trim()
  let final = { fullSummary, fullChapters, fullReleaseYear, fullArtists, fullAuthors };
  return final;
};

export const getLabelComic = (labels) => {
  let fullScores = labels[0]
  let fullTags = labels.slice(1)

  return {
    fullScores,
    fullTags
  }
}

export const getAllCategories = (animes) => {
  let allCategories = []
  let result = new Set()
  let totalCount = {}
  animes.forEach(item => {
    let temp = getContentFromHTML(item.content).fullCategories
    allCategories.push(temp);
    allCategories.forEach(cat => {
      cat.forEach(c => result.add(c))
    })
  })
  result.forEach(c => {
    let total = animes.filter(a => a.content.includes(c))
    totalCount[c] = total.length
  })
  return totalCount; 
}

export const countAnimeByMember = (animes) => {
  let totalCount = {}
  members.forEach(m => {
    let total = animes.filter(a => a.content.includes(m))
    totalCount[m] = total.length
  })
  return totalCount; 
}
