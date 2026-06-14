const nodemailer = require('nodemailer');

// Vercel/Lambda handler
module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { name, email, subject, message } = req.body || {};
  if (!name || !email || !message) return res.status(400).json({ error: 'name, email and message are required' });

  // Prefer SendGrid API if SENDGRID_API_KEY is set (recommended)
  const sendgridKey = process.env.SENDGRID_API_KEY;
  if (sendgridKey) {
    try {
      const fetch = globalThis.fetch || (await import('node-fetch')).default;
      const payload = {
        personalizations: [{ to: [{ email: process.env.CONTACT_TO || process.env.SENDGRID_TO || process.env.SENDGRID_FROM }] }],
        from: { email: process.env.SENDGRID_FROM || process.env.CONTACT_TO || process.env.SENDGRID_TO },
        subject: subject || `New contact from ${name}`,
        content: [{ type: 'text/plain', value: `Name: ${name}\nEmail: ${email}\n\n${message}` }]
      };
      const r = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${sendgridKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const respText = await r.text();
      const respHeaders = {};
      r.headers && r.headers.forEach && r.headers.forEach((v,k)=>{ respHeaders[k]=v });
      if (!r.ok) {
        console.error('SendGrid error', { status: r.status, headers: respHeaders, body: respText });
        return res.status(502).json({ error: 'SendGrid failed', status: r.status, headers: respHeaders, body: respText });
      }
      // return headers and any text for debugging (202 responses typically have empty body)
      return res.json({ ok: true, provider: 'sendgrid', status: r.status, headers: respHeaders, body: respText });
    } catch (err) { console.error(err); return res.status(500).json({ error: 'SendGrid error' }); }
  }

  // Otherwise use SMTP via Nodemailer
  try {
    let transporter;
    const smtpHost = process.env.SMTP_HOST;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const smtpPort = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined;

    if (smtpHost && smtpUser && smtpPass) {
      transporter = nodemailer.createTransport({ host: smtpHost, port: smtpPort || 587, secure: smtpPort === 465, auth: { user: smtpUser, pass: smtpPass } });
    } else {
      // Ethereal test account for preview in development
      const testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({ host: testAccount.smtp.host, port: testAccount.smtp.port, secure: testAccount.smtp.secure, auth: { user: testAccount.user, pass: testAccount.pass } });
      console.log('Using Ethereal test account for preview (no SMTP configured)');
    }

    const mail = {
      from: `${name} <${email}>`,
      to: process.env.CONTACT_TO || process.env.SMTP_USER || process.env.DEFAULT_TO || 'your@email.com',
      subject: subject || `New contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message</strong><br/>${(message||'').replace(/\n/g,'<br/>')}</p>`
    };

    const info = await transporter.sendMail(mail);
    const preview = nodemailer.getTestMessageUrl ? nodemailer.getTestMessageUrl(info) : null;
    if (preview) console.log('Preview URL:', preview);
    return res.json({ ok: true, info, preview });
  } catch (err) {
    console.error('Mail send error', err);
    return res.status(500).json({ error: 'Failed to send message' });
  }
};
