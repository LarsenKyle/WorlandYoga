<template>
  <div class="NewStudent">
    <div v-if="showModal" class="moda">
      <div class="modal-content">
        <i @click="fireModal" class="material-icons close-btn">close</i>
        <form>
          <transition name="fade">
            <p class="red white-text center-align" v-if="feedback">
              {{ feedback }}
            </p>
          </transition>
          <h5>Add New Student</h5>
          <div class="flex">
            <div class="field name">
              <label for="firstName">First Name</label>
              <input v-model="firstName" type="text" name="firstName" />
            </div>
            <div class="field name">
              <label for="title">Last Name</label>
              <input v-model="lastName" type="text" name="title" />
            </div>
          </div>
          <p>
            <label>
              <input v-model="checked" type="checkbox" />
              <span>Is this person a Senior/Veteran</span>
            </label>
          </p>
          <div class="flex">
            <p>
              <label>
                <input v-model="punch" type="checkbox" />
                <span>Punch Card</span>
              </label>
            </p>
            <p class="punches">How many punches</p>
            <div class="field name">
              <input id="sm-box" v-model="punch" type="number" name="title" />
            </div>
          </div>
          <button @click.prevent="addNewStudent" class="btn add-btn">
            Add Student
          </button>
        </form>
      </div>
    </div>
    <button @click="fireModal" class="btn">Add New Student</button>
  </div>
</template>

<script>
import db from "../firebase/init";
export default {
  name: "NewStudent",
  data() {
    return {
      showModal: false,
      checked: false,
      firstName: null,
      lastName: null,
      feedback: null,
      punches: null,
      punch: 0
    };
  },
  methods: {
    fireModal() {
      this.showModal = !this.showModal;
    },
    addNewStudent() {
      if (this.firstName && this.lastName && this.checked) {
        db.collection("students").add({
          firstName: this.firstName,
          lastName: this.lastName,
          fullName: `${this.firstName}` + ` ${this.lastName}`,
          seniorOrVet: true,
          punch: parseInt(this.punch)
        });
        this.$emit("addedFeedback", "New Student Added");
        this.showModal = false;
        this.firstName = "";
        this.lastName = "";
        this.checked = false;
      } else if (this.firstName && this.lastName && !this.checked) {
        db.collection("students").add({
          firstName: this.firstName,
          lastName: this.lastName,
          fullName: `${this.firstName}` + ` ${this.lastName}`,
          seniorOrVet: false,
          punch: parseInt(this.punch)
        });
        this.$emit("addedFeedback", "Student Added");
        this.showModal = false;
        this.firstName = "";
        this.lastName = "";
      } else {
        this.feedback = "Please enter first and last name";
      }
    }
  }
};
</script>

<style lang="scss">
#sm-box {
  height: 1.2rem;
}

.punches {
  margin-left: 1rem;
  color: #9e9e9e;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.name {
  margin: 1rem;
}
#button {
  z-index: 0;
}
.moda {
  position: fixed;
  padding-top: 50px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.5);
}
.modal-content {
  z-index: 2;
  position: fixed;
  top: 30%;
  left: 12%;
  background-color: white;
  padding: 20px;
  margin: auto;
  width: 75%;
}
.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
}
.close-btn:hover {
  color: darkgray;
  cursor: pointer;
}
.add-btn {
  position: absolute;
  bottom: 10px;
  right: 10px;
}
</style>
