<template>
  <div class="allStudents">
    <div class="stuff">
      <h1>Hi World!</h1>
    </div>
  </div>
</template>

<script>
import db from "../firebase/init";
export default {
  name: "MonthlyReport",
  data() {
    return {
      classes: [],
      teachers: []
    };
  },

  async created() {
    let ref = await db.collection("classes");
    await ref.get().then(snapshot => {
      snapshot.forEach(doc => {
        this.classes.push(doc.data());
      });
    });
    this.classes.forEach(archive => {
      let date = new Date(archive.timeStamp);
      console.log(date.getMonth());
    });
  }
};
</script>

<style></style>
