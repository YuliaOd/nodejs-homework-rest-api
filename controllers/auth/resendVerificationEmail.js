const { User } = require('../../models/user');
const { HttpError, ctrlWrapper, sendEmail } = require('../../helpers');
const { BASE_URL } = process.env;

const resendVerificationEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) throw HttpError(404, 'User not found');
  if (user.verified) throw HttpError(400, 'User is already verified');

  const verificationEmail = {
    to: email,
    subject: 'Please verify your email',
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${user.verificationToken}">Click here to verify</a>`,
  };

  await sendEmail(verificationEmail);

  res.status(201).json({
    message: 'Verification email send success',
  });
};

module.exports = ctrlWrapper(resendVerificationEmail);