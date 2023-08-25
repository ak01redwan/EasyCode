<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-6">
        <img :src="project.image" class="img-fluid" alt="">
      </div>
      <div class="col-md-6">
        <h1>{{ project.name }}</h1>
        <p class="lead">{{ project.description }} </p>
        <p>Created {{ project.createdDate }} </p>
        <p>Likes:{{ project.likes }}</p>
        <hr>
        <div v-for="comment in project.comments" :key="comment.id">
          <div class="d-flex mb-2">
            <div class="flex-grow-1">
              <p class="font-weight-bold mb-0">{{ comment.author }}</p>
              <p class="mb-0">{{ comment.message }}</p>
            </div>
            <div>
              <small>{{ comment.date }}</small>
            </div>
          </div>
        </div>
        <form @submit.prevent="addComment">
          <div class="form-group">
            <label for="newComment">Add a Comment:</label>
            <textarea class="form-control" id="newComment" rows="3" v-model="newComment"></textarea>
          </div>

          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
        <hr>
        <div>
          <p class="font-weight-bold mb-0">Supervisor Comment:</p>
          <p>{{ project.supervisorComment }}</p>
        </div>
        <div class="mt-3">
          <a :href="project.downloadLink" class="btn btn-primary"><i class="fas fa-download"></i> Download</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">

import { Options, Vue } from 'vue-class-component';
@Options({
  components: {

  },
  data() {
    return {
      newComment: '',
      project: {
        id: 1,
        name: 'Project Name',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.',
        likes: 10,
        comments: [
          { id: 1, author: 'John Doe', message: 'Great project!', date: '2023-05-26' },
          { id: 2, author: 'Jane Doe', message: 'I really enjoyed working on this project. Thanks for the opportunity!', date: '2023-05-25' }
        ],
        image: 'https://via.placeholder.com/600x400',
        createdDate: '2023-05-24',
        supervisorComment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.',
        downloadLink: 'https://www.example.com/download'
      }
    }
  },
  methods: {
    addComment() {
      if (this.newComment.length > 0) {
        this.project.comments.push({
          id: this.project.comments.length + 1,
          author: 'You',
          message: this.newComment,
          date: new Date().toISOString().slice(0, 10)
        })
        this.newComment = ''
      }
    }
  }



})
export default class ProjectsDetails extends Vue {
  [x: string]: any;
}

</script>
  