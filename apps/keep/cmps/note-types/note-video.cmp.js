export default {
  name: 'note-video',
  props: ['info', 'edit'],
  template: `
      <div>
          <div v-if="!edit" class="note-desc">
              <iframe width="250" :src="formattedUrl">
              </iframe>
              <div class="content-container">
                  <h2>{{info.title}}</h2>
                  <!-- <i class="fab fa-youtube note-type"></i> -->
              </div>
          </div>
          <div v-else class="note-edit flex column align-center">
            <input type="text" @keyup.enter="confirmEdit" v-model="url">
            <input type="text" @keyup.enter="confirmEdit" v-model="title">               
            <button @click="confirmEdit">Close</button>
          </div>
      </div>
            `,
  data() {
    return {
      url: this.info.url || '',
      title: this.info.title || '',
    };
  },
  methods: {
    confirmEdit() {
      this.$emit('doneEditSrc', false, this.url, this.title);
    },
  },
  computed: {
    formattedUrl() {
      return this.url.replace('watch?v=', 'embed/');
    },
  },
};
