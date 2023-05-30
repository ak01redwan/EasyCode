<template>
    <h1>this is the course Details</h1>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';

  @Options({   
    data () {
      return {
        course: { id:1, name:"java", imgPath:"@/assets/images/img-user.png",createDate:Date.now,courseStage:["Substage 1","Substage 2","Substage 3"], Description:"advace language"}
      }
    }
  })
  export default class CourseDetails extends Vue {
    [x: string]: any;
  }
</script>
<style>
.substage:hover {
  background-color: #f5f5f5;
  cursor: pointer;
}
</style>