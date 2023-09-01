const createError = require("http-errors");

function Error(req, res, next) {
  next(createError.NotFound());
}
function handlingError(error, req, res, next) {
  res.json({
    error: {
      status: error.status,
      message: error.message,
    },
  });
}

module.exports = {
  Error,
  handlingError,
};
