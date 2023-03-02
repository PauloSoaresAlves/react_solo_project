import React, { useEffect } from "react";
import {getPerfil,login,createPerfil} from "../dao/perfil.dao";

export default  function LoginComponent() {
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
            let result : [] = await login(formState.login,formState.password);
            if(result.length > 0) console.log("Login realizado com sucesso!");
            else console.log("Login falhou!");
        }
        
        

    }

    return (
        <main className="loginPage">
            {!register && <div className="loginFormContainer"> 
                <h1>Faça seu Login!</h1>
                <form className="loginForm">
                    <div className="inputContainer">
                    <label htmlFor="login">Login</label>
                    <input type="text" id="login" name="login" value={formState.login} onChange={handleInputChange}/>
                    </div>
                    <div className="inputContainer">
                    <label htmlFor="password">Senha</label>
                    <input type="password" id="password" name="password" value={formState.password} onChange={handleInputChange}/>
                    </div>
                    <div className="checkboxContainer">
                    <label htmlFor="remember">Se lembra de mim?</label>
                    <input type="checkbox" id="remember" name="remember" checked={formState.remember} onChange={handleInputChange}/>
                    </div>
                    <small>Não possui uma conta? <span><a onClick={()=>{setRegister(x=>!x)}}>Clique Aqui!</a></span></small>
                    <button onClick={handleSubmit}>Login</button>
                </form>
            </div>}
            {register && <div className="loginFormContainer">
                <h1>Cadastre-se!</h1>
                <form className="loginForm">
                <div className="inputContainer">
                    <label htmlFor="login">Login</label>
                    <input type="text" id="login" name="login" value={formState.login} onChange={handleInputChange}/>
                    </div>
                    <div className="inputContainer">
                    <label htmlFor="password">Senha</label>
                    <input type="password" id="password" name="password" value={formState.password} onChange={handleInputChange}/>
                    </div>
                    <div className="inputContainer">
                    <label htmlFor="confirmPassword">Confirmar a senha</label>
                    <input type="password" id="confirmPassword" name="confirmPassword" value={formState.confirmPassword} onChange={handleInputChange}/>
                    </div>
                    <div className="inputContainer">
                    <label htmlFor="userName">Nome do usuário</label>
                    <input type="text" id="userName" name="userName" value={formState.userName} onChange={handleInputChange}/>
                    </div>
                    <button onClick={handleSubmit}>Registrar</button>

                </form>
            </div>
            }   
        </main>
    );
}
