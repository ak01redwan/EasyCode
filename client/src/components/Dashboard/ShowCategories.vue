<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light mb-3">
    <div class="container-fluid">
      <form class="d-flex me-auto" @submit.prevent="onSubmit">
        <input v-model="searchTerm" class="form-control me-2" type="search" placeholder="Search" aria-label="Search" id="search-bar">
        <button class="btn btn-outline-success" type="submit"><i class="fas fa-search"></i></button>
      </form>
      <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addCategoryModal">Add New Category <i class="fas fa-plus"></i></button>
    </div>
  </nav>
  <div class="container">
    <div class="row">
      <div class="col-12" style="
                                max-height: 415px;
                                overflow-y: scroll;
                                margin: 0;">
        <div v-for="(category,index) in searchResults" :key="index" class="user-card">
          <span class="fw-bold">{{ category.name }}</span>
          <span class="text-muted">@_{{category.numberOfCourses}}_course</span>
          <div class="btn-group float-end">
            <button class="btn btn-outline-secondary" title="Edit User"><i class="fas fa-edit"></i></button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--Adding New User Modal-->
  <AddNewCategory />
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
import AddNewCategory from '@/components/Dashboard/AddNewCategory.vue'

@Options({
    components:{
      AddNewCategory,
    },
    methods:{},
    computed:{
        searchResults() {
            return this.categories.filter((category: { id: number; name: string; numberOfCourses: number; }): any => {
                const searchTermLC = this.searchTerm.toLowerCase();
                return category.name.toLowerCase().includes(searchTermLC) 
                    || category.numberOfCourses.toString().toLowerCase().includes(searchTermLC);
            });
        }
    },
    data(){
        return {
            searchTerm: '',
            categories: [
                {id: 1, name: 'web',     numberOfCourses: 13},
                {id: 1, name: 'Android', numberOfCourses: 30},
                {id: 1, name: 'Desktop', numberOfCourses: 10},
            ]
        }
    }
})
export default class ShowCategories extends Vue {
[x: string]: any;
}
</script>