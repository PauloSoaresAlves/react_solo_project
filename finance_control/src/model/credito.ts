export default class Credito {
    constructor(
        public id_transacao: number,
        public valor: number,
        public descricao: string,
        public id_pessoa: number,
        public id_categoria: number,
        public data_inicial_transacao: Date,
        public id_modelo_cobranca: number,
        public duracao: number,
        public modelo_cobranca: string,
        public categoria: string
    ) {}

}