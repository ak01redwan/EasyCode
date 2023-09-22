<style>
.nots-container{
    width: 70%;
    height: 90vh;
    margin: 0 auto;
    background-color: rgba(21, 250, 238, 0.022);
    padding: 20px;
    border-radius: 22px;
}
.custom-notification-background{
    background-color: #cfe2ff;
    border-radius: 12px;
    border-color: #9bc3fc;
    color: #084298;
    cursor: pointer;
    padding: 20px;
    margin: 10px;
    width: 100%;
    box-shadow: 5px 5px 5px 0px lightblue;
}
.custom-notification-background:hover{
    background-color: #a0c4fa;
    font-size: large;
    font-weight: bold;
    margin-left: 15px;
    margin-top: 11px;
    margin-bottom: 11px;
    box-shadow: 10px 10px 5px 0px lightblue;
}
</style>

<template>
    <header class="p-3 bg-dark text-white">
    <div class="container">
      <h1>
        Notifications
        <button class="btn btn-secondary" @click="declaringNotificationsHaveBeenViewed">
            Done Viewd
        </button>
      </h1>
    </div>
  </header>

  <main class="container mt-4 text-center" style="min-height: 70vh;">
    <div class="nots-container">
        <p class="custom-notification-background"
            @click="goToPage(notification)" 
            v-for="(notification, index) in filterdNotifications" :key="index">
        {{ notification.text }}
        </p>
    </div>
  </main>
</template>

<script lang="ts">
import axios from "axios";
import Swal from "sweetalert2";
import { Options, Vue } from "vue-class-component";

@Options({
    data() {
        return {
            notifications: [],
        }
    },
    async created() {
        await this.getNotifications();
    },
    computed: {
        filterdNotifications() {
            let nots = [];
            const notType = this.$store.state.notificationsType;
            if (notType == 'public') {
                nots = this.notifications;
            } else {
                nots = this.notifications.filter((notification: any) => notification.pageSection == 'ChattingRoom');
            }
            return nots;
        }
    },
    methods:{
        async declaringNotificationsHaveBeenViewed() {
            this.notifications = [];
            // no notify that the user did read the notifications
            if (this.$store.state.user.id) {
                const res = await axios.post(`http://localhost:3000/notifications/declaringNotificationsHaveBeenViewed/${this.$store.state.user.id}`);
                //console.log(res);
            }
        },
        async goToPage(notification: any) {
            switch (notification.pageSection) {
                case 'ChattingRoom':
                    this.$store.state.currentCourseDisplayedContent = "ChattingRoom";
                    try {
                        const response = await axios.get(`http://localhost:3000/courses/${notification.entityId}`);
                        this.$store.state.courseInCourseDatailsPage = response.data;
                    } catch (error) {
                        Swal.fire("oOps!", "Can not loading the course data.", "error");
                    }
                    this.$router.push(`/${notification.pagePath}`);
                    break;
            
                default:
                    this.$router.push(`/${notification.pagePath}`);
                    break;
            }
        },
        async getNotifications() {
            try {
                const userId = await this.$store.state.user.id;
                const response = await axios.get(`http://localhost:3000/notifications/${userId}`);
                this.notifications = response.data.reverse()
                //console.log(this.notifications);
            } catch (error) {
                console.log(error);
            }
        },
    }
})
export default class NotificationsView extends Vue {
[x: string]: any;
}
</script>