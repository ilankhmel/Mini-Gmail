import { utilService } from '../../../services/util.service.js';
import { storageService } from '../../../services/async-storage.service.js';

const NOTES_KEY = 'notes';

export const noteService = {
  query,
  updateNoteElement,
  deleteNote,
  copyNote,
  getEmptyNoteByType,
  addNewNote,
  addTodoNote,
  updateNoteUrl,
  updateNoteTxt,
  updateTodoNote,
};

var gNotes = [
  {
    id: 'n101',
    type: 'note-text',
    info: {
      title: '',
      txt: "I'm tired ! let's go to bed :) ",
    },
    isPinned: true,
    style: { backgroundColor: '#A7FFEB' },
  },
  {
    id: 'n102',
    type: 'note-img',
    isPinned: false,
    info: {
      url: 'https://www.travisneighborward.com/wp-content/uploads/2016/11/New-York-City-by-Noel-Moore-Shutterstock.jpg',
      title: 'Travel NYC 2021',
    },
    style: { backgroundColor: '#E6C9A8' },
  },
  {
    id: 'n123',
    type: 'note-img',
    isPinned: false,
    info: {
      url: 'https://i.pinimg.com/564x/76/a0/2f/76a02f806248e6fd07770ee5265d3296.jpg',
      title:
        "New Orleans is something of an assault and a delight to the senses. Better still, it's one of the most fun cities in the USA to explore. This is made even better with the best",
    },
    style: { backgroundColor: '#fff475' },
  },
  {
    id: 'n112',
    type: 'note-video',
    isPinned: true,
    info: {
      url: 'https://www.youtube.com/embed/FqtluwhNts8',
      title: '🚿🚿🚿🚿',
    },
    style: { backgroundColor: '#D7AEFB' },
  },
  {
    id: 'n103',
    type: 'note-todos',
    isPinned: false,
    info: {
      title: 'Get my stuff together',
      todos: [
        { txt: 'Driving liscence', doneAt: true },
        { txt: 'Coding power', doneAt: false },
      ],
    },
    style: { backgroundColor: '#D7AEFB' },
  },
  {
    id: 'n117',
    type: 'note-img',
    isPinned: false,
    info: {
      url: 'https://i.pinimg.com/564x/95/c7/60/95c760468906ef61293404d5845e8c4e.jpg',
      title: 'need',
    },
    style: { backgroundColor: '#CBF0F8' },
  },
  {
    id: 'n109',
    type: 'note-text',
    isPinned: false,
    info: {
      title: '',
      txt: 'I need a holiday 🏖',
    },
    style: { backgroundColor: '#AECBFA' },
  },
  {
    id: 'n118',
    type: 'note-img',
    isPinned: false,
    info: {
      url: 'https://i.pinimg.com/564x/e1/a5/06/e1a50696e39981a595ad584b19d1d62a.jpg',
      title: 'miyaue',
    },
    style: { backgroundColor: '#fff475' },
  },
  {
    id: 'n119',
    type: 'note-text',
    isPinned: false,
    info: {
      title: 'I wonder',
      txt: "what's for lunch today 🍔 🍲",
    },
    style: { backgroundColor: '#f28B82' },
  },
  {
    id: 'n116',
    type: 'note-img',
    isPinned: false,
    info: {
      url: 'https://i.pinimg.com/564x/a6/cd/9f/a6cd9f15898b8707e1779b7737c1b7c9.jpg',
      title: 'bath inspo',
    },
    style: { backgroundColor: '#FFFFFF' },
  },
  {
    id: 'n115',
    type: 'note-text',
    isPinned: false,
    info: {
      title: 'lately',
      txt: "On Saturday, musicians Jesse Rutherford and Billie Eilish made their debut as a couple at the LACMA Art+Film gala in Los Angeles, cozily wrapped in a Gucci quilt and matching pajamas; while Natasha Lyonne and Lenny Kravtiz were photographed giving a sultry lesson in leather at the CFDA Awards in New York on Monday. The latter event's most enduring image came later on in the evening, when Martha Stewart and Julia Fox were snapped together at the ceremony's dinner. With more than 22,000 likes on a photo of their pairing shared on Twitter, commenters joked that Stewart and Fox made \"the dream blunt rotation",
    },
    style: { backgroundColor: '#FDCFE8' },
  },
  {
    id: 'n120',
    type: 'note-img',
    isPinned: false,
    info: {
      url: 'https://i.pinimg.com/564x/21/3c/bb/213cbbff632e7245bafb195485b7f241.jpg',
      title: 'summmmmmer',
    },
    style: { backgroundColor: '#E6C9A8' },
  },
  {
    id: 'n111',
    type: 'note-img',
    isPinned: false,
    info: {
      url: 'https://m.media-amazon.com/images/S/assets.wholefoodsmarket.com/storepages/seo/stores-og.png',
      title: 'eat fresh veggies',
    },
    style: { backgroundColor: '#CCFF90' },
  },
  {
    id: 'n114',
    type: 'note-text',
    isPinned: false,
    info: {
      title: 'hol·i·day',
      txt: 'A holiday is a day set aside by custom or by law on which normal activities, especially business or work including school, are suspended or reduced. Generally, holidays are intended to allow individuals to celebrate or commemorate an event or tradition of cultural or religious significance. Holidays may be designated by governments, religious institutions, or other groups or organizations',
    },
    style: { backgroundColor: '#CBF0F8' },
  },
  {
    id: 'n113',
    type: 'note-img',
    isPinned: true,
    info: {
      url: 'https://sp-ao.shortpixel.ai/client/q_glossy,ret_img,w_370,h_370/https://mylittletelaviv.com/wp-content/uploads/2015/12/Roladin_00242.jpg',
      title: 'Hanuka is coming',
    },
    style: { backgroundColor: '#E6C9A8' },
  },
  {
    id: 'n105',
    type: 'note-text',
    isPinned: false,
    info: {
      title: 'common knowledge',
      txt: '🍫chocolate is life',
    },
    style: { backgroundColor: '#E8EAED' },
  },
  {
    id: 'n106',
    type: 'note-img',
    isPinned: false,
    info: {
      url: 'https://cdn.britannica.com/88/80588-050-8D944BFE/Leaning-Tower-of-Pisa-Italy.jpg',
      title: 'Eat Piza',
    },
    style: { backgroundColor: '#fff475' },
  },
  {
    id: 'n104',
    type: 'note-img',
    isPinned: false,
    info: {
      url: 'https://i.pinimg.com/564x/bb/57/1a/bb571ae2c97458708155956fa5f2801e.jpg',
      title: 'wanna be Bell',
    },
    style: { backgroundColor: '#A7FFEB' },
  },
  {
    id: 'n108',
    type: 'note-img',
    isPinned: false,
    info: {
      url: 'https://www.timeforkids.com/wp-content/uploads/2019/09/final-cover-forest.jpg?w=1024',
      title: 'hike away',
    },
    style: { backgroundColor: '#FBBC04' },
  },
  {
    id: 'n110',
    type: 'note-todos',
    isPinned: false,
    info: {
      title: 'this week',
      todos: [
        { txt: 'food shop', doneAt: false },
        { txt: 'go for a run', doneAt: true },
        { txt: 'laundry 😑', doneAt: true },
      ],
    },
    style: { backgroundColor: '#D7AEFB' },
  },
  {
    id: 'n107',
    type: 'note-img',
    isPinned: false,
    info: {
      url: 'https://resizing.flixster.com/wIOt7bUI2l08FXDy1cNiJnYoxVw=/ems.cHJkLWVtcy1hc3NldHMvdHZzZWFzb24vUlRUVjkxNDYxMy53ZWJw',
      title: 'LUPIN',
    },
    style: { backgroundColor: '#E6C9A8' },
  },
  {
    id: 'n122',
    type: 'note-img',
    isPinned: false,
    info: {
      url: 'https://i.pinimg.com/564x/4c/e2/55/4ce255a37ee6fc3ba0f76d2e7693dd3f.jpg',
      title:
        'Cinque Terre, meaning five lands, is a cluster of five small fishing villages hanging on the dramatic Italian Riviera. Each village has its own distinct character and charm, but which is the best to stay in? The Cinque Terre villages are Riomaggiore, Manarola, Corniglia, Vernazza and Monter...',
    },
    style: { backgroundColor: '#CBF0F8' },
  },
  {
    id: 'n125',
    type: 'note-img',
    isPinned: false,
    info: {
      url: 'https://images.unsplash.com/photo-1545893835-abaa50cbe628?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2212&q=80',
      title: '',
    },
    style: { backgroundColor: '#AECBFA' },
  },
  {
    id: 'n121',
    type: 'note-img',
    isPinned: false,
    info: {
      url: 'https://i.pinimg.com/564x/47/81/6c/47816ca459b8daba2ea5bd9addf3b24f.jpg',
      title: 'smile:)',
    },
    style: { backgroundColor: '#FBBC04' },
  },
];

