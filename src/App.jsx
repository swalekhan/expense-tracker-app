import Header from "./components/Header/Header";
import { Routes, Route} from "react-router-dom";
import { Box } from "@mui/material";
import SignInPage from "./Pages/Auth/SignInPage";
import ForgetPasswordPage from "./Pages/Auth/ForgetPasswordPage";
import SignUpPage from "./Pages/Auth/SignupPage";
import AddExpense from "./components/expenseList/AddExpense";
import HomePage from "./Pages/HomePage";
import Profile from "./Pages/Profile";
import { useSelector } from "react-redux";

function App() {
  // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isDarkThemeEnabled = useSelector((state) => state.theme.isDarkThemeEnabled);

  let color = "initial";
  if (isDarkThemeEnabled) {
    color = "rgba(0, 0, 0, 0.8)";
  }

  return (
    <Box sx={{ bgcolor: color, paddingBottom: "1rem", minHeight: "100vh" }}>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
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
