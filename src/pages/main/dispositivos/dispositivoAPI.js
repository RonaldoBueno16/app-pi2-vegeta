import api from "../../../services/api";

export async function DesvincularESP(userid, esp_id) {
    var response;

    var request = await api.delete(`/user/esp/desvincular/?user_id=${userid}&esp_index=${esp_id}`).then((data) => {
        response = data.data;
    }).catch((err) => {
        console.log("Falha ao desvincular o ESP. " + err);
        response = err.response.data;
    })

    return response;
}