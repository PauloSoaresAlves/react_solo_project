module.exports = {

    getPessoasFromPerfil : (perfil, pool) => {
    return new Promise(function(resolve, reject) {
        const { id_perfil } = perfil
        pool.query('SELECT * FROM pessoa where id_perfil = $1', [id_perfil] ,(error, results) => {
        if (error) {
            reject(error)
        }
        resolve(results.rows);
        })
    }) 
    },

    createPessoa: (pessoa, pool) => {
        return new Promise(function(resolve, reject) {
            const { name, id_perfil } = pessoa
            pool.query('INSERT INTO pessoa (name, id_perfil) VALUES ($1, $2) returning id_pessoa', [name, id_perfil] ,(error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results.rows);
            })
        }) 
    },

    editPessoa: (pessoa, pool) => {
        return new Promise(function(resolve, reject) {
            const { name, id_pessoa } = pessoa
            console.log(name, id_pessoa)
            pool.query(`UPDATE pessoa SET name = $1 WHERE id_pessoa = $2`, [name, id_pessoa] ,(error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results.rows);
            })
        }) 
    }
}