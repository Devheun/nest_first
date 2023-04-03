import { Injectable } from '@nestjs/common';
import { Board } from './board.model';

@Injectable()
export class BoardsService {
	// 다른 컴포넌트에서 값 수정 막기위해 private
	// 게시물이 복수일 수 있기에 배열인 Board[]로 타입 지정
	private boards: Board[]=[];
	
	getAllBoards():Board[]{
		return this.boards;
	}
}
