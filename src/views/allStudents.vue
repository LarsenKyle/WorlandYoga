<template>
  <div class="allStudents">
    <ul class="container">
      <li @click="check" :key="student.id" v-for="student in students">{{student.fullName}} Is Boss</li>
    </ul>
  </div>
</template>

<script>
import db from "../firebase/init";
export default {
  name: "allStudents",
  data() {
    return {
      students: []
    };
  },
  methods: {
    check() {
      console.log(this.students);
    }
  },
  created() {
    db.collection("students")
      .get()
      .then(snapshot => {
        snapshot.forEach(student => {
          this.students.push(student.data());
        });
      });
  }
};
</script>

<style></style>
