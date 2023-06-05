<template>
  <div >
    <div class="m-5">
        <h2 class="text-center">You are required to biuld this project</h2>
        <div class="m-3"> 
            <span class="fs-4 fw-bold me-1">Name: </span>
            <span class="fs-5">EasyCode Website</span>
        </div>
        <div class="m-3">
            <span class="fs-4 fw-bold me-1 fw-bold">Decoument: </span>
            <button class="btn btn-info fa-circle-play"> Download. </button>
        </div>
    </div>
    <div class="border rounded p-3 m-5 ">
        <h5 class="border-bottom pb-2 text-warning">Note</h5>
        <p class="text-secondary">You need to download the documents to read the detials and then submipt the project from the form bellow.<span class="text-info d-block">(save your project in .zip or .rar and submit it bellow.)</span></p>
    </div>
    <div class="card border-primary m-5 row" style="background:#EAEBED">
      <form @submit.prevent="" class="col-12 needs-validated p-4">
        <!--title the form -->
        <h3 class="col-12" >Submit The Project.</h3>
        <!-- Project title input -->
        <div class="mb-3 was-validated">
          <label for="projectTitle" class="form-label ms-2">Enter your project title</label>
          <input v-model="projectTitle" type="text" class="form-control" id="projectTitle" required>
          <div class="invalid-feedback fs-6">Please enter your project title.</div>
          <div class="valid-feedback fs-6">Looks Good</div>
        </div>
  
        <!-- Project image input -->
        <div class="mb-3 was-validated">
          <label for="projectImage" class="form-label ms-2">Enter your project image</label>
          <input ref="projectImage" type="file" class="form-control" id="projectImage" accept="image/*" required>
          <div class="invalid-feedback fs-6">Please enter your project image.</div>
          <div class="valid-feedback fs-6">Looks Good</div>
        </div>
  
        <!-- Project document input -->
        <div class="mb-3 was-validated">
          <label for="projectDocument" class="form-label ms-2">Enter your project document (.rar or .zip)</label>
          <input ref="projectDocument" type="file" class="form-control" id="projectDocument" accept=".rar,.zip" required>
          <div class="invalid-feedback fs-6">Please enter your project document.</div>
          <div class="valid-feedback fs-6">Looks Good</div>
        </div>
  
        <!-- Submit button -->
        <button type="submit" class="btn btn-primary d-block mt-4 m-auto fw-bold col-9">Submit</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';  
@Options({
  data() {
    return {
      projectTitle: '',
    }
  }
})
export default class StageAskedProjectView extends Vue {
}
</script>
