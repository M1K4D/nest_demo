import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { getConnection, Repository } from 'typeorm';
import { userDto } from './dto/user.dto';
import { UserRepository } from './user.repository';
import { userData } from './usersdata.entity';

// let USER_DATA: userData[] = []

@Injectable()
export class UsersService {
    constructor(private readonly user: UserRepository) { }
    async getUser() {
        try {
            const data = await this.user.find()
            return data
        } catch (error) {
            console.log('error message ::', error.message);
            throw new NotFoundException({
                success: false,
                message: error.message,
            });
        }
    }



    async addUser(body: userDto) {
        const connection = getConnection();
        const queryRunner = connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        let err = '';
        const { username, title, password } = body;
        const user = new userData();
        user.username = username
        user.title = title
        user.password = password
        await queryRunner.manager.save(user);
        try {
            await queryRunner.commitTransaction();
        } catch (error) {
            console.log('error message ::', error.message);
            await queryRunner.rollbackTransaction();
            err = error.message;
        } finally {
            await queryRunner.release();
            if (err)
                throw new BadRequestException({
                    success: false,
                    message: err,
                });
            return {
                success: true,
                message: 'add success',
            }
        }
    }

    // async updateUser(id: number, body: userDto) {
    //     try {
    //         const { username, title, password } = body;
    //         // console.log(id)
    //         const found = USER_DATA.find(value => value.id == id)
    //         if (!found) throw new Error(`${id} not found `)
    //         const fil = USER_DATA.filter(value => value.id != id)
    //         const fil_username = USER_DATA.filter(value => value.id != id)
    //         const fil_dup = fil_username.find(value => value.username === username)
    //         if (fil_dup) throw new Error(`username ${username} is duplicate`)
    //         console.log(fil)
    //         found.username = username
    //         found.title = title
    //         found.password = password

    //         return {
    //             success: true,
    //             message: `${id} update sucess`,
    //             data: USER_DATA
    //         }
    //     } catch (error) {
    //         throw new NotFoundException({
    //             success: false,
    //             message: error.message
    //         })
    //     }
    // }

    // async delete(id: number) {
    //     try {
    //         const found = USER_DATA.find(value => value.id == id)
    //         if (!found) throw new Error(`${id} not found`)
    //         USER_DATA = USER_DATA.filter(value => value.id != id)
    //         return {
    //             success: true,
    //             message: `${id} delete succes`,
    //             data: USER_DATA
    //         }
    //     } catch (error) {
    //         throw new NotFoundException({
    //             success: false,
    //             message: error.message
    //         })
    //     }
    // }
}
