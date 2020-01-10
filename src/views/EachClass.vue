<template>
  <div id="eachClass">
    <!-- 

      Students Who Attended This Class

    -->
    <div>
      <div class="container" id="settings">
        <table class="striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Paid</th>
              <th>Senior/Vet</th>
            </tr>
          </thead>
          <tbody>
            <tr :key="student.id" v-for="student in students" @click="showData(student.id)">
              <td>{{ student.name }}</td>
              <td v-if="student.paid">
                <i class="material-icons green-text">done</i>
              </td>
              <td v-if="!student.paid">
                <i class="material-icons red-text">close</i>
              </td>
              <td v-if="student.seniorOrVet">
                <i class="material-icons green-text">done</i>
              </td>
              <td v-if="!student.seniorOrVet">
                <i class="material-icons red-text">close</i>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- 
  
  Modal Window For Indidual Student Data/Edit 

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
            <p>Senior/Vet: {{ studentData.seniorOrVet }}</p>
            <i class="material-icons">edit</i>
          </div>
          <div class="flex">
            <p>Punches: {{ studentData.punch }}</p>
            <i class="material-icons">edit</i>
          </div>
        </div>
        <div v-if="editInfo && studentData">
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
export default {
  name: "eachClass",
  data() {
    return {
      students: [],
      showModal: false,
      studentData: null,
      editInfo: false,
      senior: null,
      punch: null,
      name: ""
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
    },
    closeModal() {
      this.showModal = !this.showModal;
    }
  }
};
</script>

<style lang="scss">
tbody {
  tr {
    cursor: pointer;
  }
}
</style>
