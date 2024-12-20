const reducer = (state = {
    token: null,
    email: "",
    password: "",
    loggedIn: false
}, action) => {
    switch (action.type) {
        case "LOGIN": return { ...state, token: action.payload, loggedIn: true }
        case "LOGOUT": return { ...state, token: "", loggedIn: false }
        case "SET_EMAIL": { console.log("set email from login red " + action.payload); return { ...state, email: action.payload } }
        case "SET_PASSWORD": return { ...state, password: action.payload }
        case "CLEAR": return { ...state, password: "", email: "" }
        default: return state
    }
}


export default reducer;