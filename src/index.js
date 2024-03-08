const express = require("express");
const app = express();
const userRouter = require('./routes/userRoutes')
const noteRouter = require('./routes/noteRoutes')
const db = require("./db/db.config");
const dotenv = require("dotenv");
const cors = require('cors')

// const morgan = require("morgan");

dotenv.config();

//Always put this file above the routes
app.use(express.json());
// app.use(morgan("dev"));
app.use(cors());

/*
Simple Middleware to check which method or what is it.
app.use((req, resp, next) => {
    console.log("HTTP method" + req.method + "Request URL" + req.url);
    resp.send("Done")
    next()
})
*/

app.use("/users", userRouter);
app.use("/notes", noteRouter);

const mongoose = require("mongoose");

app.get("/", (req, resp) => {
    resp.send("Authentication and JSON WEB TOKEN Tutorial");
})

// mongoose.connect("mongodb://127.0.0.1:27017/test")
//     .then(() => {
//         console.log("Database Connect Successfully!!");
//     })
//     .catch((error) => {
//         console.log("Database Connectin Failed: ", error);
//     })

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is Connected through this port: http://localhost:${PORT}`);
});
