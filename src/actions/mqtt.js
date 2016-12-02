import { MQTT_CONNECT_CMD, MQTT_DISCONNECT_CMD, MQTT_SEND_CMD } from './types.js';


export function mqttConnect() {
    console.log("returning connect action type")
    return {
        type: MQTT_CONNECT_CMD
    }
}

export function mqttDisconnect() {
    console.log("returning disconnect action type")
    return {
        type: MQTT_DISCONNECT_CMD
    }
}

export function mqttIncoming(topic, message) {
    // Remove /nodes/serialnumber/ from topic
    // and then dispatch action
    const serial = topic.split('/')[1];
    var subtopic = topic.substring(topic.indexOf("/") + 1);
    var subtopic = subtopic.substring(subtopic.indexOf("/") + 1);
    // console.log(subtopic);
    // console.log(message);
  return { type: subtopic, payload: {message, serial} };
}


export function mqttSend(topic, message) {
  return { type: MQTT_SEND_CMD, topic, message};
}