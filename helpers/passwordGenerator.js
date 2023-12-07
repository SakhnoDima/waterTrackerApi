const generator = require("generate-password");
const { passOption } = require("../constant/constant");

const passwordGenerator = async () => generator.generate(passOption);

module.exports = passwordGenerator;
