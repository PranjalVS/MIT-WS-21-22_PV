import { Document, Schema, Model, model, Error } from "mongoose";

export interface IEvent extends Document {
    name: string;
    date: string;
    time: string;
    elang: string;
}

export const eventSchema: Schema = new Schema({

    name: String,
    date: String,
    time: String,
    elang: String
});

export  const Events: Model<IEvent> = model<IEvent>("Events", eventSchema);