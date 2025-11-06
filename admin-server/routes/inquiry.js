const express = require("express");
const nodemailer = require("nodemailer");
const multer = require("multer");
const Inquiry = require("../models/inquiry");

const router = express.Router();

// Multer setup for attachments (up to 3 files in memory)
const upload = multer({ storage: multer.memoryStorage() });

/**
 * POST /api/inquiries
 * Body: name, email, subject, message
 * Files: attachments (0..3)
 */
router.post("/", upload.array("attachments", 3), async (req, res) => {
  try {
    // 1) Save inquiry to MongoDB
    const inquiry = new Inquiry({
      name: req.body.name,
      email: req.body.email,
      subject: req.body.subject,
      message: req.body.message,
      createdAt: new Date(),
    });
    await inquiry.save();

    // 2) Build transporter from your .env
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = parseInt(process.env.SMTP_PORT, 10);
    const smtpSecure = String(process.env.SMTP_SECURE).toLowerCase() === "true";
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    // Helpful debug (won't expose password)
    console.log("SMTP Config (debug):", {
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      user: smtpUser,
    });

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure, // true for 465, false for 587
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    // ✅ Safe to log *after* creation
    console.log("Transporter Options (after create):", transporter.options);

    // 3) Verify SMTP connection first (good for catching config issues)
    await transporter.verify();
    console.log("✅ SMTP verified and ready");

    // 4) Build mail
    const mailOptions = {
      from: `"${process.env.FROM_NAME || "CoinArt India"}" <${smtpUser}>`,
      to: process.env.ADMIN_EMAIL, // you
      subject: req.body.subject || "New Inquiry from CoinArt",
      text: [
        "New inquiry received:",
        "",
        `Name: ${req.body.name}`,
        `Email: ${req.body.email}`,
        `Subject: ${req.body.subject}`,
        "Message:",
        req.body.message,
      ].join("\n"),
      attachments: (req.files || []).map((f) => ({
        filename: f.originalname,
        content: f.buffer,
      })),
    };

    // 5) Send mail
    await transporter.sendMail(mailOptions);
    console.log("📧 Inquiry email sent to admin");

    res.json({ success: true, inquiry });
  } catch (err) {
    console.error("Inquiry error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
