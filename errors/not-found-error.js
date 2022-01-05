function onFailNotFoundError(queryFailSelector) {
  const error = new Error(`Requested ${queryFailSelector} not found`);
  error.statusCode = 404;
  throw error;
}

module.exports = onFailNotFoundError;
