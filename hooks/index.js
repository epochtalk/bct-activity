var Promise = require('bluebird');

function userActivity(request) {
  return Promise.map(request.pre.processed.posts, function(post) {
    return request.db.userActivity.userActivity(post.user.id)
    .then(function(activity) {
      post.user.activity = activity;
      return post;
    });
  });
}

function updateUserActivity(request) {
  request.db.userActivity.updateUserActivity(request.pre.processed.user_id);
}

module.exports = [
  { path: 'posts.byThread.post', method: userActivity },
  { path: 'posts.create.post', method: updateUserActivity }
];
