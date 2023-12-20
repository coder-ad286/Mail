import nodemailer from 'nodemailer'
export const sendMail = (data) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
        },
    });

    const mailOptions = {
        from: '"Admin Of WibeTec" <hello@wibetec.com>', // sender address
        to: data.to, // list of receivers
        subject: data.subject, // Subject line
        text: data.text, // plain text body
        html: data.html, // html body
    }

    return transporter.sendMail(mailOptions);
}
export const getHTML = (data) => {
    console.log(data);
    const { fields } = data;
    const prefix = `<main><p style='margin:20px;'>A Query Has Been Submitted Through The Contact Form On Our Website</p> <h1 style='text-align: center;margin: 10px;'>Details</h1> <table border='1' style='text-align: center;align:center; border-collapse: collapse'> <tr> <th style='padding: 5px'>Name</th> <td style='padding: 5px'>${data.name}</td> </tr> <tr> <th style='padding: 5px'>Phone No</th> <td style='padding: 5px'>${data.phoneno}</td> </tr> <tr> <th style='padding: 5px'>Email</th> <td style='padding: 5px'>${data.email}</td></tr>`
    const suffix = `<tr> <th style='padding: 5px'>Message</th> <td style='padding: 5px'> ${data.message}</td> </tr></table> <p style='margin:10px;'>Please Review And Respond Accordingly...!</p> </main>`
    let center = "";
    fields.forEach(field => {
        center += `<tr><th>${field.name.charAt(0).toUpperCase() + field.name.slice(1)}</th><td>${field.value}</td></tr>`;
    })
    const finalText = prefix + center + suffix;
    return finalText
}