<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light mb-3">
    <div class="container-fluid">
      <form class="d-flex me-auto" @submit.prevent="onSubmit">
        <input v-model="searchTerm" class="form-control me-2" type="search" placeholder="Search" aria-label="Search" id="search-bar">
        <button class="btn btn-outline-success" type="submit"><i class="fas fa-search"></i></button>
      </form>      
    </div>
  </nav>
  <div class="container">
    <div class="row">
      <div class="col-12" style="
                                max-height: 415px;
                                overflow-y: scroll;
                                margin: 0;">
        <div v-for="(user,index) in searchResults" :key="index" class="user-card p-5">
          <div class="float-start" @click="goToUserDateilsPage(user)">
            <img
              :src="`http://localhost:3000${user.picturePath}`" 
              alt="User Avatar">
            <span class="fw-bold">{{ user.fullName }}</span>
            <span class="text-muted">@{{user.username}}</span>
          </div>
          <div class="btn-group float-end">
            <a :href="`http://localhost:3000${user.supervisorConfirmation[0].certificationsDocsPath}`" class="btn btn-outline-primary" title="View Certification Document (PDF)">
              <i class="fas fa-file-pdf"></i>
              Certifications
            </a>
            <button @click="confirm(user)" class="btn btn-outline-success" title="Confirme This Supervisor">
              <i class="fas fa-check-circle"></i>
              Confirme
            </button>
            <button @click="refuse(user)" class="btn btn-outline-danger" title="Refuse This Supervisor">
              <i class="fa fa-recycle"></i>
              Retry
            </button>
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
    .form-check-input[type="checkbox"] {
        width: 39px;
        height: 39px;
        
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
import axios from "axios";
import Swal from "sweetalert2";

@Options({
    components:{
    },
    methods:{
      refuse(user: any) {
        Swal.fire({
          title: "Enter your refusing reason comment as reviewer.",
          input: "text",
          inputPlaceholder: "Enter your refusing comment here...",
          inputValue: "",
          showCancelButton: true,
          confirmButtonText: "Save",
          cancelButtonText: "Cancel",
        }).then((result) => {
          if (result.isConfirmed) {
            const reviewerComment = result.value;
            const createConfirmationDtoObject = {
              id: user.supervisorConfirmation[0].id,
              certificationsDocsPath: user.supervisorConfirmation[0].certificationsDocsPath,
              isConfirmed: false,
              reviewerComment: reviewerComment,
              supervisor: user,
              reviewer:  this.$store.state.user
            };
            this.updateSupervisorConfirmation(createConfirmationDtoObject);
            // Show success message
            Swal.fire({
              title: "Done!",
              text: `The user "${user.fullName}" has your comment on the sended certifications.`,
              icon: "success",
              timer: 1700,
              showConfirmButton: false,
            });
          }
        });
      },
      confirm(user: any) {
        Swal.fire({
          title: "Enter your confirmation comment as reviewer.",
          input: "text",
          inputPlaceholder: "Enter your confirmation comment here...",
          inputValue: "",
          showCancelButton: true,
          confirmButtonText: "Save",
          cancelButtonText: "Cancel",
        }).then((result) => {
          if (result.isConfirmed) {
            const reviewerComment = result.value;
            const createConfirmationDtoObject = {
              id: user.supervisorConfirmation[0].id,
              certificationsDocsPath: user.supervisorConfirmation[0].certificationsDocsPath,
              isConfirmed: true,
              reviewerComment: reviewerComment,
              supervisor: user,
              reviewer:  this.$store.state.user
            };
            this.updateSupervisorConfirmation(createConfirmationDtoObject);
            // Show success message
            Swal.fire({
              title: "User Confirmed!",
              text: `The user "${user.fullName}" confirmed successfully.`,
              icon: "success",
              timer: 1700,
              showConfirmButton: false,
            });
          }
        });
      },
      async updateSupervisorConfirmation(confirmationNewData: any) {
        try {
          await axios.patch(
            `http://localhost:3000/confirmations/${confirmationNewData.id}`,
            confirmationNewData
          );
        } catch (error:any) {
          Swal.fire({
            title: "oOPs...!",
            text: error.response.data.message,
            icon: "error"
          });
        }
      },
      async getAllUsers() {
        try {
          const response = await axios.get('http://localhost:3000/users/supervisors');
          this.users = response.data;
        } catch (error) {
          alert(error);
        }
      },
      goToUserDateilsPage(user: any) {
        this.$store.state.userInUserDetailsPage = user;
        this.$router.push("/user");
      },
    },
    async created() {
      await this.getAllUsers();
    },
    computed:{
      searchResults() {
        return this.users.filter((user: { id: number; fullName: string; username: string; userType: string;}): any => {
          const searchTermLC = this.searchTerm.toLowerCase();
          const userTypeFilter = this.filter.toLowerCase();
          return (user.fullName.toLowerCase().includes(searchTermLC) || user.username.toLowerCase().includes(searchTermLC)) 
            && user.userType.toLowerCase().includes(userTypeFilter);
        });
      }
    },
    data(){
        return {
            searchTerm: '',
            filter: '',
            users: [] // data will be fetched into this array when create method call getAllUsers method
        }
    },
})
export default class ShowUsers extends Vue {
[x: string]: any;
}
</script>