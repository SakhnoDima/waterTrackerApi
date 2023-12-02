const queryString = require("querystring");
const axios = require("axios");

const stringifiedParams = queryString.stringify({
  client_id: process.env.GOOGLE_CLIENT_ID,
  redirect_uri: `${process.env.BASE_URL}/api/auth/google-redirect`,
  scope: [
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
  ].join(" "),
  response_type: "code",
  access_type: "offline",
  prompt: "consent",
});

const getUserFromGoogle = async (url) => {
  const urlObj = new URL(url);
  const urlParams = queryString.parse(urlObj.search);
  const code = Object.values(urlParams);

  const tokenData = await axios({
    url: `https://oauth2.googleapis.com/token`,
    method: "post",
    data: {
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: `${process.env.BASE_URL}/api/auth/google-redirect`,
      grant_type: "authorization_code",
      code: code[0],
    },
  });

  const userData = await axios({
    url: "https://www.googleapis.com/oauth2/v2/userinfo",
    method: "get",
    headers: {
      Authorization: `Bearer ${tokenData.data.access_token}`,
    },
  });
  return userData;
};

module.exports = {
  stringifiedParams,
  getUserFromGoogle,
};
