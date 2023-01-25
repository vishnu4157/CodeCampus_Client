//@@author NguyenDa18-reused
//Reused from https://codesandbox.io/s/materialui-signup-form-x0ne1?from-embed=&file=/src/SignInSide.js
// code only reused for the UI. login and sign up logic was self implemented

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Password } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const theme = createTheme();

export default function SignUp() {
  const [hasError, setHasError] = React.useState(false);
  const [taken, setTaken] = React.useState(false);
  const [takenMsg, setTakenMsg] = React.useState("");
  const [hasLengthError, setHasLengthError] = React.useState(false);
  const [lengthErrorMsg, setLengthErrorMsg] = React.useState("");
  const [errorMsg, setErrorMsg] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [cfmPassword, setCfmPassword] = React.useState("");

  const navigate = useNavigate();

  function checkMatch() {
    if (password !== cfmPassword) {
      setHasError(true);
      setErrorMsg("Passwords do not match");
    } else {
      setHasError(false);
      setErrorMsg("");
    }
  }

  function checkPassLength() {
    if (password.length > 5 || password.length === 0) {
      setHasLengthError(false);
      setLengthErrorMsg("");
    } else {
      setHasLengthError(true);
      setLengthErrorMsg("Password is too short, Min. 6 chars long");
    }
  }

  function handleButton() {
    if (!hasError && !hasLengthError) {
      const userData = {
        name: name,
        username: username,
        password: password,
      };
      axios
        .post("http://localhost:3000/users", { user: userData })
        .then((res) => {
          console.log(res.data.jwt);
          navigate("/Mainpage");
          Cookies.set("jwt", res.data.jwt, {
            expires: 7,
          });
        })
        .catch((err) => {
          if (err.response.data.username[0] === "has already been taken") {
            setTaken(true);
            setTakenMsg("has already been taken");
          }
        });
    }
  }

  React.useEffect(() => {
    checkMatch();
  }, [cfmPassword]);

  React.useEffect(() => {
    checkPassLength();
  }, [password]);

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
            Sign up
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="Name"
                  required
                  fullWidth
                  id="Name"
                  label="Name"
                  value={name}
                  autoFocus
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="Username"
                  label="Username"
                  name="Username"
                  value={username}
                  autoComplete="family-name"
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setTaken(false);
                    setTakenMsg("");
                  }}
                  error={taken}
                  helperText={takenMsg}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={password}
                  error={hasLengthError}
                  autoComplete="new-password"
                  helperText={lengthErrorMsg}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="Confirm Password"
                  label="Confirm Password"
                  type="password"
                  id="Confirm Password"
                  autoComplete="new-password"
                  value={cfmPassword}
                  onChange={(e) => {
                    setCfmPassword(e.target.value);
                  }}
                  onBlur={checkMatch}
                  error={hasError}
                  helperText={errorMsg}
                />
              </Grid>
              {/* <Grid item xs={12}>
                <Typography>
                  Password has to be Min 6 characters long
                </Typography>
              </Grid> */}
            </Grid>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleButton}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/" variant="body2">
                  {"Already have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
