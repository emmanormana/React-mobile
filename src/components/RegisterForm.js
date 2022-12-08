import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import logo from "../img/logo.png";
import { Button, TextField, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const SubmitButton = (props) => (
  <Button
    type="submit"
    sx={{
      padding: 1, // means "theme.spacing(1)", NOT "1px"
      color: "black",
      backgroundColor: grey[400],
      width: 200,
      fontWeight: "bold",
    }}
  >
    {props.children}
  </Button>
);
const RegisterForm = ({ handleSubmit }) => {
  return (
    <Box
      component="form"
      sx={{
        flexGrow: 1,
        "& .MuiTextField-root": { m: 1 },
      }}
      onSubmit={handleSubmit}
      noValidate
      autoComplete="off"
    >
      <Grid
        container
        spacing={2}
        direction="column"
        justifyContent="space-around"
        alignItems="center"
      >
        <Grid item xs={12}>
          <Box sx={{ textAlign: "center" }} mb={2}>
            <img src={logo} alt="login logo" width="150px" />
          </Box>
        </Grid>
        <Grid xs={12} item md={2}>
          <TextField id="outlined-basic" label="Email" variant="outlined" />
        </Grid>

        <Grid item xs={12}>
          <TextField id="outlined-basic" label="Password" variant="outlined" />
        </Grid>

        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="Confirm Password"
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField id="outlined-basic" label="Picture" variant="outlined" />
        </Grid>

        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={6} justifyContent="flex-start" alignItems="center">
            <TextField
              type="number"
              id="outlined-basic"
              label="Balance"
              variant="standard"
            />
            <TextField
              id="outlined-basic"
              label="First Name"
              variant="standard"
            />
            <TextField
              id="outlined-basic"
              label="Last Name"
              variant="standard"
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              id="outlined-basic"
              label="Eye Color"
              variant="standard"
            />
            <TextField id="outlined-basic" label="age" variant="standard" />
            <TextField id="outlined-basic" label="Company" variant="standard" />
            <TextField id="outlined-basic" label="Phone" variant="standard" />
            <TextField
              id="outlined-basic"
              label="Adress"
              variant="standard"
              multiline
              rows={4}
              // maxRows={4}
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <SubmitButton variant="contained">Register</SubmitButton>
        </Grid>
      </Grid>
    </Box>
  );
};
export default RegisterForm;
