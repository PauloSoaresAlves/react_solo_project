const { request } = require('express');
const config = require('./config.js');

const Pool = require('pg').Pool
const pool = new Pool(config);


const getPerfil = (body) => {
  return new Promise(function(resolve, reject) {
    const { id } = body
    pool.query('SELECT * FROM perfil where id_perfil = $1', [id] ,(error, results) => {
      if (error) {
        reject(error)
      }
      console.log(results.rows)
      resolve(results.rows);
    })
  }) 
}

const login = (body) => {
  return new Promise(function(resolve, reject) {
    const { login, senha } = body
    pool.query('SELECT * FROM perfil where login = $1 AND password = $2', [login, senha] ,(error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  }) 
}

const createPerfil = (body) => {
  return new Promise(function(resolve, reject) {
    const { name, login, password} = body
    console.log(name, login, password)
    pool.query('INSERT INTO perfil (name, login, password) VALUES ($1, $2, $3) RETURNING *', [name, login, password], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(true)
    })
  })
}
const deletePerfil = () => {
  return new Promise(function(resolve, reject) {
    const id = parseInt(request.params.id)
    pool.query('DELETE FROM perfil WHERE id_perfil = $1', [id], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`Perfil deleted with ID: ${id}`)
    })
  })
}

module.exports = {
  getPerfil,
  login,
  createPerfil,
  deletePerfil,
}