const { log } = require('console');
const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    // console.log("Request made");
    console.log(req.url, req.method);

    res.setHeader('Content-Type', 'text/html');

    let path = "./Views/";
    switch(req.url){
        case '/about' :
            res.statusCode = 200;
            path += "about.html";
            break;
        case '/about-me' :
            res.statusCode = 301;
            res.setHeader("Location", '/about');
            res.end();
        case '/' :
            res.statusCode = 200;
            path += "index.html";
            break;
        default :
            res.statusCode = 404;
            path += "404.html";
        
    }

    fs.readFile("./Views/index.html", (err, data)=>{
        if(err){
            console.log(err);
            res.end();
        }
        else{
            res.end(data);
        }
    });
});

server.listen(3000, 'localhost', ()=>{
    console.log("Listening on port 3000");
})