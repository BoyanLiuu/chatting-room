const mongoose = require('mongoose');
var bcrypt = require('bcryptjs');


const userSchema = mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    minlength: 8,
    select: false
  },
  passwordConfirm: {
    type: String
  },
  photo: {
    type: String,
    default: 'default.jpg'
  },
  facebook: {
    type: String,
    default: ''
  },
  fbtokens: Array,
  google: {
    type: String,
    default: ''
  },
  googleTokens: Array,
});

// encrypt password function
userSchema.methods.encryptPassword = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
}
userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
}
const User = mongoose.model('User', userSchema);

module.exports = User;