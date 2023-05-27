<template>
  <div class="container-fluid">
    <div class="row flex-nowrap">
        <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
            <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                <a href="/" class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    <span class="fs-5 d-none d-sm-inline">projects</span>
                </a>
                <p> {{ currentCategory }} </p>
                <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                    <li class="nav-item" v-for="(project,index) in getUniqueprojectsByCategory(projects)" :key="index">
                        <a href="#" class="nav-link align-middle px-0" 
                        @click="changeCurrentCategoryValue(project.catogery)">
                            <i class="fs-4 bi-house"></i> <span class="ms-1 d-none d-sm-inline">{{ project.catogery }}</span>
                        </a>
                    </li>
                </ul>
                <hr>
            </div>
           
        </div>
     
        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <div class="container-fluid">
            <form class="d-flex me-auto" >
              <input v-model="searchText" class="form-control me-2" type="search" placeholder="Search" aria-label="Search" id="search-bar">
              <button class="btn btn-outline-success" type="submit"><i class="fas fa-search"></i></button>
            </form>
            </div>
          <div class="row">
            <Card v-for="project in filteringprojects" 
            :Id="project.id" 
            :Title="project.name" 
            :Description="project.description"
            :Type="project.catogery"
            :LikesNo="0"/>
          </div>
        </main>
    </div>
</div>

   
    
    
</template>
  
<script lang="ts">
  import { Options, Vue } from 'vue-class-component';
  import Card from '@/components/Card.vue'
  
  @Options({
    components: {
        Card
    },
    data () {
      return {
        displayedCategories:[],
        currentCategory: "",
        searchText: "",
        projects: [
            {id:1, name: 'laravel', imagePath: 'public/upload/java.png', catogery: 'php', description: 'this is project 1'},
            {id:2, name: 'php fundmentals', imagePath: 'public/upload/java.png', catogery: 'php', description: 'this is project 2'},
            {id:3, name: 'php oop', imagePath: 'public/upload/java.png', catogery: 'php', description: 'this is project 3'},
            {id:4, name: 'Nodejs js pure', imagePath: 'public/upload/java.png', catogery: 'nodejs', description: 'this is project 4'},
            {id:5, name: 'nodejs using nest', imagePath: 'public/upload/java.png', catogery: 'nodejs', description: 'this is project 5'}
        ] 
      }
    },
    methods: {
      changeCurrentCategoryValue(value: string) { this.currentCategory = value; },
      chooseByCategory() {
        return this.projects.filter(( project: { catogery: string; }): any => {
          const searchCatoTerm = this.currentCategory.toLowerCase();
          return (project.catogery.toLowerCase().includes(searchCatoTerm));
        });
      },
      getUniqueprojectsByCategory(projects: any[]): any[] {
        const categoriesSet = new Set<string>();
        return projects.filter((project) => {
          if (!categoriesSet.has(project.catogery)) {
            categoriesSet.add(project.catogery);
            return true;
          }
          return false;
        });
      }
   
  },
      
    computed:{
      filteringprojects() {
        return this.chooseByCategory().filter(( project: { name: string; description: string; catogery: string; }): any => {
          const searchTerm = this.searchText.toLowerCase();
          return (project.name.toLowerCase().includes(searchTerm) || project.description.toLowerCase().includes(searchTerm));
        });
      }
    }
  })
  export default class ProjectVeiwVue extends Vue {
    [x: string]: any;
  }
  </script>

  