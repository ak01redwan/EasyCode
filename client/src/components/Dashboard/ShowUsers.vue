<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light mb-3">
    <div class="container-fluid">
      <form class="d-flex me-auto" @submit.prevent="onSubmit">
        <input v-model="searchTerm" class="form-control me-2" type="search" placeholder="Search" aria-label="Search" id="search-bar">
        <button class="btn btn-outline-success" type="submit"><i class="fas fa-search"></i></button>
      </form>
      
      <div class="dropdown me-3">
        <button class="btn btn-secondary dropdown-toggle" type="button" id="filter-dropdown" data-bs-toggle="dropdown" aria-expanded="false">
          Filter: {{ filter }}
        </button>
        <ul class="dropdown-menu" aria-labelledby="filter-dropdown">
          <li><a class="dropdown-item btn" @click="changeFilterValue('')">All Users</a></li>
          <li><a class="dropdown-item btn" @click="changeFilterValue('Admin Supervisor')">Admin Supervisor</a></li>
          <li><a class="dropdown-item btn" @click="changeFilterValue('Normal Supervisor')">Normal Supervisor</a></li>
          <li><a class="dropdown-item btn" @click="changeFilterValue('Student')">Student</a></li>
        </ul>
      </div>
      <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addUserModal">Add New User <i class="fas fa-plus"></i></button>
    </div>
  </nav>
  <div class="container">
    <div class="row">
      <div class="col-12" style="
                                max-height: 415px;
                                overflow-y: scroll;
                                margin: 0;">
        <div v-for="(user,index) in searchResults" :key="index" class="user-card">
          <img src="https://via.placeholder.com/50" alt="User Avatar">
          <span class="fw-bold">{{ user.fullname }}</span>
          <span class="text-muted">@{{user.username}}</span>
          <div class="btn-group float-end">
            <button class="btn btn-outline-secondary" title="Send Email"><i class="fas fa-envelope"></i></button>
            <button class="btn btn-outline-secondary" title="View Details"><i class="fas fa-info-circle"></i></button>
            <button class="btn btn-outline-secondary" title="Edit User"><i class="fas fa-edit"></i></button>
            <button class="btn btn-outline-danger" title="Delete User"><i class="fas fa-trash"></i></button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--Adding New User Modal-->
  <AddNewUser />
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
import AddNewUser from '@/components/Dashboard/AddNewUser.vue'

@Options({
    components:{
      AddNewUser,
    },
    methods:{
      changeFilterValue(value: String) { this.filter = value; }/*for change the filter parameter value*/,
    },
    computed:{
        searchResults() {
            return this.users.filter((user: { fullname: string; username: string; type: string;}): any => {
                const searchTermLC = this.searchTerm.toLowerCase();
                const userTypeFilter = this.filter.toLowerCase();
                return (user.fullname.toLowerCase().includes(searchTermLC) || user.username.toLowerCase().includes(searchTermLC)) 
                  && user.type.toLowerCase().includes(userTypeFilter);
            });
        }
    },
    data(){
        return {
            searchTerm: '',
            filter: '',
            users: [
                {fullname: 'Abdu Khalid Abdullh', username:'AK01REDWAN',type: 'Admin'},
                {fullname: 'Salem Nagy Khasem', username:'5488', type: 'Student'},
                {fullname: 'Ahmed Mohammed', username:'AK01REDWAN', type: 'Student'},
                {fullname: 'Weas Humza', username:'AK01REDWAN', type: 'Student'},
                {fullname: 'Abdurhman Khald', username:'AK01REDWAN', type: 'Student'},
                {fullname: 'New Person Name', username:'AK01REDWAN', type: 'Student'},
                {fullname: 'Another Person Name', username:'AK01REDWAN', type: 'Student'},
                {fullname: 'Another Person Name', username:'AK01REDWAN', type: 'Admin Supervisor'},
                {fullname: 'Another Person Name', username:'AK01REDWAN', type: 'Admin Supervisor'},
                {fullname: 'Another Person Name', username:'AK01REDWAN', type: 'Admin Supervisor'},
                {fullname: 'Another Person Name', username:'AK01REDWAN', type: 'Normal Supervisor'},
                {fullname: 'Another Person Name', username:'AK01REDWAN', type: 'Normal Supervisor'},
                {fullname: 'Another Person Name', username:'AK01REDWAN', type: 'Normal Supervisor'}
            ]
        }
    }
})
export default class ShowUsers extends Vue {
[x: string]: any;
}
</script>