if (!localStorage.getItem("loginData")) {
  accountScreen.style.display = "flex";
  accountScreen.style.justifyContent = "center";
  accountScreen.style.alignItems = "center";
  accountScreen.innerHTML = `
	<strong>Please <a href="../index.html">Log in</a></strong>
  `;
}

const userPPDiv = document.querySelector(".user-img-div");
const userPostsDiv = document.querySelector(".account-posts");
const userUsernameDiv = document.querySelector(".user-info-username");
const userFullNameDiv = document.querySelector(".user-name");
const userBioDiv = document.querySelector(".user-bio");
const user_post_count = document.querySelector(".post-count");
const user_follower_count = document.querySelector(".follower-count");
const user_following_count = document.querySelector(".following-count");

const hasNoPhotoDiv = document.querySelector(".has-no-photo");
const shareNewPostDiv = document.querySelector(".share-new-post-div");
const shareNewPostBtn = document.querySelector(".share-new-post");

const userFollowersBtn = user_follower_count.parentElement;
const userFollowingsBtn = user_following_count.parentElement;

const followerModal = document.querySelector(".followers-modal");
const followingModal = document.querySelector(".followings-modal");

const followersList = document.querySelector(".followers-list");
const followingsList = document.querySelector(".followings-list");

const closeFollowingModalBtn = document.querySelector(".close-followings-btn");
const closeFollowersModalBtn = document.querySelector(".close-followers-btn");

let loginData = JSON.parse(localStorage.getItem("loginData"));
let user = users.find((user) => user.username == loginData.loggedUsername);

closeFollowersModalBtn.addEventListener("click", () => {
  followerModal.style.display = "none";
});

closeFollowingModalBtn.addEventListener("click", () => {
  followingModal.style.display = "none";
});

showFollowers = () => {
  followerModal.style.display = "flex";
  followersList.innerHTML = "";

  user.followers.map((follower) => {
    let div = document.createElement("div");
    div.className = "follower modal-list-item";

    div.innerHTML = `
					<div class="follower-info-div">
						<div class="follower-img">${
              follower.hasProfilePhoto
                ? `<img src=${follower.imageLink} style="width: 30px; height: 30px; border-radius: 50%;">`
                : `<i class="fas fa-user-circle"></i>`
            }</div>
						<div class="follower-info">
              <div class="follower-info-header">
							  <a href="../user/user.html" class="follower-username">${follower.username}</a>
                <span class="dot">·</span>
                <div class="modal-user-follow-btn">Follow</div>
              </div>
							<div class="follower-fullName">${follower.fullName}</div>
						</div>
					</div>

					<div class="remove-follower-btn">Remove</div>
    `;

    let usernameBtn = div.querySelector(".follower-username");

    let followersUsernames = user.followers.map(
      (follower) => follower.username
    );
    let followingsUsernames = user.followings.map(
      (following) => following.username
    );

    let unCommons = followersUsernames.filter(
      (following) => followingsUsernames.indexOf(following) == -1
    );
    let unCommonUsers = [];

    unCommons.map((unCommon) => {
      let user = users.find((usr) => usr.username == unCommon);

      unCommonUsers.push(user);
    });

    unCommonUsers.map((unCommonUser) => {
      if (follower.username == unCommonUser.username) {
        let dot = div.querySelector(".dot");
        let followBtn = div.querySelector(".modal-user-follow-btn");

        dot.style.display = "flex";
        followBtn.style.display = "flex";
      }
    });

    usernameBtn.addEventListener("click", () => {
      let selectedUser = users.find(
        (user) => user.username == follower.username
      );

      localStorage.setItem("viewingUser", JSON.stringify(selectedUser));
    });

    followersList.appendChild(div);
  });
};

showFollowings = () => {
  followingModal.style.display = "flex";
  followingsList.innerHTML = "";

  user.followings.map((following) => {
    let div = document.createElement("div");
    div.className = "following modal-list-item";

    div.innerHTML = `
					<div class="follower-info-div">
						<div class="follower-img">${
              following.hasProfilePhoto
                ? `<img src=${following.imageLink} style="width: 30px; height: 30px; border-radius: 50%;">`
                : `<i class="fas fa-user-circle"></i>`
            }</div>
						<div class="follower-info">
							<a href="../user/user.html" class="follower-username">${following.username}</a>
							<div class="follower-fullName">${following.fullName}</div>
						</div>
					</div>

					<div class="following-btn">Following</div>
    `;

    let usernameBtn = div.querySelector(".follower-username");

    usernameBtn.addEventListener("click", () => {
      let selectedUser = users.find(
        (user) => user.username == following.username
      );

      localStorage.setItem("viewingUser", JSON.stringify(selectedUser));
    });

    followingsList.appendChild(div);
  });
};

userFollowersBtn.addEventListener("click", showFollowers);
userFollowingsBtn.addEventListener("click", showFollowings);

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("followers-modal")) {
    followerModal.style.display = "none";
  }

  if (e.target.classList.contains("followings-modal")) {
    followingModal.style.display = "none";
  }
});

initPosts = (user) => {
  if (user.hasPost) {
    hasNoPhotoDiv.style.display = "none";
    shareNewPostDiv.style.display = "flex";
    userPostsDiv.style.justifyContent = "flex-start";
    userPostsDiv.style.alignItems = "flex-start";

    user.posts.map((post) => {
      let div = document.createElement("div");
      div.className = "account-post";

      div.innerHTML = `
      <div class="post-modal">
        <div class="post-like-count"><i class="fas fa-heart"></i> ${post.likeCount}</div>
        <div class="post-comment-count"><i class="fas fa-comment"></i> ${post.commentCount}</div>
      </div>

      <div class="account-post-img"><img src=${post.postImageLink}></div> 
      `;

      userPostsDiv.prepend(div);
    });
  } else {
    hasNoPhotoDiv.style.display = "flex";
    shareNewPostDiv.style.display = "none";
    userPostsDiv.style.justifyContent = "center";
    userPostsDiv.style.alignItems = "center";
  }
};

initAccount = (user) => {
  userUsernameDiv.textContent = user.username;
  userFullNameDiv.textContent = user.fullName;
  userBioDiv.textContent = user.biography;
  user_post_count.textContent = user.posts.length;
  user_follower_count.textContent = user.followers.length;
  user_following_count.textContent = user.followings.length;

  if (user.hasProfilePhoto) {
    headerUserImgDiv.innerHTML = `<img src=${user.imageLink} class="header-user-img">`;
    userPPDiv.innerHTML = `<img src=${user.imageLink} class="user-image"">`;
  }

  initPosts(user);
};

initAccount(user);

document.title = user.username + " - Instagram";

// account menu
// things

openSharePostModal = () => {
  postModal.style.display = "flex";
};

shareNewPostBtn.addEventListener("click", openSharePostModal);
hasNoPhotoDiv.addEventListener("click", openSharePostModal);
