const http = require("http"),
	fs = require("fs"),
	path = require("path"),
	querystring = require('querystring');

let server = http.createServer((req, res)=> {
	if (req.url === '/favicon.ico') {
		return;
	}
	if (req.method == 'GET') {
		try {
		if (req.url === '/') {
			getFile('./HTML/index.html', res);
		} else {
			let pathName = "./" + req.url;
			getFile(pathName, res);
		}
	} catch(err) {
		sendError(res);
	}
	}

	if (req.method == 'POST') {
		let postData = '';
		req.on('data', data=>postData += decodeURIComponent(data));
		req.on('end', ()=>{
			let _json = querystring.parse(postData),
				arr = [],
				result = '';
			for (var key in _json) arr.push(_json[key]);
			result = '\r\n' + arr.toString();
			fs.appendFile('./data/data.txt', result, (err)=> {
				if (err) {
					sendError(res);
				} else {
					res.end();
				}
			});
		});
	}
});

const mime = {
	'.html': 'text/html',
	'.css' : 'text/css',
	'.js' : 'text/javascript'
};

function sendError(res) {
	res.writeHead(400, {'Content-Type' : 'text/plain'});
	res.end("404 Error");
}


function getFile(pathName, res) {
	fs.readFile(pathName, (err, data)=> {
		if (err) throw err;
		let name = path.extname(pathName);
		res.writeHead(200, {
			"Content-Type":mime[name]
		});
		res.end(data);
	});
}


server.listen(8888, ()=>console.log('listening at 8888'));
