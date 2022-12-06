import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import Icon from "../img/icon.png";
import RowDetail from "./RowDetail";
//MUI
import Avatar from "@mui/material/Avatar";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { grey } from "@mui/material/colors";

//MUI use detail
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import { Button, ButtonGroup } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
//MUI
const Profile = () => {
  const example = {
    _id: "5410953eb0e0c0ae25608277",
    guid: "eab0324c-75ef-49a1-9c49-be2d68f50b96",
    isActive: true,
    balance: "$3,585.69",
    picture: "http://placehold.it/32x32",
    age: 30,
    eyeColor: "blue",
    name: {
      first: "Henderson",
      last: "Briggs",
    },
    company: "GEEKNET",
    email: "henderson.briggs@geeknet.net",
    phone: "+1 (936) 451-3590",
    address: "121 National Drive, Cotopaxi, Michigan, 8240",
  };

  const [users, setUsers] = useState();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  console.log("id is " + id);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    // const getUsers = async () => {
    //   try {
    //     const response = await axiosPrivate.get(
    //       "/info",

    //       {
    //         // params: { id: "Testing2" },
    //         signal: controller.signal,
    //       }
    //     );
    //     console.log("response.data from info: " + response.data);
    //     isMounted && setUsers(response.data);
    //   } catch (err) {
    //     console.error(err);
    //     navigate("/login", { state: { from: location }, replace: true });
    //   }
    // };

    // getUsers();

    // return () => {
    //   isMounted = false;
    //   controller.abort();
    // };
  }, []);

  return (
    // <article>
    //   <h2>Users List</h2>
    //   {users?.length ? (
    //     <ul>
    //       {users.map((user, i) => (
    //         <li key={i}>{user?.username}</li>
    //       ))}
    //     </ul>
    //   ) : (
    //     <p>No users to display</p>
    //   )}
    // </article>
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h6"
              align="center"
              component="div"
              sx={{ flexGrow: 25, ml: 1 }}
            >
              Profile
            </Typography>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              // sx={{ mr: 2 }}
              sx={{ flexGrow: 0 }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={1.5}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Grid
            my={5}
            xs={12}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Avatar
              sizes="300px"
              alt="Remy Sharp"
              src={Icon}
              sx={{ width: 300, height: 300, textAlign: "center" }}
            />
          </Grid>
          <Grid
            xs={12}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Item>xs=12</Item>
          </Grid>

          <Grid xs={2}>
            <Item>xs=2</Item>
          </Grid>
          <Grid
            xs={4}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Button variant="contained" sx={{ width: 250 }}>
              Balance
            </Button>
          </Grid>
          <Grid
            xs={4}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Button variant="contained" sx={{ width: 250 }}>
              Edit
            </Button>
          </Grid>
          <Grid xs={2}>
            <Item>xs=2</Item>
          </Grid>

          <Grid xs={8}>
            <RowDetail
              title={example.name.first + " " + example.name.last}
              text={
                "Age: " + example.age + " and Eye color: " + example.eyeColor
              }
              avatar_letter={example.name.first.charAt(0)}
            />
          </Grid>
          <Grid xs={8}>
            <RowDetail
              title={"Contact Information: " + example.email}
              text={
                "Email: " +
                example.email +
                " and Company: " +
                example.company +
                " Phone: " +
                example.phone
              }
            />
          </Grid>
          <Grid xs={8}>
            <RowDetail title={"Address: "} text={example.address} />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Profile;
