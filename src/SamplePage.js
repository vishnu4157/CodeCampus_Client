import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import AllPosts from "./AllPosts";
import EachPost from "./EachPost";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import CatPosts from "./CatPage";
import Loading from "./Loading";
import MyPosts from "./Pages/MyPosts";

const SamplePage = () => {
  return (
    <>
      <Routes>
        <Route path="/MainPage" element={<AllPosts />} />
        <Route path="/post/:postId" element={<EachPost />} />
        <Route path="/Signup" element={<SignUp />} />
        <Route path="/" element={<SignIn />} />
        <Route path="/posts/category/:category" element={<CatPosts />} />
        <Route path="/loading" element={<Loading />} />
        <Route path="/user/:userId" element={<MyPosts />} />
      </Routes>
    </>
  );
};

export default SamplePage;
