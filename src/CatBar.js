import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import { Typography } from "@mui/material";
import mods from "./Modules";
import { OnDeviceTraining } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function TemporaryDrawer() {
  const [state, setState] = React.useState({
    left: false,
  });

  const [limit, setLimit] = React.useState(30);

  const [query, setQuery] = React.useState("");

  const [result, setResults] = React.useState(mods.slice(0, 30));

  const [cat, setCat] = React.useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setQuery(e.target.value);
    const filteredResults = mods.filter((mod) =>
      mod.moduleCode.toLowerCase().includes(query.toLowerCase())
    );
    e.target.value === ""
      ? setResults(mods.slice(0, limit))
      : setResults(filteredResults);
  };

  React.useEffect(() => {
    setResults(mods.slice(0, limit));
  }, [limit]);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ [anchor]: open });
  };

  function handleClick(e) {
    setCat(e.currentTarget.textContent);
  }

  React.useEffect(() => {
    if (cat !== "") {
      navigate(`/posts/category/${cat}`);
    }
  }, [cat]);

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
    >
      <List>
        <ListItem disablePadding>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Search..."
            type="text"
            fullWidth
            variant="outlined"
            multiline
            value={query}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            onChange={handleChange}
          />
        </ListItem>
      </List>
      <Divider />
      <Typography
        sx={{
          display: "flex",
          justifyContent: "center",

          color: "grey",
        }}
      >
        Modules
      </Typography>
      <Divider />
      <List>
        {result.map((mod) => {
          return (
            <ListItem key={mod.moduleCode} disablePadding>
              <ListItemButton
                sx={{ border: "1px solid black" }}
                onClick={handleClick}
              >
                <ListItemText
                  sx={{ display: "flex", justifyContent: "center" }}
                  primary={mod.moduleCode}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            onClick={() => {
              setLimit((prev) => prev + 30);
            }}
          >
            See More
          </Button>
        </div>
      </List>
    </Box>
  );

  return (
    <div>
      <React.Fragment>
        <Button
          style={{ backgroundColor: "#3FA0B5", color: "white" }}
          onClick={toggleDrawer("left", true)}
        >
          Category
        </Button>
        <Drawer
          anchor="left"
          open={state["left"]}
          onClose={toggleDrawer("left", false)}
        >
          {list("left")}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
