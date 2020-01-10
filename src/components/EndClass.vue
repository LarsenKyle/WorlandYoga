<template>
  <div class="EndClass">
    <div v-if="showModal" class="moda">
      <div id="end" class="modal-content">
        <i @click="fireModal" class="material-icons close-btn">close</i>
        <form class="flex contain">
          <h5>End this class and archive it?</h5>
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
  name: "EndClass",
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
      this.students.forEach(student => {
        if (student.punch > 0) {
          db.collection("students")
            .doc(student.id)
            .update({
              punch: student.punch - 1
            });
        }
      });
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
#end {
  height: initial;
  top: 33%;
}
.yes {
  margin-top: 1rem;
  margin-left: auto;
}
.contain {
  width: 90%;
}
</style>
