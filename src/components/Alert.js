import React from "react";
import { Alert } from "react-native";

const showAlert = function(title, alertmessage) {
    Alert.alert(
        title,
        alertmessage,
        [
            {
                text: "Fechar",
                style: "cancel",
            },
        ]
    );
}

export default showAlert;