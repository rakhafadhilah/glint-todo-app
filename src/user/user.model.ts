export class User {
    constructor(
        public id: string,
        public name: string,
        public username: string,
        public email: string,
        public password: string,
        public token: string,
        public isActive: boolean,
        public role: number,
    ){}
}