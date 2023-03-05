import Credito from "../model/credito";


export async function createCredito(credito : Credito) {
    const response = await fetch(`http://localhost:3001/createCredito`, {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(credito)});
    return await response.json();
}