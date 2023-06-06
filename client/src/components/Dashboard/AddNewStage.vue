<template>
  <div
    class="modal fade"
    id="addStageModal"
    tabindex="-1"
    aria-labelledby="addStageModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="addStageModalLabel">Add New Stage</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form
            @submit.prevent="onSubmit"
            class="needs-validation was-validated"
            novalidate
          >
            <div class="mb-3">
              <label for="title" class="form-label">Title</label>
              <input
                v-model="stage.title"
                type="text"
                class="form-control"
                id="title"
                required
              />
              <div class="invalid-feedback">Title is required.</div>
            </div>
            <div class="mb-3">
              <label class="form-label">Type</label>
              <div>
                <label class="form-check-inline me-3">
                  <input
                    name="hasProjectOrExam"
                    @click="stage.hasProject = false"
                    type="radio"
                    id="hasExam"
                    value="true"
                    checked
                    class="form-check-input"
                  />
                  <span class="form-check-label">Has Exam</span>
                </label>
                <label class="form-check-inline">
                  <input
                    name="hasProjectOrExam"
                    @click="stage.hasProject = true"
                    type="radio"
                    id="hasProject"
                    value="false"
                    class="form-check-input"
                  />
                  <span class="form-check-label">Has Project</span>
                </label>
              </div>
            </div>
            <div class="mb-3" v-if="searchedCourse">
              <label for="selectedCourse" class="form-label"
                >Selected Course</label
              >
              <input
                v-model="searchedCourse.name"
                type="text"
                class="form-control"
                id="selectedCourse"
                readonly
              />
            </div>
            <div class="mb-3">
              <label for="parentCourseSearchTerm" class="form-label"
                >Search for Course</label
              >
              <input
                v-model="parentCourseSearchTerm"
                type="text"
                class="form-control"
                id="parentCourseSearchTerm"
                placeholder="Enter course name..."
                required
              />
              <div class="invalid-feedback">Please select a course.</div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                    Close
                </button>
                <button type="submit" class="btn btn-primary">
                    Add Stage
                </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  data() {
    return {
      stage: {
        title: "",
        hasProject: false,
        course: null,
      },
      parentCourseSearchTerm: "",
      courses: [
        { id: 1, name: "Java", isPublished: true, category: "Web" },
        { id: 2, name: "Javascript", isPublished: true, category: "Web" },
        { id: 3, name: "C#", isPublished: true, category: "Andoid" },
        { id: 4, name: "C++", isPublished: true, category: "Andoid" },
        { id: 5, name: "Python", isPublished: true, category: "Desktop" },
        { id: 6, name: "R", isPublished: false, category: "Desktop" },
        { id: 7, name: "Cotlen", isPublished: false, category: "Web" },
      ],
    };
  },
  computed: {
    searchedCourse() {
      if (this.parentCourseSearchTerm !== "") {
        const searchTermLC = this.parentCourseSearchTerm.toLowerCase();
        this.stage.course = this.courses.find((course: { name: string }) => {
          return course.name.toLowerCase().includes(searchTermLC);
        });
        return this.stage.course;
      } else {
        return null;
      }
    },
  },
  methods: {
    onSubmit() { 
        const form = document.querySelector('.needs-validation') as HTMLFormElement;
        if (form.checkValidity() === true) {
            this.$emit("stage-created", this.stage);
            //$('#addStageModal').modal('hide');
        } else {
            alert('You should fill all boxes!.');
        }
    },
  },
})
export default class AddNewStage extends Vue {
  [x: string]: any;
}
</script>
