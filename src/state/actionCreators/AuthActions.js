import { useNavigate } from "react-router-dom"

export const SET_EMAIL = (newValue) => {
    return (dispatch) => {
        dispatch({
            type: "SET_EMAIL",
            payload: newValue
        })
    }
}

export const SET_PASSWORD = (newValue) => {
    return (dispatch) => {
        dispatch({
            type: "SET_PASSWORD",
            payload: newValue
        })
    }
}

export const SET_USERNAME = (newValue) => {
    return (dispatch) => {
        dispatch({
            type: "SET_USERNAME",
            payload: newValue
        })
    }
}


export const CLEAR = () => {
    return (dispatch) => {
        dispatch({
            type: "CLEAR"
        })
    }
}


export const LOGIN = (newValue) => {

    return (dispatch) => {
        dispatch({
            type: "LOGIN",
            payload: newValue
        })
    }
}


export const LOGOUT = () => {
    return (dispatch) => {
        dispatch({
            type: "LOGOUT",
            payload: null
        })
    }
}






export const SEND_CREDS = (creds, onSuccess, onFailure) => {
    return async (dispatch) => {
        try {
            const response = await fetch("http://127.0.0.1:8080/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: creds.email,
                    username: "",
                    password: creds.password,
                }),
            });

            if (!response.ok) {
                throw new Error("Login failed");
            }

            const token = await response.text();
            console.log("sessionToken ==> ", token);

            if (token.length > 10) {
                dispatch(LOGIN(token)); // Update token in the state
                dispatch(CLEAR());
                onSuccess(); // Notify success
            } else {
                onFailure("Invalid credentials or empty token");
            }
        } catch (error) {
            console.error("Login error:", error.message);
            onFailure(error.message);
        }
    };
};

