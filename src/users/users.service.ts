import { Injectable, NotFoundException } from '@nestjs/common';

const USER_DATA: any = [
    { id: 1, username: 'admin', title: 'dexter', password: '12345' }
];

@Injectable()
export class UsersService {

    async getUser() {
        try {
            if (!USER_DATA.length) throw new Error('no data')
            return {
                success: true,
                data: USER_DATA,
            }
        } catch (error) {
            throw new NotFoundException({
                success: true,
                message: error.message
            })

        }

    }

    async addUser(body: any) {
        try {
            const { username, title, password } = body;
            const find = USER_DATA.find(e => e.username === username)
            if (find) throw new Error('มีผู้ใช้งานซ้ำ.')

            USER_DATA.push({
                id: USER_DATA.length + 1,
                username: username,
                title: title,
                password: password,
            })
            return { success: true, message: 'add sucess' }
        } catch (error) {
            throw new NotFoundException({
                success: false,
                message: error.message
            })
        }
    }
}
