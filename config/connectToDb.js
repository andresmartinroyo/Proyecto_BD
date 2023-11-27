//Load env variables
if (process.env.NODE_URL != "production") {
  require("dotenv").config();
}

// getting-started.js
const mongoose = require("mongoose");

async function connectToDb() {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Se conecto");
  } catch (err) {
    console.log(err);
  }
}

module.exports = connectToDb;
