import React from 'react';
import UserData from '../../model/userData';

export default function DashboardCard({ userData }: { userData: UserData }) {
    return (
        <div className='dashboardMain'>
            <h1>DashboardCard</h1>
            <h2>{userData.name}</h2>
        </div>
    )



}