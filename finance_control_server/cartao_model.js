module.exports = {

    getCardFromPessoa : (pessoa, pool) => {
    return new Promise(function(resolve, reject) {
        const { id_pessoa } = pessoa
        pool.query('SELECT * FROM cartao where id_pessoa = $1', [id_pessoa] ,(error, results) => {
        if (error) {
            reject(error)
        }
        resolve(results.rows);
        })
    }) 
    }
}