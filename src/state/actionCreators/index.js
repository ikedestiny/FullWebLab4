export const setX = (newValue) => {
    return (dispatch) => {
        dispatch({
            type: "setX",
            payload: newValue
        })
    }
}

export const setY = (newValue) => {
    return (dispatch) => {
        dispatch({
            type: "setY",
            payload: newValue
        })
    }
}


export const SET_CLICK = (state) => {
    return (dispatch) => {
        dispatch({
            type: "setClicked",
            payload: state
        })
    }
}

export const setR = (newValue) => {
    return (dispatch) => {
        dispatch({
            type: "setR",
            payload: newValue
        })
    }
}

export const CLEAR_PARAMS = () => {
    return (dispatch) => {
        dispatch({
            type: "CLEAR_PARAMS"
        })
    }
}


export const SEND_POINT = (token, params, showNotification) => {
    return async (dispatch) => {
        try {
            const response = await fetch("http://127.0.0.1:8080/api/results", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(params),
            });

            if (!response.ok) {
                const errorMessage = await response.json().catch(() => null); // Fallback if response is not JSON
                let message = errorMessage || "Something went wrong"; // Adjust based on your API's error structure
                if (response.status == 400) {
                    message = "one of your params exceed range "
                }
                if (response.status == 401) {
                    message = "your session expired. log in again"
                }

                showNotification(message, "error");
                console.error("Error response:", message);
                // console.log(response.status)
                return;
            }

            showNotification("Coordinates sent successfully!", "success");
            dispatch(GET_ALL(token));
            dispatch(CLEAR_PARAMS());
        } catch (error) {
            console.error("Error submitting request:", error);
            showNotification("An error occurred while submitting the form. Please try again.", "error");
        }
    };
};



// Async action creator to fetch results
export const GET_ALL = (token) => {
    console.log("get all called with token " + token)
    return async (dispatch) => {
        try {
            const response = await fetch("http://127.0.0.1:8080/api/results", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`, // Attach Bearer token
                    "Content-Type": "application/json"
                }
            });
            const data = await response.json();
            console.log(data)

            // Dispatch a success action with the fetched data
            dispatch({
                type: "GET_ALL_SUCCESS",
                payload: data,
            });
        } catch (error) {
            // Handle errors if necessary
            alert("YOU SESSION HAS EXPIRED LOG IN");

            dispatch({
                type: "GET_ALL_FAILURE",
                error: error.message,
            });
        }
    };
};

// Async action creator to clear data
export const CLEAR_REQ = (token) => {
    return async (dispatch) => {
        try {
            const response = await fetch("http://127.0.0.1:8080/api/results", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`, // Attach Bearer token
                },
            });
            const data = await response.json();

            // Dispatch success action after clearing
            dispatch({
                type: "CLEAR_SUCCESS",
                payload: data,
            });
        } catch (error) {
            alert("YOU SESSION HAS EXPIRED LOG IN");
            dispatch({
                type: "CLEAR_FAILURE",
                error: error.message,
            });
        }
    };
};


