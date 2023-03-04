import React, { useEffect } from "react";

export default function LoginForm({formState,handleInputChange,handleSubmit} : any) {
    return (
        <div className="loginFormContainer">
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
    )
}