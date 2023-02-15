import { noteService } from '../services/note.service.js';
import noteTodos from './note-types/note-todos.cmp.js';

export default {
  template: `
    <div class="todos-input-container flex flex-row">
      <input placeholder="Title" type="text" v-model="title"/>
        <input placeholder="+ List item"
        @keyup.enter="nextTodo" :key="idx" v-for="(input,idx) in inputAmount" ref="todo" type="text" v-model="todos[idx]"/>
        <button class="save-todo-btn" @click="addNote(title,todos)">Close</button>
    </div>
    
    `,
  data() {
    return {
      title: '',
      inputAmount: 1,
      todos: [],
    };
  },
  methods: {
    addNote(title, todos) {
      noteService.addTodoNote(title, todos);
      this.todos = [];
      this.inputAmount = 1;
      this.title = '';
    },
    nextTodo() {
      this.inputAmount++;
      setTimeout(() => {
        this.$refs.todo[this.todos.length].focus();
      }, 1);
    },
  },

  components: {
    noteTodos,
  },
};
