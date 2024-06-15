const { User } = require("../models/user.model");

exports.createUser = async (req, res) => {
    try {
        const alreadyExist = await User.findOne({ email: req.body.email });
        if (!alreadyExist) {
            const { userName, password } = req.body;
            const userData = await User.create(req.body);
            res.status(200).send('User created successfully', userData);
        } else {
            res.status(409).send('User already exist');
        }
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal server error');
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
