// things
openAccountModal = (e) => {
  e.preventDefault();
  if (accountMenu.classList.contains("active")) {
    accountMenu.classList.remove("active");
    accountMenu.style.display = "none";

    accountIcon.style.padding = "0px";
    accountIcon.style.border = "1px solid #fff";
  } else {
    accountMenu.classList.add("active");
    accountMenu.style.display = "block";

    accountIcon.style.border = "1px solid black";
    accountIcon.style.borderRadius = "50%";
  }
};

accountIcon.addEventListener("click", openAccountModal);

headerUserImg.addEventListener("click", openAccountModal);

document.addEventListener("click", (e) => {
  if (
    !e.target.classList.contains("account-menu-item") &&
    e.target != accountIcon &&
    !e.target.classList.contains("account-img")
  ) {
    accountMenu.classList.remove("active");
    accountMenu.style.display = "none";

    accountIcon.style.padding = "0px";
    accountIcon.style.border = "1px solid #fff";
  }
});
