const express = require('express');
const User = require('../models/Users');
const router = express.Router();
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const JWT_SECRET = "Manishisagoodboy";
const fetchUser = require('../middleware/fetchUser');

const { body, validationResult } = require('express-validator');

// ROUTE 1: Create a User using: POST "/api/auth/". Doesn't require Auth
router.post('/',
    [
        body('name', 'Enter a valid name').isLength({ min: 3 }),
        body('email', 'Enter a valid email').isEmail(),
        body('password', 'Enter a valid password').isLength({ min: 5 }),
    ],
    async (req, res) => {
        let success = false;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() });
        }

        try {
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({ success, error: "Sorry a user with this email already exists" });
            }

            const salt = await bcrypt.genSalt();
            const secPass = await bcrypt.hash(req.body.password, salt);

            user = await User.create({
                name: req.body.name,
                password: secPass,
                email: req.body.email
            });

            const data = {
                user: {
                    id: user.id
                }
            };
            const authToken = jwt.sign(data, JWT_SECRET);
            
            success = true;
            res.json({ success, authToken });

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Some error occurred");
        }
    }
);

// ROUTE 2: Authenticate a user using: POST "/api/auth/login"
router.post('/login',
    [
        body('email', 'Enter a valid email').isEmail(),
        body('password', 'Password cannot be blank').exists(),
    ],
    async (req, res) => {
        let success = false;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ success, error: 'Please try to login with correct credentials' });
            }

            const passwordCompare = await bcrypt.compare(password, user.password);
            if (!passwordCompare) {
                return res.status(400).json({ success, error: 'Please try to login with correct credentials' });
            }

            const data = {
                user: {
                    id: user.id
                }
            };
            const authToken = jwt.sign(data, JWT_SECRET);
            
            success = true;
            res.json({ success, authToken });

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Some error occurred");
        }
    }
);

// ROUTE 3: Get logged-in user details using: POST "/api/auth/getUser". Login required
router.post('/getUser', fetchUser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occurred");
    }
});

module.exports = router;