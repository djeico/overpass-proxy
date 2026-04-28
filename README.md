# 🔁 Overpass Proxy

A lightweight Node.js proxy server that forwards requests to the [Overpass API](https://overpass-api.de), adding CORS headers so browser-based apps can query OpenStreetMap data without restrictions.

## 🚀 Live

Deployed on Render: `https://overpass-proxy.onrender.com`

## 📡 Usage

```
GET https://overpass-proxy.onrender.com/?query=<overpass_query>
```

Example:
```
https://overpass-proxy.onrender.com/?query=[out:json];node["highway"="speed_camera"](-23.0,-43.3,-22.8,-43.1);out;
```

Returns the Overpass API response with `Access-Control-Allow-Origin: *`.

## 🛠️ Stack

- **Runtime**: Node.js
- **Hosting**: Render (free tier)
- **Target API**: Overpass API (OpenStreetMap)

## 🏃 Run locally

```bash
node index.js
# Server running on http://localhost:3000
```

## 📦 Used by

- [djeico/mapa-radares](https://github.com/djeico/mapa-radares) — Speed camera map PWA
