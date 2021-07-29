const colorCodes = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
];

const postsArea = document.querySelector(".posts");

users = JSON.parse(localStorage.getItem("users"));

let posts = [];

if (localStorage.getItem("posts")) {
  posts = JSON.parse(localStorage.getItem("posts"));
}

initNavBar = (user) => {
  let navBarImg = navBarHeader.querySelector(".users-img");
  let navBarUsername = navBarHeader.querySelector(".users-username");
  let navBarName = navBarHeader.querySelector(".users-name");

  if (user.hasProfilePhoto) {
    navBarImg.innerHTML = `<img src=${user.imageLink} class="nav-bar-user-img">`;
  } else {
    navBarImg.innerHTML = `<i class="far fa-user-circle"></i>`;
    navBarImg.style.border = "1px solid var(--borderColor)";
  }

  navBarUsername.textContent = user.username;
  navBarName.textContent = user.fullName;
};

initSuggestions = (user) => {
  let suggestionsDiv = navbar.querySelector(".suggestion-users");

  let count = user.suggestions.length;

  if (user.suggestions.length > 4) {
    count = 4;
  }

  if (count == 0) {
    let suggestionText = navbar.querySelector(".nav-bar-suggestions");
    suggestionText.style.display = "none";
  } else {
    let suggestionText = navbar.querySelector(".nav-bar-suggestions");
    suggestionText.style.display = "flex";
  }

  for (let x = 0; x < count; x++) {
    let div = document.createElement("div");
    div.className = "suggestion-user";

    div.innerHTML = `
    <div class="suggestion-user-info">
      <div class="suggestion-user-img">${
        users.suggestions[x].hasProfilePhoto
          ? `<img src=${users.suggestions[x].imageLink}>`
          : "<i class='far fa-user-circle'"
      }</div>

      <div class="suggestion-user-info-right">
        <div class="suggestion-user-username">${
          users.suggestions[x].username
        }</div>
        <div class="suggestion-user-text">${
          users.suggestions[x].suggestionReason
        }</div>
      </div>
    </div>
    <div class="follow-suggestion-user-btn">Follow</div>`;

    suggestionsDiv.appendChild(div);
  }
};

initStories = (initializingUser) => {
  if (initializingUser.hasStory) {
    let div = document.createElement("div");
    div.className = "story";

    div.innerHTML = `
        <div class="story-user-img-div">${
          initializingUser.hasProfilePhoto
            ? `<img class="story-user-img" src=${initializingUser.imageLink}>`
            : `<div class="story-user-img"></div>`
        }</div>
        <div class="story-user-username">${initializingUser.username}</div> 
    `;

    storiesDiv.prepend(div);

    let stories = document.querySelectorAll(".story");

    stories.forEach((story, index) => {
      story.addEventListener("click", () => {
        bigStoriesScreen.style.display = "flex";
        initStories(index);
        localStorage.setItem("storyIndex", index);
      });
    });
  }

  users.map((user) => {
    let isFollowing = initializingUser.followings.find(
      (following) => following.username == user.username
    );

    if (isFollowing != undefined) {
      if (user.hasStory) {
        let div = document.createElement("div");
        div.className = "story";

        div.innerHTML = `
						<div class="story-user-img-div" >${
              user.hasProfilePhoto
                ? `<img class="story-user-img" src=${user.imageLink}>`
                : `<div class="story-user-img"></div>`
            }</div>
						<div class="story-user-username">${user.username}</div> 
        `;

        storiesDiv.appendChild(div);

        let stories = document.querySelectorAll(".story");

        stories.forEach((story, index) => {
          story.addEventListener("click", () => {
            bigStoriesScreen.style.display = "flex";
            initStories(index);
            localStorage.setItem("storyIndex", index);
          });
        });
      }
    }
  });

  let div = document.createElement("div");
  div.className = "user-share-story-div";

  div.innerHTML = `
    	<div class="story-user-img-div">
	             		   	${
                        initializingUser.hasProfilePhoto
                          ? `<img class="story-user-img user-share-story-img" src=${initializingUser.imageLink}>`
                          : "<i class='far fa-user-circle' style='font-size: 48px;'></i>"
                      }
							<div class="user-share-story-btn">+</div>
              </div>

						<div class="story-user-username"><strong>Share Story</strong></div> 
					 
  `;

  storiesDiv.prepend(div);
  openShareStoryModalBtn = document.querySelector(".user-share-story-div");

  let allStories = document.querySelectorAll(".story");
};

initCommentsPreview = (comments) => {
  let randomNumber = Math.floor(Math.random() * comments.length);
  let randomComment = comments[randomNumber];

  return `
      <div class="post-comments">
          <div class="post-comment">
                <div class="post-comments-info">
    								<a href="" class="post-comments-owner">${randomComment.username}</a>
                <div class="post-comments-text">${randomComment.text}</div>
              </div>

              <div class="like-post-comment-btn"><i class="far fa-heart"></i></div>
            </div>
          </div>
  `;
};

likePost = (e) => {
  let post;
  let element;

  if (e.target.tagName == "I") {
    post = JSON.parse(e.target.parentElement.dataset.post);
    element = e.target.parentElement;
  } else {
    post = JSON.parse(e.target.dataset.post);
    element = e.target;
  }

  let icon = element.querySelector("i");
  let postElement =
    element.parentElement.parentElement.parentElement.parentElement;

  let postLikeCountText = postElement.querySelector(".post-like-count-text");

  if (!element.classList.contains("like-active")) {
    post.likeCount++;

    post.likedUsers.push({
      username: currentUser.username,
    });

    element.style.animation = "likeAnimation 250ms ease-in-out";
    element.classList.add("like-active");
    icon.className = "fas fa-heart";

    setTimeout(() => {
      element.style.animationName = "";
    }, 250);
  } else {
    for (let x = 0; x < post.likedUsers.length; x++) {
      if (post.likedUsers[x].username == currentUser.username) {
        post.likedUsers.splice(x, 1);
      }
    }

    element.style.animation = "likeAnimation 250ms ease-in-out";
    element.classList.remove("like-active");
    icon.className = "far fa-heart";

    setTimeout(() => {
      element.style.animationName = "";
    }, 250);
  }

  postLikeCountText.textContent = `${post.likeCount} ${
    post.likeCount > 1 ? "likes" : "like"
  }`;

  localStorage.setItem("posts", JSON.stringify(posts));
};

