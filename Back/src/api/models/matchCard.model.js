const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const matchcardchema = new Schema(
  {
    id_users: [
      { type: Schema.Types.ObjectId, ref: "users", required: true },
    ],
    id_users_match: [
      { type: Schema.Types.ObjectId, ref: "users", required: true },
    ],
    roomid: { type: String, required: false },
    matchConfirm: { type: Boolean, required: false },
  },
  { timestamps: true }
);

const MatchCard = mongoose.model("MatchCard", matchcardchema);

module.exports = MatchCard;