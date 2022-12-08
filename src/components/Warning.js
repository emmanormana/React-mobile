import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import { forwardRef } from "react";
const Warning = forwardRef(({ message }, ref) => {
  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      <Alert ref={ref} severity="error">
        <AlertTitle>Error</AlertTitle>
        This is an error: — <strong>{message}</strong>
      </Alert>
    </Stack>
  );
});
export default Warning;
