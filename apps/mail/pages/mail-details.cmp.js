import { eventBus } from '../../../services/event-bus.service.js'
import { mailService } from '../../mail/services/mail.service.js'
export default {
    template: `
      <section v-if="mail" class="mail-details">
          <router-link to="/mail"><i class="fa-solid fa-arrow-left"></i></router-link>
          <button v-if="!mail.trashed" @click="trashMail" class="delete-mail-btn" title='Trash'><i class="fa-solid fa-trash"></i></button>
          <span v-else class="trash-btns">
              <button @click="untrashMail" title="Untrash"><i class="fa-solid fa-ban"></i></button>
              <button @click="deleteMail" title="Delete Permanently"><i class="fa-solid fa-file-excel"></i></button>
            </span>
            <router-link :to="'list/send/' + mail.id" title="Reply"><i class="fa-solid fa-reply"></i></router-link>
            <button @click="labelMail" title="Label" class="label-btn"><i class="fa-solid fa-tag"></i></button>
            <!-- <hr /> -->
            <!-- <h1>Detals</h1> -->
            <!-- <pre>{{ mail }}</pre> -->
            <div className="mail-content">
                <h2 class="subject">{{ mail.subject }}</h2>
                <div className="sender-details">
                    <img class="profile-img" src="https://lh3.googleusercontent.com/a/default-user=s40-p" alt="" />
                    <p class="sender-name">{{ mail.name }}</p>
                    <p class="from"><{{ mail.from }}></p>
                    <p>{{ formatDate }}</p>
                </div>
                <div className="sender-content">
                    <p>{{ mail.body }}</p>
                </div>
            </div>
            <!-- <h2>{{ car.vendor }}</h2>
            <h3>{{ car.maxSpeed }}</h3>
            <img :src="imgUrl" alt="" @error="imgValid=false" /> -->
            <!-- <button @click="$emit('close')">Close</button> -->
            
            <!-- <hr /> -->
            <!-- <router-link to="/car">Back</router-link> -->
        </section>
        <h3 v-else>Loading...</h3>
    `,
    data(){
        return {
            mail: null,
        }
    },
    created() {
        this.loadMail()
    },
    methods: {
        loadMail() {
            mailService.get(this.mailId)
                .then(mail => {
                    this.mail = mail
                    // console.log(mail);
                })
        },

        labelMail(){
            eventBus.emit('showChooseLabelModal', this.mail)
            eventBus.emit('showScreen')
        }, 

        trashMail(){
            
            mailService.get(this.mail.id)
            .then(mail => {
                console.log(mail);      
                this.mail.trashed = true
                this.$emit('trashed', mail)
            }) 
        },
        untrashMail(){
            mailService.get(this.mail.id)
            .then(mail => {
                this.mail.trashed = false
                this.$emit('untrashed', mail)
            }) 
        },

        deleteMail(){
            this.$emit('deleted', this.mail.id)

            // mailService.remove(this.mail.id)
            //     .then(mail => {
                    
            //         this.$router.push('/mail')
            //     })
        }
    },
    computed: {
        mailId() {
            return this.$route.params.id
        },
        formatDate(){
            return new Date(this.mail.sentAt).toDateString()
        },
    },

    watch: {
        mail:{
            handler(){
                this.loadMail()
            }
        }
    }
}