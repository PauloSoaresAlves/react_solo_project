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
    }
}