<template>
    <div class="main-body m-1">
        <div class="row" >           
          <div class="col-lg-5 h-50 col-md-10 mt-4">
            <img src="@/assets/images/javaicon.png" class="w-100" alt="" srcset="">
          </div>
          <div class="col-lg-6  col-md-12 m-1">
              <ul class="list-group text-right">
                  <li class="list-group-item bg-dark text-white"><strong>Course Details </strong></li>
                  <li class="list-group-item"><strong>Course Name: </strong>{{ course.name }}</li>
                  <li class="list-group-item"><strong> Description: </strong>{{ course.Description }}</li>
                  <li class="list-group-item"><strong>Condetion:</strong> {{ course.createDate }}</li>
                  <li class="list-group-item">
                    <div class="accordion" id="stage-accordion">
                      <div class="accordion-item">
                        <h2 class="accordion-header" id="stage1-heading">
                          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#stage1-collapse" aria-expanded="false" aria-controls="stage1-collapse">
                            <strong>Stages:</strong>
                          </button>
                        </h2>
                        <div id="stage1-collapse" class="accordion-collapse collapse list-group" aria-labelledby="stage1-heading" data-bs-parent="#stage-accordion">
                          <div v-for="coursestage in course.courseStage" class="accordion-body list-group-item substage">
                             {{ coursestage }}
                          </div>
                         
                        </div>
                      </div>
                      </div>
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