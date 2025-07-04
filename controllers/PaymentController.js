const axios = require('axios');

// Remplacer par l'URL réelle de l'API Money Fusion
const MONEYFUSION_API_URL = process.env.MONEYFUSION_API_URL || 'https://api.moneyfusion.com/pay';
const MONEYFUSION_API_KEY = process.env.MONEYFUSION_API_KEY || 'VOTRE_CLE_API';

exports.payWithMoneyFusion = async (req, res) => {
  const { amount, phone, operator } = req.body;
  if (!amount || !phone || !operator) {
    return res.status(400).json({ error: 'amount, phone et operator sont requis' });
  }
  try {
    // Appel à l'API Money Fusion
    const response = await axios.post(MONEYFUSION_API_URL, {
      amount,
      phone,
      operator,
      currency: 'XOF',
    }, {
      headers: {
        'Authorization': `Bearer ${MONEYFUSION_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });
    res.json({ success: true, data: response.data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.response?.data || err.message });
  }
}; 