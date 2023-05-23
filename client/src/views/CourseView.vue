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
          <!--Getting Course Details-->
          <CourseDetails v-if="currentOption === listOptions[0]" />
          <!--Getting Course ChatRoom-->
          <ChatRoom v-if="currentOption === listOptions[4]" />
          <!--Getting Course Stages-->
          <CourseStage v-if="currentOption === listOptions[1]" v-for="stage in CourseStages"
            :stageId="stage.stageId" 
            :stageTitle="stage.stageTitle"
            :isOpen="stage.isOpen"
          /> 
          <!--Getting Students-->
          <div v-if="currentOption === listOptions[2]" class="row m-0" style="            
          overflow-y: scroll;
          ">
            <div v-for="(student,index) in students" :key="index" class="user-card col-12 p-3">
              <img src="https://via.placeholder.com/50"  alt="User Avatar" class="bd-placeholder-img rounded-circle">
              <span class="fw-bold m-4">{{ student.fullname }}</span>
              <span class="text-muted m-3">{{student.username}}</span>
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
    </div>
  </template>
  
  <script lang="ts">
  import { Options, Vue } from 'vue-class-component';
  import CourseStage from '@/components/Course/CourseStage.vue';
  import CourseDetails from '@/components/Course/CourseDetails.vue'
  import ChatRoom from '@/components/Course/ChatRoom.vue';
  
  @Options({
    components: {
      CourseStage,
      CourseDetails,
      ChatRoom,
    },
    data () {
      return {
        currentOption: "CourseDetails",
        listOptions: ['CourseDetails','MyCourses','MyProjects','CompleteCourses','Settings','Stages'],
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
        ],
        students: [
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
  