import { mailService } from "../services/mail.service.js"
import { eventBus } from "../../../services/event-bus.service.js"
export default {
    props:['mail'],
    template: `
        <div>
                <h1>Choose Label</h1>
                <p>Label Chosen: {{ chosenLabel }}</p>
                <select @click="setLabel" >
                    <option v-if="labels"  v-for="label in labels" :key="label.name" @input="set"> 
                            {{ label.name }}               
                    </option> 
                </select>
                <button @click="setMail" class="accept">OK</button>
        </div>
    `,

    data(){
        return{
            labels: '',
            chosenLabel: '',
        }
    },
    created(){
        eventBus.on('refreshLabelOptions', this.getLabelOptions)
        this.getLabelOptions()
    },
    methods:{
        getLabelOptions(){
            mailService.getLabels()
            .then((labels) => this.labels = labels)
        },
        setLabel(ev){
            console.log(this.labels);
            var value = ev.target.options[ev.target.options.selectedIndex].text
            this.chosenLabel = value
            // this.mail.label = value
            // console.log(this.mail);
            // mailService.save(this.mail)
            //     .then((res) => eventBus.emit('refresh'))
            // eventBus.emit('saveRefresh')
        },
        setMail(){
            this.mail.label = this.chosenLabel
            console.log(this.mail);
            mailService.save(this.mail)
                .then((res) => {
                    eventBus.emit('refresh')
                    eventBus.emit('closeScreen')
                    eventBus.emit('closeChooseLabelModal')
                })
            }
    }
    // methods:{
    //     addLabel(){
    //         mailService.addLabel(this.labelName)
    //         eventBus.emit('refreshLabels')
    //     }
    // }
}