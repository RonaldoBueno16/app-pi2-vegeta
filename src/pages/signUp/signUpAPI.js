import api from '../../services/api';

export async function SubscriptionNewUser(nome, sobrenome, sexo, data_nasc, cep, rua, bairro, cidade, uf, login, senha) {
    var sucess;
    
    var data = await api.post('/user/subscription', {
        event: "subscription",
        nome: nome,
        sobrenome: sobrenome,
        sexo: sexo,
        data_nasc: data_nasc,
        cep: parseInt(cep),
        bairro: bairro,
        rua: rua,
        cidade: cidade,
        UF: uf,
        login: login,
        senha: senha
    }).then((response) => {
        sucess = response.data;
    })
    .catch((err) => {
        console.log("Ocorreu um erro ao inserir o usuário. " + err);
        sucess = err.response.data;
    })
    return sucess;
}