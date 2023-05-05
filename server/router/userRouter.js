const express = require("express");
const router = express.Router();

// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

const { check, validationResult } = require("express-validator");

const userController = require("../controllers/userController");

router.get("/profile", userController.profile);

router.post("/verify_account", userController.verify_account);

router.get("/getalluser", userController.getalluser);

router.post(
    "/login", 
    [
        check("username", "Enter username").not().isEmpty(),
        check("password", "Enter password").not().isEmpty(),
    ],
    userController.login);
    
router.post(
    "/register", 
    [
        check("firstname", "Enter firstname").not().isEmpty(),
        check("lastname", "Enter lastname").not().isEmpty(),
        check("username", "Enter username").not().isEmpty(),
        check("email", "Enter email").not().isEmpty().isEmail(),
        check("password", "Enter Password").not().isEmpty().isLength({ min: 5 }),
        check("confirm_password", "Confirm Password").not().isEmpty(),
    ],
    userController.register);

router.put("/updateinfor/:username",
    [
        check("firstname", "Enter firstname").not().isEmpty(),
        check("lastname", "Enter lastname").not().isEmpty(), 
        check("email", "Enter email").not().isEmpty().isEmail(),
    ], 
    userController.updateinfor);

router.delete("/delete/:id", userController.delete);

module.exports = router;
