import { Document, Schema, Model, model, Error } from "mongoose";
import * as bcrypt from "bcrypt";

export interface IUser extends Document {
    username: string;
    email: string; 
    password: string;
    usertype: string;
}

export const userSchema: Schema = new Schema({
    username: String,
    email: String,
    password: String,
    usertype: String
});


userSchema.pre<IUser>("save", function save(next) {
    const user = this;

    bcrypt.genSalt(10, (err, salt) => {
        if (err) { return next(err); }
        bcrypt.hash(this.password, salt, (err: Error, hash) => {
            if (err) { return next(err); }
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function (candidatePassword: string, callback: any) {
    bcrypt.compare(candidatePassword, this.password, (err: Error, isMatch: boolean) => {
        callback(err, isMatch);
    });
};

export const User: Model<IUser> = model<IUser>("User", userSchema);