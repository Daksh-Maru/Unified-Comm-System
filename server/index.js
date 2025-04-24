const express = require("express");
const app = express();
const userModel = require("./models/user");
const loadDotenv = require("./configs/dotenv");
const connectDB = require("./configs/db");
const userRouter = require("./routes/user");
const cookieParser = require("cookie-parser");
const organizationRouter = require("./routes/organization.js");
const clerkUserRouter = require("./routes/clerkUsers.js");
const financeRouter = require("./routes/finance.js");
const cors = require("cors");

loadDotenv();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
    cors({
        origin: "http://localhost:5173", // Replace with your frontend URL
        credentials: true, // Allow credentials (cookies, authorization headers, etc.)
    })
);

const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => {
    res.send("Hello World! This is a simple server response.");
});
app.use("/user", userRouter);
app.use("/organization", organizationRouter);
app.use("/clerkUser", clerkUserRouter);
app.use("/finance", financeRouter);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});