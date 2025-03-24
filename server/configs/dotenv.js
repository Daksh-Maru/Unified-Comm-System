const dotenv = require("dotenv");

let loadEnv = () => {
    dotenv.config();
    if (!process.env.Mongo_URI) {
        throw new Error("Missing MONGO URI in environment variables.");
    }
};

module.exports = loadEnv;
