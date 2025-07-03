require('dotenv').config();
const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/UserRoutes");
const mongoose = require("mongoose");

const app = express();

// Configuration Mongoose pour éviter le warning
mongoose.set('strictQuery', false);

const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://yaoyaopascal77:gJOgYVKc7YoSYlls@cluster0.ouslcep.mongodb.net/netflix-clone?retryWrites=true&w=majority&appName=Cluster0';
const FRONTEND_URI = process.env.FRONTEND_URI || 'https://netflix-front-kappa.vercel.app';
const PORT = process.env.PORT || 5000;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

// CORS pour autoriser le frontend React
app.use(cors({ origin: FRONTEND_URI, credentials: true }));
app.use(express.json());

// Route de test
app.get("/", (req, res) => {
  res.json({ message: "Netflix API is running!" });
});

app.use("/api/user", userRoutes);

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
