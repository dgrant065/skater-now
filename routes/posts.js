const express = require('express');
const router = express.Router();
const commentsCtrl = require('../controllers/comments');
const postsCtrl = require('../controllers/posts');
const ensureLoggedIn = require('../config/ensureLoggedIn');


router.get('/', postsCtrl.index);
router.get('/new', ensureLoggedIn, postsCtrl.new);
router.get('/:id', postsCtrl.show);
router.post('/', postsCtrl.create);
router.get('/:id/edit', postsCtrl.edit);
router.put('/:id', postsCtrl.update);
router.post('/:id/comment', ensureLoggedIn, commentsCtrl.create);
router.delete('/:id/comment/:commentId', ensureLoggedIn, commentsCtrl.delete)


// router.post('/', ensureLoggedIn, postsCtrl.create)

module.exports = router;