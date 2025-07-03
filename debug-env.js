require('dotenv').config();

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