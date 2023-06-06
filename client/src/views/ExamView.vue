<template>
  <div class="container mt-4" style="min-height: 70vh">
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
      
      <b-modal id="edit-question-modal" title="Edit Question" aria-labelledby="edit-question-modal" aria-hidden="true" v-if="showEditModal">
        <div>
          <label>Question:</label>
          <input v-model="editingQuestion.text" class="form-control" />
        </div>
        <div class="mt-3">
          <label>Right Answer:</label>
          <input v-model="editingQuestion.rightAnswer" class="form-control" />
        </div>
        <div class="mt-3">
          <label>Wrong Answers:</label>
          <div
            v-for="(answer, index) in editingQuestion.wrongAnswers"
            :key="index"
          >
            <input
              v-model="editingQuestion.wrongAnswers[index]"
              class="form-control"
            />
          </div>
        </div>
        <div class="mt-3">
          <button class="btn btn-primary" @click="saveQuestion">Save</button>
          <button class="btn btn-secondary" @click="resetModal">Cancel</button>
        </div>
      </b-modal>
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
import AddNewQusetion from "@/components/Course/AddNewQuestion.vue";

@Options({
  name: "StageQuestion",
  components: {
    AddNewQusetion,
  },
  data() {
    return {
      showModal: false,
      questions: [],
      showEditModal: false,
      editingQuestion: {
        text: "",
        rightAnswer: "",
        wrongAnswers: ["", "", "", ""],
      },
      editingQuestionIndex: undefined,
    };
  },
  methods: {
    addQuestion(questionData: any) {
      this.questions.push(questionData);
      this.$bvModal.hide("add-question-modal");
    },
    updateQuestion(questionData: any, index: number) {
      this.questions.splice(index, 1, questionData);
      this.$bvModal.hide("add-question-modal");
      this.editingQuestion = null;
      this.editingQuestionIndex = undefined;
    },
    // addQuestion(question: any) {
    //   //console.log(question);
    //   this.questions.push(question);
    // },
    editQuestion(index: number) {
      const question = this.questions[index];
      this.editingQuestionIndex = index;
      this.editingQuestion = {
        text: question.text,
        rightAnswer: question.rightAnswer,
        wrongAnswers: [...question.wrongAnswers],
      };
      this.showEditModal = true;
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
      }
      
      this.showEditModal = false;
    },
    resetModal() {
      this.editingQuestion = {
        text: "",
        rightAnswer: "",
        wrongAnswers: ["", "", "", ""],
      };
      this.editingQuestionIndex = undefined;
      this.showEditModal = false;
    },
  },
})
export default class ExamView extends Vue {
  [x: string]: any;
  $bvModal!: { show: Function; hide: Function };
}
</script>

<style scoped>
/* Add any custom styles here */
</style>
