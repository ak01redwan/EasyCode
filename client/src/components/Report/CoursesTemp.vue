<style>
@media print {
  #courses-report-table {
    color: black;
  }
  #courses-report-table_length,
  #courses-report-table_filter,
  #courses-report-table_paginate {
    display: none;
  }
  .table-container
  .courses-report-table {
    padding: 0;
    margin: 0;
  }
}
</style>

<template>
    <div class="table-container p-4 m-0 w-100">
        <table id="courses-report-table" class="display w-100 table table-dark table-striped">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Stgs</th>
                    <th>Subs</th>
                    <th>Msgs</th>
                    <th>Projects</th>
                    <th>Admin</th>
                    <th>Category</th>
                    <th>Created</th>
                    <!-- <th>Modification</th> -->
                    <th>Published</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(course, index) in reportData.courses" :key="index">
                    <td>{{ (index + 1) }}</td>
                    <td>{{ course.name }}</td>
                    <td>{{ course.stages.length }}</td>
                    <td>{{ course.subscriptions.length }}</td>
                    <td>{{ course.messages.length }}</td>
                    <td>{{ course.projects.length }}</td>
                    <td>@{{ course.courseAdmin.username }}</td>
                    <td>{{ course.category.name }}</td>
                    <td>{{ new Date(course.createdDate).toLocaleDateString(undefined, {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit'
                            })
                        }}
                    </td>
                    <!-- <td>{{ new Date(course.modificationDate).toLocaleDateString(undefined, {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit'
                            })
                        }}
                    </td> -->
                    <td :class="course.isPublished ? 'text-success' : 'text-danger'">{{ course.isPublished ? 'Yes' : 'No' }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
  
<script>
import { Options, Vue } from "vue-class-component";
// the data table things
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs5';
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';

@Options({
    props: {
        reportData: null
    },
    data() {
        return {
        }
    },
    mounted() {
        $(document).ready(function () {
            $('#courses-report-table').DataTable();
        });
    }
})
export default class CoursesTemp extends Vue {
}
</script>
