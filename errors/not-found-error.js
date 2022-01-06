function notFoundErrorHandler(queryFailSelector) {
  const ERROR_CODE = new CastError(`Requested ${queryFailSelector} not found`);
  ERROR_CODE.statusCode = 404;
  throw ERROR_CODE;
}

const getUsersErrorHandlerSelector = 'users';
const getUserByIdErrorHandlerSelector = 'user with that Id';

const getCardsErrorHandlerSelector = 'cards';
const getCardByIdErrorHandlerSelector = 'card with that Id';

module.exports = {
  notFoundErrorHandler,
  getUsersErrorHandlerSelector,
  getUserByIdErrorHandlerSelector,
  getCardByIdErrorHandlerSelector,
  getCardsErrorHandlerSelector,
};
