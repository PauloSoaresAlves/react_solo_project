module.exports = {

    getCreditoFromPessoa: (pessoa, pool) => {
        return new Promise(function (resolve, reject) {
            const { id_pessoa } = pessoa
            pool.query(`select t.*, mc.nome as modelo_cobranca, cat.nome as categoria from credito c join transacao t on c.id_credito = t.id_transacao join modelo_cobranca mc on mc.id_modelo_cobranca = t.id_modelo_cobranca
        join categoria cat on cat.id_categoria = t.id_categoria where t.id_pessoa = $1`, [id_pessoa], (error, results) => {
                if (error) {
                    reject(error)
                }
                resolve(results.rows);
            })
        })
    },


    getDebitoFromPessoa: (pessoa, pool) => {
        return new Promise(function (resolve, reject) {
            const { id_pessoa } = pessoa
            pool.query(`select t.*, mc.nome as modelo_cobranca, cat.nome as categoria, fp.id_forma_pagamento, fp.nome as nome_forma_pagamento,car.prim_digitos from debito d join transacao t on d.id_debito = t.id_transacao join modelo_cobranca mc on mc.id_modelo_cobranca = t.id_modelo_cobranca
            join categoria cat on cat.id_categoria = t.id_categoria join forma_pagamento fp on fp.id_forma_pagamento = d.id_forma_pagamento
            left join cartao car on car.id_cartao = fp.id_forma_pagamento where t.id_pessoa = $1;`, [id_pessoa], (error, results) => {
                if (error) {
                    reject(error)
                }
                resolve(results.rows);
            })
        })
    },


    createCredito: (pool) => {
        return new Promise(function (resolve, reject) {
            pool.query(`insert into credito (id_credito) select max(id_transacao) from transacao;`, (error, results) => {
                if (error) {
                    reject(error)
                }
                resolve(results.rows);
            })
        })
    },


    createTransacao: (debito, pool) => {
        return new Promise(function (resolve, reject) {

            const { valor, id_pessoa, id_modelo_cobranca, id_categoria, data_inicial_transacao, duracao,descricao} = debito
            console.log(debito)
            pool.query(`insert into transacao (valor, id_pessoa, id_modelo_cobranca, id_categoria,data_inicial_transacao,duracao, descricao) values ($1, $2, $3, $4, $5,$6,$7) ;`,
                [valor, id_pessoa, id_modelo_cobranca, id_categoria, data_inicial_transacao, duracao,descricao], (error, results) => {
                    if (error) {
                        reject(error)
                    }
                    resolve(results.rows);
                })
        })
    },
    
    createDebito: (body, pool) => {
    
    return new Promise(function (resolve, reject) {
            const { id_forma_pagamento, credito } = body
            pool.query(`insert into debito (id_debito, id_forma_pagamento, credito) select max(id_transacao), $1, $2 from transacao returning id_debito;`, [id_forma_pagamento,credito], (error, results) => {
                if (error) {
                    reject(error)
                }
                resolve(results.rows);
            })
        })
    }

}