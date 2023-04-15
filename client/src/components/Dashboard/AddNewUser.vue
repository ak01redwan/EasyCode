<template>
    <div class="modal fade" id="addUserModal" tabindex="-1" aria-labelledby="addUserModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="addUserModalLabel">Add New User</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="form-container d-flex align-items-center justify-content-center fs-4">
                            <div class="form-border w-100 p-4 ratio-1x1  rounded" style="background:#EAEBED">
                                <h2 class="tital text-center m-3 ">Start Creating New User Account</h2>
                                <div class="btn-group me-auto w-50 ms-auto d-flex" role="group" aria-label="Button group">
                                    <button class="btn btn-outline-primary" :style="studentButtonStyle" @click="setUserType(0)">Student</button>
                                    <button class="btn btn-outline-primary" :style="supervisorButtonStyle" @click="setUserType(1)">Suprevisor</button>
                                </div>
                                <StudentSignup v-if="usertype === userstypes[0]"/>
                                <SupervisorSignup v-else-if="usertype === userstypes[1]" />
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import StudentSignup from '@/components/Student/StudentSignup.vue';
import SupervisorSignup from '@/components/Supervisor/SupervisorSignup.vue';

@Options({
  components: {
    StudentSignup,
    SupervisorSignup,
  },
  data () {
    return {
        usertype: "student",
        userstypes: ['student','supervisor'],   
        studentButtonStyle: {
            backgroundColor: '#243B67',
            color: 'black',
            fontSize: 'large'
        },
        supervisorButtonStyle: {
            backgroundColor: 'none',
        }
    }
  },
  methods: {
    setUserType(typeIndex: number){
        this.usertype = this.userstypes[typeIndex];
        if (this.usertype === this.userstypes[0]){
            this.studentButtonStyle = {
                backgroundColor: '#243B67',
                color: 'black',
                fontSize: 'large'
            };
            this.supervisorButtonStyle = {};
        }else{
            this.studentButtonStyle = {};
            this.supervisorButtonStyle = {
                backgroundColor: '#243B67',
                color: 'black',
                fontSize: 'large'
            };
        }
    }
  }
})
export default class AddNewUser extends Vue {
[x: string]: any;
}
</script>
