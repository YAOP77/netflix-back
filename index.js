require('dotenv').config();
const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/UserRoutes");
const mongoose = require("mongoose");

const app = express();

// Configuration Mongoose pour éviter le warning
mongoose.set('strictQuery', false);

// Debug des variables d'environnement
console.log('=== Debug des variables d\'environnement ===');
console.log('MONGO_URI:', process.env.MONGO_URI ? 'Définie' : 'Non définie');
console.log('FRONTEND_URI:', process.env.FRONTEND_URI ? 'Définie' : 'Non définie');
console.log('PORT:', process.env.PORT || 'Non définie (utilisera 5000)');

if (process.env.MONGO_URI) {
  console.log('MONGO_URI commence par:', process.env.MONGO_URI.substring(0, 20) + '...');
} else {
  console.log('⚠️  MONGO_URI n\'est pas définie dans les variables d\'environnement');
}
console.log('==========================================');

// Nettoyer l'URI MongoDB si elle contient la clé
let mongoUri = process.env.MONGO_URI || 'mongodb+srv://yaoyaopascal77:gJOgYVKc7YoSYlls@cluster0.ouslcep.mongodb.net/netflix-clone?retryWrites=true&w=majority&appName=Cluster0';

// Si l'URI commence par "MONGO_URI=", on la nettoie
if (mongoUri.startsWith('MONGO_URI=')) {
  mongoUri = mongoUri.replace('MONGO_URI=', '');
  console.log('⚠️  URI MongoDB nettoyée (suppression de MONGO_URI=)');
}

const FRONTEND_URI = process.env.FRONTEND_URI || 'https://netflix-front-kappa.vercel.app';
const PORT = process.env.PORT || 5000;

console.log('URI MongoDB utilisée:', mongoUri.substring(0, 30) + '...');

mongoose.connect(mongoUri, {
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
