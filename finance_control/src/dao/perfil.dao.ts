


export async function getPerfil(id: number) {
    const response = await fetch(`http://localhost:3001/getPerfilbyID`, {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({id: id})});
    return await response.json();
}

export async function login(login: string, senha: string) {
    const response = await fetch(`http://localhost:3001/login`, {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({login: login, senha: senha})});
    return await response.json();
}


export async function createPerfil(login:string, senha: string, nome: string) {
    const response = await fetch(`http://localhost:3001/createPerfil`, {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({login: login, password: senha, name: nome})});
    return await response.json();
}

