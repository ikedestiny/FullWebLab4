import axios from "axios";
const url = "http://127.0.0.1:8080/api";


export const send_login_request = async ({ credentials }) => {
    try {
        const response = await axios.post(url + "/login", {
            email: credentials.email,
            password: credentials.password,
            username: "",
        });

        const token = response.data; // Assuming the token is in the response data
        console.log(token);
        return token;
    } catch (error) {
        console.error("Error during login:", error);
        throw error; // Rethrow the error to handle it elsewhere
    }
}


export const send_register_request = async (credentials) => {
    try {
        const response = await axios.post(url + "/register", {
            email: credentials.email,
            password: credentials.password,
            username: credentials.username,
        });
        console.log(response.data)
        return response.status
    } catch (error) {
        console.error("Error during register:", error);
        throw error; // Rethrow the error to handle it elsewhere
    }
}