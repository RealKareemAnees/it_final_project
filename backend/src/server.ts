const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/" && req.method === "GET") {
    res.writeHead(200, {
      "Content-Type": "text/html",
    });

    return res.end("<h1>Home page</h1>");
  }

  res.writeHead(404, {
    "Content-Type": "text/html",
  });
});

export default server;
