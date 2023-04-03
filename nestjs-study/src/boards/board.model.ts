export interface Board{
	id: string;
	title:string;
	description:string;
	// BoardStatus란 공개 게시물인지 비공개인지 나눠주는것
	status: BoardStatus;
}

// enum을 이용하여 status는 'PUBLIC' 값 또는 'PRIVATE'값만 사용가능
export enum BoardStatus{
	PUBLIC = 'PUBLIC',
	PRIVATE = 'PRIVATE'
}