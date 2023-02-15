import { noteService } from '../services/note.service.js';

import noteImg from './note-types/note-img.cmp.js';
import noteText from './note-types/note-text.cmp.js';
import noteTodos from './note-types/note-todos.cmp.js';
import noteVideo from './note-types/note-video.cmp.js';
import todosEdit from './todos-edit.cmp.js';

export default {
  name: 'note-add',
  template: `
        <section class="flex" v-if="newNote">
            <div class="input-container flex-row flex">

                <input  
                v-show="(noteType ==='note-text')" placeholder="Title" @keyup.enter.prevent="addNote(newNote)"  v-model="newNote.info.title"/>
                <input  
                v-show="(noteType!=='note-todos')" :placeholder="PLACE_HOLDERS[noteType] || 'Take a note...' " @keyup.enter.prevent="addNote(newNote)"  v-model="newNote.info.txt"/>
        
                <todos-edit v-if="noteType==='note-todos'"/>
                <div class="btn-setters">
                    <button title="Text" @click="setType('note-text')">
                        <i class="fas fa-font"></i>
                    </button>
                    <button title="insert img address" @click="setType('note-img')"> 
                        <i class="far fa-image"></i>
                    </button>
                    <button title="insert video address" @click="setType('note-video')">
                    <i class="fab fa-youtube"></i>
                    </button>
                    <button title="List" @click="setNoteType('note-todos')">
                        <i class="fas fa-list"></i>
                    </button>
                </div>
            </div>
            
        </section>
    `,

  data() {
    return {
      noteType: '',
      newNote: null,

      //   anotherLine: false,
      PLACE_HOLDERS: {
        'note-img': 'Insert an image url...',
        'note-todos': 'Insert a todo list...',
        'note-video': 'Insert a YouTube link...',
        'note-text': 'Take a note...',
      },
    };
  },
  methods: {
    setType(type) {
      this.noteType = type;
      console.log(this.noteType);
      noteService.getEmptyNoteByType(type).then((note) => {
        this.newNote = note;
      });
    },
    setNoteType(type) {
      this.noteType = type;
    },
    addNote(newNote) {
      noteService.addNewNote(newNote).then((newNote) => {
        this.newNote = newNote;
        // noteService.getEmptyNoteByType(this.noteType);
        // this.noteType = '';
        // console.log(this.newNote);
        this.$emit('onNewNotes');

        return newNote;
      });
    },
  },

  components: {
    noteImg,
    noteText,
    noteTodos,
    noteVideo,
    todosEdit,
  },

  created() {
    noteService.getEmptyNoteByType('note-text').then((note) => {
      this.newNote = note;
    });
  },
};
