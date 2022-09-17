import mongoose from "mongoose";

const ConnectDB = async () => {
  await mongoose
    .connect(process.env.mongo_url, {})
    .then((conn) => {
      console.log(
        `Database is connected to:${conn.connection.host}`.cyan.underline.bold
      );
    })
    .catch((err) => {
      console.log(err, "unable to connect database");
    });
};

export default ConnectDB;
