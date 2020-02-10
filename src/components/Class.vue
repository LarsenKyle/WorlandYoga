<template>
  <div class="class container">
    <transition name="fade">
      <p class="green white-text center-align" v-if="msg">{{ msg }}</p>
    </transition>
    <form>
      <div class="cool valign-wrapper">
        <div class="field title">
          <label for="title">Search Students</label>
          <input type="text" name="title" v-model="title" />
        </div>
        <NewStudent v-on:addedFeedback="updateFeedback($event)" class="new" />
      </div>

      <div class="flex">
        <div class="student" :key="index" v-for="(student, index) in filteredStudents">
          <div
            v-if="title.length > 1"
            @click="addStudent(student.fullName, student.id, student.punch, student.seniorOrVet)"
            class="chip"
          >
            {{ student.fullName }}
            <i class="close material-icons">person_add</i>
          </div>
        </div>
      </div>
    </form>
    <div class="today">
      <div class="mk-rows">
        <h4 v-if="teacher">Today's Class by {{teacher.fullName}}</h4>
        <i @click="gobk" class="material-icons arrow">keyboard_backspace</i>
        <p @click="gobk" class="gobk">Go Back</p>
      </div>
      <div class="divider"></div>
      <div class="flex">
        <div :key="index" v-for="(student, index) in attendees" class="attend">
          <div class="chip">
            <span @click="showData(student.id)">{{ student.name }}</span>
            <span @click="isPaid(student.id)" v-if="!student.paid" class="unpaid">Unpaid</span>
            <span @click="isPaid(student.id)" v-if="student.paid" class="paid">Paid</span>
            <i @click="removeAttendee(student.name)" class="close material-icons">close</i>
          </div>
        </div>
      </div>
      <EndClass
        v-bind:students="this.attendees"
        v-bind:teach="this.$route.params.teacher"
        class="fixy"
      />
    </div>
    <!-- 
      
      Modal Window For Student Data
    
    -->
    <div v-if="showModal && studentData" class="moda">
      <div class="modal-content edit">
        <i @click="closeModal" class="material-icons close-btn">close</i>
        <div v-if="!editInfo">
          <div class="flex">
            <p>Name: {{ studentData.fullName }}</p>
            <i
              @click="
                edInfo(
                  studentData.fullName,
                  studentData.seniorOrVet,
                  studentData.punch
                )
              "
              class="material-icons"
            >edit</i>
          </div>
          <div class="flex">
            <p>Senir/Vet: {{ studentData.seniorOrVet }}</p>
            <i class="material-icons">edit</i>
          </div>
          <div class="flex">
            <p>Punches: {{ studentData.punch }}</p>
            <i class="material-icons">edit</i>
          </div>
        </div>
        <div v-if="editInfo">
          <div class="field name">
            <label for="name">New Name</label>
            <input v-model="name" type="text" name="name" />
          </div>
          <p>
            <label>
              <input v-model="senior" type="checkbox" />
              <span>Is this person a Senior/Veteran</span>
            </label>
          </p>
          <p class="punches">How many punches</p>
          <div class="field name">
            <input id="sm-box" v-model="punch" type="number" name="title" />
          </div>
          <div @click="updateInfo(studentData.id)" class="btn">Save Changes</div>
        </div>
      </div>
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
      msg: null,
      students: [],
      checked: [],
      attendees: [],
      paid: false,
      showModal: false,
      studentData: null,
      attendeeCheck: [],
      name: "",
      editInfo: false,
      senior: null,
      punch: null,
      annoy: null,
      teacher: null
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
    gobk() {
      this.$router.push({ path: "/" });
    },
    addStudent(name, id, punch, seniorOrVet) {
      if (punch > 0) {
        if (!this.attendeeCheck.includes(name)) {
          this.attendees.push({
            name: name,
            id: id,
            seniorOrVet: seniorOrVet,
            punch: punch,
            paid: true
          });
          this.attendeeCheck.push(name);
        }
      } else {
        if (!this.attendeeCheck.includes(name)) {
          this.attendees.push({
            name: name,
            id: id,
            seniorOrVet: seniorOrVet,
            punch: punch,
            paid: false
          });
          this.attendeeCheck.push(name);
        }
      }
    },
    closeModal() {
      this.showModal = !this.showModal;
    },
    showData(id) {
      this.showModal = !this.showModal;
      db.collection("students")
        .doc(id)
        .get()
        .then(snapshot => {
          this.studentData = snapshot.data();
          this.studentData.id = snapshot.id;
        });
    },
    updateFeedback(update) {
      this.msg = update;
      setTimeout(() => (this.msg = null), 2000);
    },
    removeAttendee(name) {
      this.attendees = this.attendees.filter(attend => {
        return attend.name != name;
      });
      this.attendeeCheck = this.attendeeCheck.filter(attend => {
        return attend != name;
      });
    },
    isPaid(id) {
      this.attendees.forEach(attend => {
        if (id === attend.id) {
          attend.paid = !attend.paid;
        }
      });
    },
    edInfo(name, senior, punch) {
      this.editInfo = !this.editInfo;
      this.name = name;
      this.senior = senior;
      this.punch = punch;
    },
    updateInfo(id) {
      db.collection("students")
        .doc(id)
        .update({
          fullName: this.name,
          seniorOrVet: this.senior,
          punch: this.punch,
          id: id
        })
        .then(() => {
          this.showModal = false;
          this.editInfo = false;
        });
    }
  },
  async mounted() {
    let ref = await db
      .collection("teachers")
      .where("slug", "==", this.$route.params.teacher);
    await ref.get().then(snapshot => {
      snapshot.forEach(doc => {
        this.teacher = doc.data();
      });
    });
  },
  created() {
    db.collection("students").onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type === "modified") {
          let doc = change.doc;
          this.attendees.forEach(attend => {
            if (doc.id === attend.id) {
              attend.name = doc.data().fullName;
              attend.seniorOrVet = doc.data().seniorOrVet;
              attend.punch = doc.data().punch;
            }
          });
          this.filteredStudents.forEach(attend => {
            if (doc.id === attend.id) {
              attend.fullName = doc.data().fullName;
            }
          });
        }
      });
    });
    db.collection("students").onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type == "added") {
          let doc = change.doc;
          this.students.push({
            fullName: doc.data().fullName,
            seniorOrVet: doc.data().seniorOrVet,
            punch: doc.data().punch,
            id: doc.id
          });
        }
      });
    });
  }
};
</script>

<style lang="scss">
.gobk {
  font-size: 1.2rem;
  padding-top: 0.9rem;
  cursor: pointer;
}
.mk-rows {
  display: flex;
}
.arrow {
  font-size: 2.6rem;
  padding-top: 1.7rem;
  padding-left: 1rem;
  cursor: pointer;
}
.moda {
  .edit {
    width: 33%;
    margin: 0 auto;
    left: 33%;
    .flex {
      align-items: center;
      i {
        margin-left: 1rem;
      }
      .btn {
        margin-left: 5rem;
      }
    }
  }
}

.fixy {
  float: right;
}
.chip {
  width: 100%;
  margin: 1rem 0rem;
  cursor: pointer;
  .unpaid {
    padding: 0.2rem;
    margin-left: 0.1rem;
    font-size: 0.7rem;
    color: red;
  }
  .paid {
    padding: 0.2rem;
    margin-left: 0.1rem;
    font-size: 0.7rem;
    color: green;
  }
}
.cool {
  display: flex;
  margin-bottom: 1rem;
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
