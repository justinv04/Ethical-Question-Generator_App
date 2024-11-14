import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";

export async function useCheckAuthorization() {
    useEffect(async () => {
        const auth_token = await getSessionJWT();

        if (auth_token == null) return false;
    }, []);
}

export async function encrypt(text) {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);

    const hashBuffer = await crypto.subtle.digest("SHA-256", data);

    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");

    return hashHex;
}

export function getCurrentDate() {
    const now = new Date();

    const year = now.getFullYear();
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

export function AmericanizeDateString(dateString) {
    const [year, month, day] = dateString.split('-');
    return `${month}-${day}-${year}`;
}

export async function setSessionJWT(token) {
    try {
        await AsyncStorage.setItem("Session_JWT", token);
    } catch (error) {
        console.error(error);
        return;
    }
}

export async function getSessionJWT(token) {
    try {
        return await AsyncStorage.getItem("Session_JWT");
    } catch (error) {
        console.error(error);
        return;
    }
}

export async function getSessionUsername() {
    try {
        return await AsyncStorage.getItem("Session_Username");
    } catch (error) {
        console.error(error);
        return;
    }
}

export async function setSessionUsername(username) {
    try {
        await AsyncStorage.setItem("Session_Username", username);
    } catch (error) {
        console.error(error);
        return;
    }
}


export async function getSessionUserID() {
    try {
        return await AsyncStorage.getItem("Session_User_ID");
    } catch (error) {
        console.error(error);
        return;
    }
}

export async function setSessionUserID(id) {
    try {
        await AsyncStorage.setItem("Session_User_ID", id);
    } catch (error) {
        console.error(error);
        return;
    }
}