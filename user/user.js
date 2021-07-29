// ALL COPIED FROM ACCOUNT.JS

if (!localStorage.getItem("viewingUser")) {
  document.body.style.display = "flex";
  document.body.style.justifyContent = "center";
  document.body.style.alignItems = "center";
  document.body.innerHTML = `
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

const userFollowersBtn = user_follower_count.parentElement;
const userFollowingsBtn = user_following_count.parentElement;
const followButton = document.querySelector(".user-follow-btn");

const hasNoPhotoDiv = document.querySelector(".has-no-photo");
const shareNewPostDiv = document.querySelector(".share-new-post-div");
const shareNewPostBtn = document.querySelector(".share-new-post");

const followerModal = document.querySelector(".followers-modal");
const followingModal = document.querySelector(".followings-modal");

const followersList = document.querySelector(".followers-list");
const followingsList = document.querySelector(".followings-list");

const closeFollowingModalBtn = document.querySelector(".close-followings-btn");
const closeFollowersModalBtn = document.querySelector(".close-followers-btn");

const accountBtn = document.querySelector(".account-btn");
const commonUsersDiv = document.querySelector(".common-users");

let loginData = JSON.parse(localStorage.getItem("loginData"));
let viewingUser = JSON.parse(localStorage.getItem("viewingUser"));

closeFollowersModalBtn.addEventListener("click", () => {
  followerModal.style.display = "none";
});

closeFollowingModalBtn.addEventListener("click", () => {
  followingModal.style.display = "none";
});

showFollowers = () => {
  followerModal.style.display = "flex";
  followersList.innerHTML = "";

  viewingUser.followers.map((follower) => {
    // COMMON USERS
    let username = loginData.loggedUsername;
    let currentUser = users.find((usr) => usr.username == username);

    let followingsUsernames = currentUser.followings.map(
      (following) => following.username
    );
    let followersUsernames = viewingUser.followers.map(
      (follower) => follower.username
    );

    let commonUsers = followingsUsernames.filter(
      (following) => followersUsernames.indexOf(following) != -1
    );

    // INIT USER
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
							<div class="follower-username">${follower.username}</div>
							<div class="follower-fullName">${follower.fullName}</div>
						</div>
					</div>

          <div class="modal-user-follow-btn">Follow</div>
    `;

    commonUsers.map((commonUser) => {
      if (follower.username == commonUser) {
        div.innerHTML = `
					<div class="follower-info-div">
						<div class="follower-img">${
              follower.hasProfilePhoto
                ? `<img src=${follower.imageLink} style="width: 30px; height: 30px; border-radius: 50%;">`
                : `<i class="fas fa-user-circle"></i>`
            }</div>
						<div class="follower-info">
							<div class="follower-username">${follower.username}</div>
							<div class="follower-fullName">${follower.fullName}</div>
						</div>
					</div>

          <div class="following-btn">Following</div>
    `;
        followersList.prepend(div);
      } else {
        followersList.appendChild(div);
      }
    });

    let usernameBtn = div.querySelector(".follower-username");
    let modalFollowBtn = div.querySelector(".modal-user-follow-btn");

    if (follower.username == currentUser.username) {
      modalFollowBtn.style.display = "none";
    }

    usernameBtn.addEventListener("click", () => {
      let selectedUser = users.find((user) => {
        location.reload();
        return user.username == follower.username;
      });

      localStorage.setItem("viewingUser", JSON.stringify(selectedUser));
    });

    if (commonUsers.length == 0) {
      followersList.appendChild(div);
    }
  });
};

