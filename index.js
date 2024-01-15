var http = require('http');
var fs = require('fs');
var path = require('path');

const PORT = 8080;

http.createServer(function (request, response) {
    // Parse the URL to get the pathname

    // console.log(request, 'request')
    var pathname = request.url;

    // Default to index.html if pathname is '/'
    if (pathname === '/') {
        pathname = '/index.html';
    }

    // Construct the file path based on the requested URL
    var filePath = path.join(__dirname, pathname);



    // Check if the requested path is /about or /contact-me
    if (pathname === '/about' || pathname === '/contact-me') {
        filePath = path.join(__dirname, pathname + '.html');
    }

    console.log(filePath, 'filePath', __dirname, pathname)

    // Read the corresponding HTML file
    fs.readFile(filePath, function (error, html) {
        if (error) {
            // Handle 404 error
            fs.readFile('./404.html', function (error, notFoundPage) {
                if (error) throw error;
                response.writeHead(404, { "Content-Type": "text/html" });
                response.write(notFoundPage);
                response.end();
            });
        } else {
            // Serve the requested HTML page
            // response.writeHead(200, { "Content-Type": "text/html" });
            response.write(html);
            response.end();
        }
    });
}).listen(PORT, function () {
    console.log(`Server is running at http://localhost:${PORT}`);
});
