const router = require('express').Router();
const { Post, User } = require('../../models');
const withAuth = require('../../utils/auth');
const { myconfig } = require('../../config/connection.js');
const userRoutes = require('./userRoutes.js');

// Retrieves a single post by id
router.get('/posts/:id', withAuth, async (req, res) => { 
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name', 'email', 'url'],
        },
      ],
    });

    const post = postData.get({ plain: true }); 

    res.render('posts', { 
      ...post,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).render('error', { error: err });
  }
});

// Creates a new post
router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Deletes a post
router.delete('/:id', withAuth, async (req, res) => {
  console.log('Request params:', req.params.id);
  try {
    const postData = await Post.destroy({
      where: {
        post_id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json({ message: 'Post deleted successfully', deletedPost: postData });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Updates a post
router.put('/:id', withAuth, async (req, res) => {
  try {
    const updatedPostData = await Post.update(
      {
        ...req.body,
        // title: req.body.title,
        // content: req.body.content,
      }, 
      {
        where: {
          post_id: req.params.id, 
        },
      }
    );

    if (!updatedPostData[0]) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(updatedPostData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.use('/user', userRoutes);


module.exports = router;
