export default {
  name: 'note-img',
  props: ['info', 'edit'],
  template: `
     <div>
        <div v-if="!edit" class="note-desc">
            <img :src="info.url" class="note-img"/>
            <div class="content-container">
                <h2>{{info.title}}</h2>
                <!-- <i class="far fa-image note-type"></i> -->
            </div>
        </div>
        <div v-else class="note-edit flex flex-row">
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
};
