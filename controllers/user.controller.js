const { User } = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//sign up
exports.createUser = async (req, res) => {
    console.log("something");
    try {
        const alreadyExist = await User.findOne({ userName: req.body.userName });
        if (!alreadyExist) {
            const { userName, password } = req.body;
            const encrypted = bcrypt.hashSync(password, 10);
            const toSave = {
                userName,
                password:encrypted,
            };
            const userData = await User.create(toSave);
            res.status(200).json({ message: 'User created successfully', userData });
        } else {
            res.status(409).send('User already exists');
        }
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal server error');
    }
};

// sigin in     

exports.signIn = async(req, res)=>{
    try {
        const alreadyExist = await User.findOne({userName: req.body.userName});
        if(alreadyExist){
            const validate = bcrypt.compare(req.body.password, alreadyExist.password);
            if(validate){
                const secret = "secret"
                const token = jwt.sign({id:alreadyExist._id},secret);
                res.status(200).json({message:'User signed in successfully',token});
            }else {
                res.status(400).json({message: "Password is incorrect", error});
            }
           
        }
    } catch (error) {
        res.status(error.statusCode).json({message});
    }
} 

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal server error');
    }
}

// Get user by id
exports.getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.status(200).json(user);
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal server error');
    }
}

// Update user
exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedUser) {
            return res.status(404).send('User not found');
        }
        res.status(200).json({ message: "User updated successfully", updatedUser });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error updating user", error: err });
    }
}

// Delete user
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).send('User not found');
        }
        res.status(200).json({ message: "User deleted successfully", deletedUser });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error deleting user", error: err });
    }
}
