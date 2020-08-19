const navBar = document.querySelector(".nav_bar");
const getStarted = document.getElementById("get_started_btn");
const body = document.querySelector("body");
const searchBtn = document.getElementById("search-btn");
const recipeInput = document.getElementById("search-recipe");
const output = document.querySelector(".recipe_display");
const recipeContainer = document.querySelector(".recipes");
const modal = document.querySelector(".modal");
const removeModalBtn = document.querySelector(".remove-modal-btn");

const appId = "87353ef7";
const appKey = "2c4399bd0e2b88e7386422e777baf722";

const url = `https://api.edamam.com/search?`;

searchBtn.addEventListener("click", getRecipes);

async function getRecipes() {
  const res = await fetch(
    `https://cors-anywhere.herokuapp.com/${url}q=${recipeInput.value}&aapp_id=${appId}&app_key=${appKey}&from=0&to=10`
  );
  const data = await res.json();
  console.log(data);
  displayRecipe(data);
  recipeInput.value = "";
  scrollToRecipe();
}

function displayRecipe(data) {
  document.querySelector(
    ".search-header"
  ).innerHTML = `You searched for "${recipeInput.value.toUpperCase()}"`;
  output.innerHTML = `
    ${data.hits
      .map(
        (meal) => `<div class="card" id="${Math.random()}">
        <img src=${meal.recipe.image}>
        <h3>${meal.recipe.label}</h3>
        <p>${meal.recipe.source}</p>
        <button class='more_info btn' data-label="${meal.recipe.label}" data-uri="${meal.recipe.shareAs}">More</button>
      </div>`
      )
      .join("")}
  `;
}

function displayMore(e) {
  const moreBtn = e.target
  if (moreBtn.className === "more_info btn") {
    modal.classList.remove("modal-hide");
    modal.classList.add("modal-visible");
    const label = moreBtn.getAttribute('data-label')
    const meal = moreBtn.getAttribute('data-uri')

    displayRecipeModal(meal);

  }
}

function removeModal() {
  modal.classList.remove("modal-visible");
  modal.classList.add("modal-hide");
  scrollToRecipe();
}

async function displayRecipeModal(recipeUri) {
  const res = await fetch(
    `https://cors-anywhere.herokuapp.com/${recipeUri}`
  );
  const data = await res.json();
  console.log(data)
}

window.onscroll = function () {
  const sticky = navBar.offsetTop;
  if (window.pageYOffset > sticky) {
    navBar.classList.add("sticky");
  } else {
    navBar.classList.remove("sticky");
  }
};

function scrollToRecipe() {
  window.scrollTo(0, 500);
}

recipeContainer.addEventListener("click", displayMore);
removeModalBtn.addEventListener("click", removeModal);
