let http = require('http');
let fs = require('fs');
let url = require('url');

let app = http.createServer(function(request,response){
    let _url = request.url;
	let queryData = url.parse(_url, true).query;
	let pathname=url.parse(_url,true).pathname;
	
	if (pathname==='/'){
		if (queryData.id === undefined){
			let title='Welcome';
			let data='Hello, Node.js !';
			const template=`
			<!doctype html>
				<html>
					<head>
						<title>WEB1 - ${title}</title>
						<meta charset="utf-8">
					</head>
					<body>
						<h1><a href="/">WEB</a></h1>
						<ol>
							<li><a href="/?id=HTML">HTML</a></li>
							<li><a href="/?id=CSS">CSS</a></li>
							<li><a href="/?id=JavaScript">JavaScript</a></li>
						</ol>
						<h2>${title}</h2>
						<p>${data}</p>
					</body>
				</html>
			`;
			response.writeHead(200);
			response.end(template);
		}else{
			fs.readFile(`data/${queryData.id}`,'utf8',(err,data)=>{
			let title=queryData.id;
			const template=`
			<!doctype html>
				<html>
					<head>
						<title>WEB1 - ${title}</title>
						<meta charset="utf-8">
					</head>
					<body>
						<h1><a href="/">WEB</a></h1>
						<ol>
							<li><a href="/?id=HTML">HTML</a></li>
							<li><a href="/?id=CSS">CSS</a></li>
							<li><a href="/?id=JavaScript">JavaScript</a></li>
						</ol>
						<h2>${title}</h2>
						<p>${data}</p>
					</body>
				</html>
			`;
			response.writeHead(200);
			response.end(template);
	});
		}
	} else{
		response.writeHead(404);
		response.end("Not found");
	}
	
 
});
app.listen(3000);