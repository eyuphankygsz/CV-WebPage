const PAGE_CONTENT_SELECTOR = "#pageContent";
const BUTTON_HOLDER_SELECTOR = "#mainButtonHolder";
const INFO_SELECTOR = ".infoBackground";

const BUTTON_COLORS = {
  BUTTON_BASE_COLOR: "#c23748",
  BUTTON_SELECTED_COLOR: "#811c28",
  BUTTON_BASE_TEXT_COLOR: "#ebf7f6",
  BUTTON_SELECTED_TEXT_COLOR: "#00d9ff",
};
const CONTENT_PAGE_COLORS = {
  PAGE1: "#7ABA78",
  PAGE1_1: "#F7D060",
  PAGE2: "#5272F2",
  PAGE2_1: "#F5C6EC",
  PAGE3: "#8abeb9",
  PAGE3_1: "#FFBE98",
  PAGE4: "#FFDB5C",
  PAGE4_1: "#687EFF",
  PAGE5: "#B5C99A",
  PAGE5_1: "#EEEEEE",
};

const pageContent = document.querySelector(PAGE_CONTENT_SELECTOR);
const buttonHolder = document.querySelector(BUTTON_HOLDER_SELECTOR);
const info = document.querySelector(INFO_SELECTOR);

const arrangeButtons = () => {
  let template = "";
  for (let i = 0; i < buttonHolder.children.length; i++) {
    if (i % 2 == 0) template += "auto ";
    else template += "2px ";
  }
  buttonHolder.style.gridTemplateRows = template;
};
arrangeButtons();

const pages = ["whoAmI", "projects", "skills", "business", "why"];

const copyDiv = (divName, isID, toWhere) => {
  const newDiv = document.createElement("div");
  const oldDiv = document.querySelector((isID ? "#": ".") + divName);
  newDiv.id = divName;
  newDiv.innerHTML = oldDiv.innerHTML;
  newDiv.style.display = "none";
  toWhere.appendChild(newDiv);
  oldDiv.remove();
  return newDiv;
};
const pageDivs = {
  whoAmI: copyDiv(pages[0], true, pageContent),
  projects: copyDiv(pages[1], true, pageContent),
  skills: copyDiv(pages[2], true, pageContent),
  business: copyDiv(pages[3], true, pageContent),
  why: copyDiv(pages[4], true, pageContent),
};
const PAGE_INFO = {
  PAGE1: copyDiv("whoInfo", true, info),
  PAGE2: copyDiv("projectInfo", true, info),
  PAGE3: copyDiv("skillInfo", true, info),
  PAGE4: copyDiv("businessInfo", true, info),
  PAGE5: copyDiv("whyInfo", true, info),
};
let lastPage = "";
let lastInfo = "";
const changePage = (page, pageColor) => {
  if (page != lastPage) {
    if (lastPage != ""){
      pageDivs[lastPage].style.display = "none";
      PAGE_INFO[lastInfo].style.display = "none";
    } 
    pageDivs[page].style.display = "block";
    pageContent.parentElement.style.backgroundColor = CONTENT_PAGE_COLORS[pageColor];
    info.style.backgroundColor = CONTENT_PAGE_COLORS[pageColor + "_1"];
    PAGE_INFO[pageColor].style.display = "block";
    lastPage = page;
    lastInfo = pageColor;
  }
};

const buttonColor = (theButton) => {
  for (let i = 0; i < buttonHolder.children.length; i += 2) {
    const element = buttonHolder.children[i];

    element.style.backgroundColor = BUTTON_COLORS.BUTTON_BASE_COLOR;
    element.style.color = BUTTON_COLORS.BUTTON_BASE_TEXT_COLOR;
    element.style.fontSize = "16px";
    element.children[1].style.width = "35px";
  }
  theButton.style.backgroundColor = BUTTON_COLORS.BUTTON_SELECTED_COLOR;
  theButton.style.color = BUTTON_COLORS.BUTTON_SELECTED_TEXT_COLOR;
  theButton.style.fontSize = "18px";
  theButton.children[1].style.width = "45px";
};
changePage("whoAmI", "PAGE1");
buttonColor(buttonHolder.children[0]);

let pi = 0;
Array.from(buttonHolder.children).forEach((element, index) => {
  if (index % 2 == 0) {
    const pageIndex = pi++;
    element.addEventListener("click", () => {
      changePage(pages[pageIndex], "PAGE" + (pageIndex + 1));
      buttonColor(element);
    });
  }
});
