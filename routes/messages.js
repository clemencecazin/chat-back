const express = require("express");
const router = express.Router();
const Conversation = require("../models/Conversation");
const Messages = require("../models/Messages");

router.post("/add/messages", async (req, res) => {
    try {
        const newMessage = new Messages({
            conversation: req.query.id,
            message: req.fields.message,
            sender: req.fields.sender,
        });

        await newMessage.save();

        const conversation = await Conversation.findById(
            newMessage.conversation
        );

        conversation.messages = [...conversation.messages, newMessage._id];
        await conversation.save();

        res.status(200).json(newMessage);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
