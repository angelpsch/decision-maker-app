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

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, './client/public/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

// Error handling middleware
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: err.name + ":" + err.message });
  }
});

app.listen(config.port, () => {
  console.log(`🚀 at port ${config.port}`);
});
