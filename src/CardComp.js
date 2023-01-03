import {
  Box,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Stack,
  Avatar,
  Divider
} from "@mui/material";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import ReplyRoundedIcon from "@mui/icons-material/ReplyRounded";
import { useState } from "react";

const MuiCard = () => {
  const [likes, setLikes] = useState(0);
  const [hit, setHit] = useState(false);
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

  return (
    <Box
      width="800px"
      margin="auto"
      className="comment-box-main"
      marginTop="20px"
    >
      <Card>
        <CardContent>
          <div className="username-cat">
            <Button className="to-bold">r/NUS</Button>
            <Button>u/testUser123</Button>
            <p className="posted-ago">Posted 10 mins ago</p>
          </div>
          <Stack
            divider={<Divider orientation="horizontal" flexItem padding={1} />}
          >
            <Stack
              direction="row"
              spacing={2}
              padding={0.5}
              alignItems="center"
            >
              <Avatar
                alt="Remy Sharp"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmD58whxL-_MXL295xAuRMUM6ag9DWs6oIxbwGmy9C6w&s"
              />
              <Typography
                gutterBottom
                vartiant="h1"
                component="div"
                className="heading-card"
              >
                <h5>Thoughts on deleting emails on .edu account</h5>
              </Typography>
            </Stack>
            <Typography variant="body" color="text.Secondary" padding="10px">
              Hi everyone! Hopefully everyone is having a good winter break.
              Anyways, yesterday i happened to open my mail and noticed there
              were literally hundreds of emails(both read and unread). Do y'all
              delete mails after every sem in a massive purge, or how do you go
              on about handling it? Thanks!
            </Typography>
          </Stack>
        </CardContent>
        <CardActions>
          <Button
            onClick={handleLike}
            variant="outlined"
            startIcon={<FavoriteBorderRoundedIcon />}
            sx={{ marginLeft: "16px" }}
          >
            {likes}
          </Button>
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
  );
};

export default MuiCard;
