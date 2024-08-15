import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { dbConnect } from './config/db.config'
import 'dotenv/config'
import trackMailRoute from "./api/track-mail"
import sendMailRoute from "./api/send-mail"
import getMailStatusRoute from "./api/get-mail-status"

const port = 3000;
const app = new Hono()

app.use(cors())

app.route('/track', trackMailRoute)
app.route('/send', sendMailRoute)
app.route('/status', getMailStatusRoute)

dbConnect()
serve({
  fetch: app.fetch,
  port
})

export default app;

