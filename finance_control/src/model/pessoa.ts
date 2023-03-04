import Cartao from "./cartao";

export default class Pessoa {
    constructor(
        public id_pessoa: number,
        public name: string,
        public id_perfil: number,
        public cartoes: Cartao[]
    ) {}

}