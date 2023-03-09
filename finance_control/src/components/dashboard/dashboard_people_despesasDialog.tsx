import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Pessoa from '../../model/pessoa';
import { Checkbox, FormControlLabel, MenuItem, Select } from '@mui/material';
import Despesa from '../../model/despesa';
import Cartao from '../../model/cartao';
import { createDebito } from '../../dao/transacao.dao';
import UserData from '../../model/userData';

export default function DespesasDialog({ showAddDespesas, pessoa, setshowAddDespesas, categorias,setUserData }: 
    { showAddDespesas: boolean, pessoa: Pessoa, setshowAddDespesas: any,categorias: any,setUserData:any }) {

    const [disableParcelas, setdisableParcelas] = React.useState(false);
    const [despesa, setdespesa] = React.useState({categoria:'',data_inicial_transacao:new Date(),duracao:0,id_categoria:0,id_forma_pagamento:0,id_modelo_cobranca:0,
id_pessoa: pessoa.id_pessoa, id_transacao: 0,modelo_cobranca:'',nome_forma_pagamento:'',prim_digitos:'',valor:0} as Despesa)
    const [id_cartao, setIDCartao] = React.useState(0);
    const modelosCobranca = ['Mensal', 'Semanal', 'Diário', 'Trimestral', 'Semestral', 'Anual'];
    const formasPagamento = ['PIX','Dinheiro','Cheque','Boleto','Cartão'];


    const handleClose = () => {
        setshowAddDespesas(false);
    }

    const handleAddDespesa = () => {
        if (despesa.id_forma_pagamento === 4) {
            despesa.id_forma_pagamento = id_cartao;
            despesa.prim_digitos = pessoa.cartoes.filter((cartao: Cartao) => cartao.id_cartao === id_cartao)[0].prim_digitos;
        } 
        despesa.categoria = categorias.filter((categoria: any) => categoria.id_categoria === despesa.id_categoria)[0].nome;
        
        createDebito(despesa).then((res) => {
          despesa.id_transacao = res[0].id_debito; 
          setUserData((x: UserData) => {
            let newUserData = { ...x };
            newUserData.pessoas.filter((pessoa: Pessoa) => pessoa.id_pessoa === despesa.id_pessoa)[0].despesas.push(despesa);
            return newUserData;
          })
        });
        setshowAddDespesas(false);
    }

    const handleFormEdit = (e: any) => {
        if(e.target.name === "disableDuracao" ){
            setdisableParcelas((x) => !x);
            e.target.checked? setdespesa({ ...despesa, duracao: -1 }): setdespesa({ ...despesa, duracao: 0 });
        } else if (e.target.name === "data_inicial_transacao"){
            setdespesa({ ...despesa, [e.target.name]: new Date(e.target.value) });
        }else {
            setdespesa({ ...despesa, [e.target.name]: e.target.value });
        }   
    }

    return (
        <div>
            <Dialog open={showAddDespesas} onClose={handleClose}
                PaperProps={{
                    style: {
                        backgroundColor: '#2F58CD',
                        gap: '10px',
                    },
                }}>
                <DialogTitle>Add new expense to {pessoa.name}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="valor"
                        label="Valor"
                        type="text"
                        name='valor'
                        onChange={handleFormEdit}
                        value={despesa.valor}
                        fullWidth
                        variant="standard"
                        style={{ marginBottom: '10px' }}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="data"
                        label="Primeiro vencimento"
                        type="date"
                        name='data_inicial_transacao'
                        onChange={handleFormEdit}
                        value={despesa.data_inicial_transacao.toISOString().split('T')[0]}
                        fullWidth
                        variant="standard"
                        style={{ marginBottom: '10px' }}
                    />
                    <TextField
                        value={despesa.id_categoria}
                        onChange={handleFormEdit}
                        select // tell TextField to render select
                        margin='dense'
                        name='id_categoria'
                        id="categoria"
                        label="Categoria"
                        fullWidth
                        style={{ marginBottom: '10px' }}
                    >
                        {categorias.map((categoria: any) => {
                            return (
                                <MenuItem key={categoria.id_categoria} value={categoria.id_categoria}>{categoria.nome}</MenuItem>
                            )
                        })}
                    </TextField>
                    <TextField
                        value={despesa.id_modelo_cobranca}
                        onChange={handleFormEdit}
                        select // tell TextField to render select
                        margin='dense'
                        name='id_modelo_cobranca'
                        id="modelo_cobranca"
                        label="Intervalo de cobrança"
                        fullWidth
                        style={{ marginBottom: '10px' }}
                    >
                        {modelosCobranca.map((modelo, index) => {
                            return (
                                <MenuItem key={index} value={index}>{modelo}</MenuItem>
                            )
                        })}
                    </TextField>
                    <div style={{ marginBottom: '10px', display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
                    <TextField
                        value={despesa.id_forma_pagamento}
                        onChange={handleFormEdit}
                        select // tell TextField to render select
                        margin='dense'
                        name='id_forma_pagamento'
                        id="forma_pagamento"
                        label="Forma de pagamento"
                        style={{ marginBottom: '10px' , width: '45%'}}
                    >
                        {formasPagamento.map((forma, index) => {
                            return (
                                <MenuItem key={index} value={index}>{forma}</MenuItem>
                            )
                        })}
                    </TextField>
                    {despesa.id_forma_pagamento === 4 && 
                    <TextField
                        value={id_cartao}
                        onChange={(e) => setIDCartao(e.target.value as unknown as number)}
                        select // tell TextField to render select
                        margin='dense'
                        name='cartao'
                        id="cartao"
                        label="Selecione o cartão"
                        style={{ marginBottom: '10px', width: '45%'}}
                    >
                        {pessoa.cartoes.map((cartao) => <MenuItem key={cartao.id_cartao} value={cartao.id_cartao}>{cartao.nome}</MenuItem>)}
                    </TextField>}
                    </div>
                    <div style={{ marginBottom: '10px', display: 'flex', width: '100%', justifyContent: 'space-around', alignItems: 'center' }}>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="parcelas"
                            label="parcelas"
                            type="number"
                            variant="standard"
                            disabled={disableParcelas}
                            value={despesa.duracao}
                            name="duracao"
                            onChange={handleFormEdit}
                        />
                        <FormControlLabel control={<Checkbox checked={disableParcelas} onChange={handleFormEdit} name="disableDuracao" />} label="Tempo indefinido" />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleAddDespesa}>Add</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
