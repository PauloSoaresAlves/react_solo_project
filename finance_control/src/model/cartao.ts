export default class Cartao {
    constructor(
        public id_cartao: number,
        public prim_digitos: string,
        public id_pessoa: number,
        public vencimento: number
    ) {}

}