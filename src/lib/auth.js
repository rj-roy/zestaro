import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGO_URI);
const db = client.db(process.env.MONGO_DB_NAME);

export const auth = betterAuth({
    baseURL: process.env.BETTER_AUTH_BASE,
    secret: process.env.BETTER_AUTH_SECRET,
    database: mongodbAdapter(db, {
        client
    }),

    emailAndPassword: {
        enabled: true,
    },

    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        },
    },

    user: {
        additionalFields: {
            role: {
                type: "string",
                required: "true",
                defaultValue: "customer",
            },
            plan: {
                type: "string",
                required: true,
                defaultValue: "customer_free",
            },

            profileImage: {
                type: "string",
                required: true,
                defaultValue: "https://res.cloudinary.com/dbkpia8ri/image/upload/v1781958996/images_rbgnle.png",
            },
        },
    },
});