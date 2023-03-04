import Pessoa from "./pessoa";

export default class UserData {
    constructor(
        public id_perfil: number,
        public name: string,
        public password: string,
        public pessoas: Pessoa[]
    ) {}

}