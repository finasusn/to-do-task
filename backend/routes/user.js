const router = require('express').Router();
const User = require("../models/user.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//signup
router.post("/signup", async (req, res) => {
    try{
        const { username } = req.body;
        const { email } = req.body;
            const existingUser = await User.findOne({ username: username});
            const existingEmail = await User.findOne({ email: email });

        if (existingUser) {
            return res.status(400).json({ message:"Username already exists"});
        } else if (username.length < 3) {
            return res.status(400).json({ message:"Username must be at least 4 characters long"});
        }

        if (existingEmail) {
            return res.status(400).json({ message:"Email already exists"});
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 6);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password:  hashedPassword,
        });
        await newUser.save();
        return res.status(200).json({ message: "User signup successfully"});
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message:"Signup failed"});
    }
});

//login
router.post('/login', async (req, res) => {
    try{
        const { username } = req.body;
        const { email } = req.body;
        const { password } = req.body;
        const existingUser = await User.findOne({ username: username});
        if (!existingUser) {
            return res.status(400).json({ message:"Username does not exist"});
        }
        const existingEmail = await User.findOne({ email: email });
        if (!existingEmail) {
            return res.status(400).json({ message:"Email does not exist"});
        }
        bcrypt.compare(password, existingUser.password, (err, data) => {
            if (data) {
                const authClaims = [{ name: username}, {jti: jwt.sign({}, `${process.env.SECRET_KEY}`)}];
                const token = jwt.sign({ authClaims},`${process.env.SECRET_KEY}`, {expiresIn: "1d"});
                return res.status(200).json({ message: "User login successfully", token: token, id: existingUser._id});
            } else {
                return res.status(400).json({ message:"Invalid password"});
            }
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message:"Login failed"});
    }
});

module.exports = router;