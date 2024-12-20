const initialState = {
    results: [],
    loading: false,
    error: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_ALL":
            return { ...state, loading: true };
        case "GET_ALL_SUCCESS":
            return { ...state, loading: false, results: action.payload };
        case "GET_ALL_FAILURE":
            return { ...state, loading: false, error: action.error };
        case "CLEAR_SUCCESS":
            return { ...state, results: [] };
        case "CLEAR_FAILURE":
            return { ...state, error: action.error };
        default:
            return state;
    }
};

export default reducer;
