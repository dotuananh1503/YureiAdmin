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
  let final = {
    fullName,
    fullSummary,
    fullEpisodes,
    fullCategories,
    fullStaffs,
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
//   let fullAuthors = [...template.content.querySelectorAll(".y6x11p")].filter(
//     (item) => item.innerText.includes("Tác giả")
//   );
//   console.log(fullAuthors);
  let final = { fullSummary, fullChapters, fullReleaseYear };
  return final;
};
