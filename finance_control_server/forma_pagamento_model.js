module.exports = {

    getCardFromPessoa : (pessoa, pool) => {
    return new Promise(function(resolve, reject) {
        const { id_pessoa } = pessoa
        pool.query('SELECT c.*, fp.nome FROM cartao c join forma_pagamento fp on c.id_cartao = fp.id_forma_pagamento where id_pessoa = $1;', [id_pessoa] ,(error, results) => {
        if (error) {
            reject(error)
        }
        resolve(results.rows);
        })
    }) 
    },
    createFormaPagamento: (fp, pool) => {
        return new Promise(function(resolve, reject) {
            const {nome} = fp
            pool.query(`insert into forma_pagamento(nome) values ($1);`, [nome] ,(error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results.rows);
            })
        }) 
    },

    createCartao: (cartao, pool) => {
        return new Promise(function(resolve, reject) {
            const {prim_digitos,id_pessoa,vencimento,credito } = cartao
            pool.query(`insert into cartao (id_cartao,prim_digitos,id_pessoa,vencimento,credito)
            select max(id_forma_pagamento), $1, $2,$3,$4 from forma_pagamento;`, [prim_digitos,id_pessoa,vencimento,credito] ,(error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results.rows);
            })
        })
    }

}