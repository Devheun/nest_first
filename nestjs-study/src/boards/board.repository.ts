// Repository 생성

import {EntityRepository, Repository} from "typeorm";
import {Board} from "./board.entity";

@EntityRepository(Board)
export class BoardRepository extends Repository<Board>{
	
}