import Cartao from "../model/cartao";

export async function createCard(cartao : Cartao) {
    const response = await fetch(`http://localhost:3001/createCard`, {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(cartao)});
    console.log(response);
}

export async function updateCard(cartao : Cartao) {
    const response = await fetch(`http://localhost:3001/updateCard`, {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(cartao)});
    console.log(response);
}