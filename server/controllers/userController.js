const userModel = require("../models/userModel");
const {check, validationResult} = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.profile = async(req, res, next) =>{
    const {username} = req.body;
    const user = await userModel.findOne({username: username});
    if (!user) {
        res.json({ message: "User not found", status: false });
        return;
    } 
    res.json({status: true, user});
};


exports.getalluser = async(req, res, next) =>{
    const user = await userModel.find({});
    res.json(user);
};

exports.verify_account = async(req, res, next) =>{
    const {token} = req.body;
    jwt.verify(token, process.env.jwt_key, async (err, valid_token) => {
        if (err) {
            res.json({ status: false });
            return;
        }
        const id = valid_token.id;
        const findAccount = await userModel.findById(id);
        if (!findAccount) {
            res.json({ status: false });
            return;
        }
        res.json({
            status: true,
            username: findAccount.username,
            email: findAccount.email,
            lastname: findAccount.lastname,
            firstname: findAccount.firstname,
            role: findAccount.role
        });
    });
};

exports.login = async(req, res, next) =>{
    const { username, password } = req.body;

    const error = validationResult(req);

    if (!error.isEmpty()) {
        res.json({ error: error.array(), error_type: 0 });
        return;
    }

    const findone = await userModel.findOne({ username: username });

    if (!findone) {
        res.json({ message: "Invalid account", error_type: 1 });
        return;
    }

    await bcrypt.compare(password, findone.password, (err, isValid) => {
        if (isValid) {
            const id = findone._id;
            const token = jwt.sign({ id }, process.env.jwt_key, {
                expiresIn: "7d",
            });
            res.cookie("jwt_token", token).status(200).send({ message: "Logged-in !!!", token, created: true });
        } 
        else {
            res.json({ message: "Incorrect Password", error_type: 2, created: false });
        }
    });
};

exports.register = async(req, res, next) =>{
    const {firstname, lastname, username, email, password, confirm_password} = req.body;
    
    const error = validationResult(req);

    if(!error.isEmpty()){
        res.json({error: error.array() });
        return;
    }
    const findOne_username = await userModel.findOne({ username: username });
    const findOne_email = await userModel.findOne({ email: email });

    if (findOne_username) {
        res.json({
            message: "Username already exist",
            error_type: 1,
            created: false,
        });
        return;
    }

    if (findOne_email) {
        res.json({
            message: "Email already exist",
            error_type: 1,
            created: false,
        });
        return;
    }

    if (password !== confirm_password) {
        res.json({
            message: "Bith password do not match",
            error_type: 1,
            created: false,
        });
        return;
    }
    const user = new userModel({
        firstname,
        lastname,
        email,
        username,
        password,
        role : 'normal',
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    user.save().then((doc) =>{
        const id = doc._id;
        const token = jwt.sign({ id }, process.env.jwt_key, { expiresIn: "7d" });
        res.cookie("jwt_token", token).status(201).send({ id, created: true, token, message: "Registered Successfully!!!" });
    });
    // res.json({message: "No Err" });
};

exports.updateinfor = async (req, res, next) => {
    try {
        const { username } = req.params;
        const updateData = req.body;
        const email = updateData.email;
        const findOne_email = await userModel.findOne({ email: email });
        if (findOne_email) {
            res.json({
                message: "Email already exist!",
                error_type: 1,
                created: false,
            });
            return;
        }
        const updatedUser = await userModel.findOneAndUpdate(
            { username }, 
            updateData, { new: true,
        });
        res.json({message: "update successfully", updatedUser, error_type:0});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error'});
    }
};

exports.updatepass = async (req, res, next) => {
    try {
        const { username } = req.params;
        const updateData = req.body;
        const updatedUser = await userModel.findOneAndUpdate(
            { username }, 
            updateData, { new: true,
        });
        res.json({updatedUser});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error_type: 1});
    }
};

exports.delete = async(req, res) =>{
    const {id} = req.params;
    
    await userModel.findByIdAndDelete(id).then((user) =>{
        if(!user){
            res.status(404).send("Can not delete!!! May be wrong id");
        }
        else{
            res.send({
                message:"User was deleted successfully!",
                error_type:1
            });
        }
    }).catch(err =>{
        res.status(500).send({
            message: "Could not delte User with id: " + id
        });
    });
};