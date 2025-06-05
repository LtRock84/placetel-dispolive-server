# Placetel → DispoLive Webhook Server

Ein Node.js-Webhook-Server, der eingehende Anrufe von Placetel entgegennimmt und automatisch über die DispoLive-API nach dem Anrufer sucht.

## Start

```bash
npm install
npm start
```

## .env-Datei

Erstelle eine `.env` mit folgendem Inhalt:

```
PLACETEL_TOKEN=dein_placetel_token
DISPOLIVE_TOKEN=dein_dispolive_token
```
