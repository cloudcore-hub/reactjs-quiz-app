// populateDB.js
require("dotenv").config();
const mongoose = require("mongoose");

const Question = require("./Question"); // Adjust the path as necessary to your Question model
const { data } = require("./data"); // Adjust the path to where your data.js file is located

const mongoURI = process.env.MONGO_URI;
// const mongoURI = 'mongodb+srv://${username}:${password}@cluster0.3x0s7hh.mongodb.net/?appName=mongosh+2.1.5';

mongoose
  .connect(mongoURI)
  .then(() => console.log("MongoDB connection established"))
  .catch((err) => console.error("MongoDB connection error:", err));

const importData = async () => {
  try {
    await Question.deleteMany(); // Optional: clear the collection before insertion
    await Question.insertMany(data);
    console.log("Data successfully imported to MongoDB!");
    mongoose.disconnect();
  } catch (error) {
    console.error("Error importing data:", error);
    mongoose.disconnect();
  }
};

importData();
