import { create } from "zustand";
import { send_login_request } from "../Apicalls";

const loginStore = create((set, get) => ({
    token: null, // Retrieve token from localStorage on initialization
    isLoggedIn: false, // Set logged-in status based on token presence
    email: "",
    password: "",
    set_email: (value) => set({ email: value }),
    set_password: (value) => set({ password: value }),
    login: async () => {
        const { email, password } = get();
        if (!email || !password) {
            console.error("Email and password are required for login");
            return null;
        }

        const credentials = {
            username: "", // Optional if not required by your backend
            password: password,
            email: email,
        };

        try {
            const newToken = await send_login_request(credentials);
            console.log("new token  ---<>>", newToken);

            if (newToken) {
                set({ token: newToken, isLoggedIn: true });
                localStorage.setItem("currentToken", newToken); // Persist token to localStorage
                return newToken;
            } else {
                console.error("Login failed, no token received");
                return null;
            }
        } catch (error) {
            console.error("Error during login:", error);
            return null;
        }
    },
    logout: () => {
        set({ token: null, isLoggedIn: false });
        localStorage.removeItem("currentToken"); // Clear token from localStorage on logout
    },
}));

export default loginStore;
