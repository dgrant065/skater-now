const Post = require('../models/post')

module.exports = {
    index, new: newPost, show
}

async function show(req, res) {
    const post = await Post.findById(req.params.id)
    res.render('posts/show', { title: 'Posts', post})
}

async function index(req, res) {
    const posts = await Post.find({});
    res.render('posts/index', {posts})

}

function newPost(req, res) {
    res.render('posts/new', { title: `New Post`})

}