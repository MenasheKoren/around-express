const { ERROR_CODE_404 } = require('./error-constants');

function documentNotFoundErrorHandler(queryFailSelector) {
  const error = new Error(`Requested ${queryFailSelector} not found`);
  error.statusCode = ERROR_CODE_404;
  error.name = 'DocumentNotFoundError';
  throw error;
}

const getUsersErrorHandlerSelector = 'users';
const getUserByIdErrorHandlerSelector = 'user with that Id';

const getCardsErrorHandlerSelector = 'cards';
const getCardByIdErrorHandlerSelector = 'card with that Id';

module.exports = {
  documentNotFoundErrorHandler,
  getUsersErrorHandlerSelector,
  getUserByIdErrorHandlerSelector,
  getCardByIdErrorHandlerSelector,
  getCardsErrorHandlerSelector,
};
