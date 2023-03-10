import React from 'react'
import ReactDOM from 'react-dom/client'
import DashboardComponent from './components/dashboard_components/dashboard_component';
import LoginComponent from './components/loginComponents/login_component'

export default function App() {
    const [logedin, setlogedin] = React.useState(false);
    const [userData, setUserData] = React.useState({name: "", password: "", id_perfil: 0, pessoas: []});


    return (
        <div className="mainContainer">
            {logedin ?  <DashboardComponent userData={userData} setUserData={setUserData} setlogedin={setlogedin}/> :  
            <LoginComponent setlogedin={setlogedin} setUserData={setUserData}/>}
        </div>
    )
}



