const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    const commentData = await Comment.findAll();
    res.json(commentData);
});

router.post('/', withAuth, async (req, res) => {
    try {
      const newComment = await Comment.create({
          description: req.body.description,
          thread_id: req.body.thread_id,
          user_id: req.body.user_id
      })
  
      res.status(200).json(newComment);
    } catch (err) {
      res.status(400).json(err);
    }
  });

module.exports = router;
