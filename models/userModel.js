const mongoose = require('mongoose');
var bcrypt = require('bcryptjs');


const userSchema = mongoose.Schema({
  fullname: {
    type: String,
    default: ''
  },
  username: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
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
  sentRequest: [{
    username: {
      type: String,
      default: ''
    }
  }],
  request: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    username: {
      type: String,
      default: ''
    }
  }],
  friendsList: [{
    friendId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    friendName: {
      type: String,
      default: ''
    }
  }],
  totalRequest: {
    type: Number,
    default: 0
  },
  gender: {
    type: String,
    default: ''
  }
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