<template>
  <div class="about container">
    <form>
      <div class="feild">
        <label class="teacher" for="teacher">Who's teaching this class?</label>
        <select @change="getSlug" v-model="teach" name="teacher">
          <option disabled value>Please select one</option>
          <option :key="index" v-for="(teacher, index) in teachers">
            {{
            teacher.fullName
            }}
          </option>
        </select>
      </div>
      <router-link
        :disabled="teach == ''"
        class="btn float-right"
        :to="{ name: 'home', params: { teacher: slug } }"
      >Start Class</router-link>
    </form>
    <AddTeacher />
  </div>
</template>
<script>
import AddTeacher from "../components/AddTeacher";
import db from "../firebase/init";
export default {
  name: "About",
  components: {
    AddTeacher
  },
  data() {
    return {
      teach: "",
      slug: "No",
      teachers: []
    };
  },
  methods: {
    getSlug() {
      this.teachers.forEach(teacher => {
        if (teacher.fullName == this.teach) {
          this.slug = teacher.slug;
        }
      });
    }
  },
  created() {
    db.collection("teachers").onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type == "added") {
          let doc = change.doc;
          this.teachers.push({
            fullName: doc.data().fullName,
            slug: doc.data().slug,
            id: doc.id
          });
        }
      });
    });
  }
};
</script>
<style lang="scss">
.float-right {
  float: right;
}
.about {
  margin-top: 8rem;
  select {
    margin-bottom: 1.5rem;
    width: 50%;
    border: 1px solid #999ead;
    display: block;
  }
}
form {
  .feild {
    .teacher {
      font-size: 2rem;
      color: #856721;
    }
  }
}
</style>
