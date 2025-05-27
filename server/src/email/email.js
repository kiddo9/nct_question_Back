import nodemailer from "nodemailer";

const emailSender = async ({
  to,
  subject,
  emailType,
  otp,
  Preset,
  others,
  name,
}) => {
  const transporter = nodemailer.createTransport({
    host: `${process.env.EMAIL_HOST}`,
    port: process.env.EMAIL_PORT,
    secure: true,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  console.log(otp);
  let emailContent = "";

  if (emailType === "auth" || emailType === "reset") {
    emailContent = `
    <p>
          This is the one-time password (OTP) to validate and access your account.
          Please use the code below to complete your verification:
        </p>

        <div class="otp-box">
          <div class="otp-code">${otp}</div>
          <p class="expiry-note">This code will expire in 3 minute</p>
        </div>

        <p>
          If you didn't request this code, please ignore this email or
          <a href="{{support_url}}" class="link">contact our support team</a> if
          you have any concerns.
        </p>
  `;
  } else if (emailType === "P-reset" || emailType === "verify") {
    emailContent = `
    <p>
             click the button to ${
               emailType === "verify" ? "Verify email" : "Reset Password"
             }.
          If you didn't request this code, please ignore this email or
          <a href="{{support_url}}" class="link">contact our support team</a> if
          you have any concerns.
        </p>

        <div style="text-align: center">
          <a href="${Preset}" class="button">${
      emailType === "verify" ? "Verify email" : "Reset Password"
    }</a>
    ${emailType === "verify" ? "" : "Link is valid for 10 minutes"}.
        </div>
  `;
  } else if (emailType === "others") {
    emailContent = `<div>
            ${others}
            </div>`;
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: `${to}`,
    subject: `${subject}`,
    html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Your One-Time Password</title>
    <style>
      /* Reset styles */
      body,
      p,
      h1,
      h2,
      h3,
      h4,
      h5,
      h6,
      table,
      td {
        margin: 0;
        padding: 0;
        font-family: Arial, sans-serif;
      }

      /* Base styles */
      body {
        background-color: #f4f4f4;
        color: rgb(185, 183, 183);
        font-size: 16px;
        line-height: 1.5;
      }

      .email-container {
        max-width: 600px;
        margin: 0 auto;
        background-color: #252525;
      }

      .email-header {
        text-align: center;
      }

      .company-logo {
        max-height: 95px;
        width: 70%;
        object-fit: cover;
      }

      .email-body {
        padding: 30px;
      }

      .greeting {
        font-size: 18px;
        margin-bottom: 20px;
      }

      .otp-box {
        background-color: #6699ff;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        margin: 24px 0;
        padding: 20px;
        text-align: center;
      }

      .otp-code {
        font-size: 32px;
        font-weight: bold;
        letter-spacing: 4px;
        color: #f3e9e9;
      }

      .expiry-note {
        color: #fff;
        font-size: 14px;
        margin-top: 10px;
      }

      .button {
        display: inline-block;
        background-color: #4a90e2;
        color: #ffffff;
        text-decoration: none;
        padding: 12px 24px;
        border-radius: 4px;
        margin: 16px 0;
        font-weight: bold;
      }

      .divider {
        border: 0;
        border-top: 1px solid #e0e0e0;
        margin: 24px 0;
      }

      .helpful-links {
        /* background-color: #f8f8f8; */
        border-radius: 8px;
        padding: 20px;
        margin-top: 24px;
      }

      .links-title {
        font-size: 18px;
        margin-bottom: 12px;
      }

      .link-item {
        margin-bottom: 8px;
      }

      .link {
        color: #4a90e2;
        text-decoration: none;
      }

      .email-footer {
        /* background-color: #f4f4f4; */
        padding: 20px;
        text-align: center;
        font-size: 12px;
        color: #777777;
      }

      .social-links {
        margin: 16px 0;
      }

      .social-link {
        display: inline-block;
        margin: 0 8px;
      }

      .address {
        margin-top: 12px;
      }

      /* Mobile responsiveness */
      @media screen and (max-width: 600px) {
        .email-body {
          padding: 20px;
        }

        .otp-code {
          font-size: 28px;
        }
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="email-header">
        <img
          src="https://techneo.ng/wp-content/uploads/2023/04/Artboard-1.png"
          alt="Company Logo"
          class="company-logo"
        />
      </div>

      <div class="email-body">
        <p class="greeting">Hello ${name},</p>
        
        ${emailContent}

        <hr class="divider" />

        <div class="helpful-links">
          <h3 class="links-title">Helpful Links</h3>
          <p class="link-item">
            📚 <a href="{{help_center_url}}" class="link">Help Center</a> - Find
            answers to common questions
          </p>
          <p class="link-item">
            🔒
            <a href="{{security_settings_url}}" class="link"
              >Security Settings</a
            >
            - Manage your account security
          </p>
          <p class="link-item">
            📱
            <a href="{{download_app_url}}" class="link">Download Our App</a> -
            Get our mobile application
          </p>
          <p class="link-item">
            📞 <a href="{{contact_us_url}}" class="link">Contact Us</a> - Get in
            touch with our support team
          </p>
        </div>
      </div>

      <div class="email-footer">
        <div class="social-links">
          <a href="{{facebook_url}}" class="social-link">Facebook</a> |
          <a href="{{twitter_url}}" class="social-link">Twitter</a> |
          <a href="{{instagram_url}}" class="social-link">Instagram</a> |
          <a href="{{linkedin_url}}" class="social-link">LinkedIn</a>
        </div>

        <p>© 2025 Neo cloud Technology. All rights reserved.</p>

        <p class="address">
          Neo cloud Technology<br />
          uite C29, 30&31 MIB, Plaza 1st Avenue, Gwarimpa, Abuja
            <br />
          Nigeria
        </p>

        <p style="margin-top: 12px">
          <a href="{{unsubscribe_url}}" class="link">Unsubscribe</a> |
          <a href="{{privacy_policy_url}}" class="link">Privacy Policy</a> |
          <a href="{{terms_url}}" class="link">Terms of Service</a>
        </p>
      </div>
    </div>
  </body>
</html>
`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      return;
    } else {
      console.log("email sent", info);
    }
  });
};

export default emailSender;
