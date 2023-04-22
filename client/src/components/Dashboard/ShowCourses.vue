<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light mb-3">
    <div class="container-fluid row">
      <form class="d-flex col-sm-12 col-lg-7 col-md-7" @submit.prevent="onSubmit">
        <input v-model="searchTerm" class="form-control me-2 w-100" type="search" placeholder="Search" aria-label="Search" id="search-bar">
        <button class="btn btn-outline-success" type="submit"><i class="fas fa-search"></i></button>
      </form>
      <div class="dropdown col-lg-2 col-md-2 col-sm-11 me-1 mt-2 text-start">
        <button class="btn btn-secondary dropdown-toggle w-100 " type="button" id="filter-dropdown" data-bs-toggle="dropdown" aria-expanded="false">
          <span class="d-sm-inline d-md-none d-lg-inline">Filter: </span> {{ filter }}  
        </button>
        <ul class="dropdown-menu w-100" aria-labelledby="filter-dropdown">
          <li><a class="dropdown-item btn" @click="changeFilterValue('')">All Course</a></li>
          <li><a class="dropdown-item btn" @click="changeFilterValue('Published')">Published</a></li>
          <li><a class="dropdown-item btn" @click="changeFilterValue('Unpublished')">Unpublished</a></li>
        </ul>
      </div>
      <div class="col-lg-3 col-md-2 mt-2 col-sm-11 text-end">
        <button class="btn btn-primary w-100" data-bs-toggle="modal" data-bs-target="#addCourseModal"><span class="d-sm-inline d-md-none d-lg-inline">Add New Course </span><i class="fas fa-plus "></i> </button>
      </div>
    </div>
  </nav>
  <div class="container">
    <div class="row">
      <div class="col-12" style="
                                max-height: 415px;
                                overflow-y: scroll;
                                margin: 0;">
        <div v-for="(course,index) in searchResults" :key="index" class="user-card">
          <img src="https://via.placeholder.com/50" alt="User Avatar">
          <span class="fw-bold">{{ course.name }}</span>
          <span class="text-muted">@{{course.category}}</span>
          <div class="btn-group float-end">
            <button v-if="!course.isPublished" class="btn btn-outline-secondary" title="Publish this course"><i class="fa-solid fa-upload"></i></button>
            <button v-else-if="course.isPublished" class="btn btn-outline-secondary" title="Unpublish this course"><i class="fa-sharp fa-regular fa-circle-stop"></i></button>
            <router-link to="/course" class="btn btn-outline-secondary" title="View Details"><i class="fas fa-info-circle"></i></router-link>
            <button class="btn btn-outline-secondary" title="Edit User"><i class="fas fa-edit"></i></button>
            <button class="btn btn-outline-danger" title="Delete User"><i class="fas fa-trash"></i></button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--Adding New User Modal-->
  <AddNewCourse />
</template>
<style scoped>
    .user-card {
      margin-bottom: 20px;
    }
    .user-card img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-right: 10px;
    }
    .user-card .btn {
      margin-right: 5px;
    }
    .user-card:hover {
        background-color: #F5F5F5;
        cursor: pointer;
    }
</style>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import AddNewCourse from '@/components/Dashboard/AddNewCourse.vue'

@Options({
    components:{
      AddNewCourse,
    },
    methods:{
      changeFilterValue(value: string){ this.filter = value; },
    },
    computed:{
        searchResults() {
            return this.courses.filter((course: {id: number; name: string; isPublished: boolean; category: string;}): any => {
                const searchTermLC = this.searchTerm.toLowerCase();
                switch(this.filter){
                  case '':
                    return (course.name.toLowerCase().includes(searchTermLC) || course.category.toLowerCase().includes(searchTermLC));
                    break;
                  case 'Published':
                    return (course.name.toLowerCase().includes(searchTermLC) 
                        || course.category.toLowerCase().includes(searchTermLC)) && course.isPublished == true;
                    break;
                  case 'Unpublished':
                    return (course.name.toLowerCase().includes(searchTermLC) 
                        || course.category.toLowerCase().includes(searchTermLC)) && course.isPublished == false;
                    break;
                }   
            });
        }
    },
    data(){
        return {
            searchTerm: '',
            filter: '',
            courses: [
                {id: 1, name: 'Java',       isPublished: true,  category: 'Web'},
                {id: 1, name: 'Javascript', isPublished: true,  category: 'Web'},
                {id: 1, name: 'C#',         isPublished: true,  category: 'Andoid'},
                {id: 1, name: 'C++',        isPublished: true,  category: 'Andoid'},
                {id: 1, name: 'Python',     isPublished: true,  category: 'Desktop'},
                {id: 1, name: 'R',          isPublished: false, category: 'Desktop'},
                {id: 1, name: 'Cotlen',     isPublished: false, category: 'Web'},
            ]
        }
    }
})
export default class ShowCourses extends Vue {
[x: string]: any;
}
</script>