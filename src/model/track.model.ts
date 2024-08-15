import { model, Schema } from "mongoose";

interface ITrack {
    trackingID: string,
    opens: number,
    userIPs: string[],  // Assume userIPs are stored as strings for simplicity
}

const trackSchema = new Schema<ITrack>({
    trackingID: {
        type: String,
        required: true,
    },
    opens: {
        type: Number,
        default: 0,
    },
    userIPs: {
        type: [String],
        default: [],
    }
})

const Track = model<ITrack>('track', trackSchema)
export default Track;