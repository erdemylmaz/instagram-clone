usernameInput.addEventListener("keyup", (e) => {
  if (usernameInput.value.length > 0) {
    usernamePlaceholder.style.top = "0";
    usernamePlaceholder.style.fontSize = "10px";
  } else {
    usernamePlaceholder.style.top = "auto";
    usernamePlaceholder.style.fontSize = "14px";
  }

  if (passwordInput.value.length >= 8 && usernameInput.value.length > 0) {
    loginBtn.disabled = false;
    loginBtn.style.filter = "none";
  } else {
    loginBtn.disabled = true;
    loginBtn.style.filter = "opacity(0.5)";
  }
});

passwordInput.addEventListener("keyup", () => {
  if (passwordInput.value.length > 0) {
    passwordPlaceholder.style.top = "0";
    passwordPlaceholder.style.fontSize = "10px";
    showHidePasswordBtn.style.display = "flex";
  } else {
    passwordPlaceholder.style.top = "auto";
    passwordPlaceholder.style.fontSize = "14px";
    showHidePasswordBtn.style.display = "none";
  }

  if (passwordInput.value.length >= 8 && usernameInput.value.length > 0) {
    loginBtn.disabled = false;
    loginBtn.style.filter = "none";
  } else {
    loginBtn.disabled = true;
    loginBtn.style.filter = "opacity(0.5)";
  }
});

showHidePassword = () => {
  let type = passwordInput.type;

  if (type == "password") {
    passwordInput.type = "text";
  } else if (type == "text") {
    passwordInput.type = "password";
  }
};

showHidePasswordBtn.addEventListener("click", showHidePassword);

function logIn(e) {
  e.preventDefault();

  console.log(users);

  users.map((user) => {
    // if (user.username != usernameInput.value) {
    //   errorDiv.innerHTML = `Sorry, there is no account.`;
    //   errorDiv.style.display = "flex";

    //   setTimeout(() => {
    //     errorDiv.style.display = "none";
    //   }, 5000);
    // }

    if (
      user.username == usernameInput.value &&
      user.password != passwordInput.value
    ) {
      console.log(123);
      errorDiv.innerHTML = `Sorry, your password was incorrect. <br> Please double-check your password.`;
      errorDiv.style.display = "flex";

      setTimeout(() => {
        errorDiv.style.display = "none";
      }, 5000);
    }

    if (
      user.username == usernameInput.value &&
      user.password == passwordInput.value
    ) {
      username = user.username;

      loginScreen.style.display = "none";
      instagramScreen.style.display = "block";
      navbar.style.display = "block";
      header.style.display = "flex";

      initUser(user);

      localStorage.setItem(
        "loginData",
        JSON.stringify({ isLoggedIn: true, loggedUsername: username })
      );

      location.reload();
    }
  });

  if (users.length == 0) {
    errorDiv.innerHTML = `Sorry, there is no account.`;
    errorDiv.style.display = "flex";

    setTimeout(() => {
      errorDiv.style.display = "none";
    }, 5000);
  }
}

if (localStorage.getItem("loginData")) {
  let loginData = JSON.parse(localStorage.getItem("loginData"));

  if (loginData.isLoggedIn) {
    username = loginData.loggedUsername;

    loginScreen.style.display = "none";
    navbar.style.display = "block";
    header.style.display = "flex";
    instagramScreen.style.display = "block";

    let user = users.find((user) => user.username == username);

    initUser(user);
  }
}

loginBtn.addEventListener("click", logIn);
