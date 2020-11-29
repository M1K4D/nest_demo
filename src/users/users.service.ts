import { Injectable, NotFoundException } from '@nestjs/common';
import { userData } from './usersdata.entity';

let USER_DATA: userData[] = []

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
                success: false,
                message: error.message
            })

        }

    }

    async addUser(body: any) {
        try {
            const { username, title, password } = body;
            const find = USER_DATA.find(e => e.username === username)
            if (find) throw new Error(`username ${username} is duplicate`)

            USER_DATA.push({
                id: USER_DATA.length + 1,
                username: username,
                title: title,
                password: password,
            })
            return {
                success: true,
                message: 'add sucess',
                data : USER_DATA
            }
        } catch (error) {
            throw new NotFoundException({
                success: false,
                message: error.message
            })
        }
    }

    async updateUser(id: number, body: any) {
        try {
            const { username, title, password } = body;
            // console.log(id)
            const found = USER_DATA.find(value => value.id == id)
            if (!found) throw new Error(`${id} not found `)
            // console.log(found)
            found.username = username
            found.title = title
            found.password = password

            return {
                success: true,
                message: `${id} update sucess`,
                data: USER_DATA
            }
        } catch (error) {
            throw new NotFoundException({
                success: false,
                message: error.message
            })
        }
    }

    async delete(id:number){
        try {
            const found = USER_DATA.find(value => value.id == id)
            if (!found) throw new Error(`${id} not found `)
            USER_DATA = USER_DATA.filter(value => value.id != id)
            return {
                success: true,
                message: `${id} delete succes`,
                data: USER_DATA
            }
        } catch (error) {
            throw new NotFoundException({
                success: false,
                message: error.message
            })
        }
    }
}
