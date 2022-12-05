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

const StyledButton = (props) => (
  <Button
    sx={{
      padding: 1, // means "theme.spacing(1)", NOT "1px"
      color: "black",
      backgroundColor: grey[400],
      width: 200,
      fontWeight: "bold",
      textAlign: "right",
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
  const from = location.state?.from?.pathname || "/";

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
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email: user, pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(response?.data));
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth({ user, pwd, roles, accessToken });
      setUser("");
      setPwd("");
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {/* <section>
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setUser(e.target.value)}
            value={user}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
          />
          <button>LOGIN</button>
        </form>
        <p>
          <span className="line">
            <Link to="/register">Sign Up</Link>
          </span>
        </p>
      </section> */}
      {/* <CssBaseline /> */}
      <Container maxWidth="sm">
        <form onSubmit={handleSubmit}>
          <Stack
            alignItems="stretch"
            justifyContent="center"
            spacing={1}
            sx={{ bgcolor: "#cfe8fc" }}
          >
            <Box sx={{ textAlign: "center" }}>
              <img src={logo} alt="login logo" width="150px" />
            </Box>

            <Item>
              <label htmlFor="username">
                <Typography variant="h5">Username</Typography>
              </label>
            </Item>
            <Box sx={{ height: 1, alignContent: "center" }}>
              <TextField id="outlined-basic" variant="outlined" />
              <input
                type="text"
                id="username"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                value={user}
                required
              />
            </Box>
            <Item>
              <label htmlFor="password">
                <Typography variant="h5">Password</Typography>
              </label>
            </Item>
            <Box sx={{ textAlign: "left" }}>
              <input
                type="password"
                id="password"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
              />
            </Box>
            <Box sx={{ textAlign: "center" }}>
              <StyledButton variant="contained">LOGIN</StyledButton>
            </Box>
            <Item>
              <p>
                <span className="line">
                  <Link to="/register">Sign Up</Link>
                </span>
              </p>
            </Item>
          </Stack>
        </form>
      </Container>
    </>
  );
};

export default Login;
