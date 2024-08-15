import { Hono } from "hono";
import {v4 as uuid} from "uuid";
import Track from "../model/track.model";
import { sendMail } from "../utils/sendmail";

const app = new Hono();

app.post('/send-mail', async(c) => {
    const {email, password} = await c.req.json();
    if(!email || !password) c.json({error: "email or password not found"});

    // if(password !== process.env.PASSWORD) return c.json({error: "Invalid password"});

    //tracking id, data store in db
    const trackingID = uuid();
    try {
        await Track.create({ trackingID })
        await sendMail(email, trackingID)
        return c.json({
            trackingID: trackingID,
            message: "Email sent successfully"
        })
        // TODO: mail sending
    } catch (error) {
        console.log(error);
        return c.json({error: "Failed to send email"})
    }
})

export default app;