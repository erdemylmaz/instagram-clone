users = JSON.parse(localStorage.getItem("users"));

headerSearchInput.addEventListener("click", () => {
  let inputText = headerSearchInputDiv.querySelector(".input-text");
  headerCancelBtn.style.display = "block";
  searchResults.style.display = "block";

  inputText.innerHTML = `<i class="fas fa-search"></i>`;
  inputText.style.width = "32px";
  inputText.style.textAlign = "center";
  headerSearchInput.style.width = "calc(100% - 32px)";
  headerSearchInput.style.marginLeft = "32px";
  headerSearchInput.placeholder = "Search";

  headerSearchInputDiv.style.justifyContent = "flex-start";
});

resetSearchInput = () => {
  let inputText = headerSearchInputDiv.querySelector(".input-text");
  headerCancelBtn.style.display = "none";

  headerSearchInput.value = "";

  inputText.innerHTML = `<i class="fas fa-search"></i> Search`;
  inputText.style.width = "auto";
  inputText.style.textAlign = "center";
  headerSearchInput.style.width = "100%";
  headerSearchInput.style.marginLeft = "0";
  headerSearchInput.placeholder = "";

  headerSearchInputDiv.style.justifyContent = "center";

  searchResults.style.display = "none";
};

headerCancelBtn.addEventListener("click", () => {
  resetSearchInput();
});

document.addEventListener("click", (e) => {
  if (!e.target.classList.contains("search-child")) {
    resetSearchInput();
  }
});

let currentUsername = JSON.parse(
  localStorage.getItem("loginData")
).loggedUsername;

function searchUser() {
  let value = headerSearchInput.value;
  searchResults.innerHTML = ``;
  let searchResult = [];

  users.map((user) => {
    let username = user.username;
    let name = user.fullName;

    searchResults.style.display = "block";

    if (
      (username.indexOf(value) == 0 || name.indexOf(value) == 0) &&
      user.username != currentUsername
    ) {
      let div = document.createElement("a");
      div.setAttribute("href", `./user/user.html`);
      // div.setAttribute("href", `http://www.tech-e.tech/instagram/user/user.html`); etc.
      div.setAttribute("data-user", JSON.stringify(user));
      div.className = "search-result search-child";

      div.innerHTML = `
	  <div class="search-user-img">${
      user.hasProfilePhoto
        ? `<img class="searched-user-img" src=${user.imageLink}>`
        : `<i class="far fa-user-circle"></i>`
    }</div>
	  <div class="search-user-info">
		  <div class="search-user-username">${user.username}</div>
		  <div class="search-user-name">${user.fullName}</div>
	  </div>
	  `;

      searchResult.push(user);

      searchResults.appendChild(div);

      div.addEventListener("click", () => {
        localStorage.setItem("viewingUser", JSON.stringify(user));
      });
    }
  });

  if (searchResult.length == 0) {
    searchResults.style.display = "flex";
    searchResults.style.justifyContent = "center";
    searchResults.style.alignItems = "center";

    let noResult = document.createElement("div");
    noResult.className = "no-result search-child";

    noResult.innerHTML = `No results found.`;

    noResult.style.display = "flex";
    searchResults.appendChild(noResult);
  }
}

headerSearchInput.addEventListener("keyup", searchUser);
