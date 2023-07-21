const Jimp = require('jimp');
const { HttpError } = require('../helpers');

const resizeAvatar = async (req, res, next) => {
  const { path } = req.file;
  try {
    const result = await Jimp.read(path);
    await result.resize(250, 250).writeAsync(path);
    next();
  } catch {
    next(HttpError(404));
  }
};

module.exports = resizeAvatar;