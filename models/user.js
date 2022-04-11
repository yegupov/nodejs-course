const {Schema, model} = require('mongoose');

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    default: "",
  },
  password: {
    type: String,
    default: "somePassword",
  },
  emails: {
    type: Array,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  }
});

module.exports = model('User', userSchema);
