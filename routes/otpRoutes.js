const express = require("express");
const router = express.Router();
const Otp = require("../models/Otp");

// Send OTP (simulated)
router.post("/send", async (req, res) => {
  const { phone } = req.body;
  if (!phone) return res.status(400).json({ error: "Phone required" });

  const code = Math.floor(1000 + Math.random() * 9000).toString();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 min expiry

  await Otp.create({ phone, code, expiresAt });

  // For demo, return OTP in response (in production, send via SMS)
  res.json({ message: "OTP sent successfully", otp: code });
});

// Verify OTP
router.post("/verify", async (req, res) => {
  const { phone, code } = req.body;
  if (!phone || !code)
    return res.status(400).json({ error: "Phone and code required" });

  const record = await Otp.findOne({ phone, code, used: false })
    .sort({ createdAt: -1 })
    .exec();

  if (!record) return res.status(400).json({ error: "Invalid OTP" });
  if (record.expiresAt < new Date())
    return res.status(400).json({ error: "OTP expired" });

  record.used = true;
  await record.save();

  // OTP verified successfully
  res.json({ message: "OTP verified successfully" });
});

module.exports = router;
