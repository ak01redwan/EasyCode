import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import ExamView from '@/views/ExamView.vue'
import HomeView from '../views/HomeView.vue'
import UsersView from '../views/UsersView.vue'
import SignupView from '@/views/SignupView.vue'
import CourseView from '@/views/CourseView.vue'
import LessonView from '@/views/LessonView.vue'
import CoursesView from '@/views/CoursesView.vue'
import LoginViewVue from '@/views/LoginView.vue'
import EditUserView from '@/views/EditUserView.vue';
import DashboardView from "@/views/DashboardView.vue"
import UserDetailsView from '../views/UserDetailsView.vue'
import StageAskedProjectView from '@/views/StageAskedProjectView.vue'
import WaitingConfirmationView from '@/views/WaitingConfirmationView.vue'
import WaitingProjectConfirmationViewVue from '@/views/WaitingProjectConfirmationView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView
  },
  {
    path: '/exam',
    name: 'examView',
    component: ExamView
  },
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/users',
    name: 'users',
    component: UsersView
  },
  {
    path: '/user',
    name: 'user',
    component: UserDetailsView

  },
  {
    path: '/confirmation',
    name: 'confirmation',
    component: WaitingConfirmationView
  },
  {
    path: '/projectConfirmation',
    name: 'projectConfirmation',
    component: WaitingProjectConfirmationViewVue,
  },
  {
    path: '/courses',
    name: 'courses',
    component: CoursesView
  },
  {
    path: '/course',
    name: 'course',
    component: CourseView
  },
  {
    path: '/stage',
    name: 'stage',
    component: LessonView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginViewVue    
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignupView    
  },
  {
    path: '/edituser',
    name: 'edituser',
    component: EditUserView    
  },
  {
    path: '/submit-project',
    name: 'submitProject',
    component: StageAskedProjectView    
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
