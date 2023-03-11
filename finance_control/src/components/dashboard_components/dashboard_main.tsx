import React from 'react';
import UserData from '../../model/userData';

export default function DashboardMain({ userData }: { userData: UserData }) {
    return (
        <div className='dashboardMain'>
            <h1>DashboardMain</h1>
            <h2>{userData.name}</h2>
        </div>
    )



}