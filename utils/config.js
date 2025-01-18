require('dotenv').config();

const MONGODB_URI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET;
const password = process.env.PASSWORD;
const PORT = process.env.PORT;

module.exports = {
  MONGODB_URI,
  JWT_SECRET,
  password,
  PORT,
};
