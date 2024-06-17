export interface User {
    name: string
    email: string
}

const db = [
    {
        name: "Moacir",
        email: "moa@dio.com",
    }
]

export class UserService {
    db: User[]

    constructor(
        database = db
    ){
        this.db = database
    }

    createUser = (name: string, email: string) => {
        const user = {
            name,
            email
        }

        this.db.push(user)
        console.log('DB atualizado', this.db)
    }

    getAllUsers = () => {
        return this.db
    }

    deleteUser = (email: string) => {
        const dbDelete = this.db.length;
        this.db = this.db.filter(user => user.email !== email);
        return this.db.length < dbDelete;
    };
}

