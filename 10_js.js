let userArticleCount = 0;

window.addEventListener("DOMContentLoaded", () => {
  const filterForm = document.getElementById("filterContent");
  if (filterForm) filterForm.style.display = "none";

  const newForm = document.getElementById("newContent");
  if (newForm) newForm.style.display = "none";

  filterArticles();
});

function showFilter() {
  const filterForm = document.getElementById("filterContent");
  const newForm = document.getElementById("newContent");

  newForm.style.display = "none";

  filterForm.style.display =
    filterForm.style.display === "none" || filterForm.style.display === ""
      ? "block"
      : "none";
}

function showAddNew() {
  const filterForm = document.getElementById("filterContent");
  const newForm = document.getElementById("newContent");

  filterForm.style.display = "none";

  newForm.style.display =
    newForm.style.display === "none" || newForm.style.display === ""
      ? "flex"
      : "none";
}

function filterArticles() {
  const showOpinion = document.getElementById("opinionCheckbox")?.checked ?? true;
  const showRecipe = document.getElementById("recipeCheckbox")?.checked ?? true;
  const showUpdate = document.getElementById("updateCheckbox")?.checked ?? true;

  document.querySelectorAll("#articleList article").forEach((article) => {
    const isOpinion = article.classList.contains("opinion");
    const isRecipe = article.classList.contains("recipe");
    const isUpdate = article.classList.contains("update");

    let shouldShow = true;

    if (isOpinion && !showOpinion) shouldShow = false;
    if (isRecipe && !showRecipe) shouldShow = false;
    if (isUpdate && !showUpdate) shouldShow = false;

    article.style.display = shouldShow ? "" : "none";
  });
}

function addNewArticle() {
  const titleEl = document.getElementById("inputHeader");
  const textEl = document.getElementById("inputArticle");

  const title = titleEl.value.trim();
  const text = textEl.value.trim();

  const opinionRadio = document.getElementById("opinionRadio");
  const recipeRadio = document.getElementById("recipeRadio");
  const lifeRadio = document.getElementById("lifeRadio");

  let typeClass = "";
  let typeLabel = "";

  if (opinionRadio.checked) {
    typeClass = "opinion";
    typeLabel = "Opinion";
  } else if (recipeRadio.checked) {
    typeClass = "recipe";
    typeLabel = "Recipe";
  } else if (lifeRadio.checked) {
    typeClass = "update";
    typeLabel = "Update";
  }

  if (!title || !text || !typeClass) {
    alert("Please enter a title, choose a type, and enter article text.");
    return;
  }

  const articleList = document.getElementById("articleList");

  userArticleCount++;

  const article = document.createElement("article");
  article.className = typeClass;
  article.id = `user${typeClass}${userArticleCount}`;

  const marker = document.createElement("span");
  marker.className = "marker";
  marker.textContent = typeLabel;

  const h2 = document.createElement("h2");
  h2.textContent = title;

  const pText = document.createElement("p");
  pText.textContent = text;

  const pLink = document.createElement("p");
  const a = document.createElement("a");
  a.href = "moreDetails.html";
  a.textContent = "Read more...";
  pLink.appendChild(a);

  article.appendChild(marker);
  article.appendChild(h2);
  article.appendChild(pText);
  article.appendChild(pLink);

  articleList.appendChild(article);

  filterArticles();

  titleEl.value = "";
  textEl.value = "";
  opinionRadio.checked = false;
  recipeRadio.checked = false;
  lifeRadio.checked = false;
}
