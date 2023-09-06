require("dotenv").config({ path: "../.env" });

const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

const connect = require("./src/config/db");

const userRoutes = require("./src/routes/user.route");
const postRoutes = require("./src/routes/post.route");

// Use the cookie-parser middleware
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ credentials: true, origin: [
      "http://localhost:5173",
      "https://funny-belekoy-ecd356.netlify.app",
    ] }));

app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);

const port = process.env.PORT || 8080;
app.listen(port, async () => {
  try {
    let connection = await connect();
    // console.log(connection);
    console.log(`Listning on port ${port}`);
  } catch (error) {
    console.log(error.message);
  }
});
