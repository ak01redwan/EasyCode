<template>
  <div class="container mt-4">
    <h1>Stage Question</h1>
    <div class="d-flex align-items-center">
      <button
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#addQuestionModal"
      >
        Add Question <i class="fas fa-plus"></i>
      </button>
      <AddNewQusetion @AddQuestionEvent="addQuestion" />
    </div>
    <div class="mt-4">
      <div
        v-for="(question, index) in questions"
        :key="question.id"
        class="mb-3"
      >
        <div class="d-flex justify-content-between align-items-center">
          <div>{{ question.text }}</div>
          <div>
            <button
              class="btn btn-sm btn-primary me-2"
              @click="editQuestion(index)"
            >
              <i class="bi bi-pencil"></i> Edit
            </button>
            <button
              class="btn btn-sm btn-danger"
              @click="deleteQuestion(index)"
            >
              <i class="bi bi-trash"></i> Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import AddNewQusetion from "@/views/AddNewQuestion.vue";

@Options({
  name: "StageQuestion",
  components: {
    AddNewQusetion,
  },
  data() {
    return {
      showModal: false,
      questions: [],
    };
  },
  methods: {
    addQuestion(question: any) {
      //console.log(question);
      this.questions.push(question);
    },
    editQuestion(index: number) {
      const question = this.questions[index];
      this.$bvModal.show("add-question-modal");
      this.editingQuestionIndex = index;
      this.editingQuestion = {
        text: question.text,
        rightAnswer: question.rightAnswer,
        wrongAnswers: [...question.wrongAnswers],
      };
    },
    deleteQuestion(index: number) {
      this.questions.splice(index, 1);
    },
    saveQuestion() {
      if (this.editingQuestionIndex !== undefined) {
        this.questions.splice(
          this.editingQuestionIndex,
          1,
          this.editingQuestion
        );
      } else {
        this.questions.push(this.editingQuestion);
      }
      this.resetModal();
    },
  },
})
export default class ExamViewVue extends Vue {
  [x: string]: any;
}
</script>

<style scoped>
/* Add any custom styles here */
</style>
