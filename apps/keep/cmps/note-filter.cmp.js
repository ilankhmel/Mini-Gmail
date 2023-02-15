export default {
  name: 'note-filter',
  template: `
        <nav class="note-filter flex align-center">
          <div class="keep-logo flex">
            <img src="https://www.gstatic.com/images/branding/product/2x/keep_2020q4_48dp.png" alt="" />
            <p>Keep</p>
          </div>
            <div class="search-notes">
              <div>
                <button @click.stop="search" > <i class="fas fa-search"></i> </button>
                <input type="search" @keyup.enter.prevent="search" @change.stop="search" placeholder="Search" v-model="filterBy.txt">
              </div>
                <select v-model="filterBy.type" @change="setFilterBy">
                        <option value=""> Show all </option>
                        <option value="note-img"> Images </option>
                        <option value="note-text"> Text </option>
                        <option value="note-todos"> Todos </option>
                        <option value="note-video"> Video </option>
                    </select>
            </div>
            <div class="search-sm-container flex felx-row">
            <input 
              class="input-sm"
             :class="inputClass"
              type="search" 
              @click.stop="search" 
              @keyup.enter.prevent="search" 
              @change.stop="search" 
              placeholder="Search" 
              v-model="filterBy.txt">
              <!-- v-if="isShown" -->
              <button class="search-btn-sm" 
              v-on:click="toggleInput"
              > <i class="fas fa-search"></i> </button>
              <!-- @click.stop="search" -->
            </div>
        </nav>
    `,
  data() {
    return {
      filterBy: {
        txt: '',
        type: '',
        isShown: true,
      },
    };
  },
  methods: {
    search() {
      console.log(this.filterBy.txt);
      this.$emit('search', this.filterBy.txt);
    },
    toggleInput() {
      this.filterBy.isShown = !this.filterBy.isShown;
    },
    setFilterBy() {
      console.log(this.filterBy.type);
      this.$emit('setFilterBy', this.filterBy.type);
    },
  },
  computed: {
    inputClass() {
      if (this.filterBy.isShown) {
        return 'shown';
      }
      return '';
    },
  },
};

// computed: {
//   toggleInput() {},
// },
