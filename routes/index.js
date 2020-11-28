const authRoutes = require("./auth")
const savedRoutes = require("./saved")
const express = require('express');
const router = express.Router();
const Token = require("../models/token");

// write a function that checks the users token to match the existing token
function checkToken(req, res, next) {
   const token = req.get("token")
    if (token) {
        Token.findOne({
            current: token
        })
            .then(dbToken => {
                return next()
            })
            .catch(error => {
                return res.status(403).json({ error })
            })
    }
    return res.status(403).json({ error:"you must have a valid token" })
}
router.use("/auth",authRoutes)
router.use("/saved",checkToken,savedRoutes)

module.exports = router