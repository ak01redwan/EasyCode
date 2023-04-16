<template>
    <div class="modal fade" id="addCourseModal" tabindex="-1" aria-labelledby="addCourseModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="addCourseModalLabel">Add New Course</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="form-container d-flex align-items-center justify-content-center fs-4">
                            <div class="form-border w-100 p-4 ratio-1x1  rounded" style="background:#EAEBED">
                                <form  @submit.prevent="onSubmit" class="needs-validated row">
                                    <div class="form-group was-validated col-lg-12 mb-2">
                                        <label class="form-label"  for="my-name">Course Name</label>
                                        <input  id="my-name" class="form-control" type="text" name="" placeholder="Enter your course name" required>
                                        <div class="invalid-feedback fs-6">Please enter your course name</div>
                                        <div class="valid-feedback fs-6">Looks Good</div>
                                    </div>
                                    <div class="form-group was-validated col-lg-12 mb-2">
                                        <label class="form-label" for="my-category">Category</label>
                                        <input v-model="searchTerm" @keyup="getCategory()" class="form-control" id="my-category"  type="text" name="" placeholder="Enter the course category to search about" required>
                                        <input v-model="category.name" class="form-control" id="my-category"  type="text" name="" placeholder="Enter the course category" required disabled>
                                        <div class="invalid-feedback fs-6">Please enter your email address</div>
                                        <div class="valid-feedback fs-6">Looks Good but enure that the category with it's full name is in the disabled input</div>
                                    </div>
                                    <div class="form-group was-validated col-lg-12 mb-2">
                                        <label class="form-label" for="my-password">Course Description</label>
                                        <textarea id="my-courseDescription" class="form-control" name="" placeholder="Enter course description" required></textarea>
                                        <div class="invalid-feedback fs-6">Please enter the course description</div>
                                        <div class="valid-feedback fs-6">Looks Good</div>
                                    </div>
                                    <div class="form-group was-validated col-lg-12 mb-2">
                                        <label for="my-courseImage">Course Image</label>
                                        <input id="my-courseImage" class="form-control" type="file" name="" required>
                                        <div class="invalid-feedback fs-6 ">Please enter the course image</div>
                                        <div class="valid-feedback fs-6">Looks Good</div>
                                    </div>           
                                    <input type="submit" class="btn btn-success col-10 m-auto mt-3 fs-5 fw-bold" value="SUBMIT">
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
    components: { },
    data () { 
        return {
            category: '----',
            searchTerm: '',
            categories: [
                {id: 1, name: 'Web'},
                {id: 1, name: 'Android'},
                {id: 1, name: 'Desktop'}
            ]
        }
    },
    methods: {
        getCategory(){
            this.category = this.categories.filter((category: {id: number; name: string;}): any => {
                const searchTermLC = this.searchTerm.toLowerCase();
                return category.name.toLowerCase().includes(searchTermLC);
            })[0];
        }
    }
})
export default class AddNewCourse extends Vue {
[x: string]: any;
}
</script>
