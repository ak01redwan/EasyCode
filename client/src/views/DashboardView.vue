<template>
    <div class="container-fluid">
        <div class="row">
            <!-- Sidebar -->
            <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark shadow-lg h-atuo" >
                <ul class="nav flex-column">
                    <li v-for="(item, index) in sidebarItems" :key="index" class="nav-item">
                        <a class="nav-link active sidebarItemButton" 
                               @click="changeCurrentDisplayedContent(item.content)">
                            <i :class="item.icon"></i>
                            <span class="ms-1 d-none d-sm-inline"> {{ item.text }} </span>
                        </a>
                    </li>
                </ul>
            </div>
            <!-- Content -->
            <div class="col py-3" style="overflow-y: auto;">
                <div id="page-content">
                    <ShowUsers v-if="currentDisplayedContent === 'ShowUsers'" />
                    <ShowCategories v-else-if="currentDisplayedContent === 'ShowCategories'" />
                    <ShowCourses v-else-if="currentDisplayedContent === 'ShowCourses'" />
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

@Options({
  components: {
    ShowUsers,
    ShowCategories,
    ShowCourses
  },
  data () {
    return {
        currentDisplayedContent: 'ShowUsers',
        sidebarItems:[ // those are the sidebar items
            {text: 'Show Users', icon: 'fa-solid fa-users me-2',       content: 'ShowUsers'},
            {text: 'Categories', icon: 'fa-solid fa-layer-group me-2', content: 'ShowCategories'},
            {text: 'Courses',    icon: 'fa-solid fa-video me-2',       content: 'ShowCourses'},
            {text: 'Analytics',  icon: 'fa-solid fa-chart-bar me-2',   content: 'ShowAnalytics'},
            {text: 'Messages',   icon: 'fa-solid fa-envelope me-2',    content: 'ShowMessages'},
            {text: 'Settings',   icon: 'fa-solid fa-cog me-2',         content: 'ShowSettings'},
        ]
    }
  },
  methods: {
    changeCurrentDisplayedContent(newContent: string){ this.currentDisplayedContent = newContent; },
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