commentPost = (e) => {};

initPosts = (initializingUser) => {
  initializingUser.followings.map((fllwng) => {
    let following = users.find((user) => user.username == fllwng.username);
    following.posts.map((post) => {
      posts.push({
        ...post,
        ...following,
        postId: posts.length - 1,
      });
    });
  });

  initializingUser.posts.map((post) => {
    posts.push({ ...post, ...initializingUser, postId: posts.length - 1 });
  });

  if (posts.length > 2) {
    posts.sort((curr, next) => next.publishTime - curr.publishTime);
  }

  posts.map((post) => {
    let div = document.createElement("div");
    div.className = "post";

    let differenceDate;

    let currentTime = new Date().getTime();
    let differenceTime = currentTime - post.publishTime;

    let oneMinute = 1000 * 60;
    let oneHour = oneMinute * 60;
    let oneDay = oneHour * 24;
    let oneMonth = oneDay * 30;
    let oneYear = oneMinute * 12;

    // set time formats
    if (differenceTime < oneMinute) {
      differenceDate = `${Math.floor(differenceTime / 1000)} ${
        Math.floor(differenceTime / 1000) > 1 ? "seconds" : "second"
      } ago`;
    } else if (differenceTime < oneHour) {
      differenceDate = `${Math.floor(differenceTime / oneMinute)} ${
        Math.floor(differenceTime / oneMinute) > 1 ? "minutes" : "minute"
      } ago`;
    } else if (differenceTime < oneDay) {
      differenceDate = `${Math.floor(differenceTime / oneHour)} ${
        Math.floor(differenceTime / oneHour) > 1 ? "hours" : "hour"
      } ago`;
    } else if (differenceTime < oneMonth) {
      differenceDate = `${Math.floor(differenceTime / oneDay)} ${
        Math.floor(differenceTime / oneDay) > 1 ? "days" : "day"
      } ago`;
    } else if (differenceTime < oneYear) {
      differenceDate = `${Math.floor(differenceTime / oneMonth)} ${
        Math.floor(differenceTime / oneMonth) > 1 ? "months" : "month"
      } ago`;
    }

    div.innerHTML = `
            <div class="post-header">
    					<div class="post-header-info">
    						<a href="" class="post-user-img-div">${
                  post.hasProfilePhoto
                    ? `<img src=${post.imageLink} class="post-user-img"`
                    : `<i class="fas fa-user-circle"></i>`
                }</a>
    						<a href="" class="post-header-username">${post.username}</a>
    					</div>

    					<div class="post-settings"><i class="fas fa-ellipsis-h"></i></div>
    				</div>

    				<div class="post-container"><div class="post-img-div"><img src=${
              post.postImageLink
            } class="post-img"></div></div>

    				<div class="post-footer">
    					<div class="post-footer-header">
    						<div class="post-footer-interactions">
    							<div class="post-footer-icon post-like-btn"><i class="far fa-heart"></i></div>
    							<div class="post-footer-icon post-comment-btn"><i class="far fa-comment"></i></div>
    							<div class="post-footer-icon post-share-btn"><i class="far fa-paper-plane"></i></div>
    						</div>

    						<div class="post-save-btn post-footer-icon"><i class="far fa-bookmark"></i></div>
    					</div>

    					<div class="post-like-count-text">${post.likeCount} like</div>

              ${
                post.hasText
                  ? `
      					<div class="post-owners-comment">
      						<a href="" class="post-owners-username">${post.username}</a>
      						<div class="post-owners-text">${post.text}</div>
                </div>
                `
                  : ""
              }

    					${
                post.commentCount > 3
                  ? `<div class="post-view-all-comments-btn">View all <span class="post-comment-count">${post.commentCount}</span> comments</div>`
                  : ""
              }

              ${post.comments.length > 0 ? initCommentsPreview() : ""}

    					<div class="post-publish-date">${differenceDate}</div>

    					<div class="post-footer-bottom">
    						<div class="emojis-btn"><i class="far fa-smile"></i></div>
    						<input type="text" placeholder="Add a comment..." class="comment-to-post-input">
    						<div class="send-comment-btn disabled">Post</div>
    					</div>
    				</div>
    `;

    postsArea.appendChild(div);

    let postLikeBtn = div.querySelector(".post-like-btn");
    let postCommentBtn = div.querySelector(".post-comment-btn");
    let postShareBtn = div.querySelector(".post-share-btn");
    let postSaveBtn = div.querySelector(".post-save-btn");

    postLikeBtn.setAttribute("data-post", JSON.stringify(post));

    postLikeBtn.addEventListener("click", likePost);
    postCommentBtn.addEventListener("click", commentPost);
    postLikeBtn.addEventListener("click", likePost);
    postLikeBtn.addEventListener("click", likePost);

    // post comment and like post comment
  });
};

initUser = (user) => {
  initNavBar(user);
  initSuggestions(user);
  initStories(user);
  initPosts(user);

  if (user.hasProfilePhoto) {
    headerUserImgDiv.innerHTML = `<img src=${user.imageLink} class="header-user-img">`;
  }
};
