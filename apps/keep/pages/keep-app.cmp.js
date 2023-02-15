import { noteService } from '../services/note.service.js';

import noteList from '../cmps/note-list.cmp.js';
import noteFilter from '../cmps/note-filter.cmp.js';
import noteAdd from '../cmps/note-add.cmp.js';

export default {
  name: 'keep-app',
  template: `
    <section v-if="notes" class="keep-app">
      <div class="filter-container flex">
        <note-filter @search="setSearchBy" @setFilterBy="setFilter"/>
      </div>
      <div class="add-note-container pinned-group-header flex">
        <note-add class="add-note" @onNewNotes="updateNotes"/>
      </div>
      <div class="notes-preview-container">
    
        <div class="pinned-group-header">
          <h4 v-if="pinnedNotesToShow" class="group-header">pinned</h4>
          <div class="columns pinned" >
            <note-list v-if="pinnedNotesToShow" :notes="pinnedNotesToShow"  @onNewNotes="updateNotes"/>  
          </div>
        </div>
        <div class="pinned-group-header">
          <h4 class="group-header">others</h4>
          <div class="columns pinned" >
            <note-list v-if="unpinnedNotesToShow" :notes="unpinnedNotesToShow" @onNewNotes="updateNotes" />  
            </div>
        </div>
          
      </div>
    </section>
  `,
  data() {
    return {
      notes: null,
      filterBy: null,
      searchBy: '',
      editMode: false,
    };
  },
  created() {
    noteService.query().then((notes) => {
      this.notes = notes;
    });
  },
  methods: {
    loadNotes() {
      noteService.query().then((notes) => {
        this.notes = notes;
        console.log('we got notes');
      });
    },
    setFilter(filterBy) {
      console.log('filterBy:', filterBy);
      this.filterBy = filterBy;
    },
    setSearchBy(searchBy) {
      console.log('searchBy:', searchBy);
      this.searchBy = searchBy;
    },
    onEdit(yes) {
      this.editMode = yes;
    },
    updateNotes() {
      console.log('hi, saba');
      this.loadNotes();
    },
  },
  computed: {
    pinnedNotesToShow() {
      if (!this.filterBy && !this.searchBy)
        return this.notes.filter((note) => note.isPinned);
      if (this.searchBy) {
        var regex = new RegExp(this.searchBy, 'i');

        return this.notes.filter((note) => {
          if (note.type === 'note-text' && note.isPinned) {
            return regex.test(note.info.txt);
          }
          if (
            (note.type === 'note-img' && note.isPinned) ||
            (note.type === 'note-video' && note.isPinned)
          ) {
            return regex.test(note.info.title);
          }
          if (note.type === 'note-todos' && note.isPinned)
            return note.info.todos.forEach((todo) => regex.test(todo.txt));
        });
      }
      var filterdNotes = this.notes.filter(
        (note) => note.type === this.filterBy
      );
      console.log(filterdNotes, 'filterdNotes pinned');
      return filterdNotes.filter((note) => note.isPinned);
    },
    unpinnedNotesToShow() {
      if (!this.filterBy && !this.searchBy)
        return this.notes.filter((note) => !note.isPinned);
      if (this.searchBy) {
        var regex = new RegExp(this.searchBy, 'i');

        return this.notes.filter((note) => {
          if (note.type === 'note-text' && !note.isPinned) {
            return regex.test(note.info.txt);
          }

          if (
            (note.type === 'note-img' && !note.isPinned) ||
            (note.type === 'note-video' && !note.isPinned)
          ) {
            return regex.test(note.info.title);
          }
          if (note.type === 'note-todos' && !note.isPinned)
            return note.info.todos.forEach((todo) => regex.test(todo.txt));
        });
      }
      var filterdNotes = this.notes.filter(
        (note) => note.type === this.filterBy
      );
      return filterdNotes.filter((note) => !note.isPinned);
    },
  },
  components: {
    noteList,
    noteFilter,
    noteAdd,
  },
};
