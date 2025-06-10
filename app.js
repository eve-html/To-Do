const express = require('express');
const app = express();
const port = 3000;

// Раздаём статические файлы (CSS, JS)
app.use(express.static(__dirname));

// Главная страница
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

// Запуск сервера
app.listen(port, '127.0.0.1', function () {
  console.log("Server running at http://localhost:%s", port);
});
