import Credito from "../model/credito";


export async function getCategorias(id_perfil:number) {
    const response = await fetch(`http://localhost:3001/getCategoria`, {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({id_perfil: id_perfil})});
    return await response.json();
}