import { useSelector, useDispatch } from "react-redux";
import { Snackbar, Alert } from "@mui/material";
import { popUpAlertHandler } from "../auth/AuthSlice";
import { useState } from "react";

const PopUpAlert = () => {
  const [isAlert, setIsAlert] = useState(true)
  const {alert} = useSelector((state) => state.auth);
  const {status} = useSelector(state=>state.expense)
  const dispatch = useDispatch()

  function onCloseHandler() {
    setIsAlert(!isAlert)
  }

  return (
    <>
      <Snackbar
        open={status ==="pendding"}
        autoHideDuration={5000}
        onClose={onCloseHandler}
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
