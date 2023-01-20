import MuiCard from "./CardComp";
import "./styles.css";
import { Paper, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import Navbar from "./Navbar";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import * as React from "react";
import axios from "axios";
import { Routes, Route, Link, useNavigate, useParams } from "react-router-dom";
import EachPost from "./EachPost";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import Alert from "@mui/material/Alert";
import { Stack } from "@mui/system";

function AllPosts() {
  const navigate = useNavigate();

  const [posts, setPosts] = React.useState([]);

  const [open, setOpen] = React.useState(false);

  const [added, setAdded] = React.useState(0);

  const [userId, setUserId] = React.useState(0);

  const [postCreated, setPostCreated] = React.useState();

  const [start, setStart] = React.useState(0);

  const [end, setEnd] = React.useState(10);

  const [timer, setTimer] = React.useState(0);

  const titleRef = React.useRef();
  const contentRef = React.useRef();
  const catRef = React.useRef();

  const [dataLoaded, setDataLoaded] = React.useState(false);

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
        window.scrollTo(0, 0);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log({ post: data });
    handleClose();
    setAdded((prev) => {
      return prev + 1;
    });
    setPostCreated(true);
  }

  React.useEffect(() => {
    axios
      .get("http://localhost:3000/posts")
      .then((res) => {
        setDataLoaded(true);
        setPosts(res.data);
        res.data.length < 10 ? setEnd(res.data.length) : null;
      })
      .catch((err) => {
        console.log(err);
      });
    if (postCreated) {
      setTimeout(() => {
        setPostCreated(false);
      }, 750);
    }
  }, [added, timer]);

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

  React.useEffect(() => {
    !Cookies.get("session")
      ? setTimeout(() => {
          window.location.reload();
          Cookies.set("session", 1, {
            expires: 7,
          });
        }, 200)
      : null;
  });

  function handlePrev() {
    setStart((prev) => prev - 10);
    setEnd((prev) => prev - 10);
    window.scrollTo(0, 0);
  }
  function handleNext() {
    setStart((prev) => prev + 10);
    setEnd((prev) => prev + 10);
    window.scrollTo(0, 0);
  }

  return (
    <>
      <Navbar userId={userId} is_main={true} setPosts={setPosts} />
      <Paper
        sx={{
          width: "1000px",
          margin: "auto",
          padding: "10px",
          gap: "10px",
          marginTop: "100px",
        }}
      >
        {postCreated && (
          <Alert severity="success">New Post Submitted Succesfully</Alert>
        )}
        {posts.length > 0 ? (
          posts.slice(start, end).map((post, index) => (
            <Link
              key={index}
              style={{ textDecoration: "none" }}
              to={`/post/${post.id}`}
            >
              <MuiCard
                key={index}
                title={post.title}
                content={post.content}
                category={post.category}
                username={post.user.username}
                created_at={post.created_at}
                post_id={post.id}
                post_user={post.user.id}
                curr_user={userId}
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
        <Stack
          direction="row"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            margin: "15px",
          }}
        >
          {posts.length >= 10 ? (
            <>
              <Button variant="outlined" onClick={handlePrev}>
                Previous
              </Button>
              <Button variant="outlined" onClick={handleNext}>
                Next
              </Button>
            </>
          ) : null}
        </Stack>
      </Paper>
      <Button
        sx={{
          position: "fixed",
          bottom: "20px",
          left: "50%",
          right: "50%",
          transform: "translate(-50%, 0)",
          width: "175px",
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

export default AllPosts;
