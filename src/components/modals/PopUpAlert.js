import { useSelector } from "react-redux";
import { Snackbar, Alert } from "@mui/material";
import { useEffect, useState } from "react";

const PopUpAlert = () => {
  const [hide, setHide] = useState(false)
  const { status, alert } = useSelector(state => state.expense)
  const { status: authStatus, alert: authAlert } = useSelector(state => state.auth)

  useEffect(() => {
    setHide(true)
    setTimeout(() => {
      setHide(false)
    }, 4000)
  }, [authStatus, status])

  return (
    <>
      <Snackbar
        open={hide}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          severity={alert.status || authAlert.status}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {alert.msg || authAlert.msg}
        </Alert>
      </Snackbar>
    </>
  );
};

export default PopUpAlert;
