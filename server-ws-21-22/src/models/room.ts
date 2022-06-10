import { Document, Schema, Model, model, Error } from "mongoose";
/*
export interface IRoom extends Document {
    id: string; // number not working???
    name: string;
}

export const roomSchema: Schema = new Schema({
    id: {
        type: Number,
        unique: true,
        required: true,
        trim: true
    },
    name: String,
});

export const Room: Model<IRoom> = model<IRoom>("Room", roomSchema);
*/
export interface INews extends Document {
    title: string;
    content: string;
}

export const newsSchema: Schema = new Schema({

    title: String,
    content: String
});

export  const Newss: Model<INews> = model<INews>("News", newsSchema);