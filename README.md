# Placetel → DispoLive Webhook Server

Ein Node.js-Webhook-Server, der eingehende Anrufe von Placetel entgegennimmt und automatisch über die DispoLive-API nach dem Anrufer sucht.

## Start

```bash
npm install
npm start
```

## .env-Datei

Erstelle eine `.env` mit folgendem Inhalt:

```env
PLACETEL_TOKEN=dein_placetel_token
DISPOLIVE_TOKEN=dein_dispolive_token
DISPOLIVE_API_URL=https://deinmandant.dispolive.de/custom/open-api/telefonanlage/contactFindByPhone
```

- `PLACETEL_TOKEN` ist dein Zugangstoken für die Placetel API
- `DISPOLIVE_TOKEN` ist dein API-Zugriffstoken für DispoLive
- `DISPOLIVE_API_URL` ist der vollständige Pfad zur `contactFindByPhone`-API für deinen Mandanten (z. B. `https://***REMOVED***/...`)

Diese Umgebungsvariablen kannst du lokal per `.env`-Datei setzen oder bei Render.com im Bereich „Environment Variables“ sicher hinterlegen.

---

Der Server lauscht auf `/placetel/incoming` und verarbeitet eingehende Webhooks von Placetel.
Wenn die Rufnummer in DispoLive gefunden wird, wird automatisch eine Benachrichtigung (Banner) in der DispoLive-Oberfläche ausgelöst.
