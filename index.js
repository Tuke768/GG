const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 7777;

const server = http.createServer((req, res) => {
  let filePath = '.' + req.url;
  if (filePath == './') {
    filePath = './index.html';
  }

  const extname = String(path.extname(filePath)).toLowerCase();
  const contentType = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.wav': 'audio/wav',
    '.mp4': 'video/mp4',
    '.woff': 'application/font-woff',
    '.ttf': 'application/font-ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.otf': 'application/font-otf',
    '.wasm': 'application/wasm'
  }[extname] || 'application/octet-stream';

  fs.readFile(filePath, function(error, content) {
    if (error) {
      if(error.code == 'ENOENT'){
          fs.readFile('./404.html', function(error, content) {
              res.writeHead(404, { 'Content-Type': 'text/html' });
              res.end(content, 'utf-8');
          });
      }
      else {
          res.writeHead(500);
          res.end('Desculpe, ocorreu um erro: '+error.code+' ..\n');
          res.end();
      }
    }
    else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}/`);
});
