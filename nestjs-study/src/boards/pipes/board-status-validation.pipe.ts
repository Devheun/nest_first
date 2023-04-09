// 커스텀 파이프로 status가 PUBLIC 과 PRIVATE만 올 수 있게 !

import { BadRequestException , PipeTransform, Injectable} from "@nestjs/common";
import { BoardStatus } from "../board-status.enum";

@Injectable()
export class BoardStatusValidationPipe implements PipeTransform{
	
	// prefix readonly는 속성을 읽기 전용으로 만든다. (클래스 외부에서 액세스는 가능하지만 값 변경 X)
	readonly StatusOptions=[
		BoardStatus.PRIVATE,
		BoardStatus.PUBLIC
	];
	
	transform(value:any){
		value=value.toUpperCase();
		if(!this.isStatusValid(value)){
			throw new BadRequestException(`${value} isn't in the status option`);
		}
		return value;
	}
	
	private isStatusValid(status: any){
		// indexOf를 이용해 status가 존재하면 True 리턴, 아님 False 리턴
		const index=this.StatusOptions.indexOf(status);
		return index!==-1;
	}
}