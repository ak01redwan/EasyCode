<template>
    <div class="row bg-dark text-white text-center pt-2">
        <strong class="col-12 border p-2">General Informaton</strong>
    </div>
    <div class="row bg-dark text-white text-center pt-5 pb-5 d-flex justify-content-center">
        <CChart
            style="width: 500px; height: 500px; margin-bottom: 40px;"
            type="polarArea"
            :data="{
                labels: ['Users', 'Categries', 'Courses', 'Stages', 'Lessons','Projects','Subscriptions'],
                datasets: [
                {
                    data: [reportData.users.length-1, reportData.categories.length, coursesCount, stagesCount, lessonsCount,projectsCount,subscriptionsCount],
                    backgroundColor: ['#3A6D80', '#F3CD53', '#D56729', '#9D402D', '#8AB6F9', '#00246B', '#0BBBBB'],
                },
                ],
            }"
        />
    </div>

    <div class="row bg-dark text-white text-center pt-2">
        <strong class="col-6 border p-2">USERS</strong>
        <strong class="col-6 border p-2">CATEGORIES</strong>
    </div>
    <div class="row bg-dark text-white">
        <div class="border col-6 p-5 d-flex justify-content-center">
            <CChart
                style="width: 300px; height: 300px;"
                type="doughnut"
                :data="{
                    labels: ['Students', 'Supervisors'],
                    datasets: [
                    {
                        backgroundColor: ['#41B883', '#E46651'],
                        data: [studentsCount, supervisorsCount],
                    },
                    ],
                }"
                :options="chartOptions"
            />
        </div>
        <div class="border col-6 p-5 d-flex justify-content-center">
            <CChart type="bar" 
                style="width: 400px; height: 400px;"
                :data="{
                    labels: categoriesNames,
                    datasets: [
                        {
                            label: 'Courses',
                            backgroundColor: '#42A5F5',
                            data: categoriesCoursesCount
                        }
                    ]
                }" 
                :options="chartOptions" />
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { CChart } from '@coreui/vue-chartjs';


@Options({
    props: {
        reportData: null
    },
    components: {
        CChart
    },
    data() {
        return {
            subscriptionsCount: 0,
            projectsCount: 0,
            coursesCount: 0,
            stagesCount: 0,
            lessonsCount: 0,
            supervisorsCount: [],
            studentsCount: [],
            categoriesNames: [],
            categoriesCoursesCount: [],
            chartOptions: {
                responsive: true,
            }
        }
    },
    created() {
        this.getReportData(this.reportData);
    },
    watch:{
        reportData(newReportData: any) {
            this.getReportData(newReportData);
        }
    },
    methods: {
        getReportData(data: any) {
            // get the number of users signed in as a supervisors
            this.supervisorsCount = data.users.filter((user: any) => user.userType === "supervisor").length;
            // get the number of users signed in as a students
            this.studentsCount = data.users.filter((user: any) => user.userType === "student").length;
            // get an array of all categories names
            this.categoriesNames = data.categories.map((category: any) => category.name);
            // get the number of courses in each category
            this.categoriesCoursesCount = data.categories.map((category: any) => category.courses.length);
            // get the number of courses inside the website
            this.coursesCount = data.categories.flatMap((category: any) => category.courses).length;
            // get the number of stages
            this.stagesCount = data.categories.flatMap((category: any) => category.courses.flatMap((course: any) => course.stages)).length;
            // get the number og lessons
            this.lessonsCount = data.categories.flatMap((category: any) => category.courses.flatMap((course: any) => course.stages.flatMap((stage: any) => stage.lessons))).length;
            // get the number of projects
            this.projectsCount = data.categories.flatMap((category: any) => category.courses.flatMap((course: any) => course.projects)).length;
            // get the number of subscriptions
            this.subscriptionsCount = data.categories.flatMap((category: any) => category.courses.flatMap((course: any) => course.subscriptions)).length;
        }
    },
})
export default class GeneralTemp extends Vue {
    [x: string]: any;
}
</script>