function query() {
  return storageService.query(NOTES_KEY);
}

_createNotes();

function _createNotes() {
  let notes = utilService.loadFromStorage(NOTES_KEY);
  if (!notes || !notes.length) {
    notes = _getgNotes();
    utilService.saveToStorage(NOTES_KEY, notes);
  }
  return notes;
}

function _getgNotes() {
  return gNotes;
}

// find note by note.id
function get(noteId) {
  return storageService.get(NOTES_KEY, noteId);
}

function updateNoteElement(noteId, element, value) {
  let noteToEdit;
  return query().then((notes) => {
    var idx = notes.findIndex((note) => note.id === noteId);
    noteToEdit = notes[idx];
    noteToEdit[element] = value;
    utilService.saveToStorage(NOTES_KEY, notes);
    return notes;
  });
}

function updateNoteUrl(noteId, newUrl, newTitle) {
  let noteToEdit;
  return query().then((notes) => {
    var idx = notes.findIndex((note) => note.id === noteId);
    noteToEdit = notes[idx];
    noteToEdit.info.url = newUrl;
    console.log(noteToEdit.info.url);
    noteToEdit.info.title = newTitle;
    console.log(noteToEdit.info.title);
    utilService.saveToStorage(NOTES_KEY, notes);
    return notes;
  });
}
function updateNoteTxt(noteId, newTitle, newTxt) {
  let noteToEdit;
  return query().then((notes) => {
    var idx = notes.findIndex((note) => note.id === noteId);
    noteToEdit = notes[idx];
    if (newTitle) noteToEdit.info.title = newTitle;
    if (newTxt) noteToEdit.info.txt = newTxt;
    utilService.saveToStorage(NOTES_KEY, notes);
    return notes;
  });
}

