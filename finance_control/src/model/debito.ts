export default class Debito {
    constructor(
        public id_transacao: number,
        public valor: number,
        public id_pessoa: number,
        public id_categoria: number,
        public data_transacao_inicial: Date,
        public id_modelo_cobranca: number,
        public duracao: number,
        public modelo_cobranca: string,
        public categoria: string,
        public forma_pagamento: string
    ) {}

}