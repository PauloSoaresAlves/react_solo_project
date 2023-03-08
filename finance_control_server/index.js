const express = require('express')
const app = express()
const port = 3001
const config = require('./config.js');

const Pool = require('pg').Pool
const pool = new Pool(config);

const perfil_model = require('./perfil_model.js')
const pessoa_model = require('./pessoa_model.js')
const cartao_model = require('./cartao_model.js')
const credito_debito_model = require('./transacao_model')

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
  perfil_model.login(req.body, pool) //returns perfil
    .then(response => {
      final_response = response[0];
      pessoa_model.getPessoasFromPerfil(final_response, pool).then(response2 => { //returns pessoas
        final_response.pessoas = response2;
        Promise.all(final_response.pessoas.map(async (pessoa) => {
          return cartao_model.getCardFromPessoa(pessoa, pool) //returns cartoes
        })).then((val) => {
          val.map((cartoes, index) => {
            final_response.pessoas[index].cartoes = cartoes
          })
          Promise.all(final_response.pessoas.map(async (pessoa) => {
            return credito_debito_model.getCreditoFromPessoa(pessoa, pool) //returns creditos
          })).then((val) => {
            val.map((creditos, index) => {
              final_response.pessoas[index].creditos = creditos
            })
            Promise.all(final_response.pessoas.map(async (pessoa) => {
              return credito_debito_model.getDebitoFromPessoa(pessoa, pool) //returns debitos
            })).then((val) => {
              val.map((debitos, index) => {
                final_response.pessoas[index].despesas = debitos
              })
              res.status(200).send(final_response);
            })
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

app.post('/createPessoa', (req, res) => {
  console.log(req.body)
  pessoa_model.createPessoa(req.body, pool)
    .then(response => {
      Promise.all(req.body.cartoes.map(async (cartao) => {
        return cartao_model.createCartao(cartao, response, pool)
      })).then(() => { 
        Promise.all(req.body.creditos.map(async (credito) => {
          return credito_debito_model.createCredito(credito, response, pool)
        })).then(() => {
          res.status(200).send(response[0]);
        })
      })
    })
    .catch(error => {
      res.status(500).send(error);
    })
})


app.post('/editPessoa', (req, res) => {
  pessoa_model.editPessoa(req.body, pool).then((response) => {
    res.status(200).send("Pessoa editada com sucesso");
  }).catch((error) => {
    res.status(500).send(error);
  })
})

app.post('/createCard', (req, res) => {
  Promise.all(cartao_model.createCard(req.body, pool)).then((response) => {
    res.status(200).send("Cartão criado com sucesso");
  }).catch((error) => {
    res.status(500).send(error);
  })
})

app.post('/createCredito', (req, res) => {
  Promise.all(credito_debito_model.createCredito(req.body, pool)).then((response) => {
    res.status(200).send("Credito criado com sucesso");
  }).catch((error) => {
    res.status(500).send(error);
  })
})

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})