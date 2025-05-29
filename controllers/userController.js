const User = require('../models/user');

exports.listarUsuarios = async (req, res, next) => {
  try {
    const users = await User.find().select('-senha');
    res.json(users);
  } catch (err) {
    next(err);
  }
};
