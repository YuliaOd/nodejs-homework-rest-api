const register = require('./register');
const verifyEmail = require('./verifyEmail');
const resendVerificationEmail = require('./resendVerificationEmail');
const login = require('./login');
const getCurrent = require('./getCurrent');
const logout = require('./logout');
const updateSubscription = require('./updateSubscription');
const uploadAvatar = require('./uploadAvatar');

module.exports = {
  register,
  verifyEmail,
  resendVerificationEmail,
  login,
  getCurrent,
  logout,
  updateSubscription,
  uploadAvatar,
};