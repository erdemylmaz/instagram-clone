openShareStoryModalBtn.addEventListener("click", () => {
  shareStoryModal.style.display = "flex";
});

closeShareStoryModal = () => {
  shareStoryModal.style.display = "none";
};

document.addEventListener("click", (e) => {
  if (e.target.className == "share-story-modal") {
    closeShareStoryModal();
  }
});

const storyImageInput = document.querySelector(".story-file-input");
const storyPreviewDiv = document.querySelector(".share-story-preview-div");
const shareStoryBtn = document.querySelector(".share-story-btn");

isFileImage = (file) => {
  return file.type.indexOf("image") != -1;
};

let imageLink;

// get photo from user
storyImageInput.addEventListener("change", () => {
  let file = storyImageInput.files[storyImageInput.files.length - 1];
  let isImage = isFileImage(file);

  if (isImage) {
    const reader = new FileReader();

    reader.addEventListener("load", () => {
      imageLink = reader.result;

      storyPreviewDiv.innerHTML = `<img src=${imageLink}>`;
    });

    reader.readAsDataURL(file);
  }
});

users = JSON.parse(localStorage.getItem("users"));

shareStory = () => {
  if (imageLink) {
    users.map((user) => {
      if (user.id == currentUser.id) {
        user.hasStory = true;
        user.story = {
          imageLink: imageLink,
          publishTime_miliseconds: new Date().getTime(),
          usersWhoSaw: [],
        };

        localStorage.setItem("users", JSON.stringify(users));

        closeShareStoryModal();
      }
    });
  }
};

shareStoryBtn.addEventListener("click", shareStory);
