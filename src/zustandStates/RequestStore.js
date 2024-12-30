import { create } from "zustand";
import { get_all_results, send_delete_all_request, send_add_request } from "../Apicalls";

const requestStore = (set, get) => ({
    x: "0",
    y: "0",
    r: "0",
    results: [],
    recieved: new Date().toISOString(),
    set_x: (value) => set({ x: value }),
    set_y: (value) => set({ y: value }),
    set_r: (value) => set({ r: value }),

    add_point: async (token) => {
        try {
            const { x, y, r, recieved } = get();
            const params = { x: x, y: y, r: r, clicked: false, recieved: recieved };

            const response = await send_add_request(token, params);
            set((state) => ({
                results: [...state.results, response]
            }));
            console.log(response);
        } catch (error) {
            console.error("Error adding point:", error);
        }
    },

    add_click: async (token) => {
        try {
            const { x, y, r, recieved } = get();
            const params = { x: x, y: y, r: r, clicked: true, recieved: recieved };
            const response = await send_add_request(token, params);
            set({ results: await get_all_results(token) })
            console.log(response);
        } catch (error) {
            console.error("Error adding click:", error);
        }
    },

    get_all: async (token) => {
        try {
            const response = await get_all_results(token);
            if (Array.isArray(response)) {
                set({ results: response });
            } else {
                console.error("Response is not an array:", response);
            }
        } catch (error) {
            console.error("Error fetching all results:", error);
        }
    },

    clear: async (token) => {
        try {
            const response = await send_delete_all_request(token);
            set({ results: response }); // response should be an empty array
        } catch (error) {
            console.error("Error clearing results:", error);
        }
    },
});

export default create(requestStore);
