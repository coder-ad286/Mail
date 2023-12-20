import nodemailer from 'nodemailer'
import asyncError from '../middlewares/asyncError.js'
import { getHTML, sendMail } from '../utils/mail.js';
import ErrorHandler from '../utils/ErrorHandler.js';

export const sendEmail = asyncError(async (req, res, next) => {
  const { text, subject, rows } = req.body;
  console.log(rows);
  if (!text || !subject || !rows) return next(new ErrorHandler("All Fields Are Must Required...!"))
  const exceptFields = ["name", "email", "phoneno", "message"];
  const filteredFields = Object.keys(rows)
    .filter(fieldName => !(exceptFields.includes(fieldName)))
    .map((fieldName) => {
      return {
        name: fieldName,
        value: rows[fieldName]
      }
  })
const html = getHTML({
  name: rows.name,
  phoneno: rows.phoneno,
  email: rows.email,
  message: rows.message,
  fields: filteredFields
})
const data = {
  to: "wibetec360@gmail.com",
  text: text,
  subject: subject,
  html: html,
}
try {
  await sendMail(data);
}
catch (error) {
  console.log(error.message);
  return next(new ErrorHandler("Email Doesn't Sent...!", 400))
}
res.status(200).json({
  success: true,
  message: "Email Send Successfully...!"
})
})