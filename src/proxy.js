import { headers } from "next/headers";
import { auth } from "./lib/auth";

export async function proxy(requst) {
    const session = auth.api.getSession({
        headers: await headers(),
    });

};