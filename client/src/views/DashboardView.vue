<template>
    <div class="container-fluid">
        <div class="row">
            <!-- Sidebar -->
            <div class="col-md-3 col-lg-2 bg-dark text-white" style="height: 500px;">
                <ul class="nav flex-column">
                <li class="nav-item">
                    <a class="nav-link active" href="#">
                    <i class="fas fa-users me-2"></i>
                    Show Users
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">
                    <i class="fas fa-chart-bar me-2"></i>
                    Analytics
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">
                    <i class="fas fa-envelope me-2"></i>
                    Messages
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">
                    <i class="fas fa-cog me-2"></i>
                    Settings
                    </a>
                </li>
                </ul>
            </div>
            <!-- Content -->
            <div class="col-md-9 col-lg-10 bg-white" style="height: 500px;">
                <div id="page-content">
                    <ShowUsers />
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import ShowUsers from '@/components/Dashboard/ShowUsers.vue';
@Options({
  components: {
    ShowUsers
  },
  data () {
    return {
    }
  },
  methods: {
  }
})
export default class DashboardView extends Vue {
}
</script>