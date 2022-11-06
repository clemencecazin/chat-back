const mongoose = require("mongoose");

const Messages = mongoose.model("Messages", {
    conversation: mongoose.Schema.Types.ObjectId,
    messages: {
        message: { type: Array, required: true },
        sender: {
            type: String,
            enum: ["operator", "visitor"],
            required: true,
        },
    },
});

module.exports = Messages;
