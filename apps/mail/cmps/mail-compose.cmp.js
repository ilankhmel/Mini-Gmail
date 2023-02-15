import composeScreen from './compose-screen.cmp.js'
import { eventBus } from '../../../services/event-bus.service.js'
export default {
    template: `
        <section class="compose-cmp" @click="closeMenu">
            <router-link to="/mail/list/send/" class="compose-btn"><i class="fa-solid fa-pen fa-fw" ></i> Compose</router-link>
            <!-- <compose-screen></compose-screen> -->
            <!-- <router-view></router-view> -->
        </section>
        
        `,
    methods:{
        closeMenu(){
            eventBus.emit('closeMenu')
            eventBus.emit('closeScreen')
        }
    },

    components: {
        composeScreen,
    }
}