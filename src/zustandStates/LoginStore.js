import { create } from "zustand";


const loginStore = (set) => ({
    email: "",
    password: "",
    token: null,
    isLoggedIn: false,
    login: (newToken) => set({ token: newToken, isLoggedIn: true }),
    logout: () => set({ token: null, isLoggedIn: false })
})


export default useLogin = create(loginStore)