const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 30,
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
    ObjectId: [mongoose.Types.ObjectId],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('card', cardSchema);
