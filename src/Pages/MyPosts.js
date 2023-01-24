import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Card, CardContent, Typography } from "@mui/material";
import Navbar from "../Navbar";
import axios from "axios";
import MuiCard from "../CardComp";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const hello = () => {
  const { userId } = useParams();
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:3000/posts/user/${userId}`).then((res) => {
      setPosts(res.data);
      console.log(res.data);
      console.log(userId);
    });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/users/${userId}`)
      .then((res) => setUsername(res.data))
      .catch((err) => console.log(err));
  });

  return (
    <>
      <Navbar userId={userId} />
      <Card
        sx={{
          marginTop: "100px",
          display: "flex",
          justifyContent: "center",
          width: "1000px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <CardContent>
          <Typography variant="h4">{`${username}'s Posts`}</Typography>
        </CardContent>
      </Card>
      <div style={{ margin: "10px" }}>
        {posts &&
          posts.map((post, index) => (
            <Link
              ey={index}
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
          ))}
      </div>
    </>
  );
};

export default hello;
