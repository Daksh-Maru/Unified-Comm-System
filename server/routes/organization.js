const express = require("express");
const Organization = require("../models/organization"); // The organization model
// const User = require("../models/user"); // Assuming user model is available
const router = express.Router();

// Create new organization
router.post("/create", async (req, res) => {
    const { orgName } = req.body;
    try {
        // Check if the organization already exists
        const existingOrg = await Organization.findOne({ name: orgName });
        if (existingOrg) {
            return res
                .status(400)
                .json({ message: "Organization already exists" });
        }
        // Create the new organization
        const newOrg = new Organization({
            name: orgName,
            users: [], // No users initially
        });

        // Save the organization
        await newOrg.save();
        res.status(200).json(newOrg);
    } catch (err) {
        console.error("Error creating organization:", err);
        res.status(500).json({ message: "Server error" });
    }
});
// In your organization routes file (e.g., routes/organization.js)
router.post("/assign", async (req, res) => {
    const { orgName, userId, position } = req.body;

    try {
        const org = await Organization.findOne({ name: orgName });

        if (!org) {
            return res.status(404).json({ message: "Organization not found" });
        }

        // Check if user is already part of it
        if (org.users.some((user) => user.userId === userId)) {
            return res
                .status(400)
                .json({ message: "User already assigned to organization" });
        }

        org.users.push({ userId, position });
        await org.save();

        res.status(200).json({
            message: "User assigned to organization",
            organization: org,
        });
    } catch (err) {
        console.error("Error assigning user:", err);
        res.status(500).json({ message: "Server error" });
    }
});

// Join an existing organization
router.post("/join", async (req, res) => {
    const { orgName, userId, position } = req.body;

    try {
        console.log("Received join request", req.body);
        const org = await Organization.findOne({ name: orgName });
        console.log("Found organization:", org);
        if (!org) {
            return res.status(404).json({ message: "Organization not found" });
        }

        // Check if the user is already part of the organization
        if (
            org.users.some(
                (user) => user.userId.toString() === userId.toString()
            )
        ) {
            console.log("User already in organization:", org);
            return res
                .status(409)
                .json({ message: "User is already part of this organization" });
        }

        // Add the user to the organization
        console.log("User added to organization:", org);
        org.users.push({ userId, position });
        await org.save();

        res.status(200).json(org);
    } catch (err) {
        console.error("Error joining organization:", err);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
