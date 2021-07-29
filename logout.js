logOut = () => {
  accountMenu.style.display = "none";
  let loginData = JSON.parse(localStorage.getItem("loginData"));

  username = "";
  localStorage.removeItem("loginData");

  loginScreen.style.display = "block";
  instagramScreen.style.display = "none";
  header.style.display = "none";
  navbar.style.display = "none";
};

logOutBtn.addEventListener("click", logOut);
