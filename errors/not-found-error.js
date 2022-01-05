function onFailNotFoundErrorHandler(queryFailSelector) {
  const error = new Error(`Requested ${queryFailSelector} not found`);
  error.statusCode = 404;
  throw error;
}

const getUsersErrorHandlerSelector = 'users';
const getUserByIdErrorHandlerSelector = 'user with that Id';

const getCardsErrorHandlerSelector = 'cards';
const getCardByIdErrorHandlerSelector = 'card with that Id';

module.exports = {
  onFailNotFoundErrorHandler,
  getUsersErrorHandlerSelector,
  getUserByIdErrorHandlerSelector,
  getCardByIdErrorHandlerSelector,
  getCardsErrorHandlerSelector,
};
