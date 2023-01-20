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
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import EditIcon from "@mui/icons-material/Edit";
import ReplyRoundedIcon from "@mui/icons-material/ReplyRounded";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { TextField } from "@mui/material";
import { useContext } from "react";
import { useControlled } from "@material-ui/core";
import { DelCommentsContext } from "./EachPost";
import { EditCommentsContext } from "./EachPost";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

const useStyles = makeStyles((theme) => ({
  pre: {
    whiteSpace: "pre-wrap",
    fontFamily: "monospace",
  },
}));

const MuiCard = (props) => {
  const TextFieldWrap = useStyles();
  const [category, setCategory] = useState("");
  const { postToDel, setPostToDel } = useContext(DelCommentsContext);
  const [editClicked, setEditClicked] = useState(false);
  const [toEdit, setToEdit] = useState(0);
  const [contentToEdit, setContentToedit] = useState("");
  const [content, setContent] = useState(props.content);
  const { editAmt, setEditAmt } = useContext(EditCommentsContext);
  const [replyClicked, setReplyClicked] = useState(false);
  const [contentReplied, setContentReplied] = useState("");
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  function goToCat(e) {
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
      .delete(`http://localhost:3000/comments/${postToDel}`)
      .then((res) => {
        console.log(postToDel);
        setPostToDel(0);
      })
      .catch((err) => console.log("del error"));
  }

  useEffect(() => {
    postToDel !== 0 ? handleDel() : null;
  }, [postToDel]);

  function handleEdit(e) {
    if (e.key === "Enter" && !event.shiftKey) {
      axios
        .patch(`http://localhost:3000/comments/${toEdit}`, {
          comment: { content: contentToEdit },
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      setEditClicked(false);
      setEditAmt((prev) => prev + 1);
    }
  }

  function submitReply(e) {
    if (e.key === "Enter" && !event.shiftKey) {
      const data = {
        content: contentReplied,
        user_id: props.curr_user,
        post_id: props.main_post_id,
        reply: props.content,
      };
      axios
        .post("http://localhost:3000/comments", { comment: data })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));

      setEditAmt((prev) => prev + 1);
      setReplyClicked(false);
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
              <Avatar
                alt="Remy Sharp"
                src={`https://api.multiavatar.com/${props.post_user}.png`}
              />
              <Button className="to-bold" onClick={goToCat} variant="outlined">
                {props.category}
              </Button>
              <Button>{props.username}</Button>
              <p className="posted-ago">{`posted at ${dandt}`}</p>
            </div>

            <Stack
              // direction="row"
              spacing={2}
              padding={0.5}
              sx={{ marginLeft: "50px" }}
            >
              {props.title ? (
                <div onClick={() => setOpen(true)} className="replied">
                  {props.title}
                </div>
              ) : null}

              {editClicked ? (
                <TextField
                  value={content}
                  multiline
                  expands="true"
                  fullWidth
                  padding="20px"
                  onKeyPress={handleEdit}
                  onChange={(e) => {
                    setContentToedit(e.target.value);
                    setContent(e.target.value);
                  }}
                />
              ) : (
                <Typography
                  variant="body"
                  color="text.Secondary"
                  padding="10px"
                  sx={{ marginTop: "10px" }}
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
                  }}
                  variant="outlined"
                  startIcon={<DeleteIcon />}
                  sx={{ marginLeft: "16px" }}
                >
                  Delete
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<EditIcon />}
                  sx={{ marginLeft: "16px" }}
                  onClick={() => {
                    setEditClicked((prev) => !prev);
                    setToEdit(props.post_id);
                  }}
                >
                  Edit
                </Button>
              </>
            ) : null}
            <Button
              variant="outlined"
              startIcon={<ReplyRoundedIcon />}
              sx={{ marginLeft: "16px" }}
              onClick={() => setReplyClicked((prev) => !prev)}
            >
              Reply
            </Button>
          </CardActions>
          {replyClicked ? (
            <TextField
              label="Comment Here"
              variant="outlined"
              multiline
              sx={{ margin: "10px", width: "97%" }}
              onChange={(e) => setContentReplied(e.target.value)}
              onKeyPress={submitReply}
            />
          ) : null}
        </Card>
      </Box>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Replied To</DialogTitle>
        <DialogContent>
          <Typography
            variant="body"
            color="text.Secondary"
            padding="10px"
            sx={{ marginTop: "10px" }}
            style={{ wordWrap: "break-word" }}
            className={TextFieldWrap.pre}
          >
            {props.title}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MuiCard;