function deleteNote(noteId) {
  return query().then((notes) => {
    var idx = notes.findIndex((note) => note.id === noteId);
    notes.splice(idx, 1);
    utilService.saveToStorage(NOTES_KEY, notes);
    return notes;
  });
}

function copyNote(note) {
  const newNote = JSON.parse(JSON.stringify(note));
  newNote.id = utilService.makeId();
  return query().then((notes) => {
    notes.push(newNote);
    utilService.saveToStorage(NOTES_KEY, notes);
    return notes;
  });
}

function getEmptyNoteByType(type) {
  var newNote = {
    id: utilService.makeId(),
    type: type,
    isPinned: false,
    style: { backgroundColor: '#FFFFFF' },
  };
  switch (type) {
    case 'note-text':
      newNote.info = {
        title: '',
        txt: '',
      };
      break;
    case 'note-img':
      newNote.info = { url: '', title: '' };
      break;
    case 'note-video':
      newNote.info = { url: '', title: '' };
      break;
  }
  // return query().then((notes) => {
  //   notes.push(newNote);
  //   utilService.saveToStorage(NOTES_KEY, notes);
  //   return newNote;

  return new Promise((resolve) => {
    resolve(newNote);
  });
}

function addNewNote(newNote) {
  newNote.isPinned = false;
  switch (newNote.type) {
    case 'note-img':
      console.log(newNote.info.txt);
      newNote.info.url = newNote.info.txt;
      newNote.info.title = 'New';
      break;
    case 'note-video':
      newNote.info.url = newNote.info.txt;
      newNote.info.title = 'New';
      break;
    case 'note-text':
      newNote.info.title = newNote.info.title;
      newNote.info.txt = newNote.info.txt;
      break;
  }
  return query().then((notes) => {
    notes.push(newNote);
    utilService.saveToStorage(NOTES_KEY, notes);
    return notes;
  });
}

function addTodoNote(title, todos) {
  var todosArr = todos.map((todo) => {
    return { txt: todo, doneAt: null };
  });
  var todoNote = {
    id: utilService.makeId(),
    type: 'note-todos',
    isPinned: false,
    style: { backgroundColor: '#FFFFFF' },
    info: {
      title: title,
      todos: todosArr,
    },
  };
  return query().then((notes) => {
    notes.push(todoNote);
    utilService.saveToStorage(NOTES_KEY, notes);
    return notes;
  });
}

function updateTodoNote(noteId, todoTitle, todosArr) {
  let noteToEdit;
  return query().then((notes) => {
    var idx = notes.findIndex((note) => note.id === noteId);
    noteToEdit = notes[idx];
    var newInfo = {
      title: '',
      todos: [],
    };
    (newInfo.title = todoTitle),
      (newInfo.todos = todosArr.map((todo) => {
        return { txt: todo, doneAt: null };
      }));
    noteToEdit.info = newInfo;
    console.log(noteToEdit.info);
    utilService.saveToStorage(NOTES_KEY, notes);
    return notes;
  });
}
