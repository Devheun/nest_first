let http = require('http');
let fs = require('fs');
let url = require('url');
let qs = require('querystring');

function templateHTML(title,list,body){
	return `
		<!doctype html>
			<html>
				<head>
					<title>WEB - ${title}</title>
					<meta charset="utf-8">
				</head>
				<body>
					<h1><a href="/">WEB</a></h1>
					${list}
					<a href="/create">create</a>
					${body}
				</body>
			</html>
	`;
}

function templateList(filelist){
	let list='<ul>';
				
	for (i=0;i<filelist.length;i++){
		list = list + `<li>
			<a href="/?id=${filelist[i]}">${filelist[i]}</a>
			</li>`;
	}
				
	list = list + '</ul>';
	return list;
}

// request는 요청할 때 웹브라우저가 보낸 정보들
// response는 응답할 때 우리가 웹브라우저한테 전송할 정보들

let app = http.createServer(function(request,response){
    let _url = request.url;
	let queryData = url.parse(_url, true).query;
	let pathname=url.parse(_url,true).pathname;
	
	if (pathname==='/'){
		if (queryData.id === undefined){
			
			fs.readdir('./data',(err,filelist)=>{
				let title='Welcome';
				let data='Hello, Node.js !';

				const list=templateList(filelist);
				const template=templateHTML(title,list,
				`<h2>${title}</h2>${data}`);
				
				response.writeHead(200);
				response.end(template);
			});
			
		}else{
			fs.readdir('./data',(err,filelist)=>{
				
				fs.readFile(`data/${queryData.id}`,'utf8',(err,data)=>{
				let title=queryData.id;
				
				const list=templateList(filelist);
				const template=templateHTML(title,list,
				`<h2>${title}</h2>${data}`);
					
				response.writeHead(200);
				response.end(template);
			});
		});
	}
	} 
	else if(pathname==="/create"){
		fs.readdir('./data',(err,filelist)=>{
			
				let title='create';
				const list=templateList(filelist);
				const template=templateHTML(title,list,
				`
					<form action="https://node-first-vhpbo.run.goorm.site/process_create"
					method="post">
						<p><input type="text" name="title" placeholder="title"></p>
						<p><textarea name="description" placeholder="description"></textarea></p>
						<p><input type="submit" value="Submit"></p>
					</form>
				`);
				
				response.writeHead(200);
				response.end(template);
		});
	}
	else if(pathname==="/process_create"){
		let body='';
		
		/* 
		nodejs에서 웹브라우저에 보낸 정보가 크거나해서 처리하기 힘들 때
		서버쪽에서 조각조각낸 데이터를 수신할 때 마다 콜백함수를 호출
		*/
		request.on('data',function(data){
			body +=data;
		});
		
		// end에 해당되는 콜백함수가 실행됐을 때 정보수신이 끝났다.
		request.on('end',function(data){
			const post = qs.parse(body);
			const title=post.title;
			const description = post.description;
		});
		response.writeHead(200);
		response.end('success');
	}
	
	else{
		response.writeHead(404);
		response.end("Not found");
	}
	
 
});
app.listen(3000);