const reducer = (state = {
    username: "",
    email: "",
    password: ""
}, action) => {
    switch (action.type) {
        case "SET_EMAIL": { console.log("set email from reg red " + action.payload); return { ...state, email: action.payload } }
        case "SET_USERNAME": return { ...state, username: action.payload }
        case "SET_PASSWORD": return { ...state, password: action.payload }
        case "CLEAR": return { ...state, password: "", username: "", email: "" }
        default: return state
    }
}


export default reducer