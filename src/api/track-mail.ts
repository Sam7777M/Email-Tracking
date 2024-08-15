import { Hono } from "hono";
// import { getConnInfo } from "hono/deno";
// import { GetConnInfo } from "hono/conninfo";
// import { getConnInfo } from "hono/bun";
import Track from "../model/track.model";
import { promises as fs } from "fs"
import { getConnInfo } from "hono/cloudflare-workers";

const app = new Hono();

let imagebuffer: Buffer;
(
    async() => {
        try {
            console.log("!!!!1", __dirname)
            imagebuffer = await fs.readFile(__dirname + '/assets/leaves.png')
        } catch (error) {
            console.error(error);
        }
    }
)();

app.get('/track-mail/:id', async(c) => {
    const id = c.req.param('id');
    const userIP = c.req.raw.headers.get('true-client-ip') || c.req.raw.headers.get('cf-connexting-ip') || getConnInfo(c).remote.address || "0.0.0.0";

    // checks
    if(!id) return c.json({ error: "Tracking id is required" });
    try {
        const track = await Track.findOne({ trackingID: id })
        if(!track) return c.json({ error: "Tracking id not found" });

        if(!track.userIPs.includes(userIP)) {
            track.userIPs.push(userIP);
            track.opens++;
            await track.save();
        }
        //  TODO: image send response
        return new Response(imagebuffer, { 
            headers: {
                'Content-Type': 'image/png',
                'content-length': imagebuffer.length.toString()
            },
            status: 200,
        })
    } catch (error) {
        console.log(error);
        return c.json({ error: "Failed to track email" });
    }
})

export default app;