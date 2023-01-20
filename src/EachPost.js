import MuiCard from "./CardComp";
import "./styles.css";
import { Box, Paper, Stack, Divider, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import Navbar from "./Navbar";
import ReplyTo from "./ReplyTo";
import * as React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Alert from "@mui/material/Alert";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { createContext, useContext } from "react";

export const DelCommentsContext = createContext();
export const EditCommentsContext = createContext();

function EachPost() {
  const replyRef = React.useRef();
  const { postId } = useParams();
  const [postcomments, setPostcomments] = React.useState([]);
  const [postusers, setPostusers] = React.useState({});
  const [added, setAdded] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [userId, setUserId] = React.useState(0);
  const [posts, setPosts] = React.useState([]);
  const [postToDel, setPostToDel] = React.useState(0);
  const [editAmt, setEditAmt] = React.useState(0);
  const [childChanged, setChildChanged] = React.useState(0);
  const [start, setStart] = React.useState(0);
  const [end, setEnd] = React.useState(10);
  const navigate = useNavigate();

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
          setUserId(res.data[0].user_id);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  React.useEffect(() => {
    axios
      .get(`http://localhost:3000/posts/${postId}`)
      .then((res) => {
        setPosts(res.data);
        setPostcomments(res.data.comments);
        setPostusers(res.data.user);
        console.log(postcomments);
      })
      .catch((err) => {
        console.log(err);
      });
    setPostToDel(0);
  }, [added, postToDel, editAmt, childChanged]);

  function handleSubmission(e) {
    if (e.key === "Enter" && !event.shiftKey) {
      e.preventDefault();
      const data = {
        user_id: userId,
        post_id: posts.id,
        content: replyRef.current.value,
      };
      axios
        .post("http://localhost:3000/comments", { comment: data })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      replyRef.current.value = "";
      setAdded((prev) => {
        return prev + 1;
      });
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 750);
    }
  }

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
      <Navbar userId={userId} is_main={false} />

      <Paper
        sx={{
          width: "1000px",
          margin: "auto",
          padding: "10px",
          gap: "10px",
          marginTop: "100px",
        }}
      >
        <Stack
          divider={<Divider orientation="horizontal" flexItem padding={1} />}
          spacing={2}
        >
          <MuiCard
            title={posts.title}
            content={posts.content}
            category={posts.category}
            username={postusers.username}
            created_at=""
            post_id={posts.id}
            post_user={postusers.id}
            curr_user={userId}
            setChildChange={setChildChanged}
          />
          <h2 style={{ margin: "auto" }}>{`${postcomments.length} ${
            postcomments.length === 1 ? "Comment" : "Comments"
          }`}</h2>
        </Stack>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "100%" },
            marginRight: "12px",
          }}
          noValidate
          autoComplete="off"
          justifyContent="space-between"
        >
          <TextField
            fullWidth
            label="Comment Here"
            variant="outlined"
            multiline
            inputRef={replyRef}
            onKeyPress={handleSubmission}
            rows={4}
          />
          {open && (
            <Alert severity="success">Reply Submitted Succesfully</Alert>
          )}
        </Box>
        {postcomments &&
          postcomments.slice(start, end).map((pos, index) => (
            <>
              <EditCommentsContext.Provider value={{ editAmt, setEditAmt }}>
                <DelCommentsContext.Provider
                  key={index}
                  value={{ postToDel, setPostToDel }}
                >
                  <ReplyTo
                    key={pos.id}
                    title={pos.reply}
                    content={pos.content}
                    category={posts.category}
                    username={pos.user.username}
                    created_at={pos.created_at}
                    post_id={pos.id}
                    post_user={pos.user.id}
                    curr_user={userId}
                    main_post_id={postId}
                  />
                </DelCommentsContext.Provider>
              </EditCommentsContext.Provider>
            </>
          ))}
        <Stack
          direction="row"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            margin: "15px",
          }}
        >
          {postcomments.length >= 10 ? (
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
    </>
  );
}

export default EachPost;
