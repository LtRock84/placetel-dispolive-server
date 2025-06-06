# Placetel → DispoLive Webhook Server

Ein Node.js-basierter Webhook-Server, der eingehende Anrufe von Placetel verarbeitet und automatisch eine Anfrage an die DispoLive-API stellt. Wenn ein Anrufer in den Stammdaten gefunden wird, wird ein Benachrichtigungsbanner in der DispoLive-Oberfläche angezeigt.

## Funktionsweise

1. Placetel sendet bei eingehendem Anruf einen Webhook an deinen Server
2. Der Server prüft die übermittelte Rufnummer und sendet sie an die DispoLive-API
3. Wird ein passender Patient oder eine Institution gefunden, wird in DispoLive eine Meldung ausgelöst
4. Der Server läuft bei Bedarf auf Render.com und ist dort kostenlos betreibbar

## Webhook-Endpunkt

Der Server lauscht auf folgender Route:
```
POST /placetel/incoming
```

## Einrichtung

### 1. Projekt klonen und starten
```bash
git clone https://github.com/deinbenutzername/placetel-dispolive-server.git
cd placetel-dispolive-server
npm install
npm start
```

### 2. .env-Datei anlegen
Erstelle eine Datei namens `.env` mit folgendem Inhalt:

```env
PLACETEL_TOKEN=dein_placetel_token
DISPOLIVE_TOKEN=dein_dispolive_token
DISPOLIVE_API_URL=https://deinmandant.dispolive.de/custom/open-api/telefonanlage/contactFindByPhone
```

**Hinweis:** Auf Render.com kannst du diese Werte über das Dashboard unter "Environment Variables" eintragen.

## Live-Deployment mit Render

1. GitHub-Repository mit Render verknüpfen
2. Als Web Service einrichten (`npm install` & `npm start`)
3. Die Umgebungsvariablen setzen
4. Deine öffentliche URL bei Placetel als Webhook registrieren (nur einmal nötig!):

```bash
curl -X PUT https://api.placetel.de/v2/subscriptions \
  -H "Authorization: Bearer DEIN_PLACETEL_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "service": "calls",
    "url": "https://REDACTED/placetel/incoming",
    "incoming": true
  }'
```

**Hinweis:** Diese URL ändert sich nicht. Der Webhook muss nur dann erneut gesetzt werden, wenn du die URL oder das Placetel-Konto wechselst.

## Beispielantwort von DispoLive

```json
{
  "data": [
    {
      "type": "patient",
      "name": "Max Mustermann",
      "zip": "12345",
      "phone": "+49123456789"
    }
  ]
}
```

## Lizenz
Dieses Projekt kann frei verwendet und angepasst werden. Bitte trage deinen eigenen API-Zugang ein und missbrauche keine Schnittstellen anderer Mandanten.
