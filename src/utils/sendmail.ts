import { createTransport } from "nodemailer";

const transport = createTransport({
    host: "smtp.gmail.com",
    // port: 465,
    // secure: true,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
    },
});

export const sendMail = async(emails: string[], trackingId: string) => {
    const trackingUrl = `${process.env.BASE_URL}/track/track-mail/${trackingId}`;
    const mailOptions = {
        from: process.env.MAIL_USER,
        to: emails,
        subject: 'Tracking the pixal id',
        html: `
            <h1>Tracking id : ${trackingId}</h1>
            <img src="${trackingUrl}" alt="hi"
            style="display: none;" />    
        `
    }
    try {
        await transport.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email', error);
        throw new Error("Failed to send mail")
    }
}