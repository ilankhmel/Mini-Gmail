export default {
  name: 'note-todos',
  props: ['info', 'edit'],
  template: `
        <section class="todo-container note-desc">
          <h3 >{{info.title}}</h3>
            <ul v-if="!edit" class="clean-list ">
              <li class="todo-task" v-for="(todo,idx) in info.todos" @click.prevent="addLinethrough(todo)"  :class="{done:todo.doneAt}">
                <p>{{todo.txt}}
                 </p>
                <input type="checkbox" @click.stop="addLinethrough(todo)" v-model="todo.doneAt">
              </li>
              <!-- <i class="fas fa-list note-type"></i>  -->
            </ul>
            <div v-else class="todo-edit flex flex-row align-center">
              <input v-for="(todo,idx) in todos" type="text" v-model="todos[idx]">
              <button @click="addTodo">+  List item</button>
              <button @click="confirmEdit" @keyup.enter="confirmEdit">Close</button>
            </div>
</section>
   `,

  data() {
    return {
      todos: '',
      title: this.info.title || '',
    };
  },
  computed: {
    formatTodosIntoTxts() {
      return this.info.todos.map((todo) => todo.txt);
    },
  },
  methods: {
    addLinethrough(todo) {
      todo.doneAt > 0 ? (todo.doneAt = null) : (todo.doneAt = true);
    },
    confirmEdit() {
      this.$emit('doneEditTodo', false, this.title, this.todos);
    },
    addTodo() {
      this.todos.push('');
    },
  },
  created() {
    this.todos = this.formatTodosIntoTxts;
  },
};
