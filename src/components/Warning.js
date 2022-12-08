import * as React from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";

const Warning = ({ message }) => {
  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        This is an error alert — <strong>{message}</strong>
      </Alert>
    </Stack>
  );
};
export default Warning;
