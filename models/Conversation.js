const mongoose = require("mongoose");

const Conversation = mongoose.model("Conversation", {
    active: {
        type: Boolean,
        default: true,
    },
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Messages",
        },
    ],
});

module.exports = Conversation;
