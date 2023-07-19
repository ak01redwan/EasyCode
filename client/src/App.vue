<template>
  <nav class="navbar navbar-expand-sm text-color1 background-color1">
    <div class="container-fluid">
      <router-link to="/" class="nav-link"
        ><i class="fa-solid fa-code"></i> EasyCode
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapsibleNavbar"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="collapsibleNavbar">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="/" class="nav-link"
              ><i class="fa-solid fa-house"></i> Home</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/about" class="nav-link"
              ><i class="fa-solid fa-circle-info"></i> About</router-link
            >
          </li>
          <li v-if="showDashboardLink" class="nav-item">
            <router-link to="/dashboard" class="nav-link"
              ><i class="fa-solid fa-dashboard"></i> Dashboard</router-link
            >
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              ><i class="fa-solid fa-list"></i> More Things</a
            >
            <ul class="dropdown-menu">
              <li v-if="showSupervisorLink" @click="goToUsersPage('supervisor')" class="dropdown-item btn">
                Supervisors
              </li>
              <li v-if="showGraduatorLink" @click="goToUsersPage('graduator')" class="dropdown-item btn">
                Graduators
              </li>
              <li v-if="showStudentLink" @click="goToUsersPage('student')" class="dropdown-item btn">
                Students
              </li>
              <li v-if="showAllUsersLink" @click="goToUsersPage('')" class="dropdown-item btn">
                All Users
              </li>
              <li v-if="showCoursesLink">
                <router-link to="/courses" class="dropdown-item"
                  ><i class="fa-solid fa-video"></i>
                  Courses</router-link
                >
              </li>
              <li v-if="showProgectsLink">
                <router-link to="/users" class="dropdown-item"
                  ><i class="fa-solid fa-diagram-project"></i>
                  Progects</router-link
                >
              </li>
            </ul>
          </li>
        </ul>
        <div v-if="auth" class="d-flex d-grid gap-1">
          <button @click="doLogout" class="btn btn-outline-danger">
            <i class="fa-solid fa-sign-out"></i> Logout
          </button>
          <router-link to="/user">
            <button @click="$store.state.userInUserDetailsPage = null" class="btn btn-outline-secondary">
              <i class="fa-solid fa-user"></i> Profile
            </button>
          </router-link>
        </div>
        <div v-else class="d-flex d-grid gap-1">
          <router-link to="/login">
            <button class="btn btn-outline-primary">
              <i class="fa-solid fa-right-to-bracket"></i> Login
            </button>
          </router-link>
          <router-link to="/signup">
            <button class="btn btn-outline-warning">
              <i class="fa-solid fa-user-plus"></i> Signup
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </nav>
  <router-view />
 
  <footer class="text-center text-white" style="background-color: #6e5dcf">
    <!-- Start social media icons container -->
    <div class="container p-4 pb-0">
      <section class="mb-4">
        <!-- Facebook -->
        <a
          class="btn text-white btn-floating me-2"
          style="background-color: #3b5998"
          href="#!"
          role="button"
          ><i class="fab fa-facebook-f"></i
        ></a>

        <!-- Twitter -->
        <a
          class="btn text-white btn-floating me-2"
          style="background-color: #55acee"
          href="#!"
          role="button"
          ><i class="fab fa-twitter"></i
        ></a>

        <!-- Google -->
        <a
          class="btn text-white btn-floating me-2"
          style="background-color: #dd4b39"
          href="#!"
          role="button"
          ><i class="fab fa-google"></i
        ></a>

        <!-- Instagram -->
        <a
          class="btn text-white btn-floating me-2"
          style="background-color: #ac2bac"
          href="#!"
          role="button"
          ><i class="fab fa-instagram"></i
        ></a>

        <!-- Linkedin -->
        <a
          class="btn text-white btn-floating me-2"
          style="background-color: #0082ca"
          href="#!"
          role="button"
          ><i class="fab fa-linkedin-in"></i
        ></a>
        <!-- Github -->
        <a
          class="btn text-white btn-floating me-2"
          style="background-color: #333333"
          href="#!"
          role="button"
          ><i class="fab fa-github"></i
        ></a>
      </section>
    </div>
    <!-- End social media icons container -->

    <!-- Start Copyright With Auto Genrated Date -->
    <div class="text-center p-3" style="background-color: #243b67">
      &copy; {{ new Date().getFullYear() }} Copyright:
      <a class="text-white" href="https://easycode.com/">easycode.com</a>
    </div>
    <!-- End Copyright With Auto Genrated Date -->
  </footer>
</template>

<style lang="scss"></style>

<script>
import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
export default {
  data() {
    return {
      user: null,
      showDashboardLink: false,
      showSupervisorLink:false,
      showGraduatorLink:false,
      showStudentLink:false,
      showAllUsersLink:false,
      showCoursesLink:false,
      showProgectsLink:false,
    };
  },
  methods: { 
   async makeUsersHomePage(){
    if ( this.user.userType == 'admin') {
    this.showDashboardLink = true;
    this.showSupervisorLink = true;
    this.showGraduatorLink = true;
    this.showStudentLink = true;
    this.showAllUsersLink = true;
   
    }else if (this.user.userType == 'courseAdmin') {
      this.showDashboardLink = true;
      this.showSupervisorLink = true;
      this.showGraduatorLink = true;
      this.showStudentLink = true;
      this.showCoursesLink = true;
      this.showProgectsLink = true;
    }
    else if (this.user.userType == 'student') {
      this.showCoursesLink = true;
      this.showProgectsLink = true;
    }
    else if (this.user.userType == 'supervisor') {
      this.showCoursesLink = true;
      this.showProgectsLink = true;
    }
    },
    async laodUsers() {
           try {
            const response = await axios.get("http://localhost:3000/users");
            this.user = response.data;
          } catch (error) {
             alert(error);
         // Show an error message to the user
       }
    },
    goToUsersPage(showUsersWithType) {
      this.$store.state.showUsersWithType = showUsersWithType;
      this.$router.push("/users");
    },
    getUserProfileUsingStoredTokens() {
      if (this.user) { return; }
      const userCookies = Cookies.get("userTokens");
      if (userCookies) {
        axios
          .get("http://localhost:3000/auth/profile", {
            headers: { Authorization: `Bearer ${userCookies}` },
          })
          .then((res) => {
            if (res.data.user){
              this.$store.dispatch('login', res.data.user);
            }
          })
          .catch((err) => {});
      }
    },
    doLogout() {
      Cookies.remove("userTokens");
      this.$store.dispatch('logout'); // logout from the state as well
      this.$router.push("/");
      Swal.fire({
        icon: 'info',
        title: 'Logout..',
        text: 'You have logged out!.'
      })
    this.showDashboardLink = false;
    this.showSupervisorLink = false;
    this.showGraduatorLink = false;
    this.showStudentLink = false;
    this.showAllUsersLink = false;
    this.showCoursesLink = false;
    this.showProgectsLink = false;
    },
    keepUserUpdated(){
      this.user = this.$store.state.user;
    }
  },
   mounted() { 
   this.keepUserUpdated();
   this.getUserProfileUsingStoredTokens();
   this.laodUsers();
   this.makeUsersHomePage();
  },
  computed:{
    auth(){
      this.keepUserUpdated();
      return this.user;
    }
  },
  updated(){
    this.laodUsers(); 
    this.makeUsersHomePage();
  }
};
</script>
