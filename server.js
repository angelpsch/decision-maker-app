import express from "express";
import cookieParser from "cookie-parser";
import config from "./server/config/index.js";
import userRoutes from "./server/routes/user.js";
import authRoutes from "./server/routes/auth.js";

// DB connection
import "./server/config/dbConnection.js";

const app = express();

// middleware functions
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/", userRoutes);
app.use("/", authRoutes);
// Exprees will serve up production assets
app.use(express.static('client/build'));

// Express serve up index.html file if it doesn't recognize route
const path = require('path');
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: err.name + ":" + err.message });
  }
});

app.listen(config.port, () => {
  console.log(`🚀 at port ${config.port}`);
});
