import { Controller, Get, Post, Body } from '@nestjs/common';
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
	
	// 클라이언트에서 보내온 값들은 핸들러에서 어떻게 가져올까?
	// @Body() body를 이용하면 모든 request에서 보내온 값을 가져올 수 있다.
	// 하나씩 가져오려면 @Body('title') title 과 같이..
	@Post('/')
	createBoard(@Body('title') title:string,
				@Body('description') description:string
	): Board{
		return this.boardsService.createBoard(title,description);
	}
	
}
