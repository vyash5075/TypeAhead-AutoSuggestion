import "./styles.css";
import { getSuggestions, debounce } from "./utils";

// let k = getSuggestions("ap");
// k.then((p) => console.log(p));

const inputBox = document.getElementById("search-input");
const suggestionBox = document.getElementById("suggestions-wrapper");

const resetState = () => {
  suggestionBox.style.display = "none";
  suggestionBox.classList.remove("suggestions-visible");
};
const renderDropdownItems = (list) => {
  const suggFragment = document.createDocumentFragment();

  list.forEach((item) => {
    const el = document.createElement("div");
    el.innerHTML = item;
    el.classList.add("dropdown-item");
    el.setAttribute("data-key", item);
    suggFragment.appendChild(el);
  });
  suggestionBox.innerHTML = "";
  suggestionBox.appendChild(suggFragment);
};
// dsf
const handleSearch = async (keyword) => {
  const result = await getSuggestions(keyword);
  if (result.length) {
    suggestionBox.classList.add("suggestions-visible");
    suggestionBox.style.display = "block";
    renderDropdownItems(result);
    //  / suggestionBox.innerHTML = "HEllo";
  } else {
    resetState();
  }
  console.log(result);
};
const handleInputChange = (event) => {
  const value = event.target.value;
  if (value) {
    handleSearch(value);
  } else {
    resetState();
  }
};

const handleSelect = (event) => {
  console.log(event.target.dataset);
  const { key } = event.target.dataset;
  if (key) {
    inputBox.value = key;
    resetState();
  }
};
(() => {
  inputBox.addEventListener("input", debounce(handleInputChange, 500));
  suggestionBox.addEventListener("click", handleSelect);
})();
