import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postForgetPasswordData, postSignInData, postSignUpData } from "./Auth.api";

const initialState = {
    isAuthenticated: false,
    token :JSON.parse(localStorage.getItem("token")),
    status:null
};

export const postSignUpDataAsync = createAsyncThunk(
    'auth/SignUp',
    async (data) => {
        const response = await postSignUpData(data)
        console.log(response)
        return response
    }
)

export const postSignInDataAsync = createAsyncThunk(
    'auth/SignIn',
    async (data) => {
        const response = await postSignInData(data)
        console.log(response,"siggg")
        return response
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
       logout(state){
       state.token = null;
       localStorage.removeItem("token")
       }
    },

    extraReducers: (builder) => {
        builder
            .addCase(postSignUpDataAsync.pending, (state, action) => {
                 state.status = "pendding"
            })
            .addCase(postSignUpDataAsync.fulfilled, (state, action) => {
                state.token = action.payload
                state.status = "success"
                state.isAuthenticated = true
            })
            .addCase(postSignInDataAsync.pending, (state, action) => {
                state.status = "pendding"
            })
            .addCase(postSignInDataAsync.fulfilled, (state, action) => {
                state.token = action.payload
                state.status = "success"
                state.isAuthenticated = true
            })
            .addCase(postForgetPassworAsync.pending, (state, action) => {
                state.status = "pendding"
            })
            .addCase(postForgetPassworAsync.fulfilled, (state, action) => {
                state.token = action.payload
                state.status = "success"
            })
    },
});

export const {logout} = authSlice.actions
export default authSlice.reducer
