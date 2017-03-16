// import fs from 'fs-promise';
// import path from 'path';
import myHttp from './http';

const server = myHttp.createServer();
server.listen(process.env.PORT || 3000);

server.on('request', (req, res) => {
  global.console.log(req.headers, req.method, req.url);

  // global.console.log(req);
  global.console.log(res);

  // res.setHeader('Content-Type', 'application/json');
  // res.writeHead(200); // Вызов writeHead опционален

  // // Вывод текстового файла
  // const STATIC_FOLDER = path.join(__dirname, '../static');
  // const filePath = path.join(STATIC_FOLDER, 'test.txt');

  // fs.createReadStream(filePath).pipe(res);
});
