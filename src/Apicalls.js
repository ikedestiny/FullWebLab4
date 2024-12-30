import axios from "axios";

const url = "http://127.0.0.1:8080/api";

/**
 * Sends login request to the backend.
 * @param {Object} credentials - The login credentials (email and password).
 * @returns {string} Token if login is successful.
 */
export const send_login_request = async (credentials) => {
    console.log("send login called");
    try {
        const response = await axios.post(`${url}/login`, {
            email: credentials.email,
            password: credentials.password,
        });

        // Extract token from the response
        const token = response.data.token || response.data; // Adjust based on API structure
        console.log("Sent credentials:", JSON.stringify(credentials), "Token received:", token);

        return token;
    } catch (error) {
        console.error("Error during login:", error.response?.data || error.message);
        throw error;
    }
};

/**
 * Sends register request to the backend.
 * @param {Object} credentials - The registration details (email, password, username).
 * @returns {number} Status code if registration is successful.
 */
export const send_register_request = async (credentials) => {
    try {
        const response = await axios.post(`${url}/register`, {
            email: credentials.email,
            password: credentials.password,
            username: credentials.username,
        });

        console.log("Registration successful:", response.data);
        return response.status;
    } catch (error) {
        console.error("Error during register:", error.response?.data || error.message);
        throw error;
    }
};

/**
 * Fetches all results from the backend.
 * @param {string} token - The user's authentication token.
 * @returns {Array} The results data.
 */
export const get_all_results = async (token) => {
    console.log("token for getAll --> " + token)
    if (!token) {
        console.error("Token is required to fetch results.");
        throw new Error("Authentication token is missing.");
    }

    try {
        const response = await axios.get(`${url}/results`, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        console.log("Results fetched successfully:", response.data);
        return await response.data;
    } catch (error) {
        console.error("Error fetching results:", error.response?.data || error.message);
        alert(error)
        // throw error;
    }
};

/**
 * Sends a request to delete all results.
 * @param {string} token - The user's authentication token.
 * @returns {Array} An empty array after deletion.
 */
export const send_delete_all_request = async (token) => {
    if (!token) {
        console.error("Token is required to delete results.");
        throw new Error("Authentication token is missing.");
    }

    try {
        const response = await axios.delete(`${url}/results`, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        console.log("All results deleted successfully.");
        return [];
    } catch (error) {
        console.error("Error during delete request:", error.response?.data || error.message);
        throw error;
    }
};

/**
 * Sends a request to add a new result.
 * @param {string} token - The user's authentication token.
 * @param {Object} params - The parameters to add.
 * @returns {Object} The response data from the backend.
 */
export const send_add_request = async (token, params) => {
    if (!token) {
        console.error("Token is required to add results.");
        throw new Error("Authentication token is missing.");
    }

    console.log("Token for add request:", token);
    console.log("Request body:", JSON.stringify(params));

    try {
        const response = await axios.post(`${url}/results`, params, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        console.log("Result added successfully:", JSON.stringify(response.data));
        return JSON.stringify(response.data)
    } catch (error) {
        console.error("Error during add request:", error.response?.data || error.message);
        alert(error)
    }
};
