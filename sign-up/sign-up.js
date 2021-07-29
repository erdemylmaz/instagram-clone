const fullNameInput = document.querySelector(".full-name-input");
const usernameInput = document.querySelector(".username-input");
const passwordInput = document.querySelector(".password-input");
const signUpBtn = document.querySelector(".sign-up-btn");

const showHideBtn = document.querySelector(".show-hide-btn");

let registerFullName;
let registerUsername;
let registerPassword;

fullNameCondition = (name) => {
  if (name.length > 0 && name != "") {
    return true;
  } else {
    return false;
  }
};

usernameCondition = (username) => {
  let results = [];
  users.map((user) => {
    if (user.username == username) {
      results.push("false");
    } else {
      results.push("true");
    }
  });

  if (results.includes("false")) {
    return false;
  } else {
    return true;
  }
};

passwordCondition = (password) => {
  return password.length >= 8 ? true : false;
};

fullNameInput.addEventListener("keyup", () => {
  let availibilityDiv = fullNameInput.nextElementSibling;
  registerFullName = fullNameInput.value;

  if (fullNameCondition(registerFullName)) {
    availibilityDiv.style.color = "black";
    availibilityDiv.innerHTML = `<i class="far fa-check-circle"></i>`;
  } else {
    availibilityDiv.style.color = "rgb(222, 89, 94)";
    availibilityDiv.innerHTML = `<i class="far fa-times-circle"></i>`;
  }

  if (
    ![registerFullName, registerUsername, registerPassword].includes(undefined)
  ) {
    if (
      fullNameCondition(registerFullName) &&
      usernameCondition(registerUsername) &&
      passwordCondition(registerPassword)
    ) {
      signUpBtn.disabled = false;
      signUpBtn.style.filter = "none";
    } else {
      signUpBtn.style.filter = "opacity(0.5)";
      signUpBtn.disabled = true;
    }
  }
});

usernameInput.addEventListener("keyup", () => {
  let availibilityDiv = usernameInput.nextElementSibling;
  registerUsername = usernameInput.value;

  if (usernameCondition(registerUsername)) {
    availibilityDiv.style.color = "black";
    availibilityDiv.innerHTML = `<i class="far fa-check-circle"></i>`;
  } else {
    availibilityDiv.style.color = "rgb(222, 89, 94)";
    availibilityDiv.innerHTML = `<i class="far fa-times-circle"></i>`;
  }

  if (
    ![registerFullName, registerUsername, registerPassword].includes(undefined)
  ) {
    if (
      fullNameCondition(registerFullName) &&
      usernameCondition(registerUsername) &&
      passwordCondition(registerPassword)
    ) {
      signUpBtn.disabled = false;
      signUpBtn.style.filter = "none";
    } else {
      signUpBtn.style.filter = "opacity(0.5)";
      signUpBtn.disabled = true;
    }
  }
});

passwordInput.addEventListener("keyup", () => {
  let availibilityDiv = passwordInput.nextElementSibling;
  registerPassword = passwordInput.value;

  if (registerPassword.length > 0) {
    showHideBtn.style.display = "flex";
  } else {
    showHideBtn.style.display = "none";
  }

  if (passwordCondition(registerPassword)) {
    availibilityDiv.style.color = "black";
    availibilityDiv.innerHTML = `<i class="far fa-check-circle"></i>`;
  } else {
    availibilityDiv.style.color = "rgb(222, 89, 94)";
    availibilityDiv.innerHTML = `<i class="far fa-times-circle"></i>`;
  }

  if (
    ![registerFullName, registerUsername, registerPassword].includes(undefined)
  ) {
    if (
      fullNameCondition(registerFullName) &&
      usernameCondition(registerUsername) &&
      passwordCondition(registerPassword)
    ) {
      signUpBtn.disabled = false;
      signUpBtn.style.filter = "none";
    } else {
      signUpBtn.style.filter = "opacity(0.5)";
      signUpBtn.disabled = true;
    }
  }
});

showHideBtn.addEventListener("click", () => {
  let type = passwordInput.type;

  if (type == "text") {
    passwordInput.type = "password";
  } else if (type == "password") {
    passwordInput.type = "text";
  }
});

signUp = () => {
  users.push({
    fullName: registerFullName,
    username: registerUsername,
    password: registerPassword,
    id: users.length + 1,
    followings: [],
    followers: [],
    likedPosts: [],
    commentedPosts: [],
    sharedPosts: [],
    hasStory: false,
    hasPost: false,
    isNew: true,
    lookedProfiles: [],
    suggestions: [],
    savedPosts: [],
    posts: [],
  });

  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem(
    "loginData",
    JSON.stringify({ isLoggedIn: true, loggedUsername: registerUsername })
  );
};

signUpBtn.addEventListener("click", signUp);
