import { useDispatch, useSelector } from "react-redux";
import { Box, Card, TableCell, TableContainer, TableHead, Table, TableRow, TableBody, Container, Button } from "@mui/material";
import { expenseDeleteDataAsync } from "./ExpenseSlice";
import { Link } from "react-router-dom";

const ExpenseItems = ({ items }) => {
    const { email } = useSelector(state => state.auth.token)
    const dispatch = useDispatch();
    const isDarkThemeEnabled = useSelector((state) => state.theme.isDarkThemeEnabled);

    function deleteHandler(id) {
        console.log({ email, id })
        dispatch(expenseDeleteDataAsync({ email, id }));
    }

    let textColor = "initial";
    if (isDarkThemeEnabled) {
        textColor = "white";
    }

    let bgColor = "initial";
    // let textColor = "initial";
    if (isDarkThemeEnabled) {
        bgColor = "rgba(0, 0, 0, 0.5)";
        textColor = "white";
    }

    return (
        <Box mt="2rem" mb="1rem">
            <Container maxWidth="lg">
                <Card
                    sx={{
                        borderRadius: "20px",
                        boxShadow: "0 0 15px grey",
                        p: "1rem",
                        bgcolor: bgColor,
                    }}
                >
                    <TableContainer>
                        <Table>
                            <TableHead sx={{ th: { fontWeight: "bold", color: textColor } }}>
                                <TableRow>
                                    <TableCell>Expense Description</TableCell>
                                    <TableCell>Expense Amount</TableCell>
                                    <TableCell>Expense Category</TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>Edit / Delete</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {items?.map((item) => (
                                    <TableRow key={item?.id}>
                                        <TableCell sx={{ color: textColor }}>{item?.description}</TableCell>
                                        <TableCell sx={{ color: textColor }}>{item?.amount}</TableCell>
                                        <TableCell sx={{ color: textColor }}>{item?.category}</TableCell>
                                        <TableCell
                                            sx={{
                                                textAlign: "right",
                                                display: "flex",
                                                justifyContent: "space-evenly",
                                            }}
                                        >
                                            <Button variant="outlined" color="success" size="small">
                                                <Link to="/Expense/AddExpense" state={item}> Edit</Link>
                                            </Button>
                                            <Button variant="outlined" color="error" size="small" onClick={() => deleteHandler(item?.id)}>
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Card>
            </Container>
        </Box>
    );
};

export default ExpenseItems;
