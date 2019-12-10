<template>
  <div id="eachClass">
    <h1 @click="beCool">{{ this.$route.params.id }}</h1>
  </div>
</template>

<script>
import db from "../firebase/init"
export default {
  name: "eachClass",
  data() {
    return {
      students: []
    }
  },
  created() {
    let ref = db
      .collection("classes")
      .where("timeStamp", "==", this.$route.params.id)
    ref.get().then(snapshot => {
      snapshot.forEach(doc => {
        this.students = doc.data().students
      })
    })
  },
  methods: {
    beCool() {
      console.log(this.students)
    }
  }
}
</script>

<style></style>
