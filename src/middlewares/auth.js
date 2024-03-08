const jwt = require("jsonwebtoken")
const SECRET_KEY = process.env.SECRET_KEY;

const auth = (req, resp, next) => {
    try {
        let token = req.headers.authorization;
        if (token) {

            token = token.split(" ")[1];

            let user = jwt.verify(token, SECRET_KEY);
            req.userId = user.id;

        }
        else {
            return resp.status(401).json({ message: "Unauthorized User 20" })
        }
        next();

    } catch (error) {
        console.log(error);
        resp.status(401).json({ message: "Unauthorized User" })
    }
}

module.exports = auth;