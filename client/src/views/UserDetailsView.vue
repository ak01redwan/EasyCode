<template>
  <div class="container-fluid" v-if="userInfo">
    <div class="row flex-nowrap">
      <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark shadow-lg">
        <div
          class="align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100"
        >
          <router-link
            to="/user"
            class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
          >
            <div
              @click="activatedItemContentName = 'UserDetails'"
              class="text-center text-primary w-100"
            >
              <i class="fa-solid fa-user fs-1"></i><br />
              <span
                class="text-secondary text-nowrap bd-highlight"
                style="font-size: 14px"
              >
                <strong>{{
                  userInfo.fullName
                }}</strong> </span
              ><br />
              <span
                class="lead text-secondary text-decoration-underline"
                style="font-size: 14px"
              >
                @{{ userInfo.username }}
              </span>
            </div>
          </router-link>
          <hr />
          <ul
            class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
            id="menu"
          >
            <li
              v-for="(item, index) in sidebarItems"
              :key="index"
              class="nav-item"
            >
              <button
                @click="
                  changeTheShowBasedOnThisSidebarContentValue(item.content)
                "
                class="nav-link align-middle px-0"
              >
                <i :class="item.icon"></i>
                <span
                  class="ms-1 d-none d-sm-inline text-secondary"
                  style="font-size: 14px"
                >
                  {{ item.text }}
                </span>
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div class="col py-3" style="overflow-y: auto; max-height: 720px">
        <!--Getting user's Details-->
        <UserDetails
          :UserInfo="userInfo"
          v-if="activatedItemContentName === 'UserDetails'"
        />
        <!-- Getting Current Course Stages -->
        <div
          class="row"
          v-else-if="activatedItemContentName === 'CurrentActiveCourseStages'"
        >
          <CourseStage
            v-for="stage in CurrentCourseStages"
            :stageId="stage.stageId"
            :stageTitle="stage.stageTitle"
            :isOpen="stage.isOpen"
          />
        </div>
        <!-- Getting User's Subscriped Courses -->
        <CoursesGallery
          :Title="activatedItemContentName"
          v-else-if="activatedItemContentName === 'SubscripedCourses'"
        />
        <!--Getting User's Projects-->
        <ProjectsGallery
          :Title="activatedItemContentName"
          v-else-if="activatedItemContentName === 'Projects'"
        />
        <!-- Getting User's Completed Courses -->
        <CoursesGallery
          :Title="activatedItemContentName"
          v-if="activatedItemContentName === 'CompletedCourses'"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Swal from "sweetalert2";

import ProjectsGallery from "@/components/Project/ProjectsGallery.vue";
import CoursesGallery from "@/components/Course/CoursesGallery.vue";
import CourseStage from "@/components/Course/CourseStage.vue";
import UserDetails from "@/components/User/UserDetails.vue";

@Options({
  components: {
    UserDetails,
    CourseStage,
    CoursesGallery,
    ProjectsGallery,
  },
  data() {
    return {
      userInfo: null,
      activatedItemContentName: "UserDetails",
      sidebarItems: [
        {
          text: "Personal Details",
          icon: "fa-solid fa-circle-info",
          content: "UserDetails",
        },
        {
          text: "Active Course stages",
          icon: "fa fa-certificate",
          content: "CurrentActiveCourseStages",
        },
        {
          text: "Subscriped Courses",
          icon: "fa-solid fa-video",
          content: "SubscripedCourses",
        },
        {
          text: "Student Projects",
          icon: "fa-solid fa-diagram-project",
          content: "Projects",
        },
        {
          text: "Completed Courses",
          icon: "fa-solid fa-video",
          content: "CompletedCourses",
        },
        { text: "Settings", icon: "fa-solid fa-gear", content: "Settings" },
      ],
      CurrentCourseStages: [
        { stageId: 1, stageTitle: "Stage Title 1", isOpen: true },
        { stageId: 2, stageTitle: "Stage Title 2", isOpen: true },
        { stageId: 3, stageTitle: "Stage Title 3", isOpen: false },
        { stageId: 4, stageTitle: "Stage Title 4", isOpen: false },
        { stageId: 5, stageTitle: "Stage Title 5", isOpen: false },
        { stageId: 6, stageTitle: "Stage Title 6", isOpen: false },
        { stageId: 7, stageTitle: "Stage Title 7", isOpen: false },
      ],
    };
  },
  methods: {
    goToEditUserPage() {
      this.$store.state.userInEditUserPage = this.$store.state.user;
      this.$router.push("/edituser");
    },
    getUserFromStoredState() {
      if (!this.$store.state.user) {
        this.$router.push("/login");
      }else{
        const currentUser = this.$store.state.userInUserDetailsPage;
        if (currentUser) {
          this.userInfo = currentUser;
        } else {
          this.userInfo = this.$store.state.user;
        }
      }
      //console.log(this.userInfo);
    },
    getSidebarItemByContent(content: string) {
      const result = this.sidebarItems.filter(
        (sidebarItem: { content: string }): any => {
          const searchTermLC = content.toLowerCase();
          return sidebarItem.content.toLowerCase() == searchTermLC;
        }
      )[0];
      if (result.content == 'Settings') {
        if (this.$store.state.user.id == this.userInfo.id){
          this.goToEditUserPage();
          return this.sidebarItems[0];
        }else{
          Swal.fire({
            icon: "error",
            title: "UnAuthrized",
            text: "you are not allowed to edit this profile info."
          });
          return this.sidebarItems[0];
        }
      }
      return result;
    },
    changeTheShowBasedOnThisSidebarContentValue(content: string) {
      this.activatedItemContentName =
        this.getSidebarItemByContent(content).content;
    },
  },
  created() {
    this.getUserFromStoredState();
  }
})
export default class UserDetailsView extends Vue {
  [x: string]: any;
}
</script>
