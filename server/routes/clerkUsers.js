const express = require("express");
const { clerkClient } = require("@clerk/clerk-sdk-node");
const router = express.Router();


router.get("/", async (req, res) => {
    try {
        // getUserList returns an array of user objects
        const users = await clerkClient.users.getUserList({
            limit: 100,
            orderBy: "-created_at",
        });

        if (!Array.isArray(users)) {
            return res.status(500).json({
                error: "Invalid users data format from Clerk SDK",
                received: users,
            });
        }

        const simplified = users.map((user) => ({
            id: user.id,
            name:
                user.firstName ||
                user.username ||
                user.emailAddresses?.[0]?.emailAddress ||
                "No Name",
            email: user.emailAddresses?.[0]?.emailAddress || "",
        }));

        res.json(simplified);
    } catch (err) {
        console.error("Error fetching Clerk users:", err);
        res.status(500).json({
            error: "Failed to fetch users",
            details: err.message,
        });
    }
});

module.exports = router;
