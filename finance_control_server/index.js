const express = require('express')
const app = express()
const port = 3001
const config = require('./config.js');

const Pool = require('pg').Pool
const pool = new Pool(config);

const perfil_model = require('./perfil_model.js')
const pessoa_model = require('./pessoa_model.js')
const cartao_model = require('./cartao_model.js')
const credito_model = require('./credito_model.js')

app.use(express.json())
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});

app.post('/getPerfilbyID', (req, res) => {
  perfil_model.getPerfil(req.body, pool)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })
})

app.post('/login', (req, res) => {
  let final_response = {}
  perfil_model.login(req.body, pool)
    .then(response => {
      final_response = response[0];
      pessoa_model.getPessoasFromPerfil(final_response, pool).then(response2 => {
        final_response.pessoas = response2;
        Promise.all(final_response.pessoas.map(async (pessoa) => {
          return cartao_model.getCardFromPessoa(pessoa, pool)
        })).then((val) => {
          val.map((cartoes, index) => {
            final_response.pessoas[index].cartoes = cartoes
          })
        })
      })
    }).catch(error => {
      res.status(500).send(error);
    })
})

app.post('/createPerfil', (req, res) => {
  perfil_model.createPerfil(req.body, pool)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })
})

app.post('/deletePerfil', (req, res) => {
  perfil_model.deletePerfil(req.params.id, pool)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })
})
app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})