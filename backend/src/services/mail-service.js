import nodemailer from 'nodemailer'
import config from '../config/index.js'

const createTransporter = () => {
  if (!config.smtp?.user || !config.smtp?.password) {
    return null
  }
  return nodemailer.createTransport({
    host: config.smtp.host || 'smtp.gmail.com',
    port: config.smtp.port || 587,
    secure: false,
    auth: {
      user: config.smtp.user,
      pass: config.smtp.password,
    },
  })
}

export class MailService {
  static async sendActivationMail(to, link) {
    const transporter = createTransporter()

    if (!transporter) {
      console.warn('SMTP not configured (SMTP_USER/SMTP_PASSWORD). Activation link:', link)
      return
    }

    await transporter.sendMail({
      from: config.smtp.user,
      to,
      subject: 'Activate your StreamVibe account',
      html: `
        <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
          <h1>Email verification</h1>
          <p>Thanks for signing up. Click the link below to activate your account:</p>
          <p style="margin: 24px 0;">
            <a href="${link}" style="display: inline-block; padding: 12px 24px; background: #e50914; color: white; text-decoration: none; border-radius: 4px;">Activate account</a>
          </p>
          <p style="color: #666; font-size: 14px;">Or copy this link: ${link}</p>
          <p style="color: #666; font-size: 12px;">If you didn't create an account, you can ignore this email.</p>
        </div>
      `,
    })
  }
}
