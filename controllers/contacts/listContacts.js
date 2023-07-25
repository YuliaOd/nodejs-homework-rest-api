const { Contact } = require('../../models/contact');
const { ctrlWrapper } = require('../../helpers');

const listContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10, favorite = false } = req.query;
  const skip = (page - 1) * limit;
  const searchParams = favorite ? { owner, favorite: true } : { owner };

  const result = await Contact.find(searchParams, '-createdAt -updatedAt', {
    skip,
    limit,
  }).populate('owner', 'email subscription');
  res.json(result);
};

module.exports = ctrlWrapper(listContacts);