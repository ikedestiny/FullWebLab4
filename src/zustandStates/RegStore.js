import { create } from "zustand";
import { send_register_request } from "../Apicalls";

const regStore = (set, get) => ({
    email: "",
    password: "",
    username: "",
    setEmail: (value) => set({ email: value }),
    setPassword: (value) => set({ password: value }),
    setUsername: (value) => set({ username: value }),
    register: async () => {
        const { email, password, username } = get(); // Get the current state
        try {
            const response = await send_register_request({ email, password, username });
            // Handle the response or success logic here
            console.log("Registration successful:", response);
        } catch (error) {
            console.error("Registration failed:", error);
            // Handle the error, maybe set an error state or display a message
        }
    },
    clear: () => set({ email: "", password: "", username: "" })
});

export default create(regStore);
