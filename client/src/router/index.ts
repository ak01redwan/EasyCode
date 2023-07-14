import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UsersView from '../views/UsersView.vue'
import UserDetailsView from '../views/UserDetailsView.vue'
import LoginViewVue from '@/views/LoginView.vue'
import SignupView from '@/views/SignupView.vue'
import CoursesView from '@/views/CoursesView.vue'
import CourseView from '@/views/CourseView.vue'
import DashboardView from "@/views/DashboardView.vue"
import StageAskedProjectView from '@/views/StageAskedProjectView.vue'
import ExamView from '@/views/ExamView.vue'

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
