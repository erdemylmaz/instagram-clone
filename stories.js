users = JSON.parse(localStorage.getItem("users"));

username = JSON.parse(localStorage.getItem("loginData")).loggedUsername;

let currentUser = users.find((user) => user.username == username);

const storiesList = document.querySelector(".stories-list");
let bigStories = document.querySelectorAll(".big-story");
let storyTimeDivs = document.querySelectorAll(".story-time-div");

let currentIndex = localStorage.getItem("storyIndex");

initPreview = (div) => {
  div.classList.remove("story-active");
};

initStory = (div) => {
  div.classList.add("story-active");
};

initStories = (currentIndex) => {
  let stories = document.querySelectorAll(".big-story");

  stories.forEach((story, index) => {
    if (index != currentIndex) {
      initPreview(story);
    } else {
      initStory(story);
    }
  });

  bigStories.forEach((story) => {
    story.style.transform = `translateX(-${currentIndex * 200}px)`;
  });
};

let lastChangeTime = new Date().getTime();

previousStory = () => {
  let stories = document.querySelectorAll(".big-story");
  if (currentIndex > 0) {
    currentIndex--;

    stories.forEach((story) => {
      story.style.transform = `translateX(-${currentIndex * 200}px)`;
    });
  } else {
    currentIndex = stories.length - 1;
  }

  lastChangeTime = new Date().getTime();
  initStories(currentIndex);
};

nextStory = () => {
  let stories = document.querySelectorAll(".big-story");
  if (currentIndex < stories.length - 1) {
    currentIndex++;

    stories.forEach((story) => {
      story.style.transform = `translateX(-${currentIndex * 200}px)`;
    });
  } else {
    currentIndex = 0;
  }

  lastChangeTime = new Date().getTime();
  initStories(currentIndex);
};

if (currentUser.hasStory) {
  let div = document.createElement("div");
  div.className = "big-story";

  users.map((usr) => {
    if (usr.username == currentUser.username) {
      let userPublishTime = usr.story.publishTime_miliseconds;
      let currentTime = new Date().getTime();
      let differenceInMiliseconds = currentTime - userPublishTime;

      let oneSecond = 1000;
      let oneMinute = oneSecond * 60;
      let oneHour = oneMinute * 60;

      let differenceTime = `${Math.floor(
        differenceInMiliseconds / oneSecond
      )}s`;

      if (differenceInMiliseconds / oneSecond >= 60) {
        differenceTime = `${Math.floor(differenceInMiliseconds / oneMinute)}m`;
      }

      if (differenceInMiliseconds / oneMinute >= 60) {
        differenceTime = `${Math.floor(differenceInMiliseconds / oneHour)}h`;
      }

      if (differenceInMiliseconds / oneHour >= 24) {
        usr.hasStory = false;
        usr.story = {};

        localStorage.setItem("users", JSON.stringify(users));
      }

      div.innerHTML = `
  <div class="story-active-div">
      <div class="story-time-div"><div class="story-time"></div></div>

  <div class="previous-btn btn"><</div>
  <div class="next-btn btn">></div>

  <div class="sa-header">
	  <a href="" class="sah-left-infos">
		  ${
        usr.hasProfilePhoto
          ? `<img src=${usr.imageLink} class="sah-user-image">`
          : '<div class="sah-user-image"><i class="far fa-user-circle"></i></div>'
      }
		  <div class="sah-username">${usr.username}</div>
		  <div class="sah-story-publish-time">${differenceTime}</div>
	  </a>

	  <div class="sah-right-menus">
		  <div class="sah-menu-item pause-btn"><i class="fas fa-pause"></i></div>
		  <div class="sah-menu-item volume-btn"><i class="fas fa-volume-mute"></i></div>
		  <div class="sah-menu-item story-settings-btn"><i class="fas fa-ellipsis-h"></i></div>
	  </div>
  </div>


  <div class="sa-image-div">
	  <img src=${usr.story.imageLink} class="sa-image">
  </div>

  <div class="sa-footer">
	  <input type="text" class="reply-story-input" placeholder="Reply to ${
      usr.username
    }...">
	  <div class="send-reply-btn"><i class="far fa-paper-plane"></i></div>
  </div>
</div>

<div class="story-preview-div">
  <div class="sp-image-div">
	  <img src=${usr.story.imageLink} class="sp-image">
  </div>

  <div class="sp-infos">
	  <div class="sp-user-image-div">
${
  usr.hasProfilePhoto
    ? `<img src=${usr.imageLink} class="sp-user-image">`
    : '<i class="far fa-user-circle"></i>'
}
	  </div>

	  <div class="sp-username">${usr.username}</div>
	  <div class="sp-story-publish-time">${differenceTime}</div>
  </div>
</div>
        `;

      storiesList.prepend(div);
    }
  });
}

