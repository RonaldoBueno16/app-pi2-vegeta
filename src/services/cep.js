import axios from "axios";

const api = axios.create({
    baseURL: 'https://viacep.com.br/ws/'
});

export default async function GetCep(cep) {
    let valor;
    var data = await api.get(cep+"/json/").then((response) => {
        valor = response.data;
    });
    return valor;
}