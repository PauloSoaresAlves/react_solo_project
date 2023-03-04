module.exports = {

    getCreditoFromPessoa : (pessoa, pool) => {
    return new Promise(function(resolve, reject) {
        const { id_pessoa } = pessoa
        pool.query(`select t.*, mc.nome as modelo_cobranca, cat.nome as categoria from credito c join transacao t on c.id_credito = t.id_transacao join modelo_cobranca mc on mc.id_modelo_cobranca = t.id_modelo_cobranca
        join categoria cat on cat.id_categoria = t.id_categoria where t.id_pessoa = $1`, [id_pessoa] ,(error, results) => {
        if (error) {
            reject(error)
        }
        resolve(results.rows);
        })
    }) 
    }
}