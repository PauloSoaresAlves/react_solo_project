import React from 'react';
import UserData from '../../../model/userData';
import "./dashboard_card.css";
import DashboardCardInfo from './dashboard_card_info';

export default function DashboardCard({ userData,setUserData }: { userData: UserData,setUserData: any }) {
    return (
        <div className='dashboardCard'>
            {userData.pessoas.map((pessoa) => {
                
                return <DashboardCardInfo pessoa={pessoa}  key={pessoa.id_pessoa} setUserData={setUserData}/>
            })}
        </div>
    )



}