<template>
    <div class="row">
        <Card v-for="course in Courses" 
        :Id="course.projectId" 
        :Title="course.projectTitle" 
        :Description="course.projectDescription"
        Type="courseCard"
        :LikesNo="course.LikesNo"/>
    </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Card from '@/components/Card.vue'

@Options({
    data(){
        return {
            Courses:[
                { projectId: 1,projectTitle: 'Course 1', projectDescription: 'description for this current course 1',LikesNo: 41},
                { projectId: 2,projectTitle: 'Course 2', projectDescription: 'description for this current course 2',LikesNo: 42},
                { projectId: 3,projectTitle: 'Course 3', projectDescription: 'description for this current course 3',LikesNo: 100},
                { projectId: 4,projectTitle: 'Course 4', projectDescription: 'description for this current course 4',LikesNo: 10},
                { projectId: 5,projectTitle: 'Course 5', projectDescription: 'description for this current course 5',LikesNo: 88},
                { projectId: 5,projectTitle: 'Course 5', projectDescription: 'description for this current course 6',LikesNo: 63},
                { projectId: 5,projectTitle: 'Course 5', projectDescription: 'description for this current course 7',LikesNo: 50},
                { projectId: 5,projectTitle: 'Course 5', projectDescription: 'description for this current course 8',LikesNo: 78},
                { projectId: 5,projectTitle: 'Course 5', projectDescription: 'description for this current course 9',LikesNo: 11},
                { projectId: 5,projectTitle: 'Course 5', projectDescription: 'description for this current course 10',LikesNo: 41},
            ],
        }
    },
    components:{
        Card
    },
    props: {
        Title: String
    }
})
export default class CoursesGallery extends Vue {
  Title!: string;
  Courses!: [any];
}
</script>