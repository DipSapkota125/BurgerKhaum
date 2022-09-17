import app from "./app.js";
import colors from "colors";
import Razorpay from "razorpay";

export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

//server working
app.get("/", (req, res, next) => {
  res.send("<h2>Server is working</h2>");
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(
    `server is running at port:${PORT},in ${process.env.NODE_ENV} MODE`.cyan
      .underline.bold
  );
});
