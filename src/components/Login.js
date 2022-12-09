import { useRef, useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";

import axios from "../api/axios";
import "./Login.css";
//MUI
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

import Stack from "@mui/material/Stack";

import { grey } from "@mui/material/colors";
import Box from "@mui/material/Box";

import TextField from "@mui/material/TextField";

import logo from "../img/logo.png";
import { Typography } from "@mui/material";
import Warning from "./Warning";

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

  const emailRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email: email, pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log("response?.data at Login.js below");
      console.log(JSON.stringify(response?.data));
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth({ email, pwd, roles, accessToken });
      setEmail("");
      setPwd("");
      //Generally, we should just redirect to the home page
      if (from === "/profile" || from === "/") {
        if (
          response?.data?.id &&
          (response.data.id === null || response.data.id === undefined)
        ) {
          navigate("/missing", { replace: true });
        }
        navigate("/profile/" + response.data.id, { replace: true });
        console.log("Heading to " + from + "/profile/" + response.data.id);
      } else {
        console.log("Heading to " + from);
        navigate(from, { replace: true });
      }
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Email or Password");
      } else if (err.response?.status === 401) {
        //Unauthorized
        setErrMsg("Email or password is wrong");
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
          {errMsg && (
            <Warning aria-live="assertive" message={errMsg} ref={errRef} />
          )}
        </Box>
        <Box component="form" onSubmit={handleSubmit}>
          <Stack alignItems="stretch" justifyContent="center" spacing={1}>
            <Box sx={{ textAlign: "center" }} mb={2}>
              <img src={logo} alt="login logo" width="150px" />
            </Box>

            <label htmlFor="email">
              <Typography variant="h5">Email</Typography>
            </label>

            <TextField
              id="email"
              variant="outlined"
              type="text"
              ref={emailRef}
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />

            <label htmlFor="password">
              <Typography variant="h5">Password</Typography>
            </label>

            <TextField
              id="password"
              variant="outlined"
              type="password"
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
