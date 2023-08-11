module.exports = (action) => async (req, res, next) =>
  Promise.resolve(action(req, res, next)).catch(next);
