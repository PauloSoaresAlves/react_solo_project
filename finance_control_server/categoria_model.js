module.exports = {

    getCategorias : (body,pool) => {
     const {id_perfil} = body
    return new Promise(function(resolve, reject) {
        pool.query('select * from categoria where id_perfil = $1 or id_perfil is null;',[id_perfil],(error, results) => {
        if (error) {
            reject(error)
        }
        resolve(results.rows);
        })
    }) 
    }
}