const Post = require('../models/post')

module.exports = {
    index, new: newPost, show, create, update, edit
}

async function edit(req, res) {
    const post = await Post.findOne({_id: req.params.id} );
    if (!post) return res.redirect('/posts');
    res.render('posts/edit', { post });
}

async function update(req, res) {
    try {
        const updatedPost = await Post.findOneAndUpdate(
            {'_id': req.params.id},
            req.body,
            {new: true}
        );
        return res.redirect(`/posts`);
    } catch (e) {
        console.log(e.message);
        return res.redirect('/posts');
    }
}

async function create(req, res) {
  // convert nowShowing's checkbox of nothing or "on" to boolean
  req.body.nowShowing = !!req.body.nowShowing;
  // Remove empty properties so that defaults will be applied
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key];
  }
  try {
    // Update this line because now we need the _id of the new movie
    const post = await Post.create(req.body);
    // Redirect to the new movie's show functionality 
    res.redirect(`/`);
  } catch (err) {
    // Typically some sort of validation error
    console.log(err);
    res.render('posts/new', { errorMsg: err.message });
  }
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
    res.render('posts/new', { title: `New Post`, errorMsg: ''})

}