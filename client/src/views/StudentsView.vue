<template>
    <nav class="navbar background-color4">
        <div class="container-fluid">
            <p class="navbar-brand">Search And Filtter Students</p>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Dropdown
                    </a>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#">Action</a></li>
                        <li><a class="dropdown-item" href="#">Another action</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item" href="#">Something else here</a></li>
                    </ul>
                </li>
            </ul>
            <form class="d-flex" role="search">
                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                <button class="btn btn-outline-success" type="submit">Search</button>
            </form>
            </div>
        </div>
    </nav>
    <div class="container  background-color1" style="min-height: 600px;">
        <StudentCard v-for="(student, index) in students" :key="index" :student="student"/>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import StudentCard from '@/components/Student/StudentCard.vue';
@Options({
  components: {
    StudentCard
  },
  data () {
    return {
        students: [
            {id:1,name:'Student 1',imgPath:'asscdvdv/asasc/',info:'dfrbtaebtb'},
            {id:1,name:'Student 2',imgPath:'asscdvdv/asasc/',info:'dfrbtaebtb'},
            {id:1,name:'Student 3',imgPath:'asscdvdv/asasc/',info:'dfrbtaebtb'},
            {id:1,name:'Student 4',imgPath:'asscdvdv/asasc/',info:'dfrbtaebtb'},
            {id:1,name:'Student 5',imgPath:'asscdvdv/asasc/',info:'dfrbtaebtb'},
            {id:1,name:'Student 6',imgPath:'asscdvdv/asasc/',info:'dfrbtaebtb'},
            {id:1,name:'Student 7',imgPath:'asscdvdv/asasc/',info:'dfrbtaebtb'},
        ]
    }
  },
  methods: {
  }
})
export default class StudentsView extends Vue {
    students!: [any];
}
</script>
