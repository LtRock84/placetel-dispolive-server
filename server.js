const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.text({ type: '*/*' }));

app.post('/placetel/incoming', async (req, res) => {
  console.log('📥 Methode:', req.method);
  console.log('📥 Headers:', JSON.stringify(req.headers));
  console.log('📥 Query:', JSON.stringify(req.query));
  console.log('📥 Body:', req.body);

  let data = req.body;

  try {
    if (typeof data === 'string') {
      data = JSON.parse(data);
    }
  } catch (err) {
    console.error('❌ Fehler beim Parsen des Bodys:', err.message);
    return res.status(400).send('Invalid JSON');
  }

  console.log('📚 Vollständiger Webhook:', JSON.stringify(data));

  const caller = data?.from;
  if (!caller) {
    console.log('❌ Telefonnummer fehlt.');
    return res.sendStatus(400);
  }

  try {
    const response = await axios.post(
      'https://***REMOVED***/custom/open-api/telefonanlage/contactFindByPhone',
      {
        phone: caller,
        notification: true
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.DISPOLIVE_TOKEN}`,
          'Content-Type': 'application/json'
        },
        timeout: 2000
      }
    );
    console.log('📥 Antwort von DispoLive:', response.data);
  } catch (error) {
    console.error('❌ Fehler bei Anfrage an DispoLive:', error.message);
  }

  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`🚀 Server läuft auf http://localhost:${PORT}`);
});
