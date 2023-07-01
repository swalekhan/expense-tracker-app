import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { Box,InputLabel, Select } from "@mui/material";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import dayjs from "dayjs";
import { expensePostDataAsync, expensePutDataAsync } from "./ExpenseSlice";
import { useLocation, useNavigate } from "react-router-dom";

const AddExpense = () => {
    const { email } = useSelector(state => state.auth.token)
    const { state } = useLocation()
    const navigte = useNavigate()
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({ description: state?.description || "", amount: state?.amount || "", category: state?.category || "", dateTime: dayjs(state?.dateTime?state?.dateTime:"")});

    function changeHandler(e) {
        let obj = {};
        if (e["$d"]) {
            obj = {
                ...formData,
                dateTime: e["$d"].toString(),
            };
        } else {
            obj = {
                ...formData,
                [e.target.name]: e.target.value,
            };
        }
        setFormData(obj);
    }

    function submitHandler(e) {
        e.preventDefault()
        if (state) {
            dispatch(expensePutDataAsync({ email, data: {...formData,id:state?.id} }))
        } else {
            dispatch(expensePostDataAsync({ email, data: formData }))
        }
        navigte("/")
    }

    
    return (
        <>
            <Box component="form" onSubmit={submitHandler} m="5rem">
                <Grid container spacing={3} alignItems="center" justifyContent="center">
                    <Grid item xs={11}>
                        <TextField
                            name="description"
                            id="description"
                            label="Explain Description within 40 words"
                            value={formData.description}
                            onChange={changeHandler}
                            type="text"
                            required
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={11}>
                        <TextField
                            name="amount"
                            id="amount"
                            label="Expense Amount"
                            value={formData.amount}
                            onChange={changeHandler}
                            type="number"
                            required
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={11}>
                        <FormControl fullWidth>
                            <InputLabel id="expense-category">Expense category</InputLabel>
                            <Select
                                label="Expense Category"
                                name="category"
                                onChange={changeHandler}
                                value={formData.category}
                                id="expense-category"
                                labelId="expense-category"
                                required
                            >
                                <MenuItem value="fuel">Fuel</MenuItem>
                                <MenuItem value="food">Food</MenuItem>
                                <MenuItem value="clothes">Clothes</MenuItem>
                                <MenuItem value="others">other</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={11}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={["MobileDateTimePicker"]}>
                                <DemoItem label="Date">
                                    <MobileDateTimePicker
                                        onChange={changeHandler}
                                        value={dayjs(formData.dateTime)}
                                        name="dateTime"
                                    />
                                </DemoItem>
                            </DemoContainer>
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={11} display="flex" justifyContent="center">
                        <Button
                            type="submit"
                            variant="contained"
                            color="success"
                            size="large"
                            sx={{ bgcolor: "#002333", p: "0.5rem 1.5rem" }}
                        >
                            {state ? "Edit Expense" : "Add Expense"}
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default AddExpense;