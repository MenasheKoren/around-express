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

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email })
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('bad credentials'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('bad cred'));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
