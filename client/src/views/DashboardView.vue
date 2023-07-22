<template>
    <div class="container-fluid">
        <div class="row">
            <!-- Sidebar -->
            <div class="col-md-3 col-lg-2 bg-dark text-white" style="height: 500px;">
                <ul class="nav flex-column">
                    <li v-for="(item, index) in sidebarItems" :key="index" class="nav-item">
                        <a :class="`nav-link sidebarItemButton ${(currentDisplayedContent == item.content) ? 'fw-lighter fw-bolder text-info' : ''} `" 
                        @click="changeCurrentDisplayedContent(item.content)">
                            <i :class="item.icon"></i>
                            {{ item.text }}
                        </a>
                    </li>
                </ul>
            </div>
            <!-- Content -->
            <div class="col-md-9 col-lg-10 bg-white" style="height: 500px;">
                <div id="page-content">
                    <ShowUsers v-if="currentDisplayedContent === 'ShowUsers'" />
                    <ConfirmeSuprvisors v-else-if="currentDisplayedContent === 'ConfirmeSuprvisors'" />
                    <ConfirmingProjects v-else-if="currentDisplayedContent == 'ConfirmingProjects'" />
                    <ShowCategories v-else-if="currentDisplayedContent === 'ShowCategories'" />
                    <ShowCourses v-else-if="currentDisplayedContent === 'ShowCourses'" />
                    <ShowStages v-else-if="currentDisplayedContent =='ShowStages'" />
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import ShowUsers from '@/components/Dashboard/ShowUsers.vue';
import ShowCategories from '@/components/Dashboard/ShowCategories.vue'
import ShowCourses from '@/components/Dashboard/ShowCourses.vue'
import ShowStages from '@/components/Dashboard/ShowStages.vue'
import ConfirmeSuprvisors from '@/components/Dashboard/ConfirmeSupervisors.vue'
import ConfirmingProjects from '@/components/Dashboard/ConfirmingProjects.vue'
import Swal from 'sweetalert2';

@Options({
  components: {
    ShowUsers,
    ShowCategories,
    ShowCourses,
    ShowStages,
    ConfirmeSuprvisors,
    ConfirmingProjects
  },
  data () {
    return {
        currentDisplayedContent: 'ShowUsers',
        sidebarItems:[ // those are the sidebar items
            {text: 'Show Users',    icon: 'fas fa-users me-2',            content: 'ShowUsers'},
            {text: 'Confirmations', icon: 'fas fa-users me-2',            content: 'ConfirmeSuprvisors'},
            {text: 'student Projects', icon: 'fas fa-users me-2',            content: 'ConfirmingProjects'},
            {text: 'Categories',    icon: 'fa-solid fa-layer-group me-2', content: 'ShowCategories'},
            {text: 'Courses',       icon: 'fa-solid fa-video me-2',       content: 'ShowCourses'},
            {text: 'Stages',        icon: 'fa-solid fa-laptop-code me-2', content: 'ShowStages'},
            {text: 'Analytics',     icon: 'fas fa-chart-bar me-2',        content: 'ShowAnalytics'},
            {text: 'Messages',      icon: 'fas fa-envelope me-2',         content: 'ShowMessages'},
            {text: 'Settings',      icon: 'fas fa-cog me-2',              content: 'ShowSettings'},
        ]
    }
  },
  created() {
    this.verifySupervisorIsConfirmed();
    this.currentDisplayedContent = this.$store.state.currentDashboardDisplayedContent;
  },
  methods: {
    verifySupervisorIsConfirmed() {
        if (this.$store.state.user) {
            if (this.$store.state.user.userType == 'supervisor') {
                if (!this.$store.state.user.supervisorConfirmation[0].isConfirmed) {
                    this.$router.push("/confirmation");
                }
            } else if (this.$store.state.user.userType == 'student') {
                Swal.fire({
                    icon: "error",
                    title: "No Authrization!",
                    text: "You do not have the previlage to enter this place.!",
                });
                this.$router.push("/login");
            }
        }else{
            this.$router.push("/login");
        }
    },
    changeCurrentDisplayedContent(newContent: string){ 
        this.currentDisplayedContent = newContent; 
        this.$store.state.currentDashboardDisplayedContent = newContent;
    },
  }
})
export default class DashboardView extends Vue {
    [x: string]: any;
}
</script>
<style>
    .sidebarItemButton:hover {
        cursor: pointer;
    }
</style>