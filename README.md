# A-Frame Hackathon

## Getting Started

Run `npm install` to install necessary node modules. Then run `npm run serve` to launch the webpack dev server.

```
npm install
npm run serve
```

## Tools Needed

### ngrok: for testing on phone

Install ngrok here https://ngrok.com/download

Use ngrok like `ngrok http localhost:8080`

If "Invalid Host Header" is given, use `ngrok http 8080 -host-header="localhost:8080"`

Then use the address provided by the ngrok interface to preview on your mobile device.