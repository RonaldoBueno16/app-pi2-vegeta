import api from '../../services/api';

export async function AuthUser(username, password) {
    var response;

    var request = await api.get('/user/auth', {
        params: {"event": "auth","login": username,"senha": password}
    }).then((data) => {
        response = data.data;
    }).catch((err) => {
        console.log("Usuário não encontrado. " + err);

        response = err.response.data;
        
    })

    return response;
}