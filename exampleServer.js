var http = require("http");
var url = require("url");

var db = [];

var router = {
  "/" : function() {
    return "Home";
  },
  "/submit" : function () {
    return "Submit";
  }
};

var server = http.createServer(function(request, response){
  var parsedUrl = url.parse(request.url, true);
  db.push(parsedUrl.query);
  console.log(db);
  var bodyHandler = router[parsedUrl.pathname];
  if(bodyHandler) {
    response.statusCode = 200;
    response.write(bodyHandler());
    response.end();  
  } else {
    response.statusCode = 404;
    response.end("Not Found");
  }
});


// /hello?name=liz&email=liz@tradecrafted.com


server.listen(3000); //listen on port 3000