showFollowings = () => {
  followingModal.style.display = "flex";
  followingsList.innerHTML = "";

  viewingUser.followings.map((following) => {
    let username = loginData.loggedUsername;
    let currentUser = users.find((usr) => usr.username == username);

    // INIT USERS
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
							<div class="follower-username">${following.username}</div>
							<div class="follower-fullName">${following.fullName}</div>
						</div>
					</div>

          <div class="modal-user-follow-btn">Follow</div>
    `;

    currentUser.followings.map((currentUsersFollowing) => {
      if (following.username == currentUsersFollowing.username) {
        div.innerHTML = `
					<div class="follower-info-div">
						<div class="follower-img">${
              following.hasProfilePhoto
                ? `<img src=${following.imageLink} style="width: 30px; height: 30px; border-radius: 50%;">`
                : `<i class="fas fa-user-circle"></i>`
            }</div>
						<div class="follower-info">
							<div class="follower-username">${following.username}</div>
							<div class="follower-fullName">${following.fullName}</div>
						</div>
					</div>

          <div class="following-btn">Following</div>
    `;

        followingsList.prepend(div);
      } else {
        followingsList.appendChild(div);
      }
    });

    let usernameBtn = div.querySelector(".follower-username");
    let modalFollowBtn = div.querySelector(".modal-user-follow-btn");

    if (following.username == currentUser.username) {
      modalFollowBtn.style.display = "none";
    }

    usernameBtn.addEventListener("click", () => {
      let selectedUser = users.find((user) => {
        location.reload();
        return user.username == following.username;
      });

      localStorage.setItem("viewingUser", JSON.stringify(selectedUser));
    });

    if (currentUser.followings.length == 0) {
      followingsList.appendChild(div);
    }
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
    shareNewPostDiv.style.display = "none";
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

      <div class="account-post-img"><img src=${post.imageLink}></div> 
      `;

      userPostsDiv.prepend(div);
    });
  }
};

initAccount = (user) => {
  userUsernameDiv.textContent = viewingUser.username;
  userFullNameDiv.textContent = viewingUser.fullName;
  userBioDiv.textContent = viewingUser.biography;
  user_post_count.textContent = viewingUser.posts.length;
  user_follower_count.textContent = viewingUser.followers.length;
  user_following_count.textContent = viewingUser.followings.length;

  if (viewingUser.hasProfilePhoto) {
    userPPDiv.innerHTML = `<img src=${viewingUser.imageLink} class="user-image"">`;
  }

  let username = loginData.loggedUsername;
  let currentUser = users.find((usr) => usr.username == username);

  let followingsUsernames = currentUser.followings.map(
    (following) => following.username
  );
  let followersUsernames = viewingUser.followers.map(
    (follower) => follower.username
  );

  let commonUsers = followingsUsernames.filter(
    (following) => followersUsernames.indexOf(following) != -1
  );

  if (commonUsers.length != 0) {
    commonUsersDiv.innerHTML = `Followed by <span class="common-user">${commonUsers.join()}</span>`;
  }

  if (commonUsers.length > 3) {
    commonUsersDiv.innerHTML = `Followed by <span class="common-user">${
      commonUsers[0]
    }, ${commonUsers[1]}, ${commonUsers[2]}}</span> +${
      commonUsers.length - 3
    } more`;
  }

  let isFollows = viewingUser.followers.find(
    (user) => user.username == currentUser.username
  );

  if (isFollows) {
    followingUserMenu.style.display = "flex";
    followButton.style.display = "none";
  }

  if (currentUser.hasProfilePhoto) {
    accountBtn.innerHTML = `<img src=${currentUser.imageLink} style="width: 22px; height: 22px; border-radius: 50%;">`;
  }

  if (currentUser.username == viewingUser.username) {
    followButton.style.display = "none";
  }

  initPosts(user);
};

initAccount(viewingUser);

document.title = viewingUser.username + " - Instagram";

followUser = () => {
  users = JSON.parse(localStorage.getItem("users"));

  followingUserMenu.style.display = "flex";
  followButton.style.display = "none";

  let username = loginData.loggedUsername;
  let currentUser = users.find((user) => user.username == username);

  users.map((user) => {
    if (user.username == currentUser.username) {
      user.followings.push({
        username: viewingUser.username,
        fullName: viewingUser.fullName,
        imageLink: viewingUser.imageLink,
        hasProfilePhoto: viewingUser.hasProfilePhoto,
      });
    }

    if (user.username == viewingUser.username) {
      user.followers.push({
        username: currentUser.username,
        fullName: currentUser.fullName,
        imageLink: currentUser.imageLink,
        hasProfilePhoto: currentUser.hasProfilePhoto,
      });

      viewingUser.followers.push({
        username: currentUser.username,
        fullName: currentUser.fullName,
        imageLink: currentUser.imageLink,
        hasProfilePhoto: currentUser.hasProfilePhoto,
      });

      user_follower_count.textContent = viewingUser.followers.length;
      localStorage.setItem("viewingUser", JSON.stringify(viewingUser));
    }
  });

  localStorage.setItem("users", JSON.stringify(users));
};

followButton.addEventListener("click", followUser);
