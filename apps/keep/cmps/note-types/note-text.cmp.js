export default {
  name: 'note-text',
  props: ['info', 'edit', 'note'],
  template: `
      <div class="text-container note-desc">
              <div class="text-container-2" v-if="!edit">
                  <h3>{{info.title}}</h3>
                  <h4>{{info.txt}}</h4>
                  <!-- <i class="fas fa-font note-type"></i> -->
              </div>
              <div v-else class="note-edit flex flex-row align-center">
                <label>
                  <input v-model="title" @keyup.enter="confirmEdit" type="text" />
                </label>
                <label>
                  <input v-model="txt" @keyup.enter="confirmEdit" type="text" />
                </label>
                  <button @click.stop="confirmEdit"> Close </button>
              </div>
      </div>
        `,
  data() {
    return {
      title: this.info.title || '',
      txt: this.info.txt || '',
    };
  },
  methods: {
    confirmEdit() {
      this.$emit('doneEditText', false, this.title, this.txt);
    },
  },
  computed: {},
};
