import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
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
const ProfileEditing = ({ id }) =>
  // name,
  // balance,
  // age,
  // phone,
  // company,
  // address,
  // eyeColor

  {
    const [fName, setFName] = useState("");
    const [lName, setLName] = useState("");
    const [age, setAge] = useState("");
    const [phone, setPhone] = useState("");
    const [company, setCompany] = useState("");
    const [address, setAddress] = useState("");
    const [eyeColor, setEyeColor] = useState("");
    const [submitForm, setSubmitForm] = useState(false);
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async (e) => {
      console.log("submit edit");
      e.preventDefault();

      let isMounted = true;
      const controller = new AbortController();
      const submitEdit = async () => {
        try {
          const response = await axiosPrivate.put(
            "/info/" + id,
            JSON.stringify({
              id,
              firstname: fName,
              lastname: lName,
              age,
              phone,
              company,
              address,
              eyeColor,
            }),
            {
              signal: controller.signal,
            }
          );
          console.log(
            "response.data from info: " + JSON.stringify(response.data)
          );
        } catch (err) {
          console.error(err);
        }
      };
      submitEdit();
      return () => {
        isMounted = false;
        controller.abort();
      };
    };
    return (
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <div>
          <TextField
            id="standard-multiline-flexible"
            label="First Name"
            value={fName}
            onChange={(e) => setFName(e.target.value)}
            variant="standard"
          />
          <TextField
            id="standard-multiline-flexible"
            label="Last Name"
            value={lName}
            onChange={(e) => setLName(e.target.value)}
            variant="standard"
          />
          <TextField
            id="standard-number"
            label="Age"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            value={age}
            variant="standard"
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <div>
          <TextField
            id="standard-multiline-flexible"
            label="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            variant="standard"
          />
          <TextField
            id="standard-multiline-flexible"
            label="Company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            variant="standard"
          />
          <TextField
            id="standard-multiline-static"
            label="Address"
            multiline
            rows={4}
            variant="standard"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div>
          <TextField
            id="standard-multiline-flexible"
            label="Eye Color"
            value={eyeColor}
            onChange={(e) => setEyeColor(e.target.value)}
            variant="standard"
          />
          <Box sx={{ textAlign: { xs: "center", sm: "right" } }}>
            <SubmitButton variant="contained">Submit</SubmitButton>
          </Box>
        </div>
      </Box>
    );
  };
export default ProfileEditing;
