<template>
  <div @ id="eachClass">
    <div>
      <div class="container" id="settings">
        <table class="striped responsive-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Paid</th>
              <th>Seinor/Vet</th>
            </tr>
          </thead>

          <tbody>
            <tr :key="student.id" v-for="student in students">
              <td>{{ student.name }}</td>
              <td>{{ student.paid }}</td>
              <td>{{ student.seinorOrVet }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import db from "../firebase/init";
export default {
  name: "eachClass",
  data() {
    return {
      students: []
    };
  },
  mounted() {
    let ref = db
      .collection("classes")
      .where("timeStamp", "==", this.$route.params.id);
    ref.get().then(snapshot => {
      snapshot.forEach(doc => {
        this.students = doc.data().students;
      });
    });
  },
  methods: {
    beCool() {
      console.log(this.students);
    }
  }
};
</script>

<style></style>
