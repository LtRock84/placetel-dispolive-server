const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/placetel/incoming', async (req, res) => {
  const data = req.body;
  console.log('📬 Webhook empfangen:', data);

  if (!data.from) {
    console.log('❌ Telefonnummer fehlt.');
    return res.sendStatus(400);
  }

  const phone = data.from.replace(/\s+/g, '');

  try {
    const response = await axios.post(
      'https://dispolive.de/custom/open-api/telefonanlage/contactFindByPhone',
      {
        phone,
        notification: true
      },
      {
        headers: {
          Authorization: `***REMOVED*** ${process.env.DISPOLIVE_TOKEN}`,
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
