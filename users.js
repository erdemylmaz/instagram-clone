let users = [];

users.map((user) => {
  user.followings = [];
  user.followers = [];
  user.likedPosts = [];
  user.commentedPosts = [];
  user.sharedPosts = [];
  user.savedPosts = [];
  user.lookedProfiles = [];
  user.suggestions = [];
  user.posts = [];
  user.hasStory = false;
  user.hasPost = false;
  user.isNew = true;
});

// if looked profile's lookingTime >= x add to suggestions list;

if (localStorage.getItem("users")) {
  users = JSON.parse(localStorage.getItem("users"));
}

localStorage.setItem("users", JSON.stringify(users));

let username;
