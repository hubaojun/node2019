var http = require('http');
var fs = require('fs');
var mime = require('mime');
var url2 = require('url');


function serve(request, response) {
    console.log(request.url);
    console.log(request.method);
    // console.log(request.headers);
    console.log("");
    var urlObj = url2.parse(request.url, true); //true表示query转换成对象
    console.log(request.url, urlObj.query.name, urlObj.query.age);
    var pathname = urlObj.pathname;
    console.log('pathname--->' + pathname);
    console.log(urlObj);


    var url = request.url;


    /*   if (url == '/') {
     // response.statusCode = 404;
     // response.setHeader('name', 'hbj');
     response.setHeader('Content-Type', 'text/html;charset=utf-8');
     // response.end("当前时间是：" + new Date().toString());
     fs.readFile('index.html', function (error, data) {
     if (error == null) {
     response.end(data);
     }

     });
     } else if (url == '/style.css') {
     fs.readFile('style.css', function (error, data) {
     if (error == null) {
     response.end(data);
     }
     });
     } else if (url == '/index.js') {
     response.setHeader('Content-Type', 'application/x-javascript;charset=utf-8');
     fs.readFile('index.js', function (err, data) {
     response.end(data);
     });
     }
     */

    if (pathname == '/') {
        response.setHeader('Content-Type', 'text/html;charset=utf-8');
        fs.readFile('index.html', function (err, data) {
            response.end(data);
        })
    } else if (pathname == '/clock') {
        var counter=0;
    var intervalT=    setInterval( function () {
            response.write(new Date().toString()+'\n');
            counter++;
            if(counter==3){
                clearInterval(intervalT);
                response.end();
            }
        },1000);

    } else {
        respData(pathname, response);

    }
}

function respData(pathname, response) {
    var mm = mime.getType(pathname);
    console.log('mm--->' + mm);
    response.setHeader('Content-Type', mm + ';charset=utf-8');
    console.log(pathname);

    fs.readFile(pathname.slice(1), function (err, data) {
        response.end(data);
    })
}


var server = http.createServer(serve);
server.listen(8080, 'localhost');
