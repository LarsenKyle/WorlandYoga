<template>
  <div class="container" id="settings">
    <div class="field title">
      <label for="title">Search Class Date:</label>
      <input type="text" name="title" v-model="title" />
    </div>
    <label id="label-style" for="type">Select Teacher</label>
    <select @change="changeTeacher" v-model="teacher" id="type">
      <option :key="teacher" v-for="teacher in teacherSelect">{{ teacher }}</option>
    </select>
    <table class="striped">
      <thead>
        <tr>
          <th>Teacher</th>
          <th>Date</th>
        </tr>
      </thead>

      <tbody>
        <tr @click="myCheck(stuff.timestamp)" :key="stuff.id" v-for="stuff in filteredClasses">
          <td>{{ stuff.teacher }}</td>
          <td>{{ stuff.date }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import db from "../firebase/init";
import moment from "moment";
export default {
  name: "settings",
  data() {
    return {
      theClass: [],
      teachClass: [],
      title: "",
      teacher: "Select Teacher",
      teacherSelect: ["Select Teacher"]
    };
  },
  computed: {
    filteredClasses: function() {
      return this.theClass.filter(student => {
        return student.date.toLowerCase().match(this.title.toLowerCase());
      });
    }
  },
  async created() {
    await db
      .collection("classes")
      .orderBy("timeStamp", "desc")
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type == "added") {
            let doc = change.doc;
            this.theClass.push({
              teacher: doc.data().teacher,
              timestamp: doc.data().timeStamp,
              date: moment(doc.data().timeStamp).format("ll"),
              id: doc.id
            });
            this.teachClass.push({
              teacher: doc.data().teacher,
              timestamp: doc.data().timeStamp,
              date: moment(doc.data().timeStamp).format("ll"),
              id: doc.id
            });
            if (!this.teacherSelect.includes(doc.data().teacher)) {
              this.teacherSelect.push(doc.data().teacher);
            }
          }
        });
      });
  },
  methods: {
    myCheck(stuff) {
      this.$router.push({
        name: "eachClass",
        params: { id: stuff }
      });
    },
    changeTeacher() {
      this.theClass = this.teachClass.filter(archive => {
        return archive.teacher === this.teacher;
      });
    }
  }
};
</script>

<style lang="scss"></style>
