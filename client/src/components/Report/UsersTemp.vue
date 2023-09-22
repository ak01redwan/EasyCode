<style>
@media print {
  #users-report-table {
    color: black;
  }
  #users-report-table_length,
  #users-report-table_filter,
  #users-report-table_paginate {
    display: none;
  }
  .table-container
  .users-report-table {
    padding: 0;
    margin: 0;
  }
}
</style>

<template>
    <div class="table-container p-4 m-0 w-100">
        <table id="users-report-table" class="display w-100 table table-dark table-striped">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Subs</th>
                    <th>Projects</th>
                    <th v-if="reportData.users[0].userType == 'supervisor'">Msgs</th>
                    <th>Birth</th>
                    <th>Signup</th>
                    <th>Dlted</th>

                    <!-- Those Will Not Appear ==DO NOT DELETE== they are for search parpose -->
                    <th style="display: none;">User Courses Names</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(user, index) in reportData.users" :key="index">
                    <td>{{ (index + 1) }}</td>
                    <td>{{ user.username }}</td>
                    <td>{{ user.address }}</td>
                    <td>{{ user.subscriptions.length }}</td>
                    <td>{{ user.projects.length }}</td>
                    <td v-if="reportData.users[0].userType == 'supervisor'">{{ user.messages.length }}</td>
                    <td>{{ new Date(user.birthDate).toLocaleDateString(undefined, {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit'
                            })
                        }}
                    </td>
                    <td>{{ new Date(user.signupDate).toLocaleDateString(undefined, {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit'
                            })
                        }}
                    </td>
                    <td :class="user.isDeleted ? 'text-danger' : 'text-success'">{{ user.isDeleted ? 'Yes' : 'No' }}</td>
                    <!-- Those Will Not Appear ==DO NOT DELETE== they are for search parpose -->
                    <td style="display: none;">
                        <small v-for="sub in user.subscriptions">
                            {{ sub.course.name + ' ' }}
                        </small>
                    </td>
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
            $('#users-report-table').DataTable({
                language: {
                    search: 'Filter Even By Course Name:'
                }
            });
        });
    }
})
export default class UsersTemp extends Vue {
}
</script>
