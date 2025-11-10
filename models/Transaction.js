// models/Transaction.js
const mongoose = require("mongoose");

const txnSchema = new mongoose.Schema({
  txn_id: { type: String, required: true, unique: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  to_account: { type: String, required: true },    // beneficiary account or number
  ifsc: { type: String },                           // optional
  beneficiary_name: { type: String },
  amount: { type: Number, required: true },
  balance_before: { type: Number, required: true },
  balance_after: { type: Number, required: true },
  hour: Number,
  day: Number,
  txns_last_24h: Number,
  avg_amount_7d: Number,
  location_delta_km: Number,
  is_foreign_device: { type: Number, default: 0 },
  is_fraud: { type: Boolean, default: false },
  fraud_reason: { type: String, default: null },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Transaction", txnSchema);
