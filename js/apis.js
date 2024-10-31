import {
    encrypt,
    getCurrentDate,
    setSessionJWT,
    getSessionJWT,
} from "@/js/utilities.js";

function make_options(method, content_type, auth_token, body) {
    if (method === "GET")
        return {
            method: method,
            headers: {
                "Content-Type": content_type,
                Authorization: `Bearer ${auth_token}`,
            },
        };
    else
        return {
            method: method,
            headers: {
                "Content-Type": content_type,
                Authorization: `Bearer ${auth_token}`,
            },
            body: JSON.stringify(body),
        };
}

export async function ping_server() {
    const url = "http://127.0.0.1:8080/ping";

    const auth_token = await getSessionJWT();

    try {
        const response = await fetch(
            url,
            make_options("GET", "text/plain", auth_token, null)
        );
        if (!response.ok)
            throw new Error(`HTTP error! status: ${response.status}`);
    } catch (error) {
        console.error("Error During Login:", error);
    }
}

export async function login_user(user_name, user_password) {
    const url = "http://127.0.0.1:8080/login";

    const body = {
        username: user_name,
        password: await encrypt(user_password),
    };

    try {
        const response = await fetch(
            url,
            make_options("POST", "application/json", null, body)
        );

        if (!response.ok)
            throw new Error(`HTTP error! status: ${response.status}`);

        const responseData = await response.json();

        if (responseData.hasOwnProperty("Auth_Token")) {
            const token = responseData["Auth_Token"];

            if (token === "Failed_Login") return false;
            else {
                await setSessionJWT(token);
                return true;
            }
        }

        return false;
    } catch (error) {
        console.error("Error During Login:", error);
    }
}

export async function create_user(user_name, user_email, user_password) {
    const url = "http://127.0.0.1:8080/create_user";

    const jwt = await getSessionJWT();

    const body = {
        username: user_name,
        email: user_email,
        password: user_password,
        date_joined: getCurrentDate(),
    };

    try {
        const response = await fetch(
            url,
            make_options("POST", "application/json", jwt, body)
        );

        if (!response.ok)
            throw new Error(`HTTP error! status: ${response.status}`);

        const responseData = await response.json();

        if (responseData.hasOwnProperty("Auth_Token")) {
            const token = responseData["Auth_Token"];

            if (token === "Failed_Account_Creation") return false;
            else {
                setSessionJWT(token);
                return true;
            }
        }

        return false;
    } catch (error) {
        console.error("Error During Login:", error);
    }
}
