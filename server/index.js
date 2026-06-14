const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 4003;

app.use(cors());
app.use(express.json());

// Basic health
app.get('/api/health', (req, res) => res.json({ok: true, env: process.env.NODE_ENV || 'dev'}));

// POST /api/contact expects { name, email, subject, message }
app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body || {};
  if (!name || !email || !message) return res.status(400).json({ error: 'name, email and message are required' });

  // Use SMTP credentials from environment variables for production use.
  // If not provided, create a nodemailer test account (Ethereal) so you can preview messages during development.
  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpPort = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined;

  try {
    let transporter;

    if (smtpHost && smtpUser && smtpPass) {
      transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort || 587,
        secure: smtpPort === 465,
        auth: { user: smtpUser, pass: smtpPass }
      });
    } else {
      // No SMTP configured — create a test account so messages are previewable (Ethereal)
      const testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: testAccount.smtp.host,
        port: testAccount.smtp.port,
        secure: testAccount.smtp.secure,
        auth: { user: testAccount.user, pass: testAccount.pass }
      });
      console.log('No SMTP configured — using Ethereal test account. Preview messages at the URL logged after sending.');
    }

    const mail = {
      from: `${name} <${email}>`,
      to: process.env.CONTACT_TO || process.env.SMTP_USER || 'your@email.com',
      subject: subject || `New contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject || '-'}\n\nMessage:\n${message}`,
      html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Subject:</strong> ${subject || '-'}</p><p><strong>Message</strong><br/>${message.replace(/\n/g,'<br/>')}</p>`
    };

    const info = await transporter.sendMail(mail);
    // If test account used, provide the preview URL
    const preview = nodemailer.getTestMessageUrl ? nodemailer.getTestMessageUrl(info) : null;
    if (preview) console.log('Preview URL:', preview);

    return res.json({ ok: true, info, preview });
  } catch (err) {
    console.error('Mail send error', err);
    return res.status(500).json({ error: 'Failed to send message' });
  }
});

app.listen(PORT, () => console.log(`Contact server listening on http://localhost:${PORT}`));
