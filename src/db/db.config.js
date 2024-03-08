const mongoose = require("mongoose")
const dotenv = require("dotenv");
dotenv.config();

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Database Connect Successfully!!");
    })
    .catch((error) => {
        console.log("Database Connectin Failed: ", error);
    })