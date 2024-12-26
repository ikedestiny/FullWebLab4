import { create } from "zustand";

const loginStore = (set) => ({
    token: null,
    isLoggedIn: false,
    email: "",
    password: "",
    login: (newToken) => set({ token: newToken, isLoggedIn: true }),
    logout: () => set({ token: null, isLoggedIn: false })
})


export default create(loginStore)