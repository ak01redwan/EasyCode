<template>
  <div class="container py-5" style="min-height: 90vh">
    <div class="row justify-content-center">
      <div class="col-md-8 col-lg-6">
        <h1 class="text-center mb-5">Sign Up</h1>
        <form
          @submit.prevent="submitForm"
          class="needs-validation"
          novalidate
          ref="form"
        >
          <div
            v-for="(field, index) in fields"
            :key="index"
            :class="field.width"
            class="form-group was-validated mb-2"
          >
            <label class="form-label" :for="field.name">{{
              field.label
            }}</label>
            <template
              v-if="
                field.type === 'text' ||
                field.type === 'email' ||
                field.type === 'password'
              "
            >
              <input
                :id="field.name"
                class="form-control"
                :type="field.type"
                :name="field.name"
                :placeholder="field.placeholder"
                v-model="formData[field.name]"
                :required="field.required"
                :accept="field.accept"
              />
            </template>
            <template v-else-if="field.type === 'file'">
              <input
                :id="field.name"
                class="form-control"
                :type="field.type"
                :name="field.name"
                :accept="field.accept"
                @change="onFileChange"
                :required="field.required"
                ref="fileInput"
              />
              <div class="invalid-feedback fs-6">
                {{ field.validationMessage }}
              </div>
              <img
                v-if="previewImage"
                :src="previewImage"
                class="mt-2"
                style="max-width: 100%"
              />
              <div class="valid-feedback fs-6">Looks Good</div>
            </template>
            <template v-else-if="field.type === 'date'">
              <input
                :id="field.name"
                class="form-control"
                :type="field.type"
                :name="field.name"
                :placeholder="field.placeholder"
                v-model="formData[field.name]"
                :required="field.required"
              />
            </template>
          </div>
          <div class="form-group col-lg-12 mt-2 mb-2">
            <label class="form-label" for="userType">User Type</label>
            <select
              class="form-select"
              id="userType"
              name="userType"
              v-model="formData.userType"
              required
            >
              <option value="student">Student</option>
              <option value="supervisor">Supervisor</option>
            </select>
          </div>
          <div
            v-if="formData.userType === 'supervisor'"
            class="form-group col-lg-12 was-validated mt-4 mb-4"
          >
            <label class="form-label" for="certificationsDocs"
              >Certifications Document(PDF)</label
            >
            <input
              id="certificationsDocs"
              class="form-control"
              type="file"
              name="certificationsDocs"
              accept="application/pdf"
              @change="onDocFileChange"
              required
            />
          </div>
          <button
            type="submit"
            class="btn btn-primary w-100"
            :disabled="isSubmitting"
          >
            {{ isSubmitting ? "Signing up..." : "Sign Up" }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      fields: [
        {
          label: "Student User Name",
          name: "username",
          type: "text",
          width: "col-lg-12",
          placeholder: "Enter your username",
          required: true,
          validationMessage: "Please enter your username",
        },
        {
          label: "Email Address",
          name: "email",
          type: "email",
          width: "col-lg-12",
          placeholder: "Enter your email address",
          required: true,
          validationMessage: "Please enter your email address",
        },
        {
          label: "Password",
          name: "password",
          type: "password",
          width: "col-lg-12",
          placeholder: "Enter your password",
          required: true,
          validationMessage: "Please enter your password",
        },
        {
          label: "Repeat Password",
          name: "password2",
          type: "password",
          width: "col-lg-12",
          placeholder: "Repeat your password",
          required: true,
          validationMessage: "Please repeat your password",
        },
        {
          label: "Student Full Name",
          name: "fullName",
          type: "text",
          width: "col-lg-12",
          placeholder: "Enter your full name",
          required: true,
          validationMessage: "Please enter your full name",
        },
        {
          label: "Studnet Address",
          name: "address",
          type: "text",
          width: "col-lg-12",
          placeholder: "Enter your address",
          required: true,
          validationMessage: "Please enter your address",
        },
        {
          label: "Student Description",
          name: "userDescription",
          type: "text",
          width: "col-lg-12",
          placeholder: "Enter short description about your self",
          required: true,
          validationMessage: "Please enter your description",
        },
        {
          label: "Photo",
          name: "photo",
          type: "file",
          width: "col-lg-12",
          accept: "image/*",
          required: true,
          validationMessage: "Please select a photo",
        },
        {
          label: "Birth Date",
          name: "birthDate",
          type: "date",
          width: "col-lg-12",
          placeholder: "Enter your birth date",
          required: true,
          validationMessage: "Please enter your birth date",
        },
      ],
      formData: {
        username: "",
        email: "",
        password: "",
        password2: "",
        fullName: "",
        address: "",
        userDescription: "",
        userType: "student",
        picturePath: "path/will/setup/on/server",
        birthDate: null,
        photo: null,
        certificationsDocs: null,
      },
      previewImage: null,
      isSubmitting: false,
    };
  },
  methods: {
    submitForm() {
      if (!this.$refs.form.checkValidity()) {
        Swal.fire({
          icon: "error",
          title: "Validite Error!",
          text: "You need to fill all boxes until their colors turn green, then do submit!",
        });
        return;
      }
      if (this.formData.password != this.formData.password2) {
        Swal.fire({
          icon: "error",
          title: "Oops!",
          text: "Passwords do not match!",
        });
        return;
      }
      this.isSubmitting = true;
      //console.log(this.formData)
      axios
        .post("http://localhost:3000/users", this.formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          // know the user type who dose this opertion using the tokens
          const userCookies = Cookies.get("userTokens");
          if (userCookies) {
            axios
              .get("http://localhost:3000/auth/profile", {
                headers: { Authorization: `Bearer ${userCookies}` },
              })
              .then((res) => {
                if (res.data.user.userType == "admin") {
                  this.$router.push("/dashboard"); // go to dashboard
                  Swal.fire({
                    icon: "success",
                    title: "Done!",
                    text: "New user has been added successfully",
                  });
                } else {
                  Cookies.set("userTokens", response.data.tokens);
                  this.$router.push("/student"); // go to student
                  Swal.fire({
                    icon: "success",
                    title: `Welcome ${response.data.user.fullName}`,
                    text: "Your account has been added successfully",
                  });
                }
              })
              .catch((err) => {});
          } else {
            Cookies.set("userTokens", response.data.tokens);
            this.$router.push("/student"); // go to student
            Swal.fire({
              icon: "success",
              title: `Welcome ${response.data.user.fullName}`,
              text: "Your account has been added successfully",
            });
          }
          //this.$emit('update-users', updatedUsers)
        })
        .catch((error) => {
          console.error(error.response.data.message);
        });
    },
    onFileChange(event) {
      console.log("aaaaaaaaaaaaaaaaaa");
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        this.previewImage = event.target.result;
      };

      reader.readAsDataURL(file);
      this.formData.photo = file;
    },
    onDocFileChange(event) {
      const file = event.target.files[0];
      this.formData.certificationsDocs = file;
      //console.log(this.formData.certificationsDocs);
    },
  },
};
</script>
