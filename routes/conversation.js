const express = require("express");
const router = express.Router();
const Conversation = require("../models/Conversation");
const Messages = require("../models/Messages");

router.post("/add/conversation", async (req, res) => {
    try {
        const newConversation = new Conversation({
            active: true,
        });

        await newConversation.save();

        res.status(200).json(newConversation);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.put("/update/conversation/:id", async (req, res) => {
    const conversationStatus = await Conversation.findById(
        req.params.id
    ).populate({
        path: "messages",
    });

    try {
        if (conversationStatus) {
            conversationStatus.active = req.fields.active;
            await conversationStatus.save();

            res.status(200).json(conversationStatus);
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get("/conversation/:id", async (req, res) => {
    try {
        const conversation = await Conversation.findById(
            req.params.id
        ).populate({
            path: "messages",
        });

        res.json(conversation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get("/conversations/", async (req, res) => {
    try {
        const conversations = await Conversation.find().populate({
            path: "messages",
        });

        res.json(conversations);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete("/delete/conversation/:id", async (req, res) => {
    try {
        messagesConversationToDelete = await Messages.deleteMany({
            conversation: { $in: req.params.id },
        });

        conversationToDelete = await Conversation.findByIdAndDelete(
            req.params.id
        );

        res.status(200).json("Conversation deleted successfully !");
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
