
// 파이프 이용
import {IsNotEmpty} from "class-validator";

// 클래스는 인터페이스와 달리 런타임에서 작동하므로 파이프 같은 기능을 이용할 때 유용하다.
export class CreateBoardDto{
	@IsNotEmpty()
	title:string;
	
	@IsNotEmpty()
	description:string;
}