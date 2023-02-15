import mailCompose from './mail-compose.cmp.js'
import { mailService } from '../services/mail.service.js'
import { eventBus } from '../../../services/event-bus.service.js'
export default {
    props: ['mails'],
    template: `
    <article class="folder-filter" :class="hamburgerClass">
        
        <img @click="$router.push('/mail')" class="logo" src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Gmail2020.logo.png" alt="" />
        <mail-compose></mail-compose>
        <div className="inbox-btn">
            <button ref="inbox" @click="setFolder('inbox')" :class="{ 'clicked-folder' : btnClicked === 'inbox'}"><i class="fa-solid fa-inbox fa-fw"></i> Inbox</button>
            <!-- <span>{{ mails.length }}</span> -->
        </div>
        <button @click="setFolder('trash')" :class="{ 'clicked-folder' : btnClicked === 'trash'}"><i class="fa-solid fa-trash fa-fw "></i> Trash</button>
        <!-- <button @click="setFolder('draft')" :class="{ 'clicked-folder' : btnClicked === 'draft'}"><i class="fa-solid fa-ruler fa-fw"></i> Draft</button> -->
        <button @click="setFolder('sent')" :class="{ 'clicked-folder' : btnClicked === 'sent'}"><i class="fa-solid fa-paper-plane fa-fw"></i> Sent</button>
        <button @click="setFolder('star')" :class="{ 'clicked-folder' : btnClicked === 'star'}"><i class="fa-solid fa-star fa-fw" style="color:#726d6d"></i> Starred</button>
        <div className="label-adder">
            <label>Labels
            </label>
            <div @click="showLabelModal" class="new-label-btn">+</div>
        </div>
            <ul>
                <div v-if="labels" v-for="label in labels">    
                    <button class="label-btn" @click="updateLabelFilter(label.name)" :class="{ 'clicked-folder' : btnClicked === label.name}">
                        <div className="label-btn-flex">
                            <div><i class="fa-solid fa-tag fa-fw"></i> {{ label.name }}</div>
                            <div @click.stop="removeLabel(label.name)" class="remove-label-btn">x</div>
                        </div>
                    </button>
                </div>
            </ul>
           
    </article>
    `,
    data() {
        return {
            folder: 'inbox',
            isShown: false,
            btnClicked: "inbox",
            labels: '',
        }
    },

    created() {
        // this.labels = mailService.getLabels()
        //     .then((res)=> this.labels = res)
        this.loadLabels()
        eventBus.on('openScreens', this.openScreens)
        eventBus.on('closeMenu', this.closeMenu)
        eventBus.on('refreshLabels', this.loadLabels)
    },

    methods: {
        removeLabel(name){
            mailService.removeLabel(name)
                .then((label)=>{
                    this.loadLabels()
                    eventBus.emit('refresh')
                })
        },
        updateLabelFilter(name){
            this.$emit('setfolder', '')
            console.log(name);
            eventBus.emit('updateLabelFilter', name)
            this.$router.push('/mail')
            this.btnClicked = name
            console.log(this.btnClicked);
            this.isShown = false
            eventBus.emit('closeScreen')
        },
        loadLabels(){
            this.labels = mailService.getLabels()
            .then((res)=> this.labels = res)
        },
        openScreens() {
            this.isShown = true
            eventBus.emit('showScreen', this.isShown)
            // console.log(this.isShown);
        },

        closeMenu() {
            this.isShown = false
        },

        setFolder(str) {
            eventBus.emit('updateLabelFilter', '')
            this.folder = str
            console.log(this.folder);
            this.$emit('setfolder', this.folder)
            this.isShown = false
            eventBus.emit('closeScreen')
            this.$router.push('/mail')
            this.btnClicked = str
        },
        showLabelModal(){
            eventBus.emit('showScreen')
            eventBus.emit('showModal')
        },
    },
    computed: {
        hamburgerClass() {
            return (this.isShown) ? 'shown' : ''
        },

    
    },

    components: {
        mailCompose,
      
    }

}