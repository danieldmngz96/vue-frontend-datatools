import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PostDetail from '../views/PostDetail.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/pokemon/:id',
    name: 'PostDetail',
    component: PostDetail
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
