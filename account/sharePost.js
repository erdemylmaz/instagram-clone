users = JSON.parse(localStorage.getItem("users"));

const postInput = document.querySelector(".select-post-input");
const postTextInput = document.querySelector(".share-post-text-input");
const postPreviewDiv = document.querySelector(".share-post-preview");

const postModal = document.querySelector(".share-post-modal");
const closeModalBtn = document.querySelector(".close-share-post-modal-btn");

const sharePostBtn = document.querySelector(".share-post-btn");

closeModal = () => {
  postModal.style.display = "none";
};

let hasPhoto = false;
let postImageLink;

isFileImage = (file) => {
  return file.type.indexOf("image") != -1;
};

postInput.addEventListener("change", () => {
  let file = postInput.files[postInput.files.length - 1];

  let isImage = isFileImage(file);

  if (isImage) {
    const reader = new FileReader();

    reader.addEventListener("load", () => {
      postImageLink = reader.result;

      postPreviewDiv.innerHTML = `<img class="post-preview-img" src=${postImageLink}>`;
      hasPhoto = true;
    });

    reader.readAsDataURL(file);
  }
});

addExtraZero = (number) => {
  return number < 10 ? "0" + number : number;
};

sharePost = () => {
  if (hasPhoto) {
    users.map((usr) => {
      if (user.username == usr.username) {
        let d = new Date();
        let date = [
          addExtraZero(d.getMonth() + 1),
          addExtraZero(d.getDate()),
          d.getFullYear(),
        ].join(".");

        usr.hasPost = true;
        usr.posts.push({
          publishTime: d.getTime(),
          publishDate: date,
          hasText: postTextInput.value != "",
          text: "" || postTextInput.value,
          postImageLink: postImageLink,
          likeCount: 0,
          commentCount: 0,
          shareCount: 0,
          comments: [],
          likedUsers: [],
        });

        console.log(usr.posts[usr.posts.length - 1]);

        postModal.style.display = "none";
        localStorage.setItem("users", JSON.stringify(users));

        location.reload();
      }
    });
  }
};

sharePostBtn.addEventListener("click", sharePost);

// close modal
closeModalBtn.addEventListener("click", () => {
  closeModal();
});
document.addEventListener("click", (e) => {
  if (e.target.className == "share-post-modal") {
    closeModal();
  }
});
