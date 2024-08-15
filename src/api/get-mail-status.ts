import { Hono } from "hono";
import Track from "../model/track.model";

const app = new Hono()

app.get('/get-mail-status/:id', async(c) => {
    const id = c.req.param('id');
    if(!id) return c.json({ error: "Tracking id is required." });
    try {
        const track = await Track.findOne({ trackingID: id });
        if(!track) return c.json({ error: "Tracking id not found." });
        return c.json({data : track});
    } catch (err) {
        console.error(err);
        return c.json({ error: "Failed to fetch mail status." });
    }
})

export default app;