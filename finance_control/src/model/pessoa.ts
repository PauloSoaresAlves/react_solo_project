import Cartao from "./cartao";
import Credito from "./credito";
import Despesa from "./despesa";

export default class Pessoa {
    constructor(
        public id_pessoa: number,
        public name: string,
        public id_perfil: number,
        public cartoes: Cartao[],
        public creditos: Credito[],
        public despesas: Despesa[]
    ) {}

}