export default class Despesa {
    constructor(
        public id_transacao: number,
        public valor: number,
        public id_pessoa: number,
        public id_categoria: number,
        public data_inicial_transacao: Date,
        public id_modelo_cobranca: number,
        public duracao: number,
        public modelo_cobranca: string,
        public categoria: string,
        public id_forma_pagamento: number,
        public nome_forma_pagamento: string,
        public prim_digitos: string
    ) {}

}