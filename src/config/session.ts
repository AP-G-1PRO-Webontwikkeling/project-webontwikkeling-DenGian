import { MONGODB_URI } from "./database";
import session from "express-session";
import { FlashMessage } from "../interfaces/flashMessage.interface";
import { User } from "../interfaces/user.interface";
import mongoDbSession from "connect-mongodb-session";
import { FormData } from "../interfaces/registerForm.interface";

const MongoDBStore = mongoDbSession(session);

const mongoStore = new MongoDBStore({
    uri: MONGODB_URI,
    collection: "sessions",
    databaseName: "opdracht",
});

declare module 'express-session' {
    export interface SessionData {
        user?: User
        message?: FlashMessage;
        formData?: FormData;
    }
}

export default session({
    secret: process.env.SESSION_SECRET ?? "my-super-secret-secret",
    store: mongoStore,
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
    }
});