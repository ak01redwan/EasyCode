<template>
    <div class="row">
        <Card v-for="project in projects" 
        :Id="project.Id" 
        :Title="project.Title" 
        :Description="project.Description"
        :LikesNo="project.LikesNo"
        Type="projectCard"/>
    </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Card from '@/components/Card.vue'

@Options({
    data(){
        return {
            projects:[
                { Id: '1',Title: 'title1', Description: 'description for this current project 1', LikesNo: 50},
                { Id: '2',Title: 'title2', Description: 'description for this current project 2', LikesNo: 46},
                { Id: '3',Title: 'title3', Description: 'description for this current project 3', LikesNo: 20},
                { Id: '4',Title: 'title4', Description: 'description for this current project 4', LikesNo: 10},
                { Id: '5',Title: 'title5', Description: 'description for this current project 5', LikesNo: 14},
                { Id: '5',Title: 'title5', Description: 'description for this current project 6', LikesNo: 30},
                { Id: '5',Title: 'title5', Description: 'description for this current project 7', LikesNo: 5},
                { Id: '5',Title: 'title5', Description: 'description for this current project 8', LikesNo: 58},
                { Id: '5',Title: 'title5', Description: 'description for this current project 9', LikesNo: 50},
                { Id: '5',Title: 'title5', Description: 'description for this current project 10', LikesNo: 50},
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
export default class ProjectsGallery extends Vue {
  Title!: string;
  projects!: [any];
}
</script>