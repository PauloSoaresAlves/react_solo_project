import React from 'react';
import UserData from '../../model/userData';

export default function DashboardPeople({ userData }: { userData: UserData }) {
    {console.log(userData)}
    return (
        <div className='dashboardPeople'>
            <h1>DashboardPeople</h1>
        </div>
    )



}