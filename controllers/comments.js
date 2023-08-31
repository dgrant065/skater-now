const Post = require('../models/post');

module.exports = {
    create, delete: deleteComment
};

async function deleteComment(req, res) {
    console.log('delete')
    const {id, commentId} = req.params
    const post = await Post.findById(id);
    if (!post) return res.redirect('/posts');
    post.comments.remove(commentId);
    await post.save();
    res.redirect(`/posts`);
  }

async function create(req, res) {
    try {
    const post = await Post.findById(req.params.id);
  

    req.body.user = req.user._id;
    // req.body.userName = req.user.name;
    // req.body.userAvatar = req.user.avatar;
  

    post.comments.push(req.body);

      await post.save();
      res.redirect(`/posts`);
    } catch (err) {
      console.log(err);
    }
    // res.redirect(`/posts/${post._id}`);
  }