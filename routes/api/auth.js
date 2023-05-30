const express = require("express");

const router = express.Router();

const authControllers = require("../../controllers/auth-controllers");
const { schemas } = require("../../models/users");

const { validateBody } = require("../../middlewares");

// signup
router.post("/users/register", validateBody(schemas.userRegisterSchema), authControllers.register);

// // signin
// router.post("/login", validateBody(schemas.userLoginSchema), authControllers.login);

// router.get("/current", authenticate, authControllers.getCurrent);

// router.post("/logout", authenticate, authControllers.logout);

module.exports = router;