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
            <h5 class="card-title">{{ user.name }}</h5>
            <p class="card-text">{{ user.info }}</p>
            <button class="m-1 btn btn-outline-secondary"><i class="fa fa-circle-info"></i> Details</button>
          </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
    props: {
        user: {id:1,name:'ssdcd',imgPath:'asscdvdv/asasc/',info:'dfrbtaebtb'}
    }
})
export default class UserCard extends Vue {
    user!: any;
}
</script>