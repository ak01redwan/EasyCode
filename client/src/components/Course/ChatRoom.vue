<template>
    <section class="bg-white m-2 p-0 ">
        <div class="container h-100 w-100 ">
            <div class="row d-flex justify-content-center">
                <div class="h-100 w-100">
                    <div class="card h-100" >
                        <div class="card-header align-items-center fw-bold p-3">  
                            <span class="fa fa-comments me-2 fs-5"></span>
                            <span class="mb-0 fs-4  ">CourseName ChattingRoom</span>
                        </div>
                        <div class="card-body overflow-auto" data-mdb-perfect-scrollbar="true" style="position: relative; height: 400px">           
                            <div v-for="message in messages" >
                                <div v-if="message.typeUser === 'I' " class="d-flex flex-row justify-content-end">
                                    <div>
                                        <p class="small p-2 me-3 mb-1 rounded-3 bg-primary" >{{ message.contant }}</p>
                                        <p class="small me-3 mb-3 rounded-3 text-muted d-flex justify-content-end">{{ message.time }}</p>
                                    </div>
                                    <img src="@/assets/images/img-user.png" alt="avatar 1" style="width: 45px; height: 100%;">
                                </div>
                                <div v-else class="d-flex flex-row justify-content-start">
                                    <img src="@/assets/images/img-user.png" alt="avatar 1" style="width: 45px; height: 100%;">
                                    <div>
                                        <p class="small p-2 ms-3 mb-1 rounded-3 bg-light" >{{ message.contant }}</p>
                                        <p class="small ms-3 mb-3 rounded-3 text-muted">{{ message.time }}</p>
                                    </div>
                                </div>
                            </div>           
                            <!--<div class="divider d-flex align-items-center mb-4 w-100">
                              
                                <p class="text-center w-100" style="color: #a2aab7;">Today</p>
                               
                            </div>           
                            <div class="d-flex flex-row justify-content-end mb-4 pt-1">
                                <div>
                                <p class="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">Hiii, I'm good.</p>
                                <p class="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">How are you doing?</p>
                                <p class="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">Long time no see! Tomorrow
                                    office. will
                                    be free on sunday.</p>
                                <p class="small me-3 mb-3 rounded-3 text-muted d-flex justify-content-end">00:06</p>
                                </div>
                                <img src="@/assets/images/img-user.png" alt="avatar 1" style="width: 45px; height: 100%;">
                            </div>           
                            <div class="d-flex flex-row justify-content-start mb-4">
                                <img src="@/assets/images/img-user.png"
                                alt="avatar 1" style="width: 45px; height: 100%;">
                                <div>
                                <p class="small p-2 ms-3 mb-1 rounded-3" style="background-color: #f5f6f7;">Okay</p>
                                <p class="small p-2 ms-3 mb-1 rounded-3" style="background-color: #f5f6f7;">We will go on
                                    Sunday?</p>
                                <p class="small ms-3 mb-3 rounded-3 text-muted">00:07</p>
                                </div>
                            </div>           
                            <div class="d-flex flex-row justify-content-end mb-4">
                                <div>
                                <p class="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">That's awesome!</p>
                                <p class="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">I will meet you Sandon Square
                                    sharp at
                                    10 AM</p>
                                <p class="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">Is that okay?</p>
                                <p class="small me-3 mb-3 rounded-3 text-muted d-flex justify-content-end">00:09</p>
                                </div>
                                <img src="@/assets/images/img-user.png"
                                alt="avatar 1" style="width: 45px; height: 100%;">
                            </div>            
                            <div class="d-flex flex-row justify-content-start mb-4">
                                <img src="@/assets/images/img-user.png"
                                alt="avatar 1" style="width: 45px; height: 100%;">
                                <div>
                                <p class="small p-2 ms-3 mb-1 rounded-3" style="background-color: #f5f6f7;">Okay i will meet
                                    you on
                                    Sandon Square</p>
                                <p class="small ms-3 mb-3 rounded-3 text-muted">00:11</p>
                                </div>
                            </div>            
                            <div class="d-flex flex-row justify-content-end mb-4">
                                <div>
                                <p class="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">Do you have pictures of Matley
                                    Marriage?</p>
                                <p class="small me-3 mb-3 rounded-3 text-muted d-flex justify-content-end">00:11</p>
                                </div>
                                <img src="@/assets/images/img-user.png"
                                alt="avatar 1" style="width: 45px; height: 100%;">
                            </div>          
                            <div class="d-flex flex-row justify-content-start mb-4">
                                <img src="@/assets/images/img-user.png"
                                alt="avatar 1" style="width: 45px; height: 100%;">
                                <div>
                                <p class="small p-2 ms-3 mb-1 rounded-3" style="background-color: #f5f6f7;">Sorry I don't
                                    have. i
                                    changed my phone.</p>
                                <p class="small ms-3 mb-3 rounded-3 text-muted">00:13</p>
                                </div>
                            </div>           
                            <div class="d-flex flex-row justify-content-end">
                                <div>
                                <p class="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">Okay then see you on sunday!!
                                </p>
                                <p class="small me-3 mb-3 rounded-3 text-muted d-flex justify-content-end">00:15</p>
                                </div>
                                <img src="@/assets/images/img-user.png"
                                alt="avatar 1" style="width: 45px; height: 100%;">
                            </div>   -->         
                        </div>
                        <div class="card-footer text-muted d-flex justify-content-start align-items-center p-2">
                            <img src="@/assets/images/img-user.png" class="m-1" alt="avatar 3" style="width: 40px; height: 100%;">
                                <input type="text" placeholder="Type your message" class="form-control form-control-lg " name="" id="">                 
                            <a href="#"><i class="fas fa-paper-plane fs-3 p-1"></i></a>
                        </div>
                    </div>
                </div>
          </div>
        </div>
    </section>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
    data(){
        return{
            messages: [
            {contant: 'hi', time:'3:30',imgePath: '@/assets/images/img-user.png',typeUser:'I'},
            {contant: 'hi', time:'3:30',imgePath: '@/assets/images/img-user.png',typeUser:'he'},
            {contant: 'how are you', time:'3:30',imgePath: '@/assets/images/img-user.png',typeUser:'you'},
            {contant: 'fine thanks', time:'3:30',imgePath: '@/assets/images/img-user.png',typeUser:'I'},
            {contant: 'hi', time:'3:30',imgePath: '@/assets/images/img-user.png'},
            {contant: 'hi', time:'3:30',imgePath: '@/assets/images/img-user.png'},
            {contant: 'hi', time:'3:30',imgePath: '@/assets/images/img-user.png',typeUser:'I'}                
            ]
        }
    }
})
export default class ChatRoom extends Vue {
[x: string]: any;
}
</script>