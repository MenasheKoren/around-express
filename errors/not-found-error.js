function documentNotFoundErrorHandler(queryFailSelector) {
  const ERROR_CODE = new Error(`Requested ${queryFailSelector} not found`);
  ERROR_CODE.statusCode = 404;
  ERROR_CODE.name = 'DocumentNotFoundError';
  throw ERROR_CODE;
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
