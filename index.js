import http from 'http';
import fs from 'fs';

const server = http.createServer((req, res) => {
  const filePath = req.url;
  if(filePath === "/") {
    res.end(`Please specify absolute file path to read (GET) or write (POST) as URL path. Current directory is ${process.cwd()}`);
    return;
  }
  if(filePath === "/favico.ico") {
    res.end();
    return;
  }
  console.log(`Reading ${filePath}`);
  if (req.method === 'POST') {
    const contentToWrite = req.body;
    fs.writeFileSync(filePath, contentToWrite);
  }
  const fileContent = fs.readFileSync(filePath, 'utf8');
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end(fileContent);
});

server.listen(8080, () => {
  console.log('Server listening on port 8080');
});
