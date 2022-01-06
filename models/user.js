const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: [2, 'needs at least 2 letters'],
    maxLength: [30, 'cannot be longer than 30 letters'],
  },
  about: {
    type: String,
    required: true,
    minLength: [2, 'needs at least 2 letters'],
    maxLength: [30, 'cannot be longer than 30 letters'],
  },
  avatar: {
    type: String,
    validate: {
      validator(v) {
        return /https?:\/{2}(?:(\w+\W(com)?)\/?)+\1?#?/gi.test(v);
      },
      message: (props) => `${props.value} is not a valid URL!`,
    },
    required: true,
  },
});

module.exports = mongoose.model('user', userSchema);
