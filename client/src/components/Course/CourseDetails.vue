<template>
    <div class="main-body m-1">
        <div class="row" >           
            <img src="@/assets/images/man.jpg" alt="" srcset="" class="col-lg-6 col-md-10 m-1">
           
            <div class="col-lg-6 col-md-12 m-1">
                <ul class="list-group text-right">
                    <li class="list-group-item bg-dark text-white"><strong>Course Details </strong></li>
                    <li class="list-group-item"><strong>Course Name: </strong>{{ course.name }}</li>
                    <li class="list-group-item"><strong> Description: </strong>{{ course.Description }}</li>
                    <li class="list-group-item"><strong>Condetion:</strong>
                        <ul v-for="courseCondetion in course.Condetion">
                            <li >{{ courseCondetion }}</li>
                        </ul>
                    </li>
                    <li class="list-group-item"><strong>Stages:</strong>
                        <ul v-for="courseValue in course.courseValues">
                            <li >{{ courseValue }}</li>
                        </ul>
                    </li>
                    
                </ul>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';

  @Options({   
    data () {
      return {
        course: { id:1, name:"java", imgPath:"@/assets/images/img-user.png",createDate:Date.now,Condetion:["",""],courseValues:["","",""], Description:"advace language"}
      }
    }
  })
  export default class CourseDetails extends Vue {
    [x: string]: any;
  }
</script>