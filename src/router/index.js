import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Form from "../views/Form.vue"
import CompletedForm from "../views/CompletedForm.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path:"/form/:instance/:task",
    name:"Form",
    component: Form
  },
  {
    path:"/form/:instance/:task/completed/:type",
    name:"CompletedForm",
    component: CompletedForm
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router