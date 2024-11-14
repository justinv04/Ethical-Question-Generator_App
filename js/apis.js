import {
    encrypt,
    getCurrentDate,

    getSessionJWT,
    getSessionUsername,
    getSessionUserID,
    setSessionJWT,
    setSessionUsername,
    setSessionUserID

} from "@/js/utilities.js";

function make_options(method, content_type, auth_token, body) {
    if (method === "GET")
        return {
            method: method,
            headers: {
                "Content-Type": content_type,
                "Authorization": `Bearer ${auth_token}`,
            },
        };
    else
        return {
            method: method,
            headers: {
                "Content-Type": content_type,
                "Authorization": `Bearer ${auth_token}`,
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
        console.error("Error During Ping:", error);
        return false;
    }
}

/* User */

export async function login_user(name, password) {
    const url = "http://127.0.0.1:8080/login";

    const body = {
        username: name,
        password: await encrypt(password),
    };

    try {
        const response = await fetch(url, make_options("POST", "application/json", null, body)
        );

        if (!response.ok)
            throw new Error(`HTTP error! status: ${response.status}`);

        const responseData = await response.json();

        if (responseData.hasOwnProperty("User_ID")) {
            const token = responseData["Auth_Token"];
            const id = responseData["User_ID"];
            const name = responseData["User_Name"];

            await setSessionJWT(token);
            await setSessionUsername(name);
            await setSessionUserID(id)
            return true;
        }

        return false;
    } catch (error) {
        console.error("Error During Login:", error);
        return false;
    }
}

export async function create_user(name, email, password) {
    const url = "http://127.0.0.1:8080/create_user";
    const passhash = await encrypt(password);
    const curr_date = await getCurrentDate();

    const body = {
        username: name,
        email: email,
        passhash: passhash,
        date_joined: curr_date,
    };

    try {
        const response = await fetch(url, make_options("POST", "application/json", "", body));

        if (!response.ok)
            throw new Error(`HTTP Error! status: ${response.status}`);

        const token = await response.json();

        if (token === "Failed_Account_Creation") return false;
        else {
            await setSessionJWT(token);
            await setSessionUsername(name)
            return true;
        }
    } catch (error) {
        console.error("Error During Account Creation: ", error);
        return false;
    }
}

/* Reports */

export async function get_reports(topic) {
    const url = "http://127.0.0.1:8080/get_reports";
    const jwt = await getSessionJWT();
    const user_id = await getSessionUserID();

    const body = {
        User_ID: user_id,
        Topic: topic ?? ""
    }

    try {
        const response = await fetch(url, make_options("POST", "application/json", jwt, body));

        if (!response.ok)
            throw new Error(`HTTP Error! status: ${response.status}`);

        const responseData = await response.json();
        if(responseData.hasOwnProperty("Questions")) {
            return responseData["Questions"];
        }

    } catch (error) {
        console.error("Error During Report Fetching: ", error);
        return false;
    }
}

export async function generate_report(question_id, user_position) {
    const url = "http://127.0.0.1:8080/generate_report";
    const jwt = await getSessionJWT();
    const user_id = await getSessionUserID();
    const curr_date = await getCurrentDate();

    const body = {
        User_ID: user_id,
        Question_ID: question_id,
        User_Position: user_position,
        Report_Date: curr_date
    };

    try {
        const response = await fetch(url, make_options("POST", "application/json", jwt, body));

        if(!response.ok)
            throw new Error(`HTTP Error! status: ${response.status}`);

        return true;

    } catch (error) {
        console.error(error);
        return false;
    }
}

/* Questions */

export async function get_question(topic) {
    const url = "http://127.0.0.1:8080/get_question";
    const jwt = await getSessionJWT();

    const body = {
        Topic: topic ?? ""
    };

    try {
        const response = await fetch(url, make_options("POST", "application/json", jwt, body));

        if (!response.ok)
            throw new Error(`HTTP Error! status: ${response.status}`);

        const responseData = await response.json();

        return responseData;

    } catch(error) {
        console.error("Error while fetching question: ", error);
        return false;
    }
}