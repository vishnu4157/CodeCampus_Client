//@@author NguyenDa18-reused
//Reused from https://codesandbox.io/s/materialui-signup-form-x0ne1?from-embed=&file=/src/SignInSide.js
// code only reused for the UI. login and sign up logic was self implemented

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const theme = createTheme();

export default function SignIn() {
  const [error, setError] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");
  const [dataLoaded, setDataLoaded] = React.useState(false);
  const navigate = useNavigate();

  const [username, setUsername] = React.useState("");
  const [pass, setPass] = React.useState("");

  function handleSignIn() {
    const data = {
      username: username,
      password: pass,
    };

    console.log(username);
    console.log(pass);
    axios
      .post("http://localhost:3000/signin", { user: data })
      .then((res) => {
        console.log(res.data.jwt);
        navigate("/Mainpage");
        Cookies.set("jwt", res.data.jwt, {
          expires: 7,
        });
      })
      .catch((err) => {
        console.log(err);
        setError(true);
        setErrorMsg("Invalid Password or Username");
      });
  }

  React.useEffect(() => {
    if (!dataLoaded) {
      setTimeout(() => {
        setDataLoaded(true);
      }, 2000);
    }
  }, [dataLoaded]);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            // onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={error}
              helperText={errorMsg}
              onChange={(e) => setPass(e.target.value)}
            />

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSignIn}
            >
              Sign In
            </Button>
            <Grid
              container
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Grid item>
                <Link to="/Signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
