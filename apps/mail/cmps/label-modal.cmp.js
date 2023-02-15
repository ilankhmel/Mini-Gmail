import { mailService } from "../services/mail.service.js"
import { eventBus } from "../../../services/event-bus.service.js"
export default {
    template: `
        <div class="label-modal" :class="modalStyle">
                <h1>New Label</h1>
                <label>New label name:</label>
                <input v-model="labelName" type="text" />
                <div className="add-modal-btns">

                    <button class="accept" @click="addLabel">Accept</button>
                    <button @click="closeModal">Cancel</button>
                </div>
                <!-- <pre>{{labelName}}</pre> -->
        </div>
    `,

    data(){
        return{
            labelName: '',
        }
    },
    methods:{
        addLabel(){
            if(this.labelName){
                mailService.addLabel(this.labelName)
                eventBus.emit('refreshLabels')
                // eventBus.emit('refresh')
                eventBus.emit('refreshLabelOptions')
            }
            eventBus.emit('closeAddLabelModal')
            eventBus.emit('closeScreen')
            this.labelName = ''
        },

        closeModal(){
            eventBus.emit('closeAddLabelModal')
            eventBus.emit('closeScreen')
        }
    }
}