const { ERROR_CODE_500 } = require('./error-constants');

module.exports.defaultErrorHandler = (res) => {
  res.status(ERROR_CODE_500).send({
    message: 'An error has occurred on the server',
  });
};
