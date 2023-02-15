import { mailService } from "../services/mail.service.js"
import { eventBus } from "../../../services/event-bus.service.js"
export default {
    template: `
        <div className="compose-screen">
                <header>
                    <h4>New Messege</h4>
                    <router-link to="/mail/list/">x</router-link>
                </header>
                <label>
                    To:
                    <input v-model="msg.to" type="text" />
                </label>
                <label>
                    Subject:
                    <input v-model="msg.subject" type="text" />
                </label>
                <input v-model="msg.body" type="textarea" />
                <footer>
                    <button @click="sendMsg" class="send-compose-btn">Send</button>
                </footer>
                <!-- <pre>{{msg}}</pre> -->
        </div>
    `,

    data(){
        return {
            msg:{
                from:'',
                name:'',
                to:'',
                subject: '',
                body: '',
            },
        }
    },

    created(){
        if(this.mailId()){
            mailService.get(this.mailId())
                .then(mail =>  this.msg.to = mail.from)
            
        }
    },

    methods: {
        sendMsg(){
            eventBus.emit('msgSent')
            var details = mailService.getUserDetails()
            // .then(details => {
                this.msg.from = details.email
                this.msg.name = details.fullname
                const msg = mailService.getNewMail(this.msg)
                mailService.save(msg)
                    .then(msg =>{
                         eventBus.emit('msgSent')
                        this.$router.push('/mail/list')
                        })
                // })
            
        },

        mailId() {
            return this.$route.params.id
        }
    },
    
    computed: {
        
    }
}