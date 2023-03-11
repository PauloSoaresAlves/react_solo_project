import React from 'react';
import Pessoa from '../../../model/pessoa';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import CreditCardOffIcon from '@mui/icons-material/CreditCardOff';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';
import { Divider, TextField, Tooltip } from '@mui/material';
import Cartao from '../../../model/cartao';
import UserData from '../../../model/userData';
import { updateCard } from '../../../dao/cartao.dao';

export default function DashboardCardInfo({ pessoa,setUserData }: { pessoa: Pessoa,setUserData:any }) {

    const [expanded, setExpanded] = React.useState(false);
    const [editMode, setEditMode] = React.useState(false);

    const [cards, setCards] = React.useState(pessoa.cartoes);


    const handleCardChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        const index = parseInt(name.split('-')[1]);
        const fieldname = name.split('-')[0];
        const newCards = [...cards];
        if(fieldname === 'prim_digitos'){
            newCards[index].prim_digitos = value.split('-')[0];
        } else if (fieldname === 'vencimento'){
            newCards[index].vencimento = parseInt(value.split('/')[0]);
        } else {
            newCards[index].nome = value;
        }
        setCards(newCards);
    }

    const confirmCardChange = (index : number) => {
        updateCard(cards[index]).then((result) => {
            setUserData((prev: UserData) => {
                const newUserData = {...prev};
                newUserData.pessoas.forEach((pessoa) => {
                    if(pessoa.id_pessoa === pessoa.id_pessoa){
                        pessoa.cartoes = cards;
                    }
                });
                return newUserData;
            })
            setEditMode(false);
        })
}

    return (
       <div>
            <Divider textAlign="left" ><h2 className="inline_icon"><PersonIcon/>{pessoa.name}</h2></Divider>
            {pessoa.cartoes.map((cartao,index) => {
                return (
                    <div className={expanded ? 'dashboardCardCardExp' : 'dashboardCardCard'}>
                        <div className="dashboardCardCardHeader">
                            <TextField
                            label="Nome do cartão"
                            disabled={!editMode}
                            value={cards[index].nome}
                            variant="standard"
                            name={'nome-'+index}
                            className="dashboardCardTextfield"
                            onChange={handleCardChange}
                            >
                            </TextField>
                            <TextField
                            label="Primeiros Dígitos"
                            disabled={!editMode}
                            value={cards[index].prim_digitos+"-XXXX-XXXX-XXXX"}
                            variant="standard"
                            className="dashboardCardTextfield"
                            name={'prim_digitos-'+index}
                            onChange={handleCardChange}
                            >
                            </TextField>
                            <TextField
                            label="Vencimento"
                            disabled={!editMode}
                            value={cards[index].vencimento.toString().padStart(2, '0') + "/XX"}
                            variant="standard"
                            className="dashboardCardTextfield"
                            name={'vencimento-'+index}
                            style={{visibility:cartao.credito?'visible':'hidden'}}
                            onChange={handleCardChange}
                            >
                            </TextField>
                        {cards[index].credito ?
                                <Tooltip title="Crédito e Débito" ><CreditCardIcon cursor={editMode ? "pointer" : "auto"} 
                                onClick={()=>setCards((x)=>{
                                    const newCards = [...x];
                                    newCards[index].credito = false;
                                    return newCards;
                                })}/></Tooltip> :
                                <Tooltip title="Apenas Débito" ><CreditCardOffIcon cursor={editMode ? "pointer" : "auto"}
                                onClick={()=>setCards((x)=>{
                                    const newCards = [...x];
                                    newCards[index].credito = true;
                                    return newCards;
                                })}/></Tooltip>}
                        {expanded ?
                            <Tooltip title="Expandir" ><ExpandLessIcon onClick={() => setExpanded(!expanded)} cursor="pointer"/></Tooltip> :
                            <Tooltip title="Expandir" ><ExpandMoreIcon onClick={() => setExpanded(!expanded)} cursor="pointer"/></Tooltip>}
                    </div>
                    {expanded && <div className="dashboardCardCardBody"></div>}
                    {expanded && <div className="dashboardCardCardFooter">
                                    {editMode ? 
                                        <div style={{gap:'2rem',display:'flex'}}>
                                            <CheckOutlinedIcon cursor="pointer" onClick={()=>confirmCardChange(index)}/>
                                            <ClearOutlinedIcon cursor="pointer" onClick={()=>{
                                                                                            setEditMode(false)
                                                                                            setCards(pessoa.cartoes)
                                                                                        }}/>
                                        </div> :
                                        <EditIcon cursor="pointer" onClick={()=> setEditMode(true)}/>   
                                    }

                    </div>}
                    </div>
                )})}
        </div>
    )
}