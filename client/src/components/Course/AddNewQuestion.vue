<template>
    <div class="modal fade" id="addQuestionModal" tabindex="-1" aria-labelledby="addQuestionModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addQuestionModalLabel">Add Question</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label for="question" class="form-label">Question:</label>
              <input type="text" class="form-control" id="question" v-model="questionText" required>
            </div>
            <div class="mb-3">
              <label for="right-answer" class="form-label">Right Answer:</label>
              <input type="text" class="form-control" id="right-answer" v-model="rightAnswer" required>
            </div>
            <div class="mb-3" v-for="(wrongAnswer, index) in wrongAnswers" :key="index">
              <label class="form-label">Wrong Answer {{ index + 1 }}:</label>
              <div class="input-group">
                <input type="text" class="form-control" v-model="wrongAnswers[index]" required>
                <button class="btn btn-danger" type="button" @click="removeWrongAnswer(index)">Remove</button>
              </div>
            </div>
            <div class="d-grid gap-2">
              <button class="btn btn-primary" type="button" @click="addWrongAnswer()">Add Wrong Answer</button>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-primary" @click="addQuestion()">Add Question</button>
            <div>
              ...
              <div v-if="errorMessage" class="alert alert-danger" role="alert">
                Please fill in all fields.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
    name: "AddQuestionModal",
    data() {
      return {
        questionText: "",
        rightAnswer: "",
        wrongAnswers: [] ,
        errorMessage: '',
      };
    },
    methods: {
      addWrongAnswer() {
        this.wrongAnswers.push("");
      },
      removeWrongAnswer(index: number) {
        this.wrongAnswers.splice(index, 1);
      },
      addQuestion() {
        if (this.questionText && this.rightAnswer && this.wrongAnswers.every((answer: string) => answer)){
           // add the question
           const question = {
          text: this.questionText,
          rightAnswer: this.rightAnswer,
          wrongAnswers: this.wrongAnswers,
        };
        this.$emit('AddQuestionEvent', question);
        this.questions.push(question);
    this.questionText = "";
    this.rightAnswer = ""; 
    this.wrongAnswers = ["", "", "", ""];
        (document.getElementById("addQuestionModal") as HTMLDivElement).classList.remove("show");
        (document.getElementById("addQuestionModal") as HTMLDivElement).style.display = "none";
        (document.body as HTMLBodyElement).classList.remove("modal-open");
        (document.querySelector(".modal-backdrop") as HTMLDivElement).remove();
         } else {
           // show error message
           this.errorMessage = 'Please fill in all fields.';
         }
      },
  

    },
  })
  export default class AddNewQusetion extends Vue {
    [x: string]: any;}
  </script>
  
  