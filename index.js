require('dotenv').config();
const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/UserRoutes");
const mongoose = require("mongoose");

const app = express();

const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://yaoyaopascal77:gJOgYVKc7YoSYlls@cluster0.ouslcep.mongodb.net/netflix-clone?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

// CORS pour autoriser le frontend React
app.use(cors({ origin: `${FRONTEND_URI}`, credentials: true }));
app.use(express.json());

app.use("/api/user", userRoutes);

app.listen(5000, () => {
  console.log("server started on port 5000");
});
