import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { expenseDeleteData, expenseGetData, expensePostData, expensePutData } from "./expenseApi";

const initialState = {
    items:[],
    status:null
};

export const expenseGetDataAsync = createAsyncThunk(
    'expense/getData',
    async (data) => {
        const response = await expenseGetData(data)
        console.log(response)
        return response
    }
)

export const expensePostDataAsync = createAsyncThunk(
    'expense/postData',
    async (data) => {
        const response = await expensePostData(data)
        return response
    }
)

export const expenseDeleteDataAsync = createAsyncThunk(
    'expense/deleteData',
    async (data) => {
        const response = await expenseDeleteData(data)
        return response
    }
)
export const expensePutDataAsync = createAsyncThunk(
    'expense/putData',
    async (data) => {
        const response = await expensePutData(data)
        return response
    }
)

export const expenseSlice = createSlice({
    name: "expense",
    initialState,
    reducers: {
        activatePro(state) {
            state.isProUser = true;
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(expenseGetDataAsync.pending, (state, action) => {
                 state.status = "pendding"
            })
            .addCase(expenseGetDataAsync.fulfilled, (state, action) => {
                state.items = action.payload
                state.status = "success"
            })
            .addCase(expensePostDataAsync.pending, (state, action) => {
                state.status = "pendding"
            })
            .addCase(expensePostDataAsync.fulfilled, (state, action) => {
                state.items.push(action.payload)
                state.status = "success"
            })
            .addCase(expenseDeleteDataAsync.pending, (state, action) => {
                state.status = "pendding"
            })
            .addCase(expenseDeleteDataAsync.fulfilled, (state, action) => {
                state.items  = state?.items?.filter((item)=>item.id !== action.payload)
                state.status = "success"
            })
            .addCase(expensePutDataAsync.pending, (state, action) => {
                state.status = "pendding"
            })
            .addCase(expensePutDataAsync.fulfilled, (state, action) => {
                console.log(action.payload)
                state.items  = state?.items?.map((item)=>item.id === action.payload.id?action.payload:item)
                state.status = "success"
            })
    },
});

export default expenseSlice.reducer