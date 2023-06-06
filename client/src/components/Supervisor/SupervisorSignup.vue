<template>
    <form action="" class="needs-validated row">
       <div class="form-group was-validated col-lg-6 mb-2">
           <label class="form-label"  for="username">User Name</label>
           <input  id="username" class="form-control" type="text" name="" placeholder="Enter your username" required>
           <div class="invalid-feedback fs-6">Please enter your user name</div>
           <div class="valid-feedback fs-6">Looks Good</div>
       </div>
       <div class="form-group was-validated col-lg-6 mb-2">
           <label class="form-label" for="my-email">Email Address</label>
           <input  id="my-email" class="form-control" type="email" name="" placeholder="Enter your email address" required>
           <div class="invalid-feedback fs-6">Please enter your email address</div>
           <div class="valid-feedback fs-6">Looks Good</div>
       </div>
       <div class="form-group was-validated col-lg-6 mb-2 mb-2">
           <label class="form-label" for="my-password">Password</label>
           <input id="my-password" class="form-control" type="password" name="" placeholder="Enter your password" required>
           <div class="invalid-feedback fs-6">Please enter your password</div>
           <div class="valid-feedback fs-6">Looks Good</div>
       </div>
       
       <div class="form-group was-validated col-lg-6 mb-2">
           <label class="form-label" for="my-repassword">Repeat Password</label>
           <input id="my-repassword" class="form-control" type="password" name="" placeholder="Enter repeat your password" required>
           <div class="invalid-feedback fs-6">Please enter your password confirmation</div>
           <div class="valid-feedback fs-6">Looks Good</div>
       </div>
       <div class="form-group was-validated col-lg-6 mb-2">
           <label class="form-label"  for="fullname">Full Name</label>
           <input  id="fullname" class="form-control" type="text" name="" placeholder="Enter your full name" required>
           <div class="invalid-feedback fs-6">Please enter your full name</div>
           <div class="valid-feedback fs-6">Looks Good</div>
       </div>
       <div class="form-group was-validated  col-lg-6 mb-2">
           <label class="form-label" for="my-address">Address</label>
           <input id="my-address" class="form-control " type="text" name="" placeholder="Enter your address" required>
           <div class="invalid-feedback fs-6">Please enter your address</div>
           <div class="valid-feedback fs-6">Looks Good</div>
       </div>
       <div class="group-Elements-supervisor col-lg-12 row p-0  m-auto " id="supervisorElement">
           <div class="form-group col-lg-6 was-validated">
               <label for="degree-score">Degree Score 100%</label>
               <input id="degree-score" class="form-control" type="number" name="" required>
               <div class="invalid-feedback fs-6 ">Please enter your Degree Score</div>
           <div class="valid-feedback fs-6">Looks Good</div>
           </div>
           <div class="form-group was-validated col-lg-6 mb-2">
               <label class="form-label" for="my-birthdate">Birth date</label>
               <input id="my-birthdate" class="form-control" type="date" name="" placeholder="Enter your Birth date" required>
               <div class="invalid-feedback fs-6 ">Please enter your Birth date</div>
               <div class="valid-feedback fs-6">Looks Good</div>
           </div>
       </div>
       <div class="group-Elements-supervisor col-lg-12 row p-0  m-auto " id="supervisorElement">
           <div class="form-group col-lg-6 was-validated">
               <label for="personal-image">Personal Image</label>
               <input id="personal-image" class="form-control" type="file" name="" required>
               <div class="invalid-feedback fs-6 ">Please enter your personal image</div>
               <div class="valid-feedback fs-6">Looks Good</div>
           </div>
           <div class="form-group col-lg-6 was-validated">
               <label for="certifications-documents">Certifications Documents</label>
               <input id="certifications-documents" class="form-control" type="file" name="" required>
               <div class="invalid-feedback fs-6 ">Please enter your Certifications Documents</div>
               <div class="valid-feedback fs-6">Looks Good</div>
           </div>
       </div>           
       <input type="submit" class="btn btn-success col-10 m-auto mt-3 fs-5 fw-bold" value="SIGN UP">
   </form>
</template>