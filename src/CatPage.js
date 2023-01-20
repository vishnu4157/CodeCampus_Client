import MuiCard from "./CardComp";
import "./styles.css";
import { Paper, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import Navbar from "./Navbar";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import * as React from "react";
import axios from "axios";
import { Routes, Route, Link, useNavigate, useParams } from "react-router-dom";
import EachPost from "./EachPost";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";

function CatPosts() {
  const navigate = useNavigate();

  const { category } = useParams();

  const [posts, setPosts] = React.useState([]);

  const [open, setOpen] = React.useState(false);

  const [added, setAdded] = React.useState(0);

  const [userId, setUserId] = React.useState(0);

  const titleRef = React.useRef();
  const contentRef = React.useRef();
  const catRef = React.useRef();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handlePost() {
    const data = {
      user_id: userId,
      title: titleRef.current.value,
      category: catRef.current.value,
      content: contentRef.current.value,
    };
    axios
      .post("http://localhost:3000/posts", { post: data })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log({ post: data });
    handleClose();
    setAdded((prev) => {
      return prev + 1;
    });
    console.log(added);
  }

  React.useEffect(() => {
    axios
      .get(`http://localhost:3000/posts/category/${category}`)
      .then((res) => {
        setPosts(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [category, added]);

  React.useEffect(() => {
    const token = Cookies.get("jwt");
    if (!token) {
      navigate("/");
    } else {
      axios
        .get("http://localhost:3000/users/verify", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res.data[0].user_id);
          setUserId(res.data[0].user_id);
        })
        .catch((err) => {
          console.log(err);
          navigate("/");
        });
    }
  }, []);

  return (
    <>
      <Navbar userId={userId} />
      <Paper
        sx={{
          width: "1000px",
          margin: "auto",
          padding: "10px",
          gap: "10px",
          marginTop: "100px",
        }}
      >
        {posts.length > 0 ? (
          posts.map((post) => (
            <Link style={{ textDecoration: "none" }} to={`/post/${post.id}`}>
              <MuiCard
                title={post.title}
                content={post.content}
                category={post.category}
                username={post.user.username}
                created_at={post.created_at}
                post_id={post.id}
                curr_user={userId}
                post_user={post.user.id}
              />
            </Link>
          ))
        ) : (
          <MuiCard
            title="Welcome"
            content="At the moment there is no posts available"
            category="Intro"
            username="Welcome_admin"
            created_at="years ago"
          />
        )}
      </Paper>
      <Button
        sx={{
          position: "fixed",
          bottom: 20,
          right: 625,
          margin: "auto",
          display: "flex",
          flexWrap: "wrap",
        }}
        variant="contained"
        endIcon={<AddIcon />}
        onClick={handleClickOpen}
      >
        New Post
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create New Thread</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Title"
            type="text"
            fullWidth
            variant="outlined"
            multiline
            inputRef={titleRef}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Content"
            type="text"
            fullWidth
            variant="outlined"
            rows={5}
            multiline
            inputRef={contentRef}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Category"
            type="text"
            fullWidth
            variant="outlined"
            multiline
            inputRef={catRef}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handlePost}>Post</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default CatPosts;
