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
    const conversationStatus = await Conversation.findById(req.params.id);

    try {
        if (conversationStatus) {
            if (messagesConversation) {
                await conversationStatus.populate("messageConversation");
            }
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

router.delete("/conversation/delete/:id", async (req, res) => {
    try {
        messagesConversationToDelete = await Messages.deleteMany({
            conversation: { $in: req.params.id },
        });

        conversationToDelete = await Conversation.findByIdAndDelete(
            req.params.id
        );

        console.log(messagesConversationToDelete);

        res.status(200).json("Conversation deleted successfully !");
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
