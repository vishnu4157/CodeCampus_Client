import {
  Box,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Stack,
  Avatar,
  Divider,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ReplyRoundedIcon from "@mui/icons-material/ReplyRounded";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { EditCommentsContext } from "./EachPost";
import { TextField } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  pre: {
    whiteSpace: "pre-wrap",
    fontFamily: "monospace",
  },
}));

const MuiCard = (props) => {
  const TextFieldWrap = useStyles();
  const [hit, setHit] = useState(false);
  const [category, setCategory] = useState("");
  const [postToDel, setPostToDel] = useState(0);
  const [editClicked, setEditClicked] = useState(false);
  const [contents, setContents] = useState("");
  const [contentToEdit, setContentToedit] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleSubmit() {
    handleClose;
  }

  function handleLike() {
    if (!hit) {
      setLikes((prevLikes) => {
        return prevLikes + 1;
      });
      setHit(true);
    } else {
      setLikes((prevLikes) => {
        return prevLikes - 1;
      });
      setHit(false);
    }
  }

  const navigate = useNavigate();

  function goToCat(e) {
    e.preventDefault();
    setCategory(e.currentTarget.textContent);
  }

  React.useEffect(() => {
    if (category !== "") {
      navigate(`/posts/category/${category}`);
    }
  }, [category]);

  const dandt = props.created_at.substring(0, 10);

  function handleDel() {
    axios
      .delete(`http://localhost:3000/posts/${postToDel}`)
      .then((res) => {
        navigate("/Mainpage");
      })
      .catch((err) => console.log("del error"));
  }

  useEffect(() => {
    postToDel > 0 ? handleDel() : null;
  }, [postToDel]);

  function handleEdit(e) {
    if (e.key === "Enter" && !event.shiftKey) {
      axios
        .patch(`http://localhost:3000/posts/${props.post_id}`, {
          post: { content: contentToEdit },
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      setEditClicked(false);
      if (props.setChildChange) {
        props.setChildChange((prev) => prev + 1);
      }
    }
  }

  return (
    <>
      <Box
        width="800px"
        margin="auto"
        className="comment-box-main"
        marginTop="20px"
      >
        <Card>
          <CardContent>
            <div className="username-cat">
              <Button className="to-bold" onClick={goToCat} variant="outlined">
                {props.category}
              </Button>
              <Button>{props.username}</Button>
              <p className="posted-ago">
                {props.created_at !== "" ? `posted at ${dandt}` : null}
              </p>
            </div>
            <Stack
              divider={
                <Divider orientation="horizontal" flexItem padding={1} />
              }
            >
              <Stack
                direction="row"
                spacing={2}
                padding={0.5}
                alignItems="center"
              >
                <Avatar
                  alt="Remy Sharp"
                  src={`https://api.multiavatar.com/${props.post_user}.png`}
                />
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  className="heading-card"
                  margin="25px"
                >
                  {props.title}
                </Typography>
              </Stack>
              {editClicked ? (
                <TextField
                  value={contents}
                  multiline
                  expands="true"
                  fullWidth
                  padding="20px"
                  onKeyPress={handleEdit}
                  onChange={(e) => {
                    setContentToedit(e.target.value);
                    setContents(e.target.value);
                  }}
                />
              ) : (
                <Typography
                  variant="body"
                  color="text.Secondary"
                  padding="10px"
                  sx={{ marginLeft: "60px", marginTop: "10px" }}
                  style={{ wordWrap: "break-word" }}
                  className={TextFieldWrap.pre}
                >
                  {props.content}
                </Typography>
              )}
            </Stack>
          </CardContent>
          <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
            {props.curr_user === props.post_user ? (
              <>
                <Button
                  onClick={() => {
                    setPostToDel(props.post_id);
                    handleDel();
                  }}
                  variant="outlined"
                  startIcon={<DeleteIcon />}
                  sx={{ marginLeft: "16px" }}
                >
                  Delete
                </Button>
                <Button
                  onClick={() => {
                    setEditClicked((prev) => !prev);
                    setContents(props.content);
                    console.log(contents);
                  }}
                  variant="outlined"
                  startIcon={<EditIcon />}
                  sx={{ marginLeft: "16px" }}
                >
                  Edit
                </Button>
              </>
            ) : null}
            <Button
              variant="outlined"
              startIcon={<ReplyRoundedIcon />}
              sx={{ marginLeft: "16px" }}
            >
              Reply
            </Button>
          </CardActions>
        </Card>
      </Box>
    </>
  );
};

export default MuiCard;
