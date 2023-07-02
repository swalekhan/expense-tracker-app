import { useSelector } from "react-redux";
import { Snackbar, Alert } from "@mui/material";

const PopUpAlert = () => {
  const { status } = useSelector(state => state.expense)

  return (
    <>
      <Snackbar
        open={status === "pendding"}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          severity={"success"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {"successfully!"}
        </Alert>
      </Snackbar>
    </>
  );
};

export default PopUpAlert;
