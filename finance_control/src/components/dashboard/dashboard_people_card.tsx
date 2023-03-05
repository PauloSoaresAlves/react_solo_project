import React from 'react';
import Cartao from '../../model/cartao';
import Credito from '../../model/credito';
import Pessoa from '../../model/pessoa';
import EditIcon from '@mui/icons-material/Edit';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import UserData from '../../model/userData';
import { createPessoa, editPessoa } from '../../dao/pessoa.dao';
import { createCard } from '../../dao/card.dao';
import { createCredito } from '../../dao/credito.dao';

export default function DashboardPeopleCard({ pessoa, setUserData, isNewPessoa, setAddingPessoa }: { pessoa: Pessoa, setUserData: any, isNewPessoa?: boolean, setAddingPessoa?: any }) {

    const modelosCobranca = ['mensal', 'semanal', 'diário', 'trimestral', 'semestral', 'anual'];
    const [editName, setEditName] = React.useState(false);

    const [addCard, setAddCard] = React.useState(false);
    const [addSalario, setAddSalario] = React.useState(false);

    const [newCard, setNewCard] = React.useState({ id_cartao: 0, nome: '', prim_digitos: '', vencimento: 0, id_pessoa: pessoa.id_pessoa } as Cartao);
    const [newSalario, setNewSalario] = React.useState({
        id_transacao: 0, categoria: 'Salário', data_inicial_transacao: new Date(), duracao: -1,
        id_categoria: 0, id_modelo_cobranca: 0, id_pessoa: pessoa.id_pessoa, modelo_cobranca: 'mensal', valor: 0
    } as Credito);

    const [newPessoa, setNewPessoa] = React.useState(pessoa);

    function handleEditName(event: React.ChangeEvent<HTMLInputElement>) {
        if (isNewPessoa) {
            setNewPessoa((pessoa: Pessoa) => {
                const newPessoa = { ...pessoa };
                newPessoa.name = event.target.value;
                return newPessoa;
            })
        }
        else {
            setUserData((userData: UserData) => {
                const newUserData = { ...userData };
                const newPessoa = newUserData.pessoas.find((val: Pessoa) => val.id_pessoa === pessoa.id_pessoa);
                if (newPessoa) {
                    newPessoa.name = event.target.value;
                }
                return newUserData;
            })
        }
    }

    function handleEnter(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === 'Enter') {
            setEditName((x) => !x);
            if (isNewPessoa) {
                createPessoa(newPessoa).then((res) => {
                    setUserData((userData: UserData) => {
                        const newUserData = { ...userData };
                        newPessoa.id_pessoa = res.id_pessoa;
                        newUserData.pessoas.push(newPessoa);
                        setAddingPessoa(false);
                        return newUserData;
                    })
                });
            } else {
                editPessoa(pessoa.name, pessoa.id_pessoa)
            }

        }
    }

    function blurInput(event: React.FocusEvent<HTMLInputElement>) {
        setEditName((x) => !x);
        editPessoa(pessoa.name, pessoa.id_pessoa)
    }

    function handleAddCard() {
        setUserData((userData: UserData) => {
            const newUserData = { ...userData };
            const newPessoa = newUserData.pessoas.find((val: Pessoa) => val.id_pessoa === pessoa.id_pessoa);
            if (newPessoa) {
                newPessoa.cartoes.push(newCard);
            }
            return newUserData;
        })
        createCard(newCard);
        setAddCard(false);
        setNewCard({ id_cartao: 0, nome: '', prim_digitos: '', vencimento: 0, id_pessoa: pessoa.id_pessoa } as Cartao);
    }

    function handleAddSalario() {
        setUserData((userData: UserData) => {
            const newUserData = { ...userData };
            const newPessoa = newUserData.pessoas.find((val: Pessoa) => val.id_pessoa === pessoa.id_pessoa);
            if (newPessoa) {
                newPessoa.creditos.push(newSalario);
            }
            return newUserData;
        })
        createCredito(newSalario);
        setAddSalario(false);
        setNewSalario({
            id_transacao: 0, categoria: 'Salário', data_inicial_transacao: new Date(), duracao: -1,
            id_categoria: 0, id_modelo_cobranca: 0, id_pessoa: pessoa.id_pessoa, modelo_cobranca: 'mensal', valor: 0
        } as Credito);
    }



    return (
        <div className='dashboardPeopleCard'> {/* Main Container */}

            <div style={{ 'display': 'flex', 'flexDirection': 'row', 'width': '100%', 'height': '100%' }}>

                <div style={{ 'display': 'flex', 'justifyContent': 'space-around', 'flexDirection': 'column', 'width': '50%' }}> {/* Right side of flex*/}

                    <div style={{ 'display': 'flex', 'gap': '1rem', 'alignItems': 'center' }}> {/* Editable name */}
                        <input type='text' value={isNewPessoa ? newPessoa.name : pessoa.name} className="editableInput" disabled={isNewPessoa? false : !editName }
                            style={{ 'border': editName || isNewPessoa ? '2px solid white' : 'none' }} onChange={handleEditName} onBlur={blurInput} onKeyDown={handleEnter} 
                            autoFocus={isNewPessoa ? true : false}/>
                        <EditIcon cursor={'pointer'} onClick={() => { setEditName((x) => !x) }} />
                    </div>

                    <div> {/* Card list and creation */}
                        <div style={{ 'display': 'flex', 'gap': '1rem', 'alignItems': 'center' }}>
                            <h2>Cartões: </h2>
                            <AddBoxOutlinedIcon onClick={() => setAddCard(true)} cursor={'pointer'} />
                        </div>
                        {pessoa.cartoes.map((cartao: Cartao) => {
                            return (
                                <div key={cartao.id_cartao} style={{ 'display': 'grid', 'gridTemplateColumns': '1fr 1fr 1fr', 'width': '80%' }}>
                                    <h3>{cartao.nome}</h3>
                                    <h3>Numero: {cartao.prim_digitos}</h3>
                                    <h3>Vencimento: {cartao.vencimento.toString().padStart(2, '0')}/XX</h3>
                                </div>
                            )
                        })}
                        {addCard && <div style={{ 'display': 'flex', 'alignItems': 'center', 'gap': '1rem' }}>
                            <div style={{ 'display': 'grid', 'gridTemplateColumns': '1fr 1fr 1fr', 'width': '80%' }}>
                                <input type='text' value={newCard.nome} className='editableInput' onChange={(event) => setNewCard((x) => { return { ...x, nome: event.target.value } })}
                                    style={{ 'border': '2px solid white' }} />
                                <input type='text' value={newCard.prim_digitos} className='editableInput' onChange={(event) => setNewCard((x) => { return { ...x, prim_digitos: event.target.value } })}
                                    style={{ 'border': '2px solid white' }} />
                                <input type='number' value={newCard.vencimento} className='editableInput' onChange={(event) => setNewCard((x) => { return { ...x, vencimento: parseInt(event.target.value) } })}
                                    style={{ 'border': '2px solid white' }} />
                            </div>
                            <CheckOutlinedIcon cursor={'pointer'} onClick={handleAddCard} />
                            <ClearOutlinedIcon cursor={'pointer'} onClick={() => { setAddCard((x) => !x) }} />
                        </div>}
                    </div>

                </div>

                <div style={{ 'width': '50%' }}> {/* Left side of flex */}
                    <div style={{ 'display': 'flex', 'gap': '1rem', 'alignItems': 'center' }}>
                        <h2>Salários: </h2>
                        <AddBoxOutlinedIcon onClick={() => setAddSalario(true)} cursor={'pointer'} />
                    </div>
                    {pessoa.creditos.map((credito: Credito) => {
                        return (
                            <div key={credito.id_transacao} style={{ 'display': 'grid', 'gridTemplateColumns': '1fr 1fr 1fr', 'width': '80%' }}>
                                <h3>R${credito.valor}</h3>
                                <h3>Intervalo: {credito.modelo_cobranca.toUpperCase()}</h3>
                                <h3>Recebimento: {new Date(credito.data_inicial_transacao).getDate().toString().padStart(2, '0')}/XX</h3>
                            </div>
                        )
                    })}
                    {addSalario && <div style={{ 'display': 'flex', 'alignItems': 'center', 'gap': '1rem' }}>
                        <div style={{ 'display': 'grid', 'gridTemplateColumns': '1fr 1fr 1fr', 'width': '80%' }}>
                            <input type='number' value={newSalario.valor} className='editableInput' onChange={(event) => setNewSalario((x) => { return { ...x, valor: parseInt(event.target.value) } })}
                                style={{ 'border': '2px solid white' }} />
                            <select value={newSalario.id_modelo_cobranca} className='editableInput' onChange={(event) => setNewSalario((x) => { return { ...x, id_modelo_cobranca: parseInt(event.target.value) } })}
                                style={{ 'border': '2px solid white' }}>
                                {modelosCobranca.map((modelo: any, index) => {
                                    return (
                                        <option value={index} style={{ 'backgroundColor': '#2F58CD' }}>{modelo}</option>
                                    )
                                })}
                            </select>
                            <input type='date' value={newSalario.data_inicial_transacao.toISOString().split('T')[0]} className='editableInput' onChange={(event) => setNewSalario((x) => { return { ...x, data_inicial_transacao: new Date(event.target.value) } })}
                                style={{ 'border': '2px solid white' }} />
                        </div>
                        <CheckOutlinedIcon cursor={'pointer'} onClick={handleAddSalario} />
                        <ClearOutlinedIcon cursor={'pointer'} onClick={() => { setAddSalario((x) => !x) }} />
                    </div>}
                </div>
            </div>
        </div>

    )

}