const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const usersRoute = require("./routes/users");
const postsRoute = require("./routes/posts");
const catRoute = require("./routes/categories");


dotenv.config();
app.use(express.json());

mongoose
.connect(process.env.MONGO_URL, {
    // useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
})
.then(console.log("Connected to the server"))
.catch((err) => console.log(err));

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/posts", postsRoute);
app.use("/api/categories", catRoute);

app.listen("5000", () => {
    console.log("Backend in running.");
});