require('dotenv').config();
const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/UserRoutes");
const mongoose = require("mongoose");

const app = express();

// Configuration Mongoose pour éviter le warning
mongoose.set('strictQuery', false);

// Nettoyer l'URI MongoDB si elle contient la clé
let mongoUri = process.env.MONGO_URI || 'mongodb+srv://yaoyaopascal77:gJOgYVKc7YoSYlls@cluster0.ouslcep.mongodb.net/netflix-clone?retryWrites=true&w=majority&appName=Cluster0';
if (mongoUri.startsWith('MONGO_URI=')) {
  mongoUri = mongoUri.replace('MONGO_URI=', '');
}

const FRONTEND_URI = process.env.FRONTEND_URI || 'https://netflix-front-kappa.vercel.app';
const PORT = process.env.PORT || 5000;

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {/* MongoDB connected */})
.catch((err) => {/* MongoDB connection error */});

// CORS pour autoriser le frontend React
app.use(cors({ origin: FRONTEND_URI, credentials: true }));
app.use(express.json());

// Route de test
app.get("/", (req, res) => {
  res.json({ message: "Netflix API is running!" });
});

app.use("/api/user", userRoutes);

app.listen(PORT, () => {
  // Serveur démarré
});
