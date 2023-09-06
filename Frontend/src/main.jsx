import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import ProtectedRoutes from "./components/ProtectedRoutes.jsx";
import PublicRoutes from "./components/PublicRoutes.jsx";
import Navbar from "./components/Navbar.jsx";
import Blogs from "./components/Blogs.jsx";
import Signin from "./components/Signin.jsx";
import Signup from "./components/Signup.jsx";
import NewPost from "./components/NewPost.jsx";
import Post from "./components/Post.jsx";
import AdminRoutes from "./components/AdminRoutes.jsx";

const AppLayout = () => {
  return (
    <Router>
      <Routes>
        <Route
          element={
            <>
              <Navbar />
              <Blogs />
            </>
          }
          path="/"
        />
        <Route element={<PublicRoutes />}>
          <Route element={<Signin />} path="/signin" exact />
          <Route element={<Signup />} path="/signup" exact />
        </Route>

        <Route element={<ProtectedRoutes />}>
          <Route
            element={
              <>
                <Navbar />
                <Post />
              </>
            }
            path="/post/:id"
            exact
          />
        </Route>

        <Route element={<AdminRoutes />}>
          <Route
            element={
              <>
                <Navbar />
                <NewPost />
              </>
            }
            path="/post/new"
            exact
          />
        </Route>

        {/* <Route element={<PublicRoutes />}>
          <Route element={<Login />} path="/login" exact />
          <Route element={<Signup />} path="/signup" exact />
          <Route element={<ForgotPassword />} path="/forgotpassword" exact />
          <Route
            element={<ResetPassword />}
            path="/password/reset/:token"
            exact
          />
        </Route> */}
      </Routes>
    </Router>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <AppLayout />
    </Provider>
  </React.StrictMode>
);
