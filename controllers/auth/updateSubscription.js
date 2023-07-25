const { User } = require('../../models/user');
const { HttpError, ctrlWrapper } = require('../../helpers');

const updateSubscription = async (req, res) => {
  const { _id } = req.user;
  const result = await User.findByIdAndUpdate(_id, req.body, { new: true });
  if (!result) throw HttpError(404);

  res.json({
    message: 'Subscription updated',
  });
};

module.exports = ctrlWrapper(updateSubscription);