<template>
  <div class="container" id="settings">
    <table class="striped responsive-table">
      <thead>
        <tr>
          <th>Teacher</th>
          <th>Date</th>
        </tr>
      </thead>

      <tbody>
        <tr
          @click="myCheck(stuff.timestamp)"
          :key="stuff.id"
          v-for="stuff in theClass"
        >
          <td>{{ stuff.teacher }}</td>
          <td>{{ stuff.date }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import db from "../firebase/init"
import moment from "moment"
export default {
  name: "settings",
  data() {
    return {
      theClass: []
    }
  },
  created() {
    db.collection("classes").onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type == "added") {
          let doc = change.doc
          this.theClass.push({
            teacher: doc.data().teacher,
            timestamp: doc.data().timeStamp,
            date: moment(doc.data().timestamp).format("MM/DD YYYY"),
            id: doc.id
          })
        }
      })
    })
  },
  methods: {
    myCheck(stuff) {
      this.$router.push({
        name: "eachClass",
        params: { id: stuff }
      })
    }
  }
}
</script>

<style lang="scss"></style>
