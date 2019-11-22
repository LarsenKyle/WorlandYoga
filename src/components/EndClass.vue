<template>
  <div class="NewStudent">
    <div v-if="showModal" class="moda">
      <div class="modal-content">
        <i @click="fireModal" class="material-icons close-btn">close</i>
        <form>
          <h5>Are you sure you want to end this class and archive it?</h5>

          <button class="btn add-btn">Yes!</button>
        </form>
      </div>
    </div>
    <button @click="fireModal" class="btn">End Class</button>
  </div>
</template>

<script>
export default {
  name: "NewStudent",
  data() {
    return {
      showModal: false,
      checked: false,
      firstName: null,
      lastName: null,
      feedback: null
    };
  },
  methods: {
    fireModal() {
      this.showModal = !this.showModal;
    }
  }
};
</script>


