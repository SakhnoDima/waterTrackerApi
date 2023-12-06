const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo");
const uuidv4 = require("uuid").v4;
const logger = require("morgan");
const cors = require("cors");
const path = require("path");
const swaggerUi = require("swagger-ui-express");
require("dotenv").config();

const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const waterRouters = require("./routes/water");
const swaggerDocument = require("./swagger.json");
const { LIFETIME } = require("./constant/constant");
const secret = uuidv4();
const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use(cookieParser(secret));
app.use(
  session({
    secret: secret,
    resave: false,
    saveUninitialized: false,
    name: process.env.SESSION_NAME || "waterTracker",
    store: new MongoStore({
      mongoUrl: process.env.DB_HOST,
      ttl: LIFETIME,
    }),
    cookie: {
      maxAge: LIFETIME,
    },
  })
);

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/water", waterRouters);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//is google auth example
app.use("/api/google", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/link.html"));
});
app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
