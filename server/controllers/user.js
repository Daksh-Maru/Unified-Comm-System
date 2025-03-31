const userModel = require("../models/user");

let createUser = async (req, res) => {
    try {
        const newUser = await userModel.create({
            name: "John Doe",
            email: "jd326@gmail.com",
            username: "johndoe",
        });
        console.log(newUser);
        res.status(201).send(newUser);
    } catch (err) {
        console.log(err);
        res.status(500).send("Error creating user");
    }
};

let readUser = async (req, res) => {
    const allUsers = await userModel.find();
    res.send(allUsers);
};

let updateUser = async (req, res) => {
    const updatedUser = await userModel.findOneAndUpdate(
        { name: "John Doe" },
        { name: "jhonny Doe" },
        { new: true }
    );
    res.send(updatedUser);
};

let deleteUser = async (req, res) => {
    const deletedUser = await userModel.findOneAndDelete({
        name: "jhonny Doe",
    });
    res.send(deletedUser);
};

module.exports = {
    createUser,
    readUser,
    updateUser,
    deleteUser,
};
