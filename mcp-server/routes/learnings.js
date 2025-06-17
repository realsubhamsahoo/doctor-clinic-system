const express = require('express');
const router = express.Router();
const { db } = require('../firebase/config');

router.post('/', async (req, res) => {
  const { symptoms, disease, doctor_id, prescription } = req.body;

  try {
    await db.collection('learnings').add({
      symptoms,
      disease,
      doctor_id,
      prescription,
      timestamp: new Date()
    });

    res.json({ message: 'Prescription saved successfully' });
  } catch (error) {
    console.error('Error saving learning:', error);
    res.status(500).json({ error: 'Failed to save learning' });
  }
});

module.exports = router;
