import Pessoa from "../model/pessoa";

export async function createPessoa(pessoa: Pessoa) {
    const response = await fetch(`http://localhost:3001/createPessoa`, {method: 'POST', headers: {'Content-Type': 'application/json'}, 
    body: JSON.stringify(pessoa)});
    return await response.json();
}

export async function editPessoa(name:string, id_pessoa:number) {
    const response = await fetch(`http://localhost:3001/editPessoa`, {method: 'POST', headers: {'Content-Type': 'application/json'}, 
    body: JSON.stringify({name: name, id_pessoa: id_pessoa})});
    return await response.json();
}