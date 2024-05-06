const PAGE_CONTENT_SELECTOR = "#pageContent";
const BUTTON_HOLDER_SELECTOR = "#mainButtonHolder";

const buttonHolder = document.querySelector(BUTTON_HOLDER_SELECTOR);

const arrangeButtons = () => {
  let template = "";
  for (let i = 0; i < buttonHolder.children.length; i++) {
    if (i % 2 == 0) template += "auto ";
    else template += "2px ";
  }
  buttonHolder.style.gridTemplateRows = template;
};
arrangeButtons();


const changePage = (page) => {
    const pageContent = document.querySelector(PAGE_CONTENT_SELECTOR);
    console.log(page);
    pageContent.replaceChild(selectPage(page),pageContent.children[0]);
};
const selectPage = (page) => {
    const newPage = document.createElement("div");
    newPage.classList.add(page);
    return newPage;
};

const pages = ["whoAmI", "projects", "skills", "business", "why"];

let pi = 0;
Array.from(buttonHolder.children).forEach((element, index) => {
    if(index % 2 == 0){
        const pageIndex = pi++;
        element.addEventListener("click", () => changePage(pages[pageIndex]));
    }
}); 