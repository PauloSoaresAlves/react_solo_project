import Credito from "../model/credito";
import Despesa from "../model/despesa";


export async function createCredito(credito : Credito) {
    const response = await fetch(`http://localhost:3001/createCredito`, {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(credito)});
    return await response.json();
}

export async function createDebito(despesa : Despesa) {
    const response = await fetch(`http://localhost:3001/createDebito`, {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(despesa)});
    return await response.json();
}