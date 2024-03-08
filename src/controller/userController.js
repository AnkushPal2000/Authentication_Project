const userModel = require('../models/user');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");


dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

const signup = async (req, resp) => {

    /*
    Existing User Check
    Hashed Password
    User Creation
    Token Generate
    */

    const { username, email, password } = req.body;
    try {

        const existingUser = await userModel.findOne({ email: email });
        if (existingUser) {
            return resp.status(400).json({ message: "User Already exist" })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await userModel.create({
            email: email,
            password: hashedPassword,
            username: username
        });

        const token = jwt.sign({ email: result.email, id: result._id }, SECRET_KEY)

        resp.status(200).json({ user: result, token: token })

    } catch (error) {
        console.log("Server Internal Error", error);
        resp.status(500).json({ message: "Something is went wrong" })
    }

}

const signin = async (req, resp) => {
    const { email, password } = req.body;
    try {
        const existingUser = await userModel.findOne({ email: email });
        if (!existingUser) {
            return resp.status(400).json({ message: "User Not Found" })
        }

        const matchPassword = await bcrypt.compare(password, existingUser.password)

        if (!matchPassword) {
            resp.status(400).json({ message: "Invalid Credential" })
        }

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, SECRET_KEY)

        resp.status(200).json({ user: existingUser, token: token })

    } catch (error) {
        console.log("Server Internal Error", error);
        resp.status(500).json({ message: "Something is went wrong" })
    }
}


module.exports = { signup, signin }