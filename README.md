# node_first
To study nodejs ! ( 생활코딩 nodejs 강의 )

<h2>강의 요약</h2>

- url이란? (http://opentutorials.org:3000/main?id=HTML&page=12)에서 
http는 protocol, opentutorials.org는 host(domain), 3000은 port 번호, main은 path,
id=HTML&page=12는 query string을 의미한다.

- nodejs에서 파일 읽기 (readFile을 이용한다.)

```
const fs = require('fs');
fs.readFile('sample.txt','utf8',(err,data)=>{
console.log(data);
});
```

- nodejs에서 파일 목록 알아내기 (readdir을 이용한다.)

```
const fs = require('fs');
fs.readFile('sample.txt','utf8',(err,data)=>{
console.log(data); // CSS, HTML, JavaScript 출력됨
});
```

- nodejs는 동기와 비동기 처리 방식을 가지는데, 동기는 single-cycle 느낌이면 
비동기는 쓰레드 느낌인 듯 하다.

- nodejs는 npm이라는 package manager를 이용한다.

- html의 form태그에서 주의할 점 : 사용자가 데이터를 가져올 때는 method="get"을 이용하고, 
사용자가 데이터를 수정, 삭제 등을 할 때는 method="post"를 이용

- post 방식으로 은밀하게 보낸 데이터를 처리하고자 할 때는 require('querystring')을 이용하여 
request.on(~) 을 통해 값을 얻어낼 수 있다. 