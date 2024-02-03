import { createSlice } from "@reduxjs/toolkit";

const updateBulk = createSlice({
    name: "bulk",
    initialState: [],
    reducers: {
        updateBulkData: (state, action) => {
            state.push(...action.payload);
        },
        clearBulk: (state, action) => {
            return []
        }
    }
});

export const { updateBulkData, clearBulk } = updateBulk.actions

export const bulkList = (state) => state.bulk;

export default updateBulk.reducer
