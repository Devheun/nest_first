import { Injectable,NotFoundException} from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { v1 as uuid } from 'uuid';
import {CreateBoardDto} from './dto/create-board.dto';

@Injectable()
export class BoardsService {
	// 다른 컴포넌트에서 값 수정 막기위해 private
	// 게시물이 복수일 수 있기에 배열인 Board[]로 타입 지정
	private boards: Board[]=[];
	
	// 게시물 읽기 기능
	getAllBoards():Board[]{
		return this.boards;
	}
	
	// 게시물 생성 기능
	createBoard(createBoardDto : CreateBoardDto){ // DTO 적용
		const {title,description} = createBoardDto;
		const board: Board ={
			// 게시물 id는 유니크해야함. DB에 데이터를 넣어줄땐 DB가 알아서 유니크한 값 할당
			// 지금은 로컬메모리에서 진행하므로 uuid 모듈을 이용해서!
			id : uuid(),
			title, // parameter와 이름이 값으면 이렇게 써도 동일, title:title
			description:description,
			status:BoardStatus.PUBLIC,
		};
		this.boards.push(board);
		return board;
	}
	
	// ID로 특정 게시물 가져오기
	// 찾는 게시물이 없을 때 에러 표출 -> 예외 인스턴스 생성해서 이용
	getBoardById(id:string) : Board{
		const found=this.boards.find((board)=>board.id===id);
		if(!found){
			throw new NotFoundException(`Can't find Board with id ${id}`);
		}
		return found;
	}
	
	// ID로 특정 게시물 지우기
	// 없는 게시물을 지우려 할 때 -> 지우려하는 게시물 있는지 체크후 있다면 지우고 없으면 에러
	deleteBoard(id:string) : void{
		const delBoard=this.getBoardById(id);
		this.boards = this.boards.filter((board)=>board.id !== delBoard.id);
	}
	
	// 특정 게시물 상태 업데이트 (private, public 상태)
	updateBoardStatus(id:string, status:BoardStatus) : Board{
		const board = this.getBoardById(id);
		board.status=status;
		return board;
	}
}