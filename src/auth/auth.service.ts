import { Injectable } from '@nestjs/common';
import { userData } from 'src/users/entity/usersdata.entity';
import { getConnection } from 'typeorm';
import { cloginDto } from './dto/clogin.dto';

@Injectable()
export class AuthService {
    async valid(body:cloginDto){
        const connection = getConnection();
        const queryRunner = connection.getRepository(userData)
        const {username,password} = body;
        // const user = 
    }
}
