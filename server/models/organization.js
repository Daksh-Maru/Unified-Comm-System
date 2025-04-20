const mongoose = require("mongoose");

const organizationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true, // Ensure the organization name is unique
    },
    users: [
        {
            userId: {
                type: String,
            },
            position: String, // The position of the user in the organization
        },
    ],
});

const Organization = mongoose.model("Organization", organizationSchema);
module.exports = Organization;
