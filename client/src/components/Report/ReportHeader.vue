<style>
@media print {
  #report-navbar,
  #easycode-header,
  .sidebar,
  .navbar,
  nav,
  footer {
    display: none;
  }
}
</style>

<template>
  <nav id="report-navbar" class="navbar navbar-expand navbar-light bg-light">
    <div class="container-fluid">
      <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <button
              class="btn btn-outline-success"
              type="button"
              @click="printReport"
            >
              <i class="fas fa-print"></i> Print
            </button>
          </li>
        </ul>
        <form class="d-flex input-group w-auto">
          <div title="Report Type" class="form-control m-1">
            <label for="">Report Type</label>
            <select
              class="form-select me-2"
              v-model="selectedReportType"
              @change="$emit('report-type-changed', selectedReportType)"
            >
              <option value="general">General Report</option>
              <option value="courses">Courses Report</option>
              <option value="supervisors">Supervisors Report</option>
              <option value="students">Students Report</option>
            </select>
          </div>
          <div title="From Date" class="form-control m-1">
            <label for="">From Date</label>
            <input
              type="datetime-local"
              class="form-control"
              v-model="fromDate"
              aria-label="From Date"
            />
          </div>

          <div title="To Date" class="form-control m-1">
            <label for="">To Date</label>
            <input
              type="datetime-local"
              class="form-control"
              v-model="toDate"
              aria-label="To Date"
            />
          </div>
          <button
            class="btn btn-outline-primary m-1"
            type="button"
            data-mdb-ripple-color="dark"
            @click="getReportData"
          >
            Generate a Report
          </button>
        </form>
      </div>
    </div>
  </nav>
  <div id="reportHeader" class="text-center p-2">
    <i class="fa-solid fa-code text-white border shadow-lg" 
      style="
        padding: 10px 15px;
        font-size: 58px; 
        border-radius: 50%; 
        background-color: #0d6efd;"></i>
    <h1 class="m-2">Easy Coding Report</h1>
    <h6 class="text-secondary m-2">{{ selectedReportType }} report at {{ reportData.reportDate }}</h6>
    <div class="row">
      <em class="col-6 text-left text-secondary" style="font-weight: bold">
        From: {{  new Date(reportData.fromDate).toDateString() != 'Invalid Date' ? new Date(reportData.fromDate).toDateString() : reportData.fromDate }}
      </em>
      <em class="col-6 text-right text-secondary" style="font-weight: bold">
        To: {{ reportData.toDate }}
      </em>
    </div>
  </div>
  <hr class="mb-5"/>
</template>

<script lang="ts">
import axios from "axios";
import Swal from "sweetalert2";
import { Options, Vue } from "vue-class-component";

type Payload = {
  fromDate: Date | null,
  toDate: Date | null
}
@Options({
  data() {
    return {
      reportData: { fromDate: '', toDate: '', reportDate: ''},
      fromDate: null,
      toDate: null,
      selectedReportType: "general",
    };
  },
  beforeMount() {},
  mounted() {
    this.$emit("report-type-changed", this.selectedReportType);
  },
  methods: {
    async loadCoursesReportData(payload: Payload) {
      try {
        const response = await axios.post("http://localhost:3000/reports/courses", payload);
        return response.data
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops..",
          text: "can not get the courses report data from the server"+error
        });
      }
    },
    async loadGenralReportData(payload: Payload) {
      try {
        const response = await axios.post("http://localhost:3000/reports", payload);
        return response.data
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops..",
          text: "can not get the general report data from the server"+error
        });
      }
    },
    async getReportData() {
      const payload: Payload = {
        fromDate: this.fromDate ? new Date(this.fromDate) : null,
        toDate: this.toDate ? new Date(this.toDate) : null 
      }
      let data = null;
      switch(this.selectedReportType) {
        case 'general':
          data = await this.loadGenralReportData(payload);
          break;
        case 'courses':
          data = await this.loadCoursesReportData(payload);
          break;
      }
      this.reportData = data;
      this.$emit('report-data', data);
    },
    printReport() {
      let report = document.getElementById('easy-code-report-container-id');
      report?.classList.remove('easy-code-report-container');
      window.print();
      report?.classList.add('easy-code-report-container');
    },
  },
})
export default class ReportHeader extends Vue {
  [x: string]: any;
}
</script>
