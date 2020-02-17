<template>
  <div class="allStudents">
    <div class="select-container">
      <div class="move-right">
        <label id="label-style" for="type">Select Year</label>
        <select @change="changeYear" v-model="selectedYear" id="type">
          <option :key="year" v-for="year in yearSelect">{{ year }}</option>
        </select>
      </div>
    </div>
    <div class="selector">
      <div class="teacher-name" :key="index" v-for="(teacher, index) in teachersOutput">
        <div class="inLine">
          <p
            v-if="teacher.canSee"
            class="name"
            @click="viewRep(teacher), changeYear()"
            :class="{ active: teacher.isActive }"
          >{{ teacher.name }}</p>
          <i @click="noActive" v-if="teacher.isActive" class="material-icons">close</i>
        </div>
        <div class="line"></div>
        <div v-if="teacher.isActive" class="teacher-report">
          <div id="fixIt" class="selector fixIt">
            <p class="months" @click="showReport(teacher.name, 0)">January</p>
            <p class="months" @click="showReport(teacher.name, 1)">February</p>
            <p class="months" @click="showReport(teacher.name, 2)">March</p>
            <p class="months" @click="showReport(teacher.name, 3)">April</p>
            <p class="months" @click="showReport(teacher.name, 4)">May</p>
            <p class="months" @click="showReport(teacher.name, 5)">June</p>
            <p class="months" @click="showReport(teacher.name, 6)">July</p>
            <p class="months" @click="showReport(teacher.name, 7)">August</p>
            <p class="months" @click="showReport(teacher.name, 8)">September</p>
            <p class="months" @click="showReport(teacher.name, 9)">October</p>
            <p class="months" @click="showReport(teacher.name, 10)">November</p>
            <p class="months" @click="showReport(teacher.name, 11)">December</p>
          </div>

          <transition v-if="showModal" name="modal">
            <div class="modal-mask">
              <div class="modal-wrapper">
                <div class="modal-container">
                  <div class="modal-body">
                    <div v-if="toggleReport" class="janReport">
                      <p>Regular Visits: {{ regularVisits }}</p>
                      <p>Senior Visits: {{ seniorVisits }}</p>
                      <p>Regular Punches:{{ regularPunches }}</p>
                      <p>Senior Punches: {{ seniorPunches }}</p>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <slot name="footer">
                      <button class="modal-default-button btn" @click="toggleModal">OK</button>
                    </slot>
                  </div>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from "../firebase/init";
