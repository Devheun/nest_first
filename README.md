# nest_first
To study nestjs ! ( 공식문서 참조 )

- Controller란 ? 들어오는 요청을 처리하고 클라이언트에 응답을 반환한다.
(콘트롤러는 @Controller 데코레이터로 클래스를 데코레이션하여 정의)

```
@Controller('/boards')
export class BoardsController{

}
```

- 데코레이터는 인자를 Controller에 의해서 처리되는 "경로"로 받는다.

- Handler란 ? @Get, @Post, @Delete 등과 같은 데코레이터로 장식 된
컨트롤러 클래스 내의 단순한 메서드

```
@Controller('/boards')
export class BoardsController{
  @Get()
  getBoards(): string{
    return 'This action returns all boards';
  }
}
```

- Boards Controller 생성하기 : nest g controller boards --no-spec

- Providers란 ? 대부분의 기본 Nest 클래스는 서비스, 리포지토리, 팩토리, 헬퍼 등
프로바이더로 취급될 수 있다. 주요 아이디어는 종속성으로 주입할 수 있다는 것.
(객체는 서로 다양한 관계를 만들 수 있으며 객체의 인스턴스를 "연결"하는 기능은
대부분 Nest 런타임 시스템에 위임될 수 있다.)

- Provider를 사용하기 위해서는 module 파일에 등록을 해야한다 !

- Service란 ? 소프트웨어 개발내의 공통개념. @Injectable 데코레이터로 감싸져서
모듈에 제공되며, 이 서비스 인스턴스는 애플리케이션 전체에서 사용될 수 있다. 
서비스는 컨트롤러에서 데이터의 유효성을 체크하거나 DB에 아이템을 생성하는 등의 
작업 부분 처리

- Service 안에서는 DB 관련 로직을 처리한다. (DB에서 데이터 가져오거나
DB안에 게시판 생성할 때 그 생성한 게시판 정보를 넣어주는 등등)

- CLI를 이용해 Service를 생성하면 파일 안에 Injectable 데코레이터가 있고, 
NestJs는 이것을 이용해서 다른 컴포넌트에서 이 서비스를 사용할 수 있게(Injectable) 함

- Boards Service 생성하기 : nest g service boards --no-spec

- 모든 게시물을 가져오는 Service 만들기 (로직) : 클라이언트에서 요청 -> 컨트롤러 ->
컨트롤러에서 알맞은 요청 경로로 라우팅해서 해당 핸들러 -> 서비스 -> 서비스에서 처리 후
컨트롤러로 리턴 -> 컨트롤러에서 클라이언트로 리턴

- Board Model 정의 : 게시물에 필요한 데이터가 어떤 것이 필요한지 정의해주기 위해 (ID, 이름, 설명 등)

- Model을 정의하기 위해선 class나 interface 이용

- interface는 변수의 타입만을 체크, class는 변수의 타입도 체크하고 인스턴스 또한 생성가능

- 타입을 정의해주면 좋은 이유 ? 원하는 타입과 다른 코드를 사용할 시 에러 발생, 코드 쉽게 이해가능

- 개시물 생성 기능 : Service에서 로직을 처리한 후 Controller에서 서비스 불러오기

- 게시물 생성이 잘 되었는지를 확인하기 위해 POSTMAN API를 통해 Post 메서드를 쏴준다. (json 형식으로)

- DTO (Data Transfer Object)란 ? 계층간 데이터 교환을 위한 객체, 
DB에서 데이터 얻어서 Service나 Controller 등으로 보낼 때 사용하는 객체, 
데이터가 네트워크를 통해 전송되는 방법을 정의하는 객체

- DTO는 interface나 class를 이용해서 정의하는데 nestjs 에서는 클래스를 이용하라고 함

- DTO를 사용하면 데이터 유효성을 체크하는데 효율적이고, 더 안정적인 코드로 ! (유지보수 편하게)

