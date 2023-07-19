<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light mb-3">
      <div class="container-fluid">
        <form class="d-flex me-auto" @submit.prevent="onSubmit">
          <input
            v-model="searchTerm"
            class="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            id="search-bar"
          />
          <button class="btn btn-outline-success" type="submit">
            <i class="fas fa-search"></i>
          </button>
        </form>
        <button
          class="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#addStageModal"
        >
          Add New Stage <i class="fas fa-plus"></i>
        </button>
      </div>
    </nav>
    <div class="container">
      <div class="row">
        <div
          class="col-12"
          style="max-height: 415px; overflow-y: scroll; margin: 0"
        >
          <div
            v-for="(stage, index) in searchResults"
            :key="index"
            class="stage-card"
          >
            <span class="fw-bold"> {{ stage.title }} </span>
            <span v-if="stage.hasProject" class="text-muted">
              Has Project
            </span>
            <span v-if="!stage.hasProject" class="text-muted"> Has Exam </span>
            <span class="text-muted">@{{ stage.course.name }}</span>
            <div class="btn-group float-end">
              <button
                v-if="stage.hasProject"
                @click="currentStageForCreateAskedProject = stage"
                data-bs-toggle="modal"
                data-bs-target="#addNewtageAskedProject"
                class="btn btn-outline-primary"
                title="Create Stage's Asked Project"
              >
                <i class="fa-solid fa-upload"></i
                ><i class="fas fa-clipboard-list"></i>
              </button>
              <button
                v-else-if="!stage.hasProject"
                @click="goToStageExam(stage)"
                class="btn btn-outline-primary"
                title="Create Stage's Exam"
                ><i class="fa-solid fa-upload"></i
                ><i class="fas fa-clipboard-list"></i>
                </button>
              <button @click="goToStagesLessons(stage)" class="btn btn-outline-info" title="View Stage Details">
                <i class="fas fa-info-circle"></i
              ></button>
              <button @click="deleteThisStage(stage)" class="btn btn-outline-danger" title="Delete Stage">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--Adding New Stage Modal-->
    <AddNewStage @stage-created="loadStages" />

    <!--Adding New Stage Asked Project Modal-->
    <AddNewStageAskedProject :currentStageForCreateAskedProject="currentStageForCreateAskedProject"/>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import AddNewStage from "@/components/Dashboard/AddNewStage.vue";
import AddNewStageAskedProject from "@/components/Dashboard/AddNewStageAskedProject.vue";
import axios from "axios";
import Swal from "sweetalert2";

@Options({
  components: {
    AddNewStage,
    AddNewStageAskedProject,
  },
  computed: {
    searchResults() {
      return this.stages.filter(
        (stage: {
          title: string;
          hasProject: boolean;
          course: any;
        }): any => {
          const searchTermLC = this.searchTerm.toLowerCase();
          if (searchTermLC == "projects" || searchTermLC == "project") {
            return stage.hasProject == true;
          } else if (searchTermLC == "exams" || searchTermLC == "exam") {
            return stage.hasProject == false;
          } else {
            return (
              stage.title.toLowerCase().includes(searchTermLC) ||
              stage.course.name.toLowerCase().includes(searchTermLC)
            );
          }
        }
      );
    },
  },
  data() {
    return {
      searchTerm: "",
      stages: [],
      currentStageForCreateAskedProject: null
    };
  },
  created() {
    this.loadStages();
  },
  methods: {
    async goToStagesLessons(stage: any) {
      this.$store.state.stageInLessonPage = await stage;
      this.$router.push('/stage');
    },
    async goToStageExam(stage: any) {
      this.$store.state.stageInExamPage = await stage;
      this.$router.push('/exam');
    },
    deleteThisStage(stage: any) {
      Swal.fire({
        title: "Delete?",
        text: `Are you sure. you went to delete ${ stage.title }.`,
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: '#ff0101',
        cancelButtonColor: '#22aa22',
        confirmButtonText: "Yes, Delete",
        cancelButtonText: "No",
      }).then(async (result: any) => {
        if (result.isConfirmed) {
          try {
            const deleteStagesLessons = await axios.delete(`http://localhost:3000/lessons/all-in-stage/${stage.id}`);
            const deleteStagesExams = await axios.delete(`http://localhost:3000/exams/all-in-stage/${stage.id}`);
            const deleteStage = await axios.delete(`http://localhost:3000/stages/${stage.id}`);
            this.loadStages();
          } catch (error: any) {
            Swal.fire({
              icon: "error",
              title: "Network Error",
              text: error.message,
            });
          }
        }
      });
    },
    async loadStages() {
      try {
        const respons = await axios.get('http://localhost:3000/stages');
        this.stages = respons.data;
      } catch (error) {}
    },
  },
})
export default class ShowStages extends Vue {
  [x: string]: any;
}
</script>

<style scoped>
.stage-card {
  margin-bottom: 20px;
}
.stage-card .btn {
  margin-right: 5px;
}
.stage-card:hover {
  background-color: #f5f5f5;
  cursor: pointer;
}
</style>
