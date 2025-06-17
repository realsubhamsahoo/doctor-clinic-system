const express = require('express');
const router = express.Router();
const { db } = require('../firebase/config');
const { getPrescriptionFromGemini } = require('../ai/gemini');

router.post('/', async (req, res) => {
  const { symptoms, disease } = req.body;

  try {
    // Check if we already have a learned prescription
    const snapshot = await db.collection('learnings')
      .where('disease', '==', disease)
      .limit(1)
      .get();

    if (!snapshot.empty) {
      const doc = snapshot.docs[0].data();
      return res.json({ source: 'learned', prescription: doc.prescription });
    }

    // Fallback: Get from Gemini API
    const prescription = await getPrescriptionFromGemini(symptoms);
    res.json({ source: 'ai', prescription });

  } catch (error) {
    console.error('Error in /prescriptions:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
