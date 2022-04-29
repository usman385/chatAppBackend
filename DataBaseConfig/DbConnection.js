const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectdB = () => {
  const connection = mongoose
    .connect(
      "mongodb+srv://usman386:usman123@cluster0.dkeb7.mongodb.net/mySecondDatabase?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => {
      return console.log("Data base is connected....");
    })

    .catch((error) => {
      console.log("Error connecting to database: ", error.message);
      return process.exit(1);
    });
};

module.exports = connectdB;
