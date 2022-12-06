import { useRef, useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";

import axios from "../api/axios";
import "./Login.css";
import CssBaseline from "@mui/material/CssBaseline";
//MUI
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

import { grey } from "@mui/material/colors";
import Box from "@mui/material/Box";

import TextField from "@mui/material/TextField";

import logo from "../img/logo.png";
import {
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Typography,
} from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  //   textAlign: "left",
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

//MUI

const LOGIN_URL = "/auth";

const Login = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/profile";

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Try block in Login.js below");
      console.log({ user, pwd });
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email: user, pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log("response?.data at Login.js below");
      console.log(JSON.stringify(response?.data));
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth({ user, pwd, roles, accessToken }); //Todo, add the idd too.
      setUser("");
      setPwd("");
      if (from === "/profile" || from === "/") {
        navigate("/profile/" + response.data.id, { replace: true });
        console.log("Heading to " + from + "/profile/" + response.data.id);
      } else {
        console.log("Heading to " + from);
        navigate(from, { replace: true });
      }
      // navigate(from, { replace: true });
      // navigate("/profile/" + response.data.id, { replace: true });
      // console.log("Heading to " + from + "/profile/" + response.data.id);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        //Unauthorized
        setErrMsg("User name or password is wrong");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      <Container maxWidth="md">
        <Box sx={{ textAlign: "center" }} m={2}>
          <Button
            variant="text"
            ref={errRef}
            className={!errMsg ? "" : "offscreen"}
            aria-live="assertive"
            color="error"
          >
            {errMsg}
          </Button>
        </Box>
        <Box component="form" onSubmit={handleSubmit}>
          <Stack alignItems="stretch" justifyContent="center" spacing={1}>
            <Box sx={{ textAlign: "center" }} mb={2}>
              <img src={logo} alt="login logo" width="150px" />
            </Box>

            <label htmlFor="username">
              <Typography variant="h5">Username</Typography>
            </label>

            <TextField
              id="username"
              variant="outlined"
              type="text"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
            />

            <label htmlFor="password">
              <Typography variant="h5">Password</Typography>
            </label>

            <TextField
              id="password"
              variant="outlined"
              type="password"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
            />

            <Box sx={{ textAlign: "center" }}>
              <SubmitButton variant="contained">LOGIN</SubmitButton>
            </Box>
          </Stack>
        </Box>
        <Link to="/register">
          <Typography variant="body1">Sign Up</Typography>
        </Link>
      </Container>
    </>
  );
};

export default Login;
