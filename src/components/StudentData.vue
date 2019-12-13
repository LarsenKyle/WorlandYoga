<template>
  <div class="StudentData">
    <div v-if="showModal" class="moda">
      <div class="modal-content">
        <i @click="fireModal" class="material-icons close-btn">close</i>

        <h3>Step One</h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showModal: false
    };
  },
  methods: {
    fireModal() {
      this.showModal = !this.showModal;
    }
  }
};
</script>

<style lang="scss"></style>
