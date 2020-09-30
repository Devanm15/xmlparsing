var http = require('http');
var fs = require('fs');

// Receive xml data from parser
http.createServer(function (req, res) {
    var body = "";
   
    req.on('data', function (chunk) {
      body += chunk; 
    })
    // after data is received appendFile will add to existing file with that name or create the file if it doesn't exist already, due to async nature will throw 'ERR_STREAM_WRITE_AFTER_END'
    // but still creates and appends the xml file
    req.on('end', function () {
      res.setHeader("Access-Control-Allow-Origin", "*")
      res.setHeader("Access-Control-Allow-Headers", "content-type");
      res.setHeader("Access-Control-Allow-Methods","PUT, POST, GET, DELETE, PATCH, OPTIONS");
        fs.writeFile("blog.xml", body,  function (err) {
          if (err) throw err;
          res.write('File created!');
          res.end(body);
        })
      res.writeHead(200);
      
    })
}).listen(8080)

