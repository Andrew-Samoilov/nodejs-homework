const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { ctrlWrapper, HttpError } = require("../helpers");
const { User } = require("../models/users");

const { SECRET_KEY } = process.env;

const register = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        throw HttpError(409, "Email in use");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const result = await User.create({ ...req.body, password: hashPassword });

    res.status(201).json({
        email: result.email,
        subscription: "starter",
    })
}

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw HttpError(401);
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
        throw HttpError(401);
    }

    const { _id: id, subscription } = user;

    const payload = {
        id,
    }

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
    await User.findByIdAndUpdate(id, { token });

    res.json({
        token,
        users: {
            email,
            subscription,
        }
    })
}

module.exports = {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
    // getCurrent: ctrlWrapper(getCurrent),
    // logout: ctrlWrapper(logout),
}
