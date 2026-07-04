import { redirect } from "next/navigation";

export const statusHandler = async (res) => {
    if (res.status === 401) {
        redirect('/unauthorized');
        return;
    } else if (res.status === 404) {
        redirect('/not-found');
        return;
    } else if (res.status === 403) {
        redirect('/forbidden');
        return;
    };
    
    const text = await res.text();

    if (!res.ok) {
        let errorMessage = "Something went wrong! Please try again later.";
        try {
            errorMessage = JSON.parse(text).message || errorMessage;
        } catch {
            // 
        }
        throw new Error(errorMessage);
    };

    if (!text) {
        return null;
    };

    try {
        return JSON.parse(text);
    } catch {
        throw new Error("Invalid response from server");
    };
};