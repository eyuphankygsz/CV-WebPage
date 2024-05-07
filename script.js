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

const pages = ["whoAmI", "projects", "skills", "business", "why"];

const copyDivHtml = (divName, classIndex) => {
  const newDiv = document.createElement("div");
  const oldDiv = document.querySelector("#" + pages[classIndex]);
  const pageContent = document.querySelector("#pageContent");

  newDiv.classList.add(pages[classIndex]);
  newDiv.innerHTML = oldDiv.innerHTML;
  newDiv.style.display = "none";
  pageContent.appendChild(newDiv);
  oldDiv.remove();

  return newDiv;
}
const pageDivs = {
    whoAmI: copyDivHtml("#whoAmI", 0),
    projects: copyDivHtml("#projects", 1),
    skills: copyDivHtml("#skills", 2),
    business: copyDivHtml("#business", 3),
    why: copyDivHtml("#why", 4)
};

let lastPage = "";
const changePage = (page) => {
  if(page != lastPage){
    if(lastPage != "")
    pageDivs[lastPage].style.display = "none";
    pageDivs[page].style.display = "block";
    lastPage = page;
  }
};
changePage("whoAmI");



let pi = 0;
Array.from(buttonHolder.children).forEach((element, index) => {
    if(index % 2 == 0){
        const pageIndex = pi++;
        element.addEventListener("click", () => changePage(pages[pageIndex]));
    }
}); 

