const { Error } = require('mongoose');
const { castErrorHandler } = require('./cast-error');
const { defaultErrorHandler } = require('./default-error');
const {
  invalidDataPassedErrorHandler,
  createActionFailSelector,
} = require('./invalid-data-passed-error');

module.exports.catchFindErrorHandler = (err, res) => {
  if (err.name === 'DocumentNotFoundError') {
    res.status(err.statusCode).send({
      message: `${err}`,
    });
  } else if (err.name === 'CastError') {
    castErrorHandler(res, err);
  } else {
    defaultErrorHandler(res);
  }
};

module.exports.catchFindByIdErrorHandler = (err, res) => {
  if (err.name === 'DocumentNotFoundError') {
    res.status(err.statusCode).send({
      message: `${err}`,
    });
  } else if (err.name === 'CastError') {
    castErrorHandler(res, err);
  } else {
    defaultErrorHandler(res);
  }
};

module.exports.catchCreateErrorHandler = (err, res, dataFailSelector) => {
  if (err instanceof Error) {
    invalidDataPassedErrorHandler(
      dataFailSelector,
      createActionFailSelector,
      res,
      err,
    );
  } else if (err.name === 'CastError') {
    castErrorHandler(res, err);
  } else {
    defaultErrorHandler(res);
  }
};

module.exports.catchFindByIdAndUpdateOrDeleteErrorHandler = (
  err,
  res,
  dataFailSelector,
  actionFailSelector,
) => {
  if (err.name === 'DocumentNotFoundError') {
    res.status(err.statusCode).send({
      message: `${err}`,
    });
  } else if (err instanceof Error) {
    invalidDataPassedErrorHandler(
      dataFailSelector,
      actionFailSelector,
      res,
      err,
    );
  } else if (err.name === 'CastError') {
    castErrorHandler(res, err);
  } else {
    defaultErrorHandler(res);
  }
};
