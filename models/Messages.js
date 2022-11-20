const mongoose = require("mongoose");

const Messages = mongoose.model("Messages", {
    conversation: mongoose.Schema.Types.ObjectId,

    message: { type: String, required: true },
    sender: {
        type: String,
        enum: ["operator", "visitor"],
        required: true,
    },
});

module.exports = Messages;
