const router = require('express').Router();
const { User, Comment, Thread } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const threadData = await Thread.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const threads = threadData.map((thread) => thread.get({ plain: true }));

    res.render('homepage', { 
      threads, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/thread/:id', async (req, res) => {
  try {
    const threadData = await thread.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          include: 
          [{ model: User, 
            attributes: ['username'] }]
        },
      ],
    });

    const thread = threadData.get({ plain: true });

    res.render('thread', {
      ...thread,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/profile', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Thread }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }
  res.render('login');
});

module.exports = router;
