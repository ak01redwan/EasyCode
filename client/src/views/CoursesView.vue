<template>
    <button v-for="course in coureses">{{ course.catogery }}</button>
    <button> skduvljdvv</button>
    
    <Card v-for="course in coureses" 
    :Id="course.id" 
    :Title="course.name" 
    :Description="course.description"
    :Type="course.catogery"
    LikesNo="0"/>
    
</template>
  
<script lang="ts">
  import { Options, Vue } from 'vue-class-component';
  import Card from '@/components/Card.vue'
  
  @Options({
    components: {
        Card
    },
    data () {
      return {
        coureses: [
            {id:1, name: 'Java FX 1', imagePath: 'public/upload/java.png', catogery: 'Java 1', description: 'this is course 1'},
            {id:2, name: 'Java FX 2', imagePath: 'public/upload/java.png', catogery: 'Java 2', description: 'this is course 2'},
            {id:3, name: 'Java FX 3', imagePath: 'public/upload/java.png', catogery: 'Java 3', description: 'this is course 3'},
            {id:4, name: 'Java FX 4', imagePath: 'public/upload/java.png', catogery: 'Java 4', description: 'this is course 4'},
            {id:5, name: 'Java FX 5', imagePath: 'public/upload/java.png', catogery: 'Java 5', description: 'this is course 5'}
        ]
      }
    },
    methods: {
      
    }
  })
  export default class CoursesView extends Vue {
    [x: string]: any;
  }
</script>
  