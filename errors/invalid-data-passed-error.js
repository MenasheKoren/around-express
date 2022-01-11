const ERROR_CODE_400 = 400;
function invalidDataPassedErrorHandler(
  dataFailSelector,
  actionFailSelector,
  res,
  err,
) {
  res.status(ERROR_CODE_400).send({
    message: `${dataFailSelector} not ${actionFailSelector}. ${err}`,
  });
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
