import React, { useEffect } from "react";

export default function LoginForm({formState,setRegister,handleInputChange,handleSubmit} : any) {
    return (<div className="loginFormContainer">
        <h1>Faça seu Login!</h1>
        <form className="loginForm">
            <div className="inputContainer">
                <label htmlFor="login">Login</label>
                <input type="text" id="login" name="login" value={formState.login} onChange={handleInputChange} />
            </div>
            <div className="inputContainer">
                <label htmlFor="password">Senha</label>
                <input type="password" id="password" name="password" value={formState.password} onChange={handleInputChange} />
            </div>
            <div className="checkboxContainer">
                <label htmlFor="remember">Se lembra de mim?</label>
                <input type="checkbox" id="remember" name="remember" checked={formState.remember} onChange={handleInputChange} />
            </div>
            <small>Não possui uma conta? <span><a onClick={() => { setRegister((x: boolean) => !x) }}>Clique Aqui!</a></span></small>
            <button onClick={handleSubmit}>Login</button>
        </form>
    </div>)
}