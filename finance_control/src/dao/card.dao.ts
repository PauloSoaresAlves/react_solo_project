import Cartao from "../model/cartao";

export async function createCard(cartao : Cartao) {
    const response = await fetch(`http://localhost:3001/createCard`, {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(cartao)});
    return await response.json();
}