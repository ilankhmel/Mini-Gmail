import notePreview from './note-preview.cmp.js';
import noteAdd from './note-add.cmp.js';

export default {
  name: 'note-list',
  props: ['notes'],
  template: `
    <section v-if="notes">
    <!-- <section v-if="notes" class="note-list"> -->
    <!-- <h3 :class="notesHeader"> {{ notesHeader }} </h3> -->
          <div class="note-container" v-for="(note,idx) in notes" :key="idx">
               <note-preview :note="note" @onNewNotes="newNotes"/>            
          </div>
</section>
  `,
  data() {
    return {
      // drag: false,
      note: this.notes,
    };
  },
  computed: {
    notesHeader() {
      if (this.notes[0].isPinned) return 'pinned';
      else if (!this.notes[0].isPinned) return 'others';
      else return '';
    },
  },
  methods: {
    newNotes() {
      this.$emit('onNewNotes');
      console.log('hi, aba');
    },
  },
  components: {
    notePreview,
    noteAdd,
  },
};
