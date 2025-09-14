import transporter, { accountEmail } from "./config/nodemailer.js";

const testSend = async () => {
  try {
    const mailOptions = {
      from: accountEmail,
      to: "yourpersonalemail@gmail.com", // <-- change to your test email
      subject: "✅ Test Email from SubDub",
      html: "<h1>Hello!</h1><p>This is a test email from your Node app.</p>",
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.response);
  } catch (err) {
    console.error("Failed to send test email:", err.message);
  }
};

testSend();
