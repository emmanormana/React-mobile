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
//drop down menu for balance button and the drop down
import { grey } from "@mui/material/colors";
import ProfileMenu from "./ProfileMenu";

//MUI use detail
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import { Button } from "@mui/material";
import Balance from "./Balance";
import ProfileEditing from "./ProfileEditing";

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

  const [user, setUser] = useState();
  const [showEdit, setShowEdit] = useState(true);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUser = async () => {
      try {
        const response = await axiosPrivate.get(
          "/info/" + id,

          {
            signal: controller.signal,
          }
        );
        console.log(
          "response.data from info: " + JSON.stringify(response.data)
        );
        isMounted && setUser(response.data);
      } catch (err) {
        console.error(err);
        //remove the last navigation history, which is the login
        //replace it with the one before the login
        navigate("/login", { state: { from: location }, replace: true });
      }
      console.log("1-------------------");
      console.log(user);
      console.log("2-------------------");
    };

    getUser();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h6"
              align="center"
              component="div"
              sx={{ flexGrow: 1, ml: 1 }}
            >
              Profile
            </Typography>
            <ProfileMenu />
          </Toolbar>
        </AppBar>
      </Box>
      {user && (
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={2}
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
                alt="Default User Avatar"
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

            <Grid xs={1} sm={1}>
              <Item>xs=2</Item>
            </Grid>
            <Grid xs={4} sm={5} md={4}>
              {user.balance !== "not authorized" ? (
                <Balance amount={user.balance}>Balance</Balance>
              ) : (
                <Button
                  disabled
                  variant="contained"
                  sx={{
                    width: "100%",
                    color: "black",
                    backgroundColor: grey[400],
                    fontWeight: "bold",
                  }}
                >
                  Balance
                </Button>
              )}
            </Grid>
            <Grid xs={4} sm={5} md={4}>
              <Button
                sx={{
                  width: "100%",
                  color: "black",
                  backgroundColor: grey[400],
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "white",
                  },
                }}
                // sx={{ width: { xs: 100, sm: 310 } }}
                variant="contained"
                onClick={() => {
                  setShowEdit(!showEdit);
                }}
              >
                Edit
              </Button>
            </Grid>
            <Grid xs={1} sm={1}>
              <Item>xs=2</Item>
            </Grid>

            {showEdit && (
              <Grid
                xs={8}
                container
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <ProfileEditing id={id} />
              </Grid>
            )}

            <Grid xs={8}>
              <RowDetail
                title={user.name.first + " " + user.name.last}
                text={"Age: " + user.age + " and Eye color: " + user.eyeColor}
                avatar_letter={user.name.first.charAt(0)}
              />
            </Grid>
            <Grid xs={8}>
              <RowDetail
                title={"Contact Information: " + user.email}
                text={
                  "Email: " +
                  user.email +
                  " and Company: " +
                  user.company +
                  " Phone: " +
                  user.phone
                }
              />
            </Grid>
            <Grid xs={8}>
              <RowDetail title={"Address: "} text={user.address} />
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
};

export default Profile;
