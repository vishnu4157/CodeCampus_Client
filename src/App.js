import MuiCard from "./CardComp";
import "./styles.css";
import {
  Box,
  Paper,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Stack,
  Avatar,
  Divider
} from "@mui/material";
import TextField from "@mui/material/TextField";
import IPF from "./Inputfield";
import Navbar from "./Navbar";

export default function App() {
  const users = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <>
      <Navbar />
      <Paper
        sx={{
          width: "1000px",
          margin: "auto",
          padding: "10px",
          gap: "10px",
          marginTop: "100px"
        }}
      >
        <Stack
          divider={<Divider orientation="horizontal" flexItem padding={1} />}
          spacing={2}
        >
          <MuiCard />
          <h2 style={{ margin: "auto" }}>Comments</h2>
        </Stack>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "100%" },
            marginRight: "12px"
          }}
          noValidate
          autoComplete="off"
          justifyContent="space-between"
        >
          {/* <TextField
          id="filled-multiline-static"
          label="Comment"
          multiline
          rows={4}
          variant="filled"
        /> */}
          <IPF />
        </Box>
        {users.map(() => (
          <MuiCard />
        ))}
      </Paper>
    </>
  );
}
