import axios from "axios";

export const filterPaginationData = async ({
    state = { results: [] }, // Default state with results as an empty array
    create_new_arr = false,
    arr,
    data,
    page,
    countRoute,
    data_to_send = {},
}) => {

    let obj;

    if (state != null && !create_new_arr) {
        obj = { ...state, results: [...state.results || [], ...data], page: page }; // Ensure results is an array
    } else {
        try {
            const response = await axios.post(`${import.meta.env.VITE_SERVER_DOMAIN}${countRoute}`, data_to_send);
            const { totalDocs } = response.data;
            obj = { results: data, page: 1, totalDocs }; // Return new object with data
        } catch (err) {
            console.log(err)
            console.error(err);
            throw new Error("Failed to fetch pagination data");
        }
    }
    console.log("data coming",obj)


    return obj; // Ensure obj is returned
};

export default filterPaginationData;
