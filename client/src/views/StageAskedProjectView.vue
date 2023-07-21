<template>
  <div v-if="askedProject">
    <div class="m-5">
        <h1 class="text-center"><strong>You are required to biuld this project</strong></h1>
        <div class="m-3"> 
            <span class="fs-4 fw-bold me-1">Name:</span>
            <span class="fs-5">{{ askedProject.name }}</span>
        </div>
        <div class="m-3">
            <span class="fs-4 fw-bold me-1 fw-bold"> <i class="fa fa-file-archive" aria-hidden="true"></i> Decoument: </span>
            <button @click="downloadThisStagesAskedProjectFile(askedProject)" class="btn btn-info">
              <i class="fa fa-cloud-download" aria-hidden="true"></i> Download 
            </button> or 
            <a :href="`http://localhost:3000${askedProject.documentsPath}`" target="_blank" class="btn btn-primary"><i class="fa fa-eye" aria-hidden="true"></i> View </a>
        </div>
    </div>
    <div class="border rounded p-3 m-5 ">
        <h5 class="border-bottom pb-2 text-warning"> <i class="fa fa-exclamation-triangle" aria-hidden="true"></i> Note</h5>
        <p class="text-secondary">You need to download or view this PDF document in order to read the asked project details and then submit the project from the form bellow.
        <span class="text-warning d-block"> (save your project in .zip or .rar and submit it bellow)</span></p>
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
import axios from 'axios';
import Swal from 'sweetalert2';
import { Options, Vue } from 'vue-class-component';  
@Options({
  async created() {
    await this.loadStage();
  },
  data() {
    return {
      askedProject: null,
      stage: null,
      // those here are the students projects variables
      projectTitle: '',
    }
  },
  methods: {
    async downloadThisStagesAskedProjectFile(askedProject: any) {
      console.log('Downloading...');
      const parts = askedProject.documentsPath.split('/');
      const filename = parts[parts.length - 1];
      //const filenameWithoutExtension = filename.slice(0, filename.lastIndexOf('.'));
      axios({
        url: `http://localhost:3000/downloads/${filename}`,
        method: 'GET',
        responseType: 'blob'
      })
      .then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename);
        link.style.display = 'none'; // hide the link
        document.body.appendChild(link); // append the link to the document body
        link.click();
        Swal.fire({
          icon: "info",
          title: "Download Compeleted.",
          text: `downloading ${askedProject.name} has been compeleted successfully.`,
        });
        document.body.removeChild(link); // remove the link from the document body after download is complete
      })
      .catch(error => {
        console.log(error);
      });
    },
    async loadStage() {
      this.stage = await this.$store.state.stageInShowAskedProjectPage;
      !this.stage ? this.$router.push('/') : this.askedProject = this.stage.stageAskedProjects[0];
    },
    startTiming(minutes: number) {
      const milliseconds = minutes * 60 * 1000;
      setTimeout(() => {
        alert(`Time finished after ${minutes} minutes.`);
      }, milliseconds);
    }
  }
})
export default class StageAskedProjectView extends Vue {
  [x: string]: any;
  askedProject: any;
  projectTitle: any;
}
</script>
