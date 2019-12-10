<template>
  <div class="addTeacher">
    <div v-if="showModal" class="moda">
      <div class="modal-content">
        <i @click="fireModal" class="material-icons close-btn">close</i>
        <h5>New Teacher</h5>
        <form class="flex contain">
          <div class="field name">
            <label for="firstName">First Name</label>
            <input v-model="firstName" type="text" name="firstName" />
          </div>
          <div class="field name">
            <label for="title">Last Name</label>
            <input v-model="lastName" type="text" name="title" />
          </div>
          <button @click.prevent="addTeacher" class="btn yes">
            Add Teacher
          </button>
        </form>
      </div>
    </div>
    <button @click="fireModal" class="btn">Add New Teacher</button>
  </div>
</template>

<script>
import slugify from "slugify";
import db from "../firebase/init";
export default {
  name: "AddTeacher",
  data() {
    return {
      showModal: false,
      firstName: null,
      lastName: null,
      fullName: null
    };
  },
  methods: {
    fireModal() {
      this.showModal = !this.showModal;
    },
    addTeacher() {
      if (this.firstName && this.lastName) {
        this.fullName = `${this.firstName}` + ` ${this.lastName}`;
        this.slug = slugify(this.fullName, {
          replacement: "-",
          remove: /[$*_+~.()'"\-:@]/g,
          lower: true
        });
        db.collection("teachers").add({
          firstName: this.firstName,
          lastName: this.lastName,
          fullName: this.fullName,
          slug: this.slug
        });
        this.showModal = false;
      }
    }
  }
};
</script>

<style></style>
