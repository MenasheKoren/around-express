const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: [2, 'needs at least 2 letters'],
    maxLength: [30, 'cannot be longer than 30 letters'],
  },
  link: {
    type: String,
    validate: {
      validator(v) {
        return /https?:\/{2}(?:(\w+\W(com)?)\/?)+\1?#?/gi.test(v);
      },
      message: (props) => `${props.value} is not a valid URL!`,
    },
    required: true,
  },
  owner: {
    type: mongoose.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: {
    type: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'user',
      },
    ],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('card', cardSchema);
