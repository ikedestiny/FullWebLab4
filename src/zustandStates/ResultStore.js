import { create } from "zustand";
import { get_all_results } from "../Apicalls";


const resistor = (set) => ({
    results: [],
    loading: false,
    error: null,
    get_all: async (token) => set({
        results: await get_all_results(token)
    })



})