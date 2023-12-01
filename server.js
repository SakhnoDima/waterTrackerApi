const mongoose = require("mongoose");

const app = require("./app");

const { DB_HOST, PORT } = process.env;

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(
    app.listen(PORT || 3000, () => {
      console.log(
        ` ===== Database connection successful on port ${PORT} ==== `
      );
    })
  )
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
