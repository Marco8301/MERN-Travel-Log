const mongoose = require('mongoose');

const stringRequired = {
  type: String,
  required: true,
};
const Usermodel = mongoose.Schema({
  username: stringRequired,
  mail: {
    type: String,
    unique: true,
    required: true,
  },
  password: stringRequired,
});

module.exports = mongoose.model('Users', Usermodel);
