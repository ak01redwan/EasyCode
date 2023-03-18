import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import StudentView from '../views/StudentView.vue'
import LoginViewVue from '@/views/LoginView.vue'
import SignupView from '@/views/SignupView.vue'
import CourseView from '@/views/CourseView.vue'

const routes: Array<RouteRecordRaw> = [
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
    path: '/student',
    name: 'student',
    component: StudentView

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
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router