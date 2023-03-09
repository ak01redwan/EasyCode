<template>
        <div class="form-container d-flex align-items-center w-100 justify-content-center fs-4">
        <div class="login m-lg-5 shadow m-3 pb-2 w-auto p-4 ratio-1x1" style="background:#EAEBED">
            <h2 class="text-center m-5">LOGIN TO ESAY CODE</h2>
            <form action="" class="needs-validated">
                <div class="form-group was-validated mb-2 mb-lg-3">
                    <label class="form-label" for="my-email">Email Address</label>
                    <input  id="my-email" class="form-control" type="email" name="" 
                                        placeholder="Enter your email address" required>
                    <div class="invalid-feedback fs-6 ">Please enter your email address</div>
                </div>
                <div class="form-group was-validated mb-2 mb-lg-3">
                    <label class="form-label" for="my-password">Password</label>
                    <input id="my-password" class="form-control" type="password" name="" placeholder="Enter your password" required>
                    <div class="invalid-feedback fs-6">Please enter your password</div>
                </div>
                <div class="form-group form-check ms-3">
                    <input type="checkbox" class="form-check-input" id="btncheck1">
                    <label class="form-check-label fs-6 mb-3" for="btncheck1">Remember me</label>
                
                </div>
                <input type="submit" class="btn btn-success w-100 mt-3 " value="LOGIN">
                <ul class="form-options list-unstyled p-0 mt-3 mt-lg-5 fs-6 mb-0"  accesskey="none">
                    <li><a class="" href="#">Forgot password</a></li>
                    <router-link to="/signup"><li><a class="">Create New Account</a></li></router-link>
                </ul>
                
             </form>
        </div> 
    </div>
</template>