export default {
  name: "MonthlyReport",
  data() {
    return {
      yearSelect: [],
      selectedYear: null,
      showModal: false,
      toggleReport: false,
      regularPunches: 0,
      seniorPunches: 0,
      regularVisits: 0,
      seniorVisits: 0,
      classes: [],
      teachers: [],
      teachersOutput: [],
      jan: [],
      feb: [],
      mar: [],
      apr: [],
      may: [],
      jun: [],
      jul: [],
      aug: [],
      sep: [],
      oct: [],
      nov: [],
      dec: []
    };
  },
  methods: {
    noActive() {
      this.teachersOutput.forEach(teacher => {
        teacher.isActive = false;
        teacher.canSee = true;
      });
    },
    changeYear() {
      this.jan = [];
      this.feb = [];
      this.mar = [];
      this.apr = [];
      this.may = [];
      this.jun = [];
      this.jul = [];
      this.aug = [];
      this.sep = [];
      this.oct = [];
      this.nov = [];
      this.dec = [];
      this.classes.forEach(archive => {
        if (
          new Date(archive.timeStamp).getMonth() === 0 &&
          new Date(archive.timeStamp).getFullYear() ===
            parseInt(this.selectedYear)
        ) {
          this.jan.push(archive);
        }
        if (
          new Date(archive.timeStamp).getMonth() === 1 &&
          new Date(archive.timeStamp).getFullYear() ===
            parseInt(this.selectedYear)
        ) {
          this.feb.push(archive);
        }
        if (
          new Date(archive.timeStamp).getMonth() === 2 &&
          new Date(archive.timeStamp).getFullYear() ===
            parseInt(this.selectedYear)
        ) {
          this.mar.push(archive);
        }
        if (
          new Date(archive.timeStamp).getMonth() === 3 &&
          new Date(archive.timeStamp).getFullYear() ===
            parseInt(this.selectedYear)
        ) {
          this.apr.push(archive);
        }
        if (
          new Date(archive.timeStamp).getMonth() === 4 &&
          new Date(archive.timeStamp).getFullYear() ===
            parseInt(this.selectedYear)
        ) {
          this.may.push(archive);
        }
        if (
          new Date(archive.timeStamp).getMonth() === 5 &&
          new Date(archive.timeStamp).getFullYear() ===
            parseInt(this.selectedYear)
        ) {
          this.jun.push(archive);
        }
        if (
          new Date(archive.timeStamp).getMonth() === 6 &&
          new Date(archive.timeStamp).getFullYear() ===
            parseInt(this.selectedYear)
        ) {
          this.jul.push(archive);
        }
        if (
          new Date(archive.timeStamp).getMonth() === 7 &&
          new Date(archive.timeStamp).getFullYear() ===
            parseInt(this.selectedYear)
        ) {
          this.aug.push(archive);
        }
        if (
          new Date(archive.timeStamp).getMonth() === 8 &&
          new Date(archive.timeStamp).getFullYear() ===
            parseInt(this.selectedYear)
        ) {
          this.sep.push(archive);
        }
        if (
          new Date(archive.timeStamp).getMonth() === 9 &&
          new Date(archive.timeStamp).getFullYear() ===
            parseInt(this.selectedYear)
        ) {
          this.oct.push(archive);
        }
        if (
          new Date(archive.timeStamp).getMonth() === 10 &&
          new Date(archive.timeStamp).getFullYear() ===
            parseInt(this.selectedYear)
        ) {
          this.nov.push(archive);
        }
        if (
          new Date(archive.timeStamp).getMonth() === 11 &&
          new Date(archive.timeStamp).getFullYear() ===
            parseInt(this.selectedYear)
        ) {
          this.dec.push(archive);
        }
      });
    },
    toggleModal() {
      this.showModal = !this.showModal;
      this.toggleReport = !this.toggleReport;
    },
    viewRep(teacher) {
      this.teachersOutput.forEach(teacher => {
        if (teacher.isActive) {
          teacher.isActive = !teacher.isActive;
        }
      });
      teacher.isActive = !teacher.isActive;
      this.teachersOutput.forEach(teacher => {
        if (!teacher.isActive && teacher.canSee) {
          teacher.canSee = !teacher.canSee;
        }
      });
    },
    showReport(teacher, month) {
      let janStudents = [];
      let seniorPunches = 0;
      let seniorVisits = 0;
      let regularPunches = 0;
      let regularVisits = 0;
      this.seniorPunches = 0;

      if (month == 0) {
        this.jan.forEach(clas => {
          if (clas.teacher === teacher) {
            clas.students.forEach(student => {
              janStudents.push(student);
            });
          }
        });
        janStudents.forEach(student => {
          if (
            student.paid === true &&
            student.punch > 0 &&
            student.seniorOrVet
          ) {
            seniorPunches += 1;
          }
          if (
            student.paid === true &&
            student.punch === 0 &&
            student.seniorOrVet
          ) {
            seniorVisits += 1;
          }
          if (
            student.paid === true &&
            student.punch > 0 &&
            !student.seniorOrVet
          ) {
            regularPunches += 1;
          }
          if (
            student.paid === true &&
            student.punch === 0 &&
            student.seniorOrVet
          ) {
            regularVisits += 1;
          }
        });

        this.regularPunches = regularPunches;
        this.regularVisits = regularVisits;
        this.seniorPunches = seniorPunches;
        this.seniorVisits = seniorVisits;
        this.toggleReport = !this.toggleReport;
      }
      //Report for Feb
      if (month == 1) {
        this.feb.forEach(clas => {
          if (clas.teacher === teacher) {
            clas.students.forEach(student => {
              janStudents.push(student);
            });
          }
        });
        janStudents.forEach(student => {
          if (
            student.paid === true &&
            student.punch > 0 &&
            student.seniorOrVet
          ) {
            seniorPunches += 1;
          }
          if (
            student.paid === true &&
            student.punch === 0 &&
            student.seniorOrVet
          ) {
            seniorVisits += 1;
          }
          if (
            student.paid === true &&
            student.punch > 0 &&
            !student.seniorOrVet
          ) {
            regularPunches += 1;
          }
          if (
            student.paid === true &&
            student.punch === 0 &&
            student.seniorOrVet
          ) {
            regularVisits += 1;
          }
        });

        this.regularPunches = regularPunches;
        this.regularVisits = regularVisits;
        this.seniorPunches = seniorPunches;
        this.seniorVisits = seniorVisits;
        this.toggleReport = !this.toggleReport;
      }
      //Report for Mar
      if (month == 2) {
        this.mar.forEach(clas => {
          if (clas.teacher === teacher) {
            clas.students.forEach(student => {
              janStudents.push(student);
            });
          }
        });
        janStudents.forEach(student => {
          if (
            student.paid === true &&
            student.punch > 0 &&
            student.seniorOrVet
          ) {
            seniorPunches += 1;
          }
          if (
            student.paid === true &&
            student.punch === 0 &&
            student.seniorOrVet
          ) {
            seniorVisits += 1;
          }
          if (
            student.paid === true &&
            student.punch > 0 &&
            !student.seniorOrVet
          ) {
            regularPunches += 1;
          }
          if (
            student.paid === true &&
            student.punch === 0 &&
            student.seniorOrVet
          ) {
            regularVisits += 1;
          }
        });

        this.regularPunches = regularPunches;
        this.regularVisits = regularVisits;
        this.seniorPunches = seniorPunches;
        this.seniorVisits = seniorVisits;
        this.toggleReport = !this.toggleReport;
      }
      //Report for Apr
      if (month == 3) {
        this.apr.forEach(clas => {
          if (clas.teacher === teacher) {
            clas.students.forEach(student => {
              janStudents.push(student);
            });
          }
        });
        janStudents.forEach(student => {
          if (
            student.paid === true &&
            student.punch > 0 &&
            student.seniorOrVet
          ) {
            seniorPunches += 1;
          }
          if (
            student.paid === true &&
            student.punch === 0 &&
            student.seniorOrVet
          ) {
            seniorVisits += 1;
          }
          if (
            student.paid === true &&
            student.punch > 0 &&
            !student.seniorOrVet
          ) {
            regularPunches += 1;
          }
          if (
            student.paid === true &&
            student.punch === 0 &&
            student.seniorOrVet
          ) {
            regularVisits += 1;
          }
        });

        this.regularPunches = regularPunches;
        this.regularVisits = regularVisits;
        this.seniorPunches = seniorPunches;
        this.seniorVisits = seniorVisits;
        this.toggleReport = !this.toggleReport;
      }
      //Report for May
      if (month == 4) {
        this.may.forEach(clas => {
          if (clas.teacher === teacher) {
            clas.students.forEach(student => {
              janStudents.push(student);
            });
          }
        });
        janStudents.forEach(student => {
          if (
            student.paid === true &&
            student.punch > 0 &&
            student.seniorOrVet
          ) {
            seniorPunches += 1;
          }
          if (
            student.paid === true &&
            student.punch === 0 &&
            student.seniorOrVet
          ) {
            seniorVisits += 1;
          }
          if (
            student.paid === true &&
            student.punch > 0 &&
            !student.seniorOrVet
          ) {
            regularPunches += 1;
          }
          if (
            student.paid === true &&
            student.punch === 0 &&
            student.seniorOrVet
          ) {
            regularVisits += 1;
          }
        });

        this.regularPunches = regularPunches;
        this.regularVisits = regularVisits;
        this.seniorPunches = seniorPunches;
        this.seniorVisits = seniorVisits;
        this.toggleReport = !this.toggleReport;
      }
      //Report for Jun
      if (month == 5) {
        this.jun.forEach(clas => {
          if (clas.teacher === teacher) {
            clas.students.forEach(student => {
              janStudents.push(student);
            });
          }
        });
        janStudents.forEach(student => {
          if (
            student.paid === true &&
            student.punch > 0 &&
            student.seniorOrVet
          ) {
            seniorPunches += 1;
          }
          if (
            student.paid === true &&
            student.punch === 0 &&
            student.seniorOrVet
          ) {
            seniorVisits += 1;
          }
          if (
            student.paid === true &&
            student.punch > 0 &&
            !student.seniorOrVet
          ) {
            regularPunches += 1;
          }
          if (
            student.paid === true &&
            student.punch === 0 &&
            student.seniorOrVet
          ) {
            regularVisits += 1;
          }
        });

        this.regularPunches = regularPunches;
        this.regularVisits = regularVisits;
        this.seniorPunches = seniorPunches;
        this.seniorVisits = seniorVisits;
        this.toggleReport = !this.toggleReport;
      }
      //Report for Jul
      if (month == 6) {
        this.jul.forEach(clas => {
          if (clas.teacher === teacher) {
            clas.students.forEach(student => {
              janStudents.push(student);
            });
          }
        });
        janStudents.forEach(student => {
          if (
            student.paid === true &&
            student.punch > 0 &&
            student.seniorOrVet
          ) {
            seniorPunches += 1;
          }
          if (
            student.paid === true &&
            student.punch === 0 &&
            student.seniorOrVet
          ) {
            seniorVisits += 1;
          }
          if (
            student.paid === true &&
            student.punch > 0 &&
            !student.seniorOrVet
          ) {
            regularPunches += 1;
          }
          if (
            student.paid === true &&
            student.punch === 0 &&
            student.seniorOrVet
          ) {
            regularVisits += 1;
          }
        });

        this.regularPunches = regularPunches;
        this.regularVisits = regularVisits;
        this.seniorPunches = seniorPunches;
        this.seniorVisits = seniorVisits;
        this.toggleReport = !this.toggleReport;
      }
      //Report for Aug
      if (month == 7) {
        this.aug.forEach(clas => {
          if (clas.teacher === teacher) {
            clas.students.forEach(student => {
              janStudents.push(student);
            });
          }
        });
        janStudents.forEach(student => {
          if (
            student.paid === true &&
            student.punch > 0 &&
            student.seniorOrVet
          ) {
            seniorPunches += 1;
          }
          if (
            student.paid === true &&
            student.punch === 0 &&
            student.seniorOrVet
          ) {
            seniorVisits += 1;
          }
          if (
            student.paid === true &&
            student.punch > 0 &&
            !student.seniorOrVet
          ) {
            regularPunches += 1;
          }
          if (
            student.paid === true &&
            student.punch === 0 &&
            student.seniorOrVet
          ) {
            regularVisits += 1;
          }
        });

        this.regularPunches = regularPunches;
        this.regularVisits = regularVisits;
        this.seniorPunches = seniorPunches;
        this.seniorVisits = seniorVisits;
        this.toggleReport = !this.toggleReport;
      }
      //Report for Sep
      if (month == 8) {
        this.sep.forEach(clas => {
          if (clas.teacher === teacher) {
            clas.students.forEach(student => {
              janStudents.push(student);
            });
          }
        });
        janStudents.forEach(student => {
          if (
            student.paid === true &&
            student.punch > 0 &&
            student.seniorOrVet
          ) {
            seniorPunches += 1;
          }
          if (
            student.paid === true &&
            student.punch === 0 &&
            student.seniorOrVet
          ) {
            seniorVisits += 1;
          }
          if (
            student.paid === true &&
            student.punch > 0 &&
            !student.seniorOrVet
          ) {
            regularPunches += 1;
          }
          if (
            student.paid === true &&
            student.punch === 0 &&
            student.seniorOrVet
          ) {
            regularVisits += 1;
          }
        });

        this.regularPunches = regularPunches;
        this.regularVisits = regularVisits;
        this.seniorPunches = seniorPunches;
        this.seniorVisits = seniorVisits;
        this.toggleReport = !this.toggleReport;
      }
      //Report for Oct
      if (month == 9) {
        this.oct.forEach(clas => {
          if (clas.teacher === teacher) {
            clas.students.forEach(student => {
              janStudents.push(student);
            });
          }
        });
        janStudents.forEach(student => {
          if (
            student.paid === true &&
            student.punch > 0 &&
            student.seniorOrVet
          ) {
            seniorPunches += 1;
          }
          if (
            student.paid === true &&
            student.punch === 0 &&
            student.seniorOrVet
          ) {
            seniorVisits += 1;
          }
          if (
            student.paid === true &&
            student.punch > 0 &&
            !student.seniorOrVet
          ) {
            regularPunches += 1;
          }
          if (
            student.paid === true &&
            student.punch === 0 &&
            student.seniorOrVet
          ) {
            regularVisits += 1;
          }
        });

        this.regularPunches = regularPunches;
        this.regularVisits = regularVisits;
        this.seniorPunches = seniorPunches;
        this.seniorVisits = seniorVisits;
        this.toggleReport = !this.toggleReport;
      }
      //Report for Nov
      if (month == 10) {
        this.jul.forEach(clas => {
          if (clas.teacher === teacher) {
            clas.students.forEach(student => {
              janStudents.push(student);
            });
          }
        });
        janStudents.forEach(student => {
          if (
            student.paid === true &&
            student.punch > 0 &&
            student.seniorOrVet
          ) {
            seniorPunches += 1;
          }
          if (
            student.paid === true &&
            student.punch === 0 &&
            student.seniorOrVet
          ) {
            seniorVisits += 1;
          }
          if (
            student.paid === true &&
            student.punch > 0 &&
            !student.seniorOrVet
          ) {
            regularPunches += 1;
          }
          if (
            student.paid === true &&
            student.punch === 0 &&
            student.seniorOrVet
          ) {
            regularVisits += 1;
          }
        });

        this.regularPunches = regularPunches;
        this.regularVisits = regularVisits;
        this.seniorPunches = seniorPunches;
        this.seniorVisits = seniorVisits;
        this.toggleReport = !this.toggleReport;
      }
      //Report for Dec
      if (month == 11) {
        this.dec.forEach(clas => {
          if (clas.teacher === teacher) {
            clas.students.forEach(student => {
              janStudents.push(student);
            });
          }
        });
        janStudents.forEach(student => {
          if (
            student.paid === true &&
            student.punch > 0 &&
            student.seniorOrVet
          ) {
            seniorPunches += 1;
          }
          if (
            student.paid === true &&
            student.punch === 0 &&
            student.seniorOrVet
          ) {
            seniorVisits += 1;
          }
          if (
            student.paid === true &&
            student.punch > 0 &&
            !student.seniorOrVet
          ) {
            regularPunches += 1;
          }
          if (
            student.paid === true &&
            student.punch === 0 &&
            student.seniorOrVet
          ) {
            regularVisits += 1;
          }
        });

        this.regularPunches = regularPunches;
        this.regularVisits = regularVisits;
        this.seniorPunches = seniorPunches;
        this.seniorVisits = seniorVisits;
        this.toggleReport = !this.toggleReport;
      }
      this.showModal = !this.showModal;
    }
  },
  async created() {
    let thisYear = Date.now();
    thisYear = new Date(thisYear).getFullYear();
    this.selectedYear = thisYear;
    let ref = await db.collection("classes");
    await ref.get().then(snapshot => {
      snapshot.forEach(doc => {
        this.classes.push(doc.data());
        if (!this.teachers.includes(doc.data().teacher)) {
          this.teachers.push(doc.data().teacher);
        }
      });
    });
    await this.classes.forEach(archive => {
      if (
        !this.yearSelect.includes(new Date(archive.timeStamp).getFullYear())
      ) {
        this.yearSelect.push(new Date(archive.timeStamp).getFullYear());
      }
    });
    await this.teachers.forEach(teacher => {
      this.teachersOutput.push({
        name: teacher,
        isActive: false,
        canSee: true
      });
    });
  }
};
</script>

<style lang="scss">
@media only screen and (max-width: 700px) {
  .allStudents {
    .select-container {
      width: 90%;
      margin: 0 auto;
    }
  }
  .container {
    #type {
      display: initial;
      width: 60%;
      border: 1px solid rgb(124, 122, 122);
    }
  }
  #fixIt {
    position: static;
    display: grid;
    grid-template-columns: auto auto;
    .months {
      width: 50%;
      font-size: 1.2rem;
    }
  }
  .selector {
    flex-direction: column;
  }
}
.line {
  background-color: #856721;
  height: 1px;
  width: 110%;
}
.inLine {
  display: flex;
  .material-icons {
    padding-top: 1.6rem;
  }
}
.select-container {
  width: 40%;
  margin-left: auto;
}
#label-style {
  font-size: 1rem;
  color: black;
  padding-right: 1rem;
  display: block;
}

#type {
  display: initial;
  width: 30%;
  border: 1px solid rgb(124, 122, 122);
}
.selector {
  display: flex;
  width: 90%;
  margin: 0 auto;

  .months {
    padding: 1rem;
  }
}
.teacher-name {
  padding: 0.7rem;
}
.name {
  font-size: 1.6rem;
}
.active {
  color: #856721;
}
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
