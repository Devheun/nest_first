import { Controller, Get, Post, Delete, Patch, Body, Param } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board, BoardStatus } from './board.model';
import {CreateBoardDto} from './dto/create-board.dto';

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
	createBoard(@Body() createBoardDto: CreateBoardDto // DTO 적용
	): Board{
		return this.boardsService.createBoard(createBoardDto);
	}
	
	// ID로 특정 게시물 가져올 때
	@Get('/:id') // url의 parameter가 id인 경우
	getBoardById(@Param('id') id : string): Board{
		return this.boardsService.getBoardById(id);
	}
	
	// ID로 특정 게시물 지울 때
	@Delete('/:id')
	deleteBoard(@Param('id') id : string) : void{
		this.boardsService.deleteBoard(id);
	}
	
	// 특정 게시물 상태 업데이트 할 때
	@Patch('/:id/status')
	updateBoardStatus(
		@Param('id') id:string,
		@Body('status') status : BoardStatus
	): Board {
		return this.boardsService.updateBoardStatus(id,status);
	}
}
