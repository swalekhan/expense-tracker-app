import Header from "./components/Header/Header";
import { Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import SignInPage from "./Pages/Auth/SignInPage";
import ForgetPasswordPage from "./Pages/Auth/ForgetPasswordPage";
import SignUpPage from "./Pages/Auth/SignupPage";
import AddExpense from "./components/expenseList/AddExpense";
import HomePage from "./Pages/HomePage";
import Profile from "./Pages/Profile";
import { useDispatch, useSelector } from "react-redux";
import PrivateComponent from "./components/PrivateComponent/PrivateComponent";
import PopUpAlert from "./components/modals/PopUpAlert";
import { useEffect } from "react";
import { expenseGetDataAsync } from "./components/expenseList/ExpenseSlice";

function App() {
  const { isDarkThemeEnabled } = useSelector((state) => state.theme);
  const token = useSelector(state => state.auth.token)
  const dispatch = useDispatch()
  const email = token?.email

  // .......fetch data...................
  useEffect(() => {
    email && dispatch(expenseGetDataAsync(email))
  }, [dispatch, email])

  let color = "initial";
  if (isDarkThemeEnabled) {
    color = "rgba(0, 0, 0, 0.8)";
  }

  return (
    <Box sx={{ bgcolor: color, paddingBottom: "1rem", minHeight: "100vh" }}>
      <PopUpAlert />
      <Header />
      <Routes>
        <Route path="/" element={<PrivateComponent><HomePage /></PrivateComponent>} />
        <Route path="/Expense/AddExpense" element={<AddExpense />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Auth/SignUpPage" element={<SignUpPage />} />
        <Route path="/Auth/SignInPage" element={<SignInPage />} />
        <Route path="/auth/ForgetPasswordPage" element={<ForgetPasswordPage />} />
      </Routes>
    </Box>
  );
}

export default App;
