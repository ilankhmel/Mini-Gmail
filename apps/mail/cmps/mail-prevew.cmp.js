import { eventBus } from "../../../services/event-bus.service.js"
export default {
    props:['mail'],
    template: `
    <!-- <div className="mobile-flex"> -->
        <!-- <img :style="isMobile" class="profile-img" src="https://lh3.googleusercontent.com/a/default-user=s40-p" alt="" /> -->
        <article class="mail-preview"  @click="mailOpened" :style="prevStyle">
            <!-- <pre>{{ mail }}</pre> -->
            <span @click.stop.prevent="starMail" :style="starStyle" ><i class="fa-solid fa-star"></i></span>
            <span @click.stop.prevent="toggleRead"><i :class="envelopeType"></i></i></span>
            <h2 :style="txtStyle">{{ mail.name }}</h2>
            <!-- <p class="subject">{{ mail.subject }}</p> -->
            <p class="body" :style="txtStyle">{{ formatBody }}</p>
            <p class="date" :style="txtStyle">{{ formatDate }}</p>
        </article>
    <!-- </div> -->
    `,
    data(){
       return{
         isStarred: false,
        } 
    },

    computed:{
        formatBody(){
            return this.mail.body.slice(0, 50)
        },
        prevStyle(){
            return (this.mail.isRead) ? {backgroundColor: '#EAF1FB'} : {backgroundColor: 'white'}
        },
      
        formatDate(){
            return new Date(this.mail.sentAt).toDateString().slice(3, 10)
        },

        starStyle(){
            return (this.mail.isStarred) ? {color: 'orange'} : {color: '#726d6d'}
        },

        envelopeType(){
           return (this.mail.isRead) ? "fa-solid fa-envelope-open" : "fa-solid fa-envelope"
        },

        txtStyle(){
            return (this.mail.isRead) ? {fontWeight: 200} : {fontWeight: 600}
        },

        // isMobile(){
        //     return (window.innerWidth < 700) ? {display: 'block'} : {display: 'none'}
        // }
    
    },
    methods: {
        starMail(){
            // this.isStarred = !this.isStarred
            this.mail.isStarred = !this.mail.isStarred
            eventBus.emit('saveRefresh', this.mail)

        },

        toggleRead(){
            this.mail.isRead = !this.mail.isRead
            eventBus.emit('saveRefresh')
        }
    },

    
}