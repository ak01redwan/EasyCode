<template>
  <div class="container-fluid">
    <div class="row flex-nowrap">
        <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark shadow-lg">
          <div class="align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <router-link to="/student" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                <i class="fa fa-user"></i>
                <span class="fs-4 m-1"> Student Name </span>
            </router-link>
            <hr>
            <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                <li class="nav-item">
                    <button  @click="ShowOption(0)" class="nav-link align-middle px-0">
                      <i class="fa-solid fa-video"></i> <span class="ms-1 d-none d-sm-inline text-secondary">Current Course</span>
                    </button>
                </li>
                <li class="nav-item">
                    <button @click="ShowOption(1)" class="nav-link align-middle px-0">
                      <i class="fa-solid fa-video"></i> <span class="ms-1 d-none d-sm-inline text-secondary">My Courses</span>
                    </button>
                </li>
                <li class="nav-item">
                    <button  @click="ShowOption(2)" class="nav-link align-middle px-0">
                      <i class="fa-solid fa-diagram-project"></i> <span class="ms-1 d-none d-sm-inline text-secondary">My Projects</span>
                    </button>
                </li>
                <li class="nav-item">
                    <button  @click="ShowOption(3)" class="nav-link align-middle px-0">
                      <i class="fa-solid fa-video"></i> <span class="ms-1 d-none d-sm-inline text-secondary">Completed Courses</span>
                    </button>
                </li>
                <li class="nav-item">
                    <button @click="ShowOption(4)" class="nav-link align-middle px-0">
                      <i class="fa-solid fa-gear"></i>
                      <span class="ms-1 d-none d-sm-inline text-secondary">Settings</span>
                    </button>
                </li>
            </ul>
          </div>
      </div>
      <div class="col py-3" 
      style="
        overflow-y: auto;
        max-height: 720px;
      ">
        <!--Getting Current Course Stages-->
        <div class="row" v-if="currentOption === listOptions[0]">
          <CourseStage v-for="stage in CurrentCourseStages" 
          :stageId="stage.stageId" 
          :stageTitle="stage.stageTitle"
          :isOpen="stage.isOpen" />
        </div>
        <!--Getting Student's Courses-->
        <CoursesGallery :Title="listOptions[1]" v-if="currentOption === listOptions[1]"/>
        <!--Getting Student's Projects-->
        <ProjectsGallery :Title="listOptions[2]" v-else-if="currentOption === listOptions[2]" />
        <!--Getting Student's Completed Courses-->
        <CoursesGallery :Title="listOptions[3]" v-if="currentOption === listOptions[3]"/>
        <!--Getting Student's Settings-->
        <Settings :Title="listOptions[4]" v-else-if="currentOption === listOptions[4]"/>   
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Settings from '@/components/Settings.vue';
import ProjectsGallery from '@/components/ProjectsGallery.vue';
import CoursesGallery from '@/components/CoursesGallery.vue';
import CourseStage from '@/components/CourseStage.vue';

@Options({
  components: {
    Settings,
    ProjectsGallery,
    CoursesGallery,
    CourseStage,
  },
  data () {
    return {
      currentOption: "CurrentCourse",
      listOptions: ['CurrentCourse','MyCourses','MyProjects','CompleteCourses','Settings'],
      CurrentCourseStages: [
        {stageId: 1, stageTitle: 'Stage Title 1',isOpen: true},
        {stageId: 2, stageTitle: 'Stage Title 2',isOpen: true},
        {stageId: 3, stageTitle: 'Stage Title 3',isOpen: false},
        {stageId: 4, stageTitle: 'Stage Title 4',isOpen: false},
        {stageId: 5, stageTitle: 'Stage Title 5',isOpen: false},
        {stageId: 6, stageTitle: 'Stage Title 6',isOpen: false},
        {stageId: 7, stageTitle: 'Stage Title 7',isOpen: false},
      ]
    }
  },
  methods: {
    ShowOption(optionNumber: number){
      this.currentOption = this.listOptions[optionNumber];
      //alert(this.currentOption);
    }
  }
})
export default class StudentView extends Vue {
  [x: string]: any;
}
</script>
