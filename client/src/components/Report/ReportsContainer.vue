<style>
.easy-code-report-container {
    margin: 0; 
    padding: 0; 
    margin-top: 4px;
    background-color: rgba(220, 220, 234, 0.523);
    border: 2px solid rgba(13, 46, 103, 0.591);
    border-radius: 4px;
    max-height: 90vh;
    overflow-y: auto;
    scroll-margin: 0;
    scroll-padding: 0;
    scroll-snap-type: mandatory;
    scroll-behavior: smooth;
}
</style>

<template>
    <div id="easy-code-report-container-id" class="easy-code-report-container">
        <ReportHeader @report-type-changed="changeReportTemp" @report-data="fillTempWithReportData" />
        <div v-if="reportData">
            {{ reportData }}
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ReportHeader from "./ReportHeader.vue";

@Options({
    components:{
        ReportHeader
    },
    data() {
        return {
            reportData: null,
            reportType: 'general'
        };
    },
    beforeMount() {},
    mounted() {},
    methods: {
        changeReportTemp(reportType: 'general' | 'courses' | 'supervisors' | 'students') {
            alert(reportType);
        },
        fillTempWithReportData(data: any) {
            this.reportData = data;
        }
    },
})
export default class ReportsContainer extends Vue {
[x: string]: any;
}
</script>