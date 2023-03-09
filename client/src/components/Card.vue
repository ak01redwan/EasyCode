<template>
    <div class="col-lg-4 col-md-12 mb-0">
        <div class="card shadow-lg mb-5 bg-body rounded">
          <div class="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
            <img src="https://mdbootstrap.com/img/new/standard/nature/111.jpg" class="img-fluid">
            <a href="#!">
              <div class="mask" style="background-color: rgba(251, 251, 251, 0.15);"></div>
            </a>
          </div>
          <div class="card-body">
            <h5 class="card-title">{{ projectTitle }}</h5>
            <p class="card-text">{{ projectDescription }}</p>
            <p class="text-muted m-0">Likes: 42</p>
            <div class="row">
                <button class="m-1 col-3 btn btn-outline-secondary"><i class="fa fa-thumbs-up"></i></button>
                <button class="m-1 col-4 btn btn-outline-secondary"><i class="fa fa-circle-info"></i> Details</button>
                <button class="m-1 col-4 btn btn-outline-secondary"><i class="fa fa-message"></i> Comment</button>
            </div>
          </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
    props: {
        projectId: Number,
        projectTitle: String,
        projectDescription: String
    }
})
export default class CoursesGallery extends Vue {
    projectId!: Number;
    projectTitle!: String;
    projectDescription!: String;
}
</script>