<template>
    <div class="container-fluid">
      <div class="row flex-nowrap">
          <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark shadow-lg">
            <div class="align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
              <router-link to="/student" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                  <span class="fs-4 m-1"> Course Title </span>
              </router-link>
              <hr>
              <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                  <li v-for="(item, index) in SideBarData" :key="index" class="nav-item">
                      <button  @click="ShowOption(index)" class="nav-link align-middle px-0">
                        <i class="fa-solid" :class="item.itemIconClass"></i> <span class="ms-1 d-none d-sm-inline text-secondary">{{ item.itemName }}</span>
                      </button>
                  </li>
              </ul>
            </div>
        </div>
        <!--Content-->
        <div class="col py-3" style="overflow-y: auto; max-height: 720px;">
          <CourseDetails v-if="currentOption === listOptions[0]" />
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { Options, Vue } from 'vue-class-component';
  import CourseStage from '@/components/Course/CourseStage.vue';
  import CourseDetails from '@/components/Course/CourseDetails.vue'
  
  @Options({
    components: {
      CourseStage,
      CourseDetails,
    },
    data () {
      return {
        currentOption: "CourseDetails",
        listOptions: ['CourseDetails','MyCourses','MyProjects','CompleteCourses','Settings'],
        SideBarData: [
            {itemName: 'Details', itemIconClass: 'fa-circle-info'},
            {itemName: 'Stages', itemIconClass: 'fa-circle-play'},
            {itemName: 'Students', itemIconClass: 'fa-users'},
            {itemName: 'Supervisors', itemIconClass: 'fa-person-chalkboard'},
            {itemName: 'Chatting Room', itemIconClass: 'fa-comments'},
            {itemName: 'Settings', itemIconClass: 'fa-gear'},
        ],
        CourseStages: [
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
      }
    }
  })
  export default class CourseView extends Vue {
    [x: string]: any;
  }
  </script>
  