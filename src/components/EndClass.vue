<template>
  <div class="NewStudent">
    <div v-if="showModal" class="moda">
      <div class="modal-content">
        <i @click="fireModal" class="material-icons close-btn">close</i>
        <form class="flex contain">
          <h5>Are you sure you want to end this class and archive it?</h5>
          <button @click.prevent="endClass" class="btn yes">Yes!</button>
        </form>
      </div>
    </div>
    <button @click="fireModal" class="btn">End Class</button>
  </div>
</template>

<script>
import db from "../firebase/init";
export default {
  name: "NewStudent",
  data() {
    return {
      showModal: false,
      teacher: null
    };
  },
  methods: {
    fireModal() {
      this.showModal = !this.showModal;
    },
    endClass() {
      db.collection("classes").add({
        teacher: this.teacher.fullName,
        students: this.students,
        timeStamp: Date.now()
      });
      this.$router.push({
        name: "settings"
      });
    }
  },
  props: ["teach", "students"],
  created() {
    let ref = db.collection("teachers").where("slug", "==", this.teach);
    ref.get().then(snapshot => {
      snapshot.forEach(doc => {
        this.teacher = doc.data();
      });
    });
  }
};
</script>
<style lang="scss">
.yes {
  margin-top: 1rem;
  margin-left: auto;
}
.contain {
  width: 90%;
}
</style>
