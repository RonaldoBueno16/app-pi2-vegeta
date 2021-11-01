import api from '../../../services/api';

export async function BindESP(USER_ID, ESP_KEY, latitude, longitude) {
    var response;
    var request = await api.post(`/user/esp/vincular?user_id=${USER_ID}&esp_key=${ESP_KEY}&latitude=${latitude}&longitude=${longitude}`).then((data) => {
        response = data.data;
    }).catch((err) => {
        response = err.response.data;
    })

    return response;
}

export async function LoadUserEsp(USER_ID) {
    var response;

    var request = await api.get(`/user/esp/getall/${USER_ID}`).then((data) => {
        response = data.data;
    }).catch((err) => {
        response = err.response.data
    })

    return response;
}

export async function LoadRegESP(USER_ID, espid) {
    var response;
    
    var request = await api.get(`/user/esp/get/regallday?user_id=${USER_ID}&esp_index=${espid}`).then((data) => {
        response = data.data;
    }).catch((err) => {
        response = err.response.data
    })
    
    return response;
}

///user/esp/get/day?user_id=5&esp_index=5&day=06&month=10&year=2021

export async function LoadRegDayESP(USER_ID, espid, day, month, year) {

}