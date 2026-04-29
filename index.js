const http = require('http');
const https = require('https');

const PORT = process.env.PORT || 3000;

http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = new URL(req.url, `http://localhost`);
  const query = url.searchParams.get('query');

  if (!query) {
    res.writeHead(400, { 'Content-Type': 'text/plain' });
    res.end('Query parameter is required');
    return;
  }

  const body = `data=${encodeURIComponent(query)}`;
  const options = {
    hostname: 'overpass.private.coffee',
    path: '/api/interpreter',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(body),
      'User-Agent': 'Mozilla/5.0 (compatible; overpass-proxy/1.0)'
    }
  };

  const proxyReq = https.request(options, (proxyRes) => {
    res.writeHead(proxyRes.statusCode, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
    proxyRes.pipe(res);
  });

  proxyReq.on('error', (e) => {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end(`Proxy error: ${e.message}`);
  });

  proxyReq.write(body);
  proxyReq.end();
}).listen(PORT, () => console.log(`Proxy running on port ${PORT}`));
