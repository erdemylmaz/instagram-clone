let user = users.find((user) => user.username == username);

let loginData;

if (localStorage.getItem("loginData")) {
  loginData = JSON.parse(localStorage.getItem("loginData"));
}

if (user && user.isNew && loginData != undefined) {
  newUserModal.style.display = "flex";
} else {
  newUserModal.style.display = "none";
}

const imagePreviev = document.querySelector(".user-profile-photo");
const fileInput = document.querySelector(".file-input");

isImage = (file) => {
  return `${file.type}`.indexOf("image") != -1;
};

let pp = [];

fileInput.addEventListener("change", (e) => {
  let file = e.target.files[0];

  if (isImage(file)) {
    const reader = new FileReader();

    reader.addEventListener("load", (event) => {
      pp.push(reader.result);
      imagePreviev.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
});

setProfilePicture = () => {
  let ppLink = pp[pp.length - 1];

  users.map((usr) => {
    if (usr.username == user.username) {
      usr.hasProfilePhoto = true;
      usr.imageLink = ppLink;
      usr.isNew = false;
    }
  });

  localStorage.setItem("users", JSON.stringify(users));

  newUserModal.style.display = "none";

  location.reload();
  initUser(user);
};

setPPBtn.addEventListener("click", setProfilePicture);

closeNumBtn.addEventListener("click", () => {
  newUserModal.style.display = "none";

  users.map((usr) => {
    if (usr.username == user.username) {
      usr.isNew = false;

      localStorage.setItem("users", JSON.stringify(users));
    }
  });
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("new-user-modal")) {
    newUserModal.style.display = "none";

    users.map((usr) => {
      if (usr.username == user.username) {
        usr.isNew = false;

        localStorage.setItem("users", JSON.stringify(users));
      }
    });
  }
});
