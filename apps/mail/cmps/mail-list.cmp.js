import mailPreview from './mail-prevew.cmp.js'
import mailFilter from './mail-filter.cmp.js'
export default {
    props:['mails'],
    template: `
        <section class="mail-list">
            <mail-filter></mail-filter>
            <ul>
                <li v-for="mail in mails" :key="mail.id">
                    <router-link :to="'/mail/' + mail.id" @click="mailOpened(mail)">
                        <!-- <button @click="log(mails)"></button> -->
                        <mail-preview :mail="mail"/>
                        <section class="actions">
                            <!-- <button @click="showDetails(car)">Details</button> -->
                        
                            <!-- <router-link :to="'/car/edit/' + car.id">Edit</router-link> | -->
                            <!-- <button @click="remove(car.id)">x</button> -->
                        </section>
                    <!-- </router-link>  -->
                </li>
            </ul>
            
            <!-- <router-view /> -->
            <!-- <router-link to="/mail/trash">Trash</router-link> -->
        </section>

            <!-- <compose-screen></compose-screen> -->
            <router-view></router-view>
            `,
    
   
    components: {
        mailPreview,
        mailFilter
    },


    methods: {
        // log(mails){
        //     console.log(mails);
        // }
        mailOpened(mail){
            mail.isRead = true
            this.$emit('opened', mail.id)
        }
    }
}
