import { mailService } from "../services/mail.service.js";
import { eventBus } from "../../../services/event-bus.service.js";
import mailFilter from '../cmps/mail-filter.cmp.js'
import folderFilter from '../cmps/folder.filter.cmp.js'
import mailList from '../cmps/mail-list.cmp.js'
import labelModal from '../cmps/label-modal.cmp.js'
import chooseLabelModal from '../cmps/choose-label.cmp.js'

export default {
  template: `
      <section class="mail-app">
        <!-- <h1>MailApp</h1> -->
        <!-- <mail-filter @filter="setFilter"></mail-filter> -->
        <div class="mail-flex">
          <folder-filter :mails="mails" @setfolder="setFolder"></folder-filter>
          <!-- <mail-list @opened="markRead" :mails="mailsToShow"  /> -->
          <router-view @opened="markRead" @trashed="trashMail" @untrashed="untrashMail" @deleted="deleteMail" :mails="mailsToShow"/>
        </div>
        <!-- <div class="label-modal" :class="modalStyle">
                <h1>New Label</h1>
                <label>New labels's name"</label>
                <input type="text" />
                <button>Accept</button>
                <button>Cancel</button>
        </div> -->
        <label-modal class="label-modal" :class="modalStyle" />
        <choose-label-modal class="label-modal" :class="chooseModalStyle" :mail="chosenMail" />
        <!-- <router-link v-if="mails" to="/mail/inbox" @opened="markRead" :mails="mailsToShow">Inbox</router-link> -->
        <!-- <router-view></router-view> -->
        <div :class="screenStyle" class="main-screen" @click="closeScreens"></div>
      </section>
    `,

    data(){
      return {
        mails: null,
        isChooseLabelModalShown: false,
        chosenMail: '',
        filterBy: {
          name: '',
          isRead: '',
          folder: 'inbox',
          sort: "",
          label: "",
        },
        isShown: false,
        isScreenShown: false,
        isModalShown: false,
      }
    },

    created(){
        // mailService.query()
        //   .then(mails => {
        //     console.log(mails);
        //     this.mails = mails
        //     }).then(console.log(this.mails))
        this.loadMails()


        eventBus.on('updateLabelFilter', this.setLabel)
        eventBus.on('refresh', this.loadMails)
        eventBus.on('closeChooseLabelModal', this.closeChooseLabelModal)
        eventBus.on('showChooseLabelModal', this.showChooseLabelModal)
        eventBus.on('showModal', this.showModal)
        eventBus.on('closeAddLabelModal', this.closeAddLabelModal)
        eventBus.on('closeScreen', this.closeScreen)
        eventBus.on('showScreen', this.showScreen)
        eventBus.on('filter', this.setFilter)
        eventBus.on('msgSent', this.loadMails)
        eventBus.on('saveRefresh', this.saveAndRefresh)
    },
    methods:{
      showModal(){
        this.isModalShown = true
      },
      closeAddLabelModal(){
        this.isModalShown = false
      },
      showChooseLabelModal(mail){
        this.isChooseLabelModalShown = true
        this.chosenMail = mail
      },
      closeChooseLabelModal(){
        this.isChooseLabelModalShown = false
      },

      closeScreens(){
        this.isScreenShown = false;
        this.isModalShown = false,
        this.isChooseLabelModalShown = false;
        eventBus.emit('closeMenu')
        
      },
      closeScreen(){
        this.isScreenShown = false;
      },
      showScreen(){
          this.isScreenShown = true
      },
      
      saveAndRefresh(mail){
        mailService.save(mail)
          .then(a => {
            this.loadMails()
          }
        )
      },
      trashMail(mail){
        
        mail.trashed = true
        mailService.save(mail)
          .then(mail => {
            this.loadMails()
            this.$router.push('/mail')
          })
      },

      untrashMail(mail){
        mail.trashed = false
        mailService.save(mail)
          .then(mail => {
            this.loadMails()
            this.$router.push('/mail')
          })
      },

      loadMails(){
        mailService.query()
        .then(mails => {
          this.mails = mails
          })
      },

      setLabel(name){
        this.filterBy.label = name
        this.loadMails()
        console.log(this.filterBy.label);
      },

      setFilter(filter){
        this.filterBy.name = filter.name
        this.filterBy.isRead = filter.isRead
        this.filterBy.sort = filter.sort
      },

      markRead(mailId){
        mailService.get(mailId)
          .then(mail => {
            console.log(mail);
            mail.isRead = true
            mailService.save(mail)
            this.isShown = true
          })
      },

      setFolder(folder){
        this.filterBy.folder = folder
        // console.log(t);
      },


      deleteMail(mailId){
        mailService.remove(mailId)
        .then(mail => {
          this.loadMails()
            this.$router.push('/mail')
        })
      }
    },
    computed:{
      chooseModalStyle(){
          return (this.isChooseLabelModalShown) ? 'shownModal' : ''
      },
      modalStyle(){
        return (this.isModalShown) ? 'shownModal' : ''
      },
      screenStyle(){
        return (this.isScreenShown) ? 'shown' : ''
      },
        mailsToShow(){
          console.log(this.filterBy);
          const regex = new RegExp(this.filterBy.name, 'i')
          var mails = this.mails.filter(mail => regex.test(mail.subject))
          if(this.filterBy.isRead !== ''){
          mails = mails.filter(mail => mail.isRead === this.filterBy.isRead)
          }
          if(this.filterBy.folder !== ''){
            switch (this.filterBy.folder) {
              case 'trash':
                mails = mails.filter(mail => mail.trashed === true)
                break;
              case 'inbox':
                // return mailService.getUserDetails()
                //   .then(details => {
                //     console.log(details);
                //     console.log(mails);
                //     return mails = mails.filter(mail => mail.from === details.email)
                //   })

                mails = mails.filter(mail => mail.trashed === false)
                break;
              case 'draft':
                mails = mails.filter(mail => mail.draft === true)
                break;

              case 'star':
                mails = mails.filter(mail => mail.isStarred === true)
                break;

              case 'sent':
                var details = mailService.getUserDetails()
                  // .then(details => {
                    console.log(details);
                    console.log(mails);
                    mails = mails.filter(mail => mail.from === details.email)
                  // })
                break;
            
              default:
                break;
            }
          }
          if(this.filterBy.sort !== ''){
            console.log('isnt');
            console.log(this.filterBy.sort );
            switch (this.filterBy.sort) {
                case 'Subject':
                  mails = mails.sort((a,b)=> {return a.subject - b.subject})
                  break;
                case 'Date':
                  mails = mails.sort((a,b)=> {return a.sentAt - b.sentAt})
                  break;
            }
          }

          if(this.filterBy.label !== ''){
            mails = mails.filter((mail)=> mail.label === this.filterBy.label)
          }
          return mails
        }
    },
    components:{
        mailList,
        mailFilter,
        folderFilter,
        labelModal,
        chooseLabelModal,
    }
};


// export default {
//   template: `
//       <section>
//         <mail-filter />
//         <mail-list />
//         <h1>MailApp</h1>
//       </section>
//     `,
//     components: {
//         mailFilter,
//         mailList,
//     }

// };