currentUser.followings.map((following, index) => {
  let div = document.createElement("li");
  div.className = "big-story";

  let user = following;

  users.map((usr) => {
    if (usr.username == user.username) {
      if (usr.hasStory) {
        let userPublishTime = usr.story.publishTime_miliseconds;
        let currentTime = new Date().getTime();
        let differenceInMiliseconds = currentTime - userPublishTime;

        let oneSecond = 1000;
        let oneMinute = oneSecond * 60;
        let oneHour = oneMinute * 60;

        let differenceTime = `${Math.floor(
          differenceInMiliseconds / oneSecond
        )}s`;

        if (differenceInMiliseconds / oneSecond >= 60) {
          differenceTime = `${Math.floor(
            differenceInMiliseconds / oneMinute
          )}m`;
        }

        if (differenceInMiliseconds / oneMinute >= 60) {
          differenceTime = `${Math.floor(differenceInMiliseconds / oneHour)}h`;
        }

        if (differenceInMiliseconds / oneHour >= 24) {
          usr.hasStory = false;
          usr.story = {};

          localStorage.setItem("users", JSON.stringify(users));
        }

        div.innerHTML = `
  <div class="story-active-div">
      <div class="story-time-div"><div class="story-time"></div></div>

  <div class="previous-btn btn"><</div>
  <div class="next-btn btn">></div>

  <div class="sa-header">
	  <a href="" class="sah-left-infos">
		  ${
        usr.hasProfilePhoto
          ? `<img src=${usr.imageLink} class="sah-user-image">`
          : '<div class="sah-user-image"><i class="far fa-user-circle"></i></div>'
      }
		  <div class="sah-username">${usr.username}</div>
		  <div class="sah-story-publish-time">${differenceTime}</div>
	  </a>

	  <div class="sah-right-menus">
		  <div class="sah-menu-item pause-btn"><i class="fas fa-pause"></i></div>
		  <div class="sah-menu-item volume-btn"><i class="fas fa-volume-mute"></i></div>
		  <div class="sah-menu-item story-settings-btn"><i class="fas fa-ellipsis-h"></i></div>
	  </div>
  </div>


  <div class="sa-image-div">
	  <img src=${usr.story.imageLink} class="sa-image">
  </div>

  <div class="sa-footer">
	  <input type="text" class="reply-story-input" placeholder="Reply to ${
      usr.username
    }...">
	  <div class="send-reply-btn"><i class="far fa-paper-plane"></i></div>
  </div>
</div>

<div class="story-preview-div">
  <div class="sp-image-div">
	  <img src=${usr.story.imageLink} class="sp-image">
  </div>

  <div class="sp-infos">
	  <div class="sp-user-image-div">
${
  usr.hasProfilePhoto
    ? `<img src=${usr.imageLink} class="sp-user-image">`
    : '<i class="far fa-user-circle"></i>'
}
	  </div>

	  <div class="sp-username">${usr.username}</div>
	  <div class="sp-story-publish-time">${differenceTime}</div>
  </div>
</div>
 
  `;

        if (localStorage.getItem("storyIndex")) {
          currentIndex = localStorage.getItem("storyIndex");
        }

        if (index != currentIndex) {
          initPreview(div);
        } else {
          initStory(div);
        }

        storiesList.appendChild(div);

        bigStories = document.querySelectorAll(".big-story");
        let storiesWidth = storiesList.getBoundingClientRect().width;

        bigStories[0].style.marginLeft = `${storiesWidth / 2 - 15}px`;

        let previousBtn = div.querySelector(".previous-btn");
        let nextBtn = div.querySelector(".next-btn");

        previousBtn.addEventListener("click", previousStory);
        nextBtn.addEventListener("click", nextStory);

        bigStories.forEach((story, index) => {
          if (index == currentIndex) {
            let previousBtn = story.querySelector(".previous-btn");
            let nextBtn = story.querySelector(".next-btn");

            previousBtn.addEventListener("click", previousStory);
            nextBtn.addEventListener("click", nextStory);
          }

          story.addEventListener("click", (e) => {
            let previousBtn = story.querySelector(".previous-btn").toString();
            let nextBtn = story.querySelector(".next-btn").toString();

            if (
              e.target.toString() != previousBtn ||
              e.target.toString() != nextBtn
            ) {
              currentIndex = index;

              lastChangeTime = new Date().getTime();
              initStories(currentIndex);

              bigStories.forEach((story) => {
                story.style.transform = `translateX(-${currentIndex * 200}px)`;
              });
            }
          });
        });
      }
    }
  });
  storyTimeDivs = document.querySelectorAll(".story-time-div");
});

bigStories.forEach((story) => {
  story.style.transform = `translateX(-${currentIndex * 200}px)`;
});

const closeStoriesModalBtn = document.querySelector(".close-story-modal-btn");

closeStoriesModalBtn.addEventListener("click", () => {
  bigStoriesScreen.style.display = "none";
});

document.addEventListener("click", (e) => {
  if (e.target.className == "story-modal") {
    lastChangeTime = new Date().getTime();
    bigStoriesScreen.style.display = "none";
  }
});

setInterval(() => {
  let timeDiv = storyTimeDivs[currentIndex];
  if (timeDiv) {
    let timeDivsWidth = timeDiv.getBoundingClientRect().width;
    let time = timeDiv.querySelector(".story-time");
    let currentTime = new Date().getTime();

    let differenceInMiliseconds = currentTime - lastChangeTime;

    let targetSecond = 5000;
    let lastTime = targetSecond - differenceInMiliseconds;
    let width = 100 - (lastTime * 100) / targetSecond;

    if (differenceInMiliseconds >= 5000) {
      lastChangeTime = new Date().getTime();
      nextStory();
    }

    time.style.width = `${(width * timeDivsWidth) / 100}px`;
  }
}, 1000 / 60);
