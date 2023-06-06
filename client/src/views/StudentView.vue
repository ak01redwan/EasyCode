<template>
  <div class="container-fluid">
    <div class="row flex-nowrap">
      <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark shadow-lg">
        <div
          class="align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100"
        >
          <router-link
            to="/student"
            class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
          >
            <div @click="activatedItemContentName = 'StudentDetails'" class="text-center">
              <i class="fa-solid fa-user"></i>
              <span class="lead text-secondary" style="font-size: 14px;"> 
                @Student_UserName 
              </span>
            </div>
          </router-link>
          <hr />
          <ul
            class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
            id="menu"
          >
            <li v-for="(item,index) in sidebarItems" :key="index" class="nav-item">
              <button @click="changeTheShowBasedOnThisSidebarContentValue(item.content)" class="nav-link align-middle px-0">
                <i :class="item.icon"></i>
                <span class="ms-1 d-none d-sm-inline text-secondary"  style="font-size: 14px;">
                  {{ item.text }}
                </span>
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div class="col py-3" style="overflow-y: auto; max-height: 720px">
        <!--Getting Student's Details-->
        <StudentDetails
          :Title="activatedItemContentName"
          v-if="activatedItemContentName === 'StudentDetails'"
        />
        <!-- Getting Current Course Stages -->
        <div class="row" v-else-if="activatedItemContentName === 'CurrentActiveCourseStages'">
          <CourseStage
            v-for="stage in CurrentCourseStages"
            :stageId="stage.stageId"
            :stageTitle="stage.stageTitle"
            :isOpen="stage.isOpen"
          />
        </div>
        <!-- Getting Student's Subscriped Courses -->
        <CoursesGallery
          :Title="activatedItemContentName"
          v-else-if="activatedItemContentName === 'SubscripedCourses'"
        />
        <!--Getting Student's Projects-->
        <ProjectsGallery
          :Title="activatedItemContentName"
          v-else-if="activatedItemContentName === 'Projects'"
        />
        <!-- Getting Student's Completed Courses -->
        <CoursesGallery
          :Title="activatedItemContentName"
          v-if="activatedItemContentName === 'CompletedCourses'"
        />
        <!-- Getting Student's Settings -->
        <Settings
          :Title="activatedItemContentName"
          v-else-if="activatedItemContentName === 'Settings'"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Settings from "@/components/Student/Settings.vue";
import ProjectsGallery from "@/components/Project/ProjectsGallery.vue";
import CoursesGallery from "@/components/Course/CoursesGallery.vue";
import CourseStage from "@/components/Course/CourseStage.vue";
import StudentDetails from "@/components/Student/StudentDetails.vue";

@Options({
  components: {
    StudentDetails,
    CourseStage,
    CoursesGallery,
    ProjectsGallery,
    Settings,
  },
  data() {
    return {
      activatedItemContentName: "StudentDetails",
      sidebarItems: [
        { text: 'Student Details',      icon: 'fa-solid fa-circle-info', content: "StudentDetails"},
        { text: 'Active Course stages', icon: 'fa fa-certificate', content: "CurrentActiveCourseStages"},
        { text: 'Subscriped Courses',   icon: 'fa-solid fa-video', content: "SubscripedCourses"},
        { text: 'Student Projects',     icon: 'fa-solid fa-diagram-project', content: "Projects"},
        { text: 'Completed Courses',    icon: 'fa-solid fa-video', content: "CompletedCourses"},
        { text: 'Settings',             icon: 'fa-solid fa-gear', content: "Settings"},
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
    getSidebarItemByContent(content: string) {
      return this.sidebarItems.filter((sidebarItem: { content: string; }): any => {
          const searchTermLC = content.toLowerCase();
          return (sidebarItem.content.toLowerCase() == searchTermLC);
      })[0];
    },
    changeTheShowBasedOnThisSidebarContentValue(content: string) {
      this.activatedItemContentName = this.getSidebarItemByContent(content).content;
    },
  },
})
export default class StudentView extends Vue {
  [x: string]: any;
}
</script>
