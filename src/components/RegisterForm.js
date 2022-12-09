import Box from "@mui/material/Box";

import Grid from "@mui/material/Grid";
import logo from "../img/logo.png";
import { Button, TextField, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

import axios from "../api/axios";
import { useEffect, useRef, useState } from "react";
import Warning from "./Warning";
import { Link } from "react-router-dom";

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
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const PWD_REGEX = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
const REGISTER_URL = "/register";
const RegisterForm = ({ SucessComp }) => {
  // const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [picLink, setPicLink] = useState("");
  const [balance, setBalance] = useState("");
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [eyeColor, setEyeColor] = useState("");
  const [age, setAge] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [errMsg, setErrMsg] = useState("YESS");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const v1 = EMAIL_REGEX.test(email);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg("Invalid Email or Password");
      return;
    }
    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({
          balance: balance,
          age: age,
          eyeColor: eyeColor,
          pic_link: picLink,
          first: first,
          last: last,
          company: company,
          email: email,
          pwd: pwd,
          phone: phone,
          address: address,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      setSuccess(true);
      setEmail("");
      setPwd("");
      setMatchPwd("");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Email Taken by other user");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        SucessComp
      ) : (
        <>
          {errMsg && <Warning message={errMsg} ref={errRef} />}
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
                <TextField
                  required
                  id="email"
                  label="Email"
                  variant="outlined"
                  aria-invalid={validEmail ? "false" : "true"}
                  aria-describedby="email"
                  onFocus={() => setEmailFocus(true)}
                  onBlur={() => setEmailFocus(false)}
                  error={email !== "" && !validEmail}
                  helperText={
                    emailFocus && email && !validEmail
                      ? "Invalid Email Address"
                      : ""
                  }
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  color={validEmail ? "success" : "error"}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="password"
                  label="Password"
                  variant="outlined"
                  aria-describedby="password"
                  onFocus={() => setPwdFocus(true)}
                  onBlur={() => setPwdFocus(false)}
                  error={pwd !== "" && !validPwd}
                  helperText={
                    <>
                      {pwdFocus && pwd && !validPwd && (
                        <>
                          Must contain at least one number
                          <br /> and one uppercase and lowercase letter,
                          <br /> and at least 8 or more characters
                        </>
                      )}
                    </>
                  }
                  onChange={(e) => setPwd(e.target.value)}
                  value={pwd}
                  color={validPwd ? "success" : "error"}
                  type="password"
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  type="password"
                  id="confirm password"
                  label="Confirm Password"
                  variant="outlined"
                  aria-describedby="confirm password"
                  onFocus={() => setMatchFocus(true)}
                  onBlur={() => setMatchFocus(false)}
                  error={matchPwd !== "" && !validMatch}
                  helperText={
                    matchFocus && !validMatch ? "Password doesn't match ." : ""
                  }
                  onChange={(e) => setMatchPwd(e.target.value)}
                  value={matchPwd}
                  color={validMatch ? "success" : "error"}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="picture address"
                  label="Picture Address"
                  variant="outlined"
                  aria-describedby="picture address"
                  onChange={(e) => setPicLink(e.target.value)}
                  value={picLink}
                />
              </Grid>

              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
              >
                <Grid
                  pl={10}
                  item
                  xs={12}
                  justifyContent="flex-start"
                  alignItems="center"
                >
                  <TextField
                    id="balance"
                    label="Balance"
                    variant="standard"
                    aria-describedby="balance"
                    onChange={(e) => setBalance(e.target.value)}
                    value={balance}
                  />
                  <TextField
                    id="first name"
                    label="First Name"
                    variant="standard"
                    aria-describedby="first name"
                    onChange={(e) => setFirst(e.target.value)}
                    value={first}
                  />
                  <TextField
                    id="last name"
                    label="Last Name"
                    variant="standard"
                    aria-describedby="last name"
                    onChange={(e) => setLast(e.target.value)}
                    value={last}
                  />
                  <TextField
                    id="eye color"
                    label="Eye Color"
                    variant="standard"
                    aria-describedby="eye color"
                    onChange={(e) => setEyeColor(e.target.value)}
                    value={eyeColor}
                  />
                </Grid>

                <Grid item xs={12} pl={10}>
                  <TextField
                    type="number"
                    id="age"
                    label="age"
                    variant="standard"
                    aria-describedby="age"
                    onChange={(e) => setAge(e.target.value)}
                    value={age}
                  />
                  <TextField
                    id="company"
                    label="Company"
                    variant="standard"
                    aria-describedby="company"
                    onChange={(e) => setCompany(e.target.value)}
                    value={company}
                  />
                  <TextField
                    id="phone"
                    label="Phone"
                    variant="standard"
                    aria-describedby="phone"
                    onChange={(e) => setPhone(e.target.value)}
                    value={phone}
                  />
                  <TextField
                    id="address"
                    label="Address"
                    variant="standard"
                    multiline
                    rows={4}
                    aria-describedby="address"
                    onChange={(e) => setAddress(e.target.value)}
                    value={address}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <SubmitButton variant="contained">Register</SubmitButton>
              </Grid>
            </Grid>
          </Box>
          <Link to="/login">
            <Typography pt={5} sx={{ textAlign: "center" }} variant="body1">
              Login
            </Typography>
          </Link>
        </>
      )}
    </>
  );
};
export default RegisterForm;
