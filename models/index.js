const User = require('./User');
const Thread = require('./Thread');
const Comment = require('./Comment');

User.hasMany(Thread, {
  foreignKey: 'user_id',
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
});

Thread.hasMany(Comment, {
  foreignKey: 'thread_id',
});

Thread.belongsTo(User, {
  foreignKey: 'user_id',
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
});

Comment.belongsTo(Thread, {
  foreignKey: 'Thread_id',
});

module.exports = { User, Thread, Comment };
