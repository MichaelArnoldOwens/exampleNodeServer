var http = require("http");
var url = require("url");
var fs = require("fs");
var db = [];


var router = {
  "/" : function() {
    return "Home";
  },
  "/submit" : function (request) {
    writeNewUser(request.parsedUrl, function(){
      console.log("done writing list");
    });
    console.log("returning body now");
    return "Submit";
  }
};


var server = http.createServer(function(request, response){
  var parsedUrl = url.parse(request.url, true);
  db.push(parsedUrl.query);
  
  var bodyHandler = router[parsedUrl.pathname];

  if(bodyHandler) {
    response.statusCode = 200;
    response.write(bodyHandler(request));
    response.end();  
  } else {
    response.statusCode = 404;
    response.end("Not Found");
  }
});

function writeNewUser(user, callback) {
  
   fs.readFile('./db.csv', function (err, fileData) {
   if (err) throw err;
   var fileWithConcatenatedData = fileData + user + "\n";
      fs.writeFile('./db.csv', fileWithConcatenatedData, function(err) {
        callback(err);
      });
  });
}





server.listen(3000); //listen on port 3000