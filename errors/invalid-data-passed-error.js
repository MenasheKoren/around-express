function invalidDataPassedErrorHandler(dataFailSelector, actionFailSelector) {
  const error = new Error(`${dataFailSelector} not ${actionFailSelector}`);
  error.statusCode = 400;
  throw error;
}

const userDataErrorHandlerSelector = 'User';

const cardDataErrorHandlerSelector = 'Card';

const createActionFailSelector = 'created';
const updateActionFailSelector = 'updated';
const deleteActionFailSelector = 'deleted';

module.exports = {
  invalidDataPassedErrorHandler,
  userDataErrorHandlerSelector,
  cardDataErrorHandlerSelector,
  createActionFailSelector,
  updateActionFailSelector,
  deleteActionFailSelector,
};
