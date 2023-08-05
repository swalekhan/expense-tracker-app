import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Container from "@mui/material/Container";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { postSignDataAsync } from "./AuthSlice";
import { Link, useNavigate } from "react-router-dom";



export default function SignIn() {
  const [formData, setFormData] = useState({ email: "", password: "", returnSecureToken: true, });
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(postSignDataAsync({ url: ":signInWithPassword?key=AIzaSyC5Q8mjUSkbayV7izSHVIjQnd5-ndxl1gk", data: formData }))
      .then((res) => {
        if (res?.meta?.requestStatus === "fulfilled") {
          navigate("/")
        }
      })
  }

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  return (

    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockOutlinedIcon />
        </Avatar>


        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                onChange={handleChange}
                value={formData.email}
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                onChange={handleChange}
                value={formData.password}
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>

          </Grid>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
          <Grid container>
            <Grid item xs={12} display="flex" justifyContent="center" margin="6px" fontSize="15px">
              <Link to="/auth/ForgetPasswordPage">Forget Password</Link>
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="space-between">
              <p>Create a new account</p>
              <Link to="/Auth/SignUpPage">Sign UP</Link>
            </Grid>

          </Grid>
        </Box>
      </Box>

    </Container>
  );
}
