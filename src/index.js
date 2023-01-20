import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import AllPosts from "./AllPosts";
import Test from "./EachPost";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import SamplePage from "./SamplePage";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <BrowserRouter>
      <SamplePage />
      {/* <SignIn /> */}
      {/* <SignUp /> */}
    </BrowserRouter>
  </StrictMode>
);
