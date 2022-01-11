const { ERROR_CODE_400 } = require('./error-constants');

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
const userProfileDataErrorHandlerSelector = 'User profile';
const userAvatarDataErrorHandlerSelector = 'User avatar';

const cardDataErrorHandlerSelector = 'Card';

const createActionFailSelector = 'created';
const updateActionFailSelector = 'updated';
const deleteActionFailSelector = 'deleted';
const likeActionFailSelector = 'liked';
const dislikeActionFailSelector = 'disliked';

module.exports = {
  invalidDataPassedErrorHandler,
  userDataErrorHandlerSelector,
  cardDataErrorHandlerSelector,
  createActionFailSelector,
  updateActionFailSelector,
  deleteActionFailSelector,
  likeActionFailSelector,
  dislikeActionFailSelector,
  userProfileDataErrorHandlerSelector,
  userAvatarDataErrorHandlerSelector,
};
