const reducer = (state = {
    x: "0",
    y: "0",
    r: "0",
    clicked: false,
    recieved: new Date().toISOString()
}, action) => {
    switch (action.type) {
        case "setX":
            return { ...state, x: action.payload }; // Create a new state with updated `x`
        case "setY":
            return { ...state, y: action.payload }; // Create a new state with updated `y`
        case "setR":
            return { ...state, r: action.payload }; // Create a new state with updated `r`
        case "setClicked": return { ...state, clicked: action.payload }
        case "getLocalR": return { ...state, r: localStorage.getItem("r") }
        case "setLocalR": { localStorage.setItem("r", action.payload) }
        case "CLEAR_PARAMS":
            return { ...state, x: "", y: "" }
        default:
            return state; // Return the existing state if no action matches
    }
};

export default reducer;
