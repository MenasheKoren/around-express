function invalidDataPassedErrorHandler(dataFailSelector, actionFailSelector) {
  const ERROR_CODE = new Error(`${dataFailSelector} not ${actionFailSelector}`);
  ERROR_CODE.statusCode = 400;
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
