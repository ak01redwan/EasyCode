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
          <li class="nav-item">
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
              <li>
                <router-link to="/students" class="dropdown-item"
                  ><i class="fa-solid fa-users"></i> 
                  Students</router-link
                >
              </li>
              <li>
                <router-link to="/students" class="dropdown-item"
                  ><i class="fa-solid fa-person-chalkboard"></i>
                  Supervisors</router-link
                >
              </li>
              <li>
                <router-link to="/courses" class="dropdown-item"
                  ><i class="fa-solid fa-video"></i> 
                  Courses</router-link
                >
              </li>
              <li>
                <router-link to="/students" class="dropdown-item"
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
          <router-link to="/">
            <button class="btn btn-outline-secondary">
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
    };
  },
  methods: {
    getUserProfileUsingStoredTokens() {
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
    },
    keepUserUpdated(){
      this.user = this.$store.state.user;
    }
  },
  mounted() {
    this.keepUserUpdated();
    this.getUserProfileUsingStoredTokens();
  },
  computed:{
    auth(){
      this.keepUserUpdated();
      return this.user;
    }
  }
};
</script>
