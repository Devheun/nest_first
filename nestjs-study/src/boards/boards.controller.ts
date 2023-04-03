import { Controller, Get } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board } from './board.model';

@Controller('boards')
export class BoardsController {
	// 제한접근자를 이용하여 생성자안에서 써주면 
	// 파라미터가 암묵적으로 클래스 프로퍼티로 선언됨
	constructor(private boardsService : BoardsService){}
	
	@Get('/')
	getAllBoard() : Board[]{
		return this.boardsService.getAllBoards();
	}
}
