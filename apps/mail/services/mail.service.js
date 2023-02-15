
var defaultMails = [
        {
        id: 'e101',
        name: 'Momo',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt : 1551132931594,
        from: 'momo@momo.com',
        to: 'user@appsus.com',
        trashed: false,
        isStarred: false,
        label: ',A'
        },
        {
        id: 'e102',
        name: 'Rachel',
        subject: 'Call you!',
        body: 'How are you doing at work??',
        isRead: false,
        sentAt : 1551130930594,
        from: 'rachel@momo.com',
        to: 'user@appsus.com',
        trashed: false,
        isStarred: false,
        label: 'A',
        },
        {
        id: 'e103',
        name: 'Jimmy',
        subject: 'Catch you!',
        body: 'Its been a pleasure meeting up with you!',
        isRead: false,
        sentAt : 1551133930294,
        from: 'jimmy@momo.com',
        to: 'user@appsus.com',
        trashed: false,
        isStarred: false,
        label: 'A',
        }, 
        {
        id: 'e105',
        name: 'Charlie',
        subject: 'Glad to see you!',
        body: 'Why You Shouldn’t Dismiss Plain Text Emails (And How to Make Them Engaging)',
        isRead: false,
        sentAt : 1551132930294,
        from: 'user@appsus.com',
        to: 'Charlie@momo.com',
        trashed: false,
        isStarred: false,
        label: '',
        }, 
        {
        id: 'e106',
        name: 'Dan',
        subject: 'Hi!',
        body: 'Plain text emails are just that—simple emails that only include plain text.',
        isRead: false,
        sentAt : 1551132930294,
        from: 'user@appsus.com',
        to: 'Dan@momo.com',
        trashed: false,
        isStarred: false,
        label: '',
        }, 
        {
        id: 'e107',
        name: 'Rick',
        subject: 'They are the email equivalent ',
        body: 'they play a significant role in a well-rounded email marketing strategy.',
        isRead: false,
        sentAt : 1551132930294,
        from: 'user@appsus.com',
        to: 'Rick@momo.com',
        trashed: false,
        isStarred: false,
        label: '',
        }, 
        {
        id: 'e108',
        name: 'Tal',
        subject: 'focusing on why they’re important',
        body: 'while providing plenty of plain text email examples along the way.',
        isRead: false,
        sentAt : 1551132930294,
        from: 'user@appsus.com',
        to: 'Tal@momo.com',
        trashed: false,
        isStarred: false,
        label: '',
        }, 
        {
        id: 'e109',
        name: 'Bar',
        subject: 'One reason you should still use plain text ',
        body: 'Many emails are automatically sent with them! Even when you’re our email marketing campaigns—bundles together a simplified plain text version of your email along with the HTML version of your email.',
        isRead: false,
        sentAt : 1551132930294,
        from: 'user@appsus.com',
        to: 'Bar@momo.com',
        trashed: false,
        isStarred: false,
        label: '',
        }, 
        {
        id: 'e110',
        name: 'Ravit',
        subject: 'Spam filters like to see a plain text alternative.  me!',
        body: 'email clients give the option to only receive the text version of an email, it’s important to send in multi-part MIME format. Otherwise, subscribers may not receive your email at all.',
        isRead: false,
        sentAt : 1551132930294,
        from: 'user@appsus.com',
        to: 'Rav@momo.com',
        trashed: false,
        isStarred: false,
        label: '',
        }, 
        {
        id: 'e111',
        name: 'Michael',
        subject: 'show the raw HTML of the message or try to format it into plain text',
        body: 'When researching examples for this post, we were surprised by the number of senders not using multi-part MIME—including brands who otherwise excel in their email marketing strategy. Between deliverability and accessibility issues, sending in that format should be a no-brainer.',
        isRead: false,
        sentAt : 1551132930294,
        from: 'user@appsus.com',
        to: 'Michael@momo.com',
        trashed: false,
        isStarred: false,
        label: '',
        }, 
    ]

    const loggedinUser = {
        email: 'user@appsus.com',
        fullname: 'Ilan'
       }

    



import { storageService } from '../../../services/async-storage.service.js'
import { utilService } from '../../../services/util.service.js'

const MAIL_KEY = 'mailDB'
_createMails()

export const mailService = {
    query,
    get,
    remove,
    save,
    getEmptyMail,
    getUserDetails,
    getNewMail,
    getLabels,
    addLabel,
    removeLabel,
}

function getUserDetails(){
    // return new Promise(resolve => setTimeout(() => resolve(loggedinUser), 200))
    return loggedinUser
}

function query() {
    return storageService.query(MAIL_KEY)
}

function get(mailId){
    return storageService.get(MAIL_KEY, mailId)
}

function remove(mailId) {
    return storageService.remove(MAIL_KEY, mailId)
}

function save(mail) {
    if(mail.id){
        return storageService.put(MAIL_KEY, mail)
    } else {
        return storageService.post(MAIL_KEY, mail)
    }
}

function getEmptyMail() {
    const email = {
        id: '',
        name: '',
        subject: '',
        body: '',
        isRead: false,
        sentAt : Date.now(),
        from: '',
        to: '',
        isStarred: false,

        }
        
    return email
}

function getNewMail(msg) {
    const email = {
        id:'' ,
        name: msg.name,
        subject: msg.subject,
        body: msg.body,
        isRead: false,
        sentAt : Date.now(),
        from: msg.from,
        to: msg.to,
        isStarred: false,

        }
        
    return email
}


// function getNextCarId(carId) {
//     return storageService.query(MAIL_KEY)
//         .then(mails =>{
//             var idx  = mails.findIndex(car => car.id === carId)
//             if (idx === mails.length-1) idx = -1
//             return mails[idx+1].id
//         })
// }

function _createMails() {
    let mails = utilService.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        mails = defaultMails
        utilService.saveToStorage(MAIL_KEY, mails)
    }
    return mails
}

function _createMail() {
    const mail = getEmptyMail()
    mail.id = utilService.makeId() 
    return mail
}

function getLabels(){
   return storageService.query('labels')
}

function addLabel(labelName){
    var label = {
        name: labelName,
        color: 'orange',
    }
    var labels = utilService.loadFromStorage('labels') || []
    labels.unshift(label)
    utilService.saveToStorage('labels', labels)
    console.log(labels);
    return labels
}

function removeLabel(labelName){
    var labels = utilService.loadFromStorage('labels')
    var idx = labels.findIndex((label)=> label.name === labelName) 
    labels.splice(idx, 1)
    utilService.saveToStorage('labels', labels)
    return new Promise(resolve => setTimeout(() => resolve(labels), 200))
}