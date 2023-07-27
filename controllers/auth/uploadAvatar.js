const path = require('path');
const fs = require('fs/promises');

const { User } = require('../../models/user');
const { HttpError, ctrlWrapper } = require('../../helpers');

const avatarDir = path.join(__dirname, '../', '../', 'public', 'avatars');

const uploadAvatar = async (req, res) => {
  const { _id } = req.user;

  const { path: tmpUpload, originalname } = req.file;
  const filename = `${_id}_${originalname}`;
  const resUpload = path.join(avatarDir, filename);
  await fs.rename(tmpUpload, resUpload);

  const avatarURL = path.join('avatars', filename);
  const result = await User.findByIdAndUpdate(
    _id,
    { avatarURL },
    { new: true }
  );
  if (!result) throw HttpError(404);

  res.json({ avatarURL });
};

module.exports = ctrlWrapper(uploadAvatar);