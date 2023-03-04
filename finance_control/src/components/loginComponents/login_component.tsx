import React, { useEffect } from "react";
import {getPerfil,login,createPerfil} from "../../dao/perfil.dao";
import LoginForm from "./login_form";
import RegisterForm from "./register_form";

export default  function LoginComponent({setlogedin,setUserData} : any) {
    const [formState, setFormState] = React.useState({login: "", password: "", confirmPassword: "", userName:"",remember: false });
    const [register, setRegister] = React.useState(false);


    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value,type,checked } = event.target
        setFormState({ ...formState, [name]: type === "checkbox" ? checked : value })
    }

    async function handleSubmit(event : React.FormEvent<HTMLButtonElement>) {
        event.preventDefault();
        if(register){
            let result = await createPerfil(formState.login,formState.password,formState.userName);
            if(result) console.log("Perfil criado com sucesso!");
            setRegister(x=>!x);

        }else {
            let result = await login(formState.login,formState.password);
            if(result) {
                setUserData(result);
                setlogedin(true);
            }
            else console.log("Login falhou!");
        }
        
        

    }

    return (
        <main className="loginPage">
            {register ? <RegisterForm formState={formState} handleInputChange = {handleInputChange} handleSubmit = {handleSubmit} />
            : <LoginForm formState={formState} setRegister={setRegister} handleInputChange = {handleInputChange} handleSubmit = {handleSubmit} />} 
        </main>
    );
}
