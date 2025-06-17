import { useState } from 'react';
import axios from 'axios';

function App() {
  const [symptoms, setSymptoms] = useState('');
  const [disease, setDisease] = useState('');
  const [prescription, setPrescription] = useState('');
  const [finalPrescription, setFinalPrescription] = useState('');

  const getPrescription = async () => {
    const res = await axios.post('http://localhost:3001/api/prescriptions', {
      symptoms: symptoms.split(','),
      disease,
    });
    setPrescription(res.data.prescription);
  };

  const saveFinal = async () => {
    await axios.post('http://localhost:3001/api/learnings', {
      symptoms: symptoms.split(','),
      disease,
      doctor_id: 'doctor_123',
      prescription: finalPrescription
    });
    alert('Final prescription saved!');
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Prescription Generator</h2>
      <input
        placeholder="Symptoms (comma separated)"
        value={symptoms}
        onChange={(e) => setSymptoms(e.target.value)}
      />
      <br /><br />
      <input
        placeholder="Disease"
        value={disease}
        onChange={(e) => setDisease(e.target.value)}
      />
      <br /><br />
      <button onClick={getPrescription}>Get Prescription</button>
      <br /><br />
      <textarea
        value={prescription}
        onChange={(e) => {
          setPrescription(e.target.value);
          setFinalPrescription(e.target.value);
        }}
        rows={5}
        cols={50}
      />
      <br /><br />
      <button onClick={saveFinal}>Submit Final Prescription</button>
    </div>
  );
}

export default App;
