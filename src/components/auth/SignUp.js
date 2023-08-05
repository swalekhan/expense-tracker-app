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

export default function SignUp() {
  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(postSignDataAsync({ url: ":signUp?key=AIzaSyC5Q8mjUSkbayV7izSHVIjQnd5-ndxl1gk", data: { ...formData, displayName: formData?.firstName + " " + formData?.lastName } }))
      .then((res) => {
        if (res?.meta?.requestStatus === "fulfilled") {
          navigate("/")
        }
      })
  };

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

            <Grid item xs={12} sm={6}>
              <TextField
                onChange={handleChange}
                value={formData.firstName}
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                onChange={handleChange}
                value={formData.lastName}
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
              />
            </Grid>

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
            Sign Up
          </Button>
          <Grid container>
            <Grid item xs={12} display="flex" justifyContent="space-between">
              <p>Do you have account?</p>
              <Link to="/Auth/SignInPage"> Sign In</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>

    </Container>

  );
}
