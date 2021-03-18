import { createApp } from "vue";
import Message  from "../components/Message.vue";

const createMessage = (message: string, type: string, time: number) => {
    const GloMessage = createApp(Message, {
        message: {
            message: message,
        type: type,
        status: true
        }
    })
    const oMessage = document.createElement('div')
    oMessage.id = 'global-message'
    document.body.appendChild(oMessage)
    GloMessage.mount('#global-message')

    setTimeout(() => {
        document.body.removeChild(oMessage)
    }, time)
}

export default createMessage