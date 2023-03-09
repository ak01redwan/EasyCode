<template>
    <div class="row">
        <Card v-for="project in projects" :projectId="project.projectId" :projectTitle="project.projectTitle" :projectDescription="project.projectDescription"/>
    </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Card from '@/components/Card.vue'

@Options({
    data(){
        return {
            projects:[
                { projectId: '1',projectTitle: 'title1', projectDescription: 'description for this current project 1'},
                { projectId: '2',projectTitle: 'title2', projectDescription: 'description for this current project 2'},
                { projectId: '3',projectTitle: 'title3', projectDescription: 'description for this current project 3'},
                { projectId: '4',projectTitle: 'title4', projectDescription: 'description for this current project 4'},
                { projectId: '5',projectTitle: 'title5', projectDescription: 'description for this current project 5'},
                { projectId: '5',projectTitle: 'title5', projectDescription: 'description for this current project 6'},
                { projectId: '5',projectTitle: 'title5', projectDescription: 'description for this current project 7'},
                { projectId: '5',projectTitle: 'title5', projectDescription: 'description for this current project 8'},
                { projectId: '5',projectTitle: 'title5', projectDescription: 'description for this current project 9'},
                { projectId: '5',projectTitle: 'title5', projectDescription: 'description for this current project 10'},
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
  Title!: string
}
</script>