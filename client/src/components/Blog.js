import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { host } from "./host";
const Blog = ({ title, description, imageURL, userName, isUser, id }) => {
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/myBlogs/${id}`);
  };
  const deleteRequest = async () => {
    const res = await axios
      .delete(`${host}/api/blog/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  const handleDelete = () => {
    deleteRequest()
      .then(() => navigate("/"));
  };
  return (
    <div>
      {" "}
      <Card
        sx={{
          width: {xs:"80%", sm:"70%", md:"60%", lg:"50%"},
          marginLeft:{xs:"25%", sm:"25%"},

          mt: 2,
          padding: 2,
          boxShadow: "5px 5px 10px #ccc",
          ":hover": {
            boxShadow: "10px 10px 20px #ccc",
          },
        }}
      >
        {isUser && (
          <Box display="flex">
            <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}>
              <ModeEditOutlineIcon color="warning" />
            </IconButton>
            <IconButton onClick={handleDelete}>
              <DeleteForeverIcon color="error" />
            </IconButton>
          </Box>
        )}
        <CardHeader
          avatar={
            <Avatar
              
              sx={{ bgcolor: "red" }}
              aria-label="recipe"
            >
              {userName ? userName.charAt(0) : ""}
            </Avatar>
          }
          title={<h2>{title}</h2>}
        />
        <CardMedia
          component="img"
          height="350"
          image={imageURL}
          alt="Paella dish"
        />

        <CardContent>
          <hr />
          <br />
          <Typography
            
            variant="body2"
            color="text.secondary"
          >
            <b>{userName}</b> {": "} {description}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Blog;
