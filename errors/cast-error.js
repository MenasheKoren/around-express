const { ERROR_CODE_400 } = require('./error-constants');

module.exports.castErrorHandler = (res, err) => {
  res.status(ERROR_CODE_400).send({ message: `${err}` });
};
