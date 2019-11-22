<template>
  <div class="class container">
    <form>
      <div class="cool valign-wrapper">
        <div class="field title">
          <label for="title">Search Students</label>
          <input type="text" name="title" v-model="title" />
        </div>
        <NewStudent class="new" />
      </div>

      <div class="flex">
        <div class="student" :key="index" v-for="(student, index) in filteredStudents">
          <div v-if="title.length > 1" @click="addStudent(student.fullName)" class="chip">
            {{ student.fullName }}
            <i class="close material-icons">person_add</i>
          </div>
        </div>
      </div>
    </form>
    <div class="today">
      <h4>Today's Class</h4>
      <div class="divider"></div>
      <div class="flex">
        <div :key="index" v-for="(student, index) in attendees" class="attend">
          <div class="chip">
            {{ student }}
            <i class="close material-icons">close</i>
          </div>
        </div>
      </div>
      <EndClass class="fixy" />
    </div>
  </div>
</template>

<script>
import db from "../firebase/init";
import EndClass from "./EndClass";
import NewStudent from "./NewStudent";
export default {
  name: "Class",
  components: {
    NewStudent,
    EndClass
  },
  data() {
    return {
      title: "",
      students: [
        {
          firstName: "Kyle",
          lastName: "Larsen",
          fullName: "Kyle Larsen",
          checked: false
        }
      ],
      checked: [],
      attendees: []
    };
  },
  computed: {
    filteredStudents: function() {
      return this.students.filter(student => {
        return student.fullName.toLowerCase().match(this.title.toLowerCase());
      });
    }
  },
  methods: {
    addStudent(name) {
      if (!this.attendees.includes(name)) {
        this.attendees.push(name);
        this.title = "";
      }
      console.log(this.attendees);
    }
  },
  created() {
    db.collection("students").onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type == "added") {
          let doc = change.doc;
          this.students.push({
            fullName: doc.data().fullName
          });
        }
      });
    });
  }
};
</script>

<style>
.fixy {
  float: right;
}
.chip {
  width: 180px;
  margin: 1rem 0rem;
}
.cool {
  display: flex;
  margin-bottom: 3rem;
}
.title {
  width: 50%;
}
.new {
  margin-top: 1.5rem;
  margin-left: auto;
}
.flex {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}
.class {
  margin-top: 2rem;
}
</style>
