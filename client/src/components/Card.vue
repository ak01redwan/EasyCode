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
            <h5 class="card-title">{{ Title }}</h5>
            <p class="card-text">{{ Description }}</p>
            <p class="text-muted m-0">Likes: {{ LikesNo }}</p>
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
        Id: Number,
        Title: String,
        Description: String,
        Type: String,
        LikesNo: Number,
    }
})
export default class CoursesGallery extends Vue {
    Id!: Number;
    Title!: String;
    Description!: String;
    Type!: String;
    LikesNo!: Number;
}
</script>