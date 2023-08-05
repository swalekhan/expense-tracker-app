import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { expenseDeleteData, expenseGetData, expensePostData, expensePutData } from "./expenseApi";

const initialState = {
    items: [],
    status: null,
    alert: { msg: "", status: "" },
};

export const expenseGetDataAsync = createAsyncThunk(
    'expense/getData',
    async (data) => {
        const response = await expenseGetData(data)
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
    async (data, { rejectWithValue }) => {
        try {
            const response = await expenseDeleteData(data)
            return response
        } catch (err) {
            return rejectWithValue("somehing wen wrong")
        }

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
                state.alert.status = "info"
                state.alert.msg = ""
            })
            .addCase(expensePostDataAsync.pending, (state, action) => {
                state.status = "pendding"
            })
            .addCase(expensePostDataAsync.fulfilled, (state, action) => {
                state.items.push(action.payload)
                state.status = "success"
                state.alert.status = "success"
                state.alert.msg = "Expense added successfully!"
            })
            .addCase(expenseDeleteDataAsync.pending, (state, action) => {
                state.status = "pendding"
            })
            .addCase(expenseDeleteDataAsync.fulfilled, (state, action) => {
                state.items = state?.items?.filter((item) => item.id !== action.payload)
                state.status = "success"
                state.alert.status = "success"
                state.alert.msg = "Expense deleted successfully!"
            })
            .addCase(expenseDeleteDataAsync.rejected, (state, action) => {
                state.status = "rejected"
                state.alert.status = "error"
                state.alert.msg = action.payload
            })
            .addCase(expensePutDataAsync.pending, (state, action) => {
                state.status = "pendding"
            })
            .addCase(expensePutDataAsync.fulfilled, (state, action) => {
                state.items = state?.items?.map((item) => item.id === action.payload.id ? action.payload : item)
                state.status = "success"
                state.alert.status = "success"
                state.alert.msg = "Expense changed successfully!"
            })
    },
});

export default expenseSlice.reducer