const bcrypt = require("bcrypt");
const { ctrlWrapper, HttpError } = require("../helpers");
const { User } = require("../models/users");

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

module.exports = {
    register: ctrlWrapper(register),
    // login: ctrlWrapper(login),
    // getCurrent: ctrlWrapper(getCurrent),
    // logout: ctrlWrapper(logout),
}
