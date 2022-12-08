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
import Grid from "@mui/material/Unstable_Grid2";
import { Button } from "@mui/material";
import Balance from "./Balance";
import ProfileEditing from "./ProfileEditing";

//MUI
const Profile = () => {
  const [user, setUser] = useState();
  const [showEdit, setShowEdit] = useState(false);
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
            withCredentials: true,
            signal: controller.signal,
          }
        );
        isMounted && setUser(response.data);
      } catch (err) {
        console.error(err);
        //remove the last navigation history, which is the login
        //replace it with the one before the login
        navigate("/login", { state: { from: location }, replace: true });
      }
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
        <AppBar position="static" color="grey">
          <Toolbar>
            <Typography
              variant="h6"
              align="center"
              component="div"
              sx={{ flexGrow: 1, ml: 1 }}
            ></Typography>
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
            ></Grid>

            <Grid xs={1} sm={1}></Grid>
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
            <Grid xs={1} sm={1}></Grid>

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
