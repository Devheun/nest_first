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

