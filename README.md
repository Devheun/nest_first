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

- Pipe란 ? @Injectable () 데코레이터로 주석이 달린 클래스 (data transformation, data validation을 위해 사용)

- pipe는 컨트롤러 경로 처리기에 의해 처리되는 인수에 대해 작동, 네스트는 메소드가 호출되기 직전 파이프를 삽입하고 
파이프는 메소드를 향하는 인수를 수신하고 이에 대해 작동

- Data Transformation은 ? 입력 데이터를 원하는 형식으로 변환 (ex. 문자열에서 정수로)

- Data Validation은? 입력 데이터를 평가하고 유효한 경우 변경되지 않은 상태로 전달, 그렇지 않으면 예외 발생

- Pipe 사용하는 법 (Handler-level pipes, Parameter-level pipes, Global pipes)

- Bulit-in Pipes : 기본적으로 만들어진 6가지 파이프들 
(ValidationPipe, ParseIntPipe, ParseBoolPipe, ParseArrayPipe, ParseUUIDPipe, DefaultValuePipe)

- pipe를 사용하기  위해서 class validator와 class transformer 모듈을 설치해줘야함
(npm install class-validator class-transformer --save)

- 커스텀 파이프 : PipeTransform 이란 인터페이스를 새롭게 만들 커스텀 파이프에 구현해주어야함 (
PipeTransform 인터페이스는 모든 파이프에서 구현해줘야하는 인터페이스이다.)

- 커스텀 파이프는 또한 transform() 메소드를 써주어야한다. (nestjs가 인자를 처리하기 위해 사용됨)

- transform() 메소드는 두개의 파라미터 가지는데, 첫번째 파라미터는 처리가 된 인자의 value이고, 
두번째 파라미터는 인자에 대한 메타 데이터를 포함한 객체 (return된 값은 Route 핸들러로 전해지고, 예외가 발생하면 바로 클라이언트한테 !)
