import express from "express";
import cors from "cors";
import passport from "passport";
import session from "express-session";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import ConnectDB from "./config/db.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import { connectPassport } from "./utils/Provider.js";

const app = express();
export default app;
app.use(morgan("dev"));

//connect env file
dotenv.config({
  path: "./config/config.env",
});

//Using Middlewares
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,

    cookie: {
      secure: process.env.NODE_ENV === "development" ? false : true,
      httpOnly: process.env.NODE_ENV === "development" ? false : true,
      sameSite: process.env.NODE_ENV === "development" ? false : "none",
    },
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(passport.authenticate("session"));
app.use(passport.initialize());
app.use(passport.session());
app.enable("trust proxy");

//connectpassport
connectPassport();

//database connected
ConnectDB();

//importing routes
import userRoute from "./routes/user.js";
import orderRoute from "./routes/order.js";

app.use("/api/v1", userRoute);
app.use("/api/v1", orderRoute);

//Using Error Middleware
app.use(errorMiddleware);
