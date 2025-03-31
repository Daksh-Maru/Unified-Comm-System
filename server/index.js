const express = require("express");
const app = express();
const userModel = require("./models/user");
const loadDotenv = require("./configs/dotenv");
const connectDB = require("./configs/db");
const userRouter = require("./routes/user");

loadDotenv();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => {
    res.send("Hello World! This is a simple server response.");
});
app.use("/user", userRouter);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
