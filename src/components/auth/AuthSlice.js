import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postForgetPasswordData, postSign } from "./Auth.api";

const initialState = {
    token: JSON.parse(localStorage.getItem("token")),
    status: null,
    alert: { msg: "", status: "info" }
};

export const postSignDataAsync = createAsyncThunk(
    'auth/SignUp',
    async (data, { rejectWithValue }) => {
        try {
            const response = await postSign(data)
            return response
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)


export const postForgetPassworAsync = createAsyncThunk(
    'auth/forgetPassword',
    async (data) => {
        const response = await postForgetPasswordData(data)
        return response
    }
)

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout(state) {
            state.token = null;
            localStorage.removeItem("token")
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(postSignDataAsync.pending, (state) => {
                state.status = "pendding"
            })
            .addCase(postSignDataAsync.fulfilled, (state, action) => {
                state.token = action.payload
                state.status = "success"
                state.alert.status = "success"
                state.alert.msg = "Welcome " + action.payload.displayName?.split(" ")[0]

            })
            .addCase(postSignDataAsync.rejected, (state, action) => {
                state.status = "rejected"
                state.alert.status = "error"
                state.alert.msg = action.payload
            })
            .addCase(postForgetPassworAsync.pending, (state) => {
                state.status = "pendding"
            })
            .addCase(postForgetPassworAsync.fulfilled, (state) => {
                state.status = "success"
                state.alert.status = "success"
                state.alert.msg = "Please check your email"
            })
    },
});

export const { logout } = authSlice.actions
export default authSlice.reducer
