const emailRegex = /[a-z0-9]+@+[a-z]+[\./]+[a-z]{2,3}/;

const gender = { male: "male", female: "female" };

const tokenExpires = 23;

const httpErrors = {
  400: "Bad Request!",
  401: "Not authorized!",
  403: "Forbidden!",
  404: "Not Found!",
  409: "Conflict!",
};

module.exports = {
  emailRegex,
  gender,
  httpErrors,
  tokenExpires,
};
