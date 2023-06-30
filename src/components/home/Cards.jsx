import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../../store/modal-slice";
import { LinearProgress } from "@mui/material";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import VerifiedIcon from "@mui/icons-material/Verified";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
// import { expenseActions } from "../../store/expense-slice";
import XLSX from "sheetjs-style";
import * as FileSaver from "file-saver";
import { useNavigate } from "react-router-dom";

//! Function to download excel sheet
function exportToExcel(expenses) {
  let excelData = [];

  //? To print, we need an array of objects
  for (const key in expenses) {
    excelData.push(expenses[key]);
  }

  const fileTyle =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const dateTime = new Date().toLocaleString();

  const ws = XLSX.utils.json_to_sheet(excelData);
  const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const data = new Blob([excelBuffer], { type: fileTyle });

  //? Actual object to download sheet
  FileSaver.saveAs(data, "Expenses - " + dateTime + ".xlsx");
}

const Cards = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.expense);
  const isProUser = 1000  //useSelector((state) => state.expenses.isProUser);
  const isDarkThemeEnabled = useSelector((state) => state.theme.isDarkThemeEnabled);
  const navigate = useNavigate()
  const totalExpenses = items.reduce((a, b) => a + Number(b.amount), 0)

  function showPopUp() {
    dispatch(modalActions.addExpenseHandler());
  }

  function activateMembership() {
    // dispatch(expenseActions.activatePro());
  }

  let bgColor = "initial";
  let textColor = "initial";
  if (isDarkThemeEnabled) {
    bgColor = "rgba(0, 0, 0, 0.5)";
    textColor = "white";
  }

  let card4Heading = "",
    card4Content = "";

  if (totalExpenses < 1000 && !isProUser) {
    card4Heading = "Pro Requirements";

    card4Content = (
      <>
        <Typography
          variant="h4"
          component="h4"
          color="inherit"
          sx={{
            fontSize: "1.8rem",
            fontWeight: "bold",
            mt: "1rem",
            mb: "0.8rem",
          }}
        >
          {10000 - totalExpenses}
        </Typography>
        <LinearProgress
          variant="determinate"
          value={totalExpenses / 100}
          color="secondary"
        />
      </>
    );
  }

  if (totalExpenses >= 10000 && !isProUser) {
    card4Heading = "Activate Membership";

    card4Content = (
      <Button
        startIcon={<VerifiedIcon />}
        variant="outlined"
        color="success"
        size="medium"
        sx={{ mt: "2rem", color: "lime" }}
        onClick={activateMembership}
      >
        Activate
      </Button>
    );
  }

  if (isProUser) {
    card4Heading = "Download Data";

    card4Content = (
      <Button
        startIcon={<DownloadForOfflineIcon />}
        variant="outlined"
        color="success"
        size="medium"
        sx={{ mt: "2rem", color: "lime" }}
        disabled={!Object.keys(items).length}
        onClick={() => {
          exportToExcel(items);
        }}
      >
        Excel
      </Button>
    );
  }

  return (
    <>
      <Container maxWidth="lg" sx={{ mt: "3rem" }}>
        <Grid container spacing={3}>
          <Grid item xs={14} sm={8} lg={4}>
            <Card
              sx={{
                borderRadius: "30px",
                boxShadow: "0px 0px 5px 0px #ccc",
                p: "1rem",
                height: "8rem",
                bgcolor: bgColor,
                color: textColor,
              }}
            >
              <Typography variant="body1" color="grey" fontWeight="bold">
                Total Spendings
              </Typography>
              <MonetizationOnOutlinedIcon
                sx={{
                  border: "10px solid red",
                  borderRadius: "50%",
                  color: "red",
                  fontSize: "3rem",
                  float: "right",
                }}
              />
              <Typography
                variant="h4"
                component="h4"
                color="inherit"
                sx={{ fontSize: "1.8rem", fontWeight: "bold", mt: "2rem" }}
              >
                ${totalExpenses}
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={14} sm={8} lg={4}>
            <Card
              sx={{
                borderRadius: "30px",
                boxShadow: "0px 0px 5px 0px #ccc",
                p: "1rem",
                height: "8rem",
                bgcolor: bgColor,
              }}
            >
              <Typography variant="body1" color="grey" fontWeight="bold">
                Add Expense
              </Typography>
              <MonetizationOnOutlinedIcon
                sx={{
                  border: "10px solid orange",
                  borderRadius: "50%",
                  color: "orange",
                  fontSize: "3rem",
                  float: "right",
                }}
              />
              <Button
                startIcon={<AddCircleOutlinedIcon />}
                variant="outlined"
                color="error"
                size="medium"
                sx={{ mt: "2rem", color: "red" }}
                // onClick={showPopUp}
                onClick={() => navigate("/Expense/AddExpense")}
              >
                Expense
              </Button>
            </Card>
          </Grid>
          <Grid item xs={14} sm={8} lg={4}>


            <Card
              sx={{
                borderRadius: "30px",
                boxShadow: "0px 0px 5px 0px #ccc",
                p: "1rem",
                height: "8rem",
                bgcolor: bgColor,
                color: textColor,
              }}
            >
              <Typography variant="body1" color="grey" fontWeight="bold">
                {card4Heading}
              </Typography>
              <CheckCircleOutlineOutlinedIcon
                sx={{
                  border: "10px solid lime",
                  borderRadius: "50%",
                  color: "lime",
                  fontSize: "3rem",
                  float: "right",
                }}
              />
              <Box sx={{ width: "100%" }}>{card4Content}</Box>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Cards;
