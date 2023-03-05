import React from 'react';
import Pessoa from '../../model/pessoa';
import UserData from '../../model/userData';
import DashboardPeopleCard from './dashboard_people_card';

export default function DashboardPeople({ userData, setUserData }: { userData: UserData, setUserData: any }) {
    const [addingPessoa, setAddingPessoa] = React.useState(false);

    return (
        <div className='dashboardPeople'>
            {userData.pessoas.map((pessoa: Pessoa) => {
                return (
                    <DashboardPeopleCard pessoa={pessoa} setUserData={setUserData} key={pessoa.id_pessoa}/>
                )
            })}
            {addingPessoa && <DashboardPeopleCard isNewPessoa={true} setAddingPessoa={setAddingPessoa} pessoa={new Pessoa(-1,'',userData.id_perfil,[],[])} setUserData={setUserData}/>}
            <div className="addPessoaButton" onClick={()=>{setAddingPessoa(true)}}>
                <h1>+</h1>
            </div>
        </div>
    )



}