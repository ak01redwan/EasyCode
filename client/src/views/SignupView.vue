<template>
    <div class="form-container d-flex align-items-center justify-content-center fs-4">
        <div class="form-border m-lg-5 m-3 w-75 p-4 ratio-1x1  rounded" style="background:#EAEBED">
            <h2 class="tital text-center m-3 ">Start Creating Your Own Account</h2>
            
            <div class="btn-group me-auto w-50 ms-auto d-flex" role="group" aria-label="Button group">
                <button class="btn btn-outline-primary" :style="studentButtonStyle" @click="setUserType(0)">Student</button>
                <button class="btn btn-outline-primary" :style="supervisorButtonStyle" @click="setUserType(1)">Suprevisor</button>
            </div>
            <StudentSignup v-if="usertype === userstypes[0]"/>
            <SupervisorSignup v-else-if="usertype === userstypes[1]" />
            <ul class="form-options col-3 mt-3 mb-0 ms-4 ms-lg-5 p-0"  accesskey="none">
                <router-link to='/login'><li class="m-0 ms-5 p-0 w-100 list-unstyled fs-6"><a >Let's go login</a></li></router-link>
            </ul>
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
export default class SignupView extends Vue {
[x: string]: any;
}
</script>

<style scoped>
    :root{
        --COLOR-ONE:#243B67;
        --COLOR-TWO:#6E5DCF;
        --COLOR-THREE:#C27DFC;
        --COLOR-FOUR:#EAEBED;
    }

    .form-border .form-options li:hover a{
        color: var(--COLOR-THREE);
    }
</style>