import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./modal-slice";
import themeReducer from "./theme-slice";
import authReducer from  '../components/auth/AuthSlice'
import expenseReducer from '../components/expenseList/ExpenseSlice'

const store = configureStore({
  reducer: {
    modals: modalReducer,
    auth: authReducer,
    expense:expenseReducer,
    theme: themeReducer,
  },
});

export default store;
