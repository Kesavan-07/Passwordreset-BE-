require(dotenv).config();
const MONGO_URI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET;
const password = process.env.password;
const port = process.env.port;

module.exports = {
    MONGO_URI,
    JWT_SECRET,
    password,
    port
};
