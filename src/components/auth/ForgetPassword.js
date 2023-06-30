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
import { postForgetPassworAsync } from "./AuthSlice";
import { Link, useNavigate } from "react-router-dom";
// import authenticateUser, { passwordReset } from "../store/auth-thunks";


export default function ForgetPassword() {
    const [formData, setFormData] = useState({ email: ""});
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(postForgetPassworAsync(formData))
        navigate("/")
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

                    </Grid>
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                       ForgetPassword
                    </Button>
                    <Grid container>
                        <Grid item xs={12} display="flex" justifyContent="space-between">
                           <Link to="/Auth/SignInPage">Sign In</Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>

        </Container>

    );
}
