<template>
    <div class="container my-5">
      <div class="row">
        <div class="col-lg-8">
          <div class="video-container mb-4">
            <video class="embed-responsive-item" controls width="100%">
              <source src="https://example.com/programming-for-beginners.mp4" type="video/mp4">
              Your browser does not support the video tag.
            </video>
          </div>
          <div class="d-flex align-items-center mb-4">
            <span class="like-btn me-3">👍 100 likes</span>
            <span class="btn btn-primary m-2"><i class="bi bi-caret-left"></i>&leftarrow; Previous</span>
            <span class="btn btn-primary m-2"><i class="bi bi-caret-right"></i>Next &rightsquigarrow;</span>
          </div>
          <h1 class="mt-4">Description</h1>
          <hr>
          <p class="lead">Learn the basics of programming with this introductory course.</p>
          <hr>
        </div>
        <div class="col-lg-4">
          <h3>Related Courses</h3>
          <div class="list-group">
            <a href="#" class="list-group-item list-group-item-action">Intermediate Programming</a>
            <a href="#" class="list-group-item list-group-item-action">Web Development 101</a>
            <a href="#" class="list-group-item list-group-item-action">Python for Data Science</a>
            <a href="#" class="list-group-item list-group-item-action">Python for Data Science</a>
            <a href="#" class="list-group-item list-group-item-action">Python for Data Science</a>
            <a href="#" class="list-group-item list-group-item-action">Python for Data Science</a>
            <a href="#" class="list-group-item list-group-item-action">Python for Data Science</a>
            <a href="#" class="list-group-item list-group-item-action">Python for Data Science</a>
          </div>
          <hr>
        </div>
      </div>
    </div>
</template>
<script lang="ts">
  import { Options, Vue } from 'vue-class-component';  
  @Options({
    components: {},
    data () {
      return {
        lessons: []
      }
    },
    methods: {}
  })
  export default class LessonView extends Vue {
    [x: string]: any;
  }
</script>
<style>
    .video-container {
      position: relative;
      padding-bottom: 56.25%;
      height: 0;
      overflow: hidden;
    }
    .video-container iframe,
    .video-container video {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    .like-btn {
      font-size: 1.2rem;
      font-weight: bold;
      cursor: pointer;
    }
